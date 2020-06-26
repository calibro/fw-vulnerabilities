<template>
  <svg :x="x" :y="y" :height="height" :width="width" ref="mainSVG">
    <svg id="main-chart" ref="mainChart" :height="height" :width="width"></svg>
    <g
      id="legend"
      ref="legend"
      :transform="'translate(0,' + (height - 100) + ')'"
    ></g>
  </svg>
</template>

<script>
import d3Annotation from "d3-svg-annotation";
import * as d3 from "d3";
import * as d3array from "d3-array";
import d3Legend from "d3-svg-legend";
import { mapState, mapGetters, mapMutations } from "vuex";
import tippy from "tippy.js";
import Vue from "vue";

export default {
  name: "BeeswarmChart",
  props: ["x", "y", "height", "width"],
  computed: {
    ...mapState({
      colorBy: state => state.colorBy,
      groupBy: state => state.groupBy,
      sortBy: state => state.sortBy,
      dotSize: state => state.dotSize,
      showSLA: state => state.showSLA,
      showDescriptionNote: state => state.showDescriptionNote,
      csvData: state => state.data.csvData
    }),
    ...mapGetters({
      filteredData: "data/filteredData"
    })
  },
  mounted() {
    this.draw();
  },
  methods: {
    init() {
      let csvData = this.csvData;

      let priorityScale = d3
        .scaleOrdinal()
        .domain(["Low", "Medium", "High"])
        .range(["#00E4A2", "#EAEA6A", "#D4003D"]);

      let ageScale = d3
        .scaleSequential()
        .domain([0, d3.max(csvData, d => d["Age"])])
        .interpolator(d3.interpolateBlues);

      let esposizioneScale = d3
        .scaleSequential()
        .domain([0, d3.max(csvData, d => d["Fattore di esposizione"])])
        .interpolator(d3.interpolateYlOrRd)
        .unknown("#ccc");

      this.colorScales = {
        Priority: priorityScale,
        Age: ageScale,
        "Fattore di esposizione": esposizioneScale
      };

      this.simulation = d3
        .forceSimulation()
        .force("x", d3.forceX().strength(1))
        .force("y", d3.forceY())
        .force("collide", d3.forceCollide().iterations(1));

      this.annotations = [];

      this.initialized = true;
    },
    draw(simulationAlpha = 1, restartSimulation = true) {
      !this.initialized && this.init();

      let self = this;

      const margin = {
        top: 40,
        right: 30,
        bottom: 130,
        left: 250
      };

      const noteSize = {
        width: 300,
        height: 100
      };

      const svg = d3
        .select(this.$refs.mainChart)
        .attr("width", this.width)
        .attr("height", this.height);

      if (this.filteredData.length == 0) {
        svg.selectAll("*").remove();
        d3.select(this.$refs.legend)
          .selectAll("*")
          .remove();
        svg
          .append("text")
          .attr("class", "no-data-text")
          .style("font-size", "40px")
          .attr("y", "50%")
          .text("No data in your selection");

        this.scaleToFit(0, 0, this.width, this.height);
      } else {
        svg.selectAll(".no-data-text").remove();

        const chartWidth = this.width - margin.left - margin.right;
        const chartHeight = this.height - margin.top - margin.bottom;

        const rollup = d3array.rollup(
          this.filteredData,
          v => v.length,
          d => d[this.groupBy]
        );

        const groups = new Map(
          [...rollup].sort((a, b) => {
            if (self.sortBy === "Count") {
              return d3.descending(a[1], b[1]);
            } else {
              return d3.ascending(a[0], b[0]);
            }
          })
        );

        // NOTE: very ugly fix - improve
        // this.filteredData.forEach(e => {
        //   (e.groupIndex = groups.findIndex(g => g.key == e[this.groupBy])),
        //     (e.x = e.x ? e.x : vWidth / 2),
        //     (e.y = e.y ? e.y : vHeight / 2);
        // });

        let cvssRange = this.$store.state.data.filters["CVSS Score"];
        // Use CVSS range based on filter values
        const xScale = d3
          .scaleLinear()
          .range([0, chartWidth])
          .domain(cvssRange);

        const xScaleHelper = d3
          .scaleThreshold()
          .domain([0, 4, 7, 10])
          .range(["", "low", "medium", "high", ""]);

        const yScale = d3
          .scaleBand()
          .rangeRound([0, chartHeight])
          .domain([...groups.keys()]);

        const slaScale = d3
          .scaleOrdinal()
          .range([0, 360])
          .domain([false, true]);

        // Spatialization iterations
        const anticollisionIterations = 1;
        const marginCircles = 1;
        // Space between barcharts
        const padding = 10;
        const minRadius = 2;
        const maxRadius = 20;
        const radius = this.dotSize;

        let xAxisGroup = svg.select("#xAxisGroup");

        if (xAxisGroup.empty()) {
          xAxisGroup = svg
            .append("g")
            .attr("id", "xAxisGroup")
            .attr(
              "transform",
              "translate(" + margin.left + "," + margin.top + ")"
            );
        }

        xAxisGroup
          .call(
            d3
              .axisTop(xScale)
              .tickSize(-chartHeight)
              .tickPadding(5)
          )
          .call(g => {
            g.select(".domain").attr(
              "d",
              d3.line()([
                [-margin.left, 0],
                [chartWidth, 0]
              ])
            );
            g.selectAll("text")
              .attr("font-size", "16px")
              .attr("font-family", "Arial, sans-serif")
              .attr("font-weight", "bold");

            g.selectAll(".domain, .tick line").attr("stroke", "grey");
          });

        let xAxisHelperGroup = svg.select("#xAxisHelperGroup");

        if (xAxisHelperGroup.empty()) {
          xAxisHelperGroup = svg
            .append("g")
            .attr("id", "xAxisHelperGroup")
            .attr(
              "transform",
              "translate(" + margin.left + "," + margin.top / 4 + ")"
            );
        }

        xAxisHelperGroup
          .call(
            d3
              .axisBottom(xScale)
              .tickValues(xScaleHelper.domain())
              .tickFormat(d => xScaleHelper(d))
          )
          .call(g => {
            g.selectAll("text")
              .attr("font-size", "16px")
              .attr("font-family", "Arial, sans-serif")
              .attr("font-weight", "bold")
              .attr("text-anchor", "start")
              .attr("transform", "translate(10,-16)")
              .attr("paint-order", "stroke")
              .attr("stroke", "#fff")
              .attr("stroke-width", "10px")
              .attr("stroke-linecap", "round")
              .attr("stroke-linejoin", "round");

            g.selectAll(".domain, .tick line").attr("stroke", "#ddd");
          });

        let yAxisGroup = svg.select("#yAxisGroup");

        if (yAxisGroup.empty()) {
          yAxisGroup = svg
            .append("g")
            .attr("id", "yAxisGroup")
            .attr(
              "transform",
              "translate(" + margin.left + "," + margin.top + ")"
            );
        }

        yAxisGroup.call(d3.axisLeft(yScale).tickSize(-chartWidth)).call(g => {
          g.select(".domain").remove();
          g.selectAll("text")
            .attr("font-size", "16px")
            .attr("font-family", "Arial, sans-serif")
            .attr("font-weight", "bold")
            .attr("transform", `translate(${-margin.left},0)`)
            .attr("text-anchor", "start")
            .text(d => d + ` (${groups.get(d)})`);

          g.selectAll(".domain, .tick line").attr("stroke", "#ddd");
          g.selectAll(".tick text").call(self.wrap, margin.left);
        });

        let yAxisHelperGroup = svg.select("#yAxisHelperGroup");

        if (yAxisHelperGroup.empty()) {
          yAxisHelperGroup = svg
            .append("g")
            .attr("id", "yAxisHelperGroup")
            .attr(
              "transform",
              "translate(" +
                (chartWidth + margin.left) +
                "," +
                (margin.top + yScale.bandwidth() / 2) +
                ")"
            );
        }

        yAxisHelperGroup
          .attr(
            "transform",
            "translate(" +
              (chartWidth + margin.left) +
              "," +
              (margin.top + yScale.bandwidth() / 2) +
              ")"
          )
          .call(d3.axisRight(yScale).tickSize(-chartWidth - margin.left))
          .call(g => {
            g.selectAll("text").remove();
            g.select(".domain").remove();
            g.selectAll(".domain, .tick line").attr("stroke", "grey");
          });

        //beeswarm

        let chartContainer = svg.select("#chartContainer");

        if (chartContainer.empty()) {
          chartContainer = svg
            .append("g")
            .attr("id", "chartContainer")
            .attr(
              "transform",
              "translate(" + margin.left + "," + margin.top + ")"
            );
        }

        const circle = d3
          .arc()
          .innerRadius(0)
          .outerRadius(d => d.radius)
          .startAngle(0)
          .endAngle(d => {
            return d.angle * (Math.PI / 180);
          });

        let bees = chartContainer
          .selectAll(".bee")
          .data(this.filteredData, d => d.dataId);

        let beesEnter = bees
          .enter()
          .append("g")
          .attr("class", "bee")
          .on("click", function(d) {
            self.toggleAnnotation(d, this);
          });

        beesEnter.append("circle");
        beesEnter.append("path");

        bees.exit().each(exitItem => {
          let annIndex = self.annotations.findIndex(ann =>
            ann.annotations().find(n => n.data.dataId == exitItem.dataId)
          );
          if (annIndex >= 0) {
            self.annotations.splice(annIndex, 1);
            d3.select("#annotation-" + exitItem.dataId).remove();
          }
        });
        bees.exit().remove();

        bees = bees.merge(beesEnter);

        bees
          .select("path")
          .attr("d", d => {
            const degree = slaScale(d.Sla);
            return circle({
              radius: radius - 1,
              angle: this.showSLA ? degree : 360
            });
          })
          .transition()
          .attr("fill", function(d) {
            return self.colorScales[self.colorBy](d[self.colorBy]);
          });

        bees
          .select("circle")
          .attr("r", radius - 0.5)
          .attr("fill", "white")
          .attr("stroke", function(d) {
            return self.colorScales[self.colorBy](d[self.colorBy]);
          })
          .attr("stroke-width", 1);

        this.simulation.force("x").x(d => xScale(d["CVSS Score"]));

        this.simulation.force("y").y(d => {
          return yScale(d[this.groupBy]) + yScale.bandwidth() / 2;
        });

        this.simulation.force("collide").radius(radius + marginCircles);

        this.simulation.nodes(this.filteredData).on("tick", function(d) {
          bees.attr("transform", d => {
            return `translate(${d.x},${d.y})`;
          });

          self.annotations.forEach(ann => {
            ann.annotations().forEach(d => {
              d.x = d.data.x;
              d.y = d.data.y;
              //TODO: here update dx/dy to avoid note move out of screen
              if (d.data.x + d.dx > self.width - noteSize.width) {
                d.dx = self.width - d.data.x - 2 * noteSize.width;
              }
              if (d.data.x + d.dx < 0) {
                d.dx = 0;
              }
              if (d.data.y + d.dy > self.height - noteSize.height) {
                d.dy = self.height - d.data.y - 2 * noteSize.height;
              }
              if (d.data.y + d.dy < 0) {
                d.dy = 0;
              }
            });
          });
        });
        if (restartSimulation) {
          this.simulation.alpha(simulationAlpha).restart();
        }

        //legend color
        const legendColorCont = d3
          .select(this.$refs.legend)
          .select(".legendColor");

        const legendOrdinal = d3Legend
          .legendColor()
          .shapePadding(40)
          .orient("horizontal")
          .title(self.colorBy)
          .labelFormat(d3.format(".0f"))
          .scale(self.colorScales[self.colorBy]);

        if (legendColorCont.empty()) {
          d3.select(this.$refs.legend)
            .append("g")
            .attr("class", "legendColor");

          d3.select(this.$refs.legend)
            .select(".legendColor")
            .call(legendOrdinal);

          d3.select(this.$refs.legend)
            .select(".legendColor")
            .selectAll("text")
            .attr("font-family", "'Arial', sans-serif");
        } else {
          legendColorCont.call(legendOrdinal);
          legendColorCont
            .selectAll("text")
            .attr("font-family", "'Arial', sans-serif");
        }

        let legendSlaCont = d3.select(this.$refs.legend).select(".legendSla");

        if (legendSlaCont.empty()) {
          legendSlaCont = d3
            .select(this.$refs.legend)
            .append("g")
            .attr("class", "legendSla")
            .attr("transform", `translate(${280},0)`);

          legendSlaCont
            .append("text")
            .attr("fill", "#aaa")
            .attr("font-family", "Arial, sans-serif")
            .text("SLA breached");
        }

        legendSlaCont.attr("opacity", this.showSLA ? 1 : 0);

        const nodeLegend = legendSlaCont
          .selectAll("g")
          .data([false, true])
          .join("g")
          .attr("transform", (d, i) => {
            return `translate(${i * 40 + 7},0)`;
          });

        nodeLegend
          .selectAll("path")
          .data(d => [d])
          .join("path")
          .attr("fill", "grey")
          .attr("transform", "translate(0,25)")
          .attr("d", d =>
            circle({
              radius: 8,
              angle: slaScale(d)
            })
          );

        nodeLegend
          .selectAll("circle")
          .data(d => [d])
          .join("circle")
          .attr("fill", "none")
          .attr("stroke", "grey")
          .attr("transform", "translate(0,25)")
          .attr("r", 8);

        nodeLegend
          .selectAll("text")
          .data(d => [d])
          .join("text")
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .attr("transform", "translate(0,50)")
          .attr("font-family", "Arial, sans-serif")
          .text(d => d);

        //this.scaleToFit(minX, maxX, minY, maxY);
      }
    },
    scaleToFit(minX, maxX, minY, maxY) {
      const labelSize = 12;
      d3.select(this.$refs.mainChart).attr(
        "viewBox",
        `${minX} ${minY - labelSize} ${maxX - minX} ${maxY -
          minY +
          labelSize * 2}`
      );
    },
    wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
          words = text
            .text()
            .split(/\s+/)
            .reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text
            .text(null)
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", dy + "em");
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", `${++lineNumber * lineHeight + dy}em`)
              .text(word);
          }
        }
      });
    },
    toggleAnnotation(item, node) {
      let annIndex = this.annotations.findIndex(ann =>
        ann.annotations().find(n => n.data.dataId == item.dataId)
      );
      if (annIndex >= 0) {
        this.annotations.splice(annIndex, 1);
        d3.select(node.parentNode)
          .select("#annotation-" + item.dataId)
          .remove();
        d3.select(node)
          .selectAll("circle")
          .attr("stroke", d => {
            return this.colorScales[this.colorBy](d[this.colorBy]);
          });
      } else {
        let newAnn = {
          note: {
            title: item["Vulnerability"] || item["Code"],
            label: this.getAnnotationText(item),
            bgPadding: 20,
            orientation: "fixed"
          },
          //can use x, y directly instead of data
          data: item,
          className: "show-bg",
          dx: item.x > this.width / 2 ? -50 : 50,
          dy: item.y > this.height / 2 ? -100 : 100
        };

        const type = d3Annotation.annotationLabel;
        // Make a function for each note, otherwise user's positioning would be lost at each "update"
        let makeAnnotations = d3Annotation
          .annotation()
          .editMode(true)
          .notePadding(15)
          .textWrap(500)
          .type(type)
          .annotations([newAnn])
          .accessors({ x: d => d.x, y: d => d.y });

        const annotation = d3
          .select(node.parentNode)
          .append("g")
          .attr("class", "annotation-group")
          .attr("id", "annotation-" + item.dataId)
          .call(makeAnnotations);

        annotation.select(".annotation-note-title").on("click", d => {
          const baseUrl =
            "https://fastweb.service-now.com/nav_to.do?uri=%2Fsn_vul_vulnerable_item.do%3Fsys_id%3D";
          window.open(baseUrl + item["sys_id"]);
        });

        this.setAnnotationStyle(annotation);
        makeAnnotations.element = annotation;

        d3.select(node)
          .selectAll("circle")
          .attr("stroke", "black");

        this.annotations.push(makeAnnotations);
      }
    },
    updateAnnotationText() {
      let self = this;
      this.annotations.forEach(annotation => {
        annotation.annotations().forEach(d => {
          d.note.label = self.getAnnotationText(d.data);
        });
        annotation.updateText();
        this.setAnnotationStyle(annotation.element);
      });
    },
    setAnnotationStyle(annotation) {
      annotation
        .select(".annotation-note-bg")
        .attr("fill-opacity", 0.85)
        .attr("fill", "black")
        .attr("stroke", "white")
        .attr("rx", 10)
        .attr("ry", 10);

      annotation
        .selectAll("text")
        .attr("font-family", "Arial, sans-serif")
        .attr("fill", "white");

      annotation
        .select(".annotation-note-title")
        .style("cursor", "pointer")
        .style("text-decoration", "underline")
        .attr("transform", "translate(0,-5)");

      annotation
        .select(".annotation-note-label")
        .attr("transform", "translate(0,5)");

      annotation
        .selectAll(".handle")
        .attr("stroke-opacity", 0)
        .attr("fill-opacity", 0);

      // remove target handle
      annotation.selectAll(".annotation-subject .handle").remove();
    },
    getAnnotationText(item) {
      let note = `${item["Code"]}${
        item["Substate"] ? " | " + item["Substate"] : ""
      }`;

      if (this.showDescriptionNote) {
        note += " | " + item["Vulnerability description"];
      }
      return note;
    }
  },
  watch: {
    filteredData() {
      this.draw();
    },
    height() {
      this.draw();
    },
    groupBy() {
      this.draw();
    },
    colorBy() {
      this.draw(0.1, false);
    },
    sortBy() {
      this.draw();
    },
    dotSize() {
      this.draw(0.3);
    },
    showSLA() {
      this.draw(0.1, false);
    },
    showDescriptionNote() {
      this.updateAnnotationText();
    }
  }
};
</script>

<style lang="stylus">
svg
  g, path
    user-select: none
    outline: none !important
  .legendTitle
    fill: #aaa
.node-label
  pointer-events: none
.bee
  cursor:pointer
.bee:hover circle
  stroke:black
.annotation-note
  cursor: move
.handle
  pointer-events:none
</style>

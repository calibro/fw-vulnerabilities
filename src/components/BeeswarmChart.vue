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

      this.annotations = []
      
      this.initialized = true;
    },
    draw() {
      !this.initialized && this.init();

      let self = this;
      // let vHeight = this.height;
      // let vWidth = this.width;

      const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 300
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

        const groups = d3
          .nest()
          .key(d => d[this.groupBy])
          .entries(this.filteredData)
          .sort((a, b) => {
            if (self.sortBy == "count") {
              return a.values.length > b.values.length ? -1 : 1;
            } else {
              return a.key > b.key ? 1 : -1;
            }
          });

        // NOTE: very ugly fix - improve
        // this.filteredData.forEach(e => {
        //   (e.groupIndex = groups.findIndex(g => g.key == e[this.groupBy])),
        //     (e.x = e.x ? e.x : vWidth / 2),
        //     (e.y = e.y ? e.y : vHeight / 2);
        // });

        // define single beswarm plot height, depending on the number of bar charts
        // var w = +vWidth - margin.left - margin.right,
        //   h = (+vHeight - margin.bottom - margin.top) / groups.length;

        var xScale = d3.scaleLinear();

        let xMax = d3.max(groups, function(d) {
          return d3.max(d.values, function(e) {
            return e["CVSS Score"];
          });
        });
        let xMin = d3.min(groups, function(d) {
          return d3.min(d.values, function(e) {
            return e["CVSS Score"];
          });
        });
        // if (values.type() == 'Date') {
        //     xMin = new Date(xMin);
        //     xMax = new Date(xMax)
        // }

        let cvssRange = this.$store.state.data.filters['CVSS Score']
        //xScale.range([0, chartWidth]).domain([xMin, xMax]);
        // Use CVSS range based on filter values
        xScale.range([0, chartWidth]).domain(cvssRange);

        const yScale = d3
          .scaleBand()
          .rangeRound([0, chartHeight])
          .domain(groups.map(d => d.key));

        // Spatialization iterations
        var anticollisionIterations = 1;
        var marginCircles = 1;
        // Space between barcharts
        var padding = 10;
        var minRadius = 2;
        var maxRadius = 20;
        var radius = this.dotSize;

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

        xAxisGroup.call(d3.axisTop(xScale).tickSize(-chartHeight)).call(g => {
          g.select(".domain").attr(
            "d",
            d3.line()([
              [-margin.left, 0],
              [chartWidth, 0]
            ])
          );
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
            .attr("x", -margin.left)
            .attr("text-anchor", "start")
            .text(d => d + ` (${groups.find(g => g.key == d).values.length})`);
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
        //
        // const grid = chartContainer
        //   .selectAll("g.grid")
        //   .data(yScale.domain())
        //   .join("g")
        //   .attr("class", "grid")
        //   .selectAll("line")
        //   .data(d => [
        //     { key: d, pos: "top" },
        //     { key: d, pos: "bottom" }
        //   ])
        //   .join("line")
        //   .attr("x1", -margin.left)
        //   .attr("y1", d => yScale(d.key) + yScale.bandwidth())
        //   .attr("x2", chartWidth)
        //   .attr("y2", d => yScale(d.key) + yScale.bandwidth())
        //   .attr("stroke", "black");

        // let beeswarm = chartContainer
        //   .selectAll("g.beeswarm")
        //   .data(groups, d => d.key);
        //
        // let beeswarmEnter = beeswarm
        //   .enter()
        //   .append("g")
        //   .attr("class", "beeswarm")
        //   .attr("id", d =>
        //     d.key === "undefined" ? "swarm" : "swarm-" + d.key
        //   );

        // beeswarmEnter
        //   .append("g")
        //   .attr("id", "labels")
        //   .attr("class", "label")
        //   .style("font-size", "30px")
        //   .append("text")
        //   .attr("text-anchor", "start")
        //   .attr("alignment-baseline", "middle")
        //   .attr("fill", "#000")
        //   .text(function(d) {
        //     if (d.key) return d.key;
        //   });

        // beeswarmEnter
        //   .append("line")
        //   .attr("class", "group-bottom-line")
        //   .style("stroke", "#ccc");
        //
        // beeswarmEnter
        //   .append("line")
        //   .attr("class", "group-middle-line")
        //   .style("stroke", "#ccc");

        // beeswarm.exit().remove();
        // beeswarm = beeswarm.merge(beeswarmEnter);
        //
        // beeswarm.attr(
        //   "transform",
        //   (d, i) => "translate(" + margin.left + "," + yScale(d.key) + ")"
        // );

        // beeswarm
        //   .selectAll(".label text")
        //   .attr("x", margin.left)
        //   .attr("y", h / 2);
        //
        // beeswarm
        //   .selectAll(".group-bottom-line")
        //   .attr("x1", margin.left)
        //   .attr("y1", h)
        //   .attr("x2", w - margin.right)
        //   .attr("y2", h);
        //
        // beeswarm
        //   .selectAll(".group-middle-line")
        //   .attr("x1", xScale(xMin) - margin.right)
        //   .attr("y1", h / 2)
        //   .attr("x2", xScale(xMax) - margin.right)
        //   .attr("y2", h / 2);

        /*let data = []
        groups.forEach((g, gIndex) => {
          data = data.concat(g.values.map(e => {
            return {
              ...e,
              groupIndex: gIndex
            }
          }))
        })*/

        //.stop()
        //for (var i = 0; i < 240; ++i) simulation.tick();

        let bees = chartContainer
          .selectAll(".bee")
          .data(this.filteredData, d => d.dataId);

        let beesEnter = bees
          .enter()
          .append("circle")
          .attr("class", "bee")
          .on("click", function(d) {
            self.toggleAnnotation(d, this);
          });

        bees.exit().each((exitItem) => {
          let annIndex = self.annotations.findIndex(ann => ann.annotations().find(n => n.data.dataId == exitItem.dataId))
          if(annIndex >= 0) {
            self.annotations.splice(annIndex, 1)
            d3.select("#annotation-" + exitItem.dataId).remove()
          }
        })
        bees.exit().remove();


        bees = bees.merge(beesEnter);

        bees.attr("r", radius).attr("fill", function(d) {
          return self.colorScales[self.colorBy](d[self.colorBy]);
        });

        this.simulation.force("x").x(d => xScale(d["CVSS Score"]));

        this.simulation.force("y").y(d => {
          return yScale(d[this.groupBy]) + yScale.bandwidth() / 2;
        });

        this.simulation.force("collide").radius(radius + marginCircles);

        this.simulation
          .nodes(this.filteredData)
          .on("tick", function(d) {
            bees
              .attr("cx", function(d) {
                return d.x;
              })
              .attr("cy", function(d) {
                return d.y;
              });
            self.annotations
              .forEach((ann) => {
                ann.annotations().forEach(d => {
                  d.x = d.data.x
                  d.y = d.data.y
                  //TODO: here update dx/dy to avoid note move out of screen
                })
              })
          })
          .alpha(1)
          .restart();

        // Alternative to simulation ticks (stop simulation, run ticks, then update bees position)
        /*
          .transition()
          .duration(1000)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
        */

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
    toggleAnnotation(item, node) {
      let annIndex = this.annotations.findIndex(ann => ann.annotations().find(n => n.data.dataId == item.dataId))
      if (annIndex >= 0) {
        this.annotations.splice(annIndex, 1)
        d3.select(node.parentNode).select("#annotation-" + item.dataId).remove()
      } else {
        let newAnn = {
          note: {
            title: item["Vulnerability"] || item["Code"],
            label: item["CVSS Score"],
            bgPadding: { top: 15, left: 10, right: 10, bottom: 10 }
          },
          //can use x, y directly instead of data
          data: item,
          className: "show-bg",
          dx: item.x > this.width / 2 ? -50 : 50,
          dy: item.y > this.height / 2 ? -100 : 100
        }

        const type = d3Annotation.annotationCallout;
        // Make a function for each note, otherwise user's positioning would be lost at each "update"
        let makeAnnotations = d3Annotation
          .annotation()
          .editMode(true)
          .notePadding(15)
          .type(type)
          .annotations([newAnn])
          .accessors({ x: d => d.x, y: d => d.y });


        d3.select(node.parentNode).append("g")
        .attr("class", "annotation-group")
        .attr("id", "annotation-" + item.dataId)
        .call(makeAnnotations)

        this.annotations.push(makeAnnotations)

        // Remove draggable handle on the note target
        let annHanldes = d3.selectAll("g.annotation").select("circle.handle");
        annHanldes.remove();
      }
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
      this.draw();
    },
    sortBy() {
      this.draw();
    },
    dotSize() {
      this.draw();
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
</style>

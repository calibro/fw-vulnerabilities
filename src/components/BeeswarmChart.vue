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
    draw() {
      !this.initialized && this.init();

      let self = this;
      // let vHeight = this.height;
      // let vWidth = this.width;

      const margin = {
        top: 40,
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

        const rollup = d3array.rollup(
          this.filteredData,
          v => v.length,
          d => d[this.groupBy]
        );

        const groups = new Map(
          [...rollup].sort((a, b) => {
            if (self.sortBy === "count") {
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

        // const xScaleHelper = d3
        //   .scaleOrdinal()
        //   .range([xScale(2), xScale(5.5), xScale(8.5)])
        //   .domain(["low", "medium", "high"]);

        const xScaleHelper = d3
          .scaleThreshold()
          .domain([0, 4, 7, 10])
          .range(["", "low", "medium", "high", ""]);

        const yScale = d3
          .scaleBand()
          .rangeRound([0, chartHeight])
          .domain([...groups.keys()]);

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

            g.selectAll(".domain, .tick line").attr("stroke", "#000");
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
            .attr("x", -margin.left)
            .attr("text-anchor", "start")
            .text(d => d + ` (${groups.get(d)})`);

          g.selectAll(".domain, .tick line").attr("stroke", "#ddd");
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
            g.selectAll(".domain, .tick line").attr("stroke", "#000");
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
            self.annotations.forEach(ann => {
              ann.annotations().forEach(d => {
                d.x = d.data.x;
                d.y = d.data.y;
                //TODO: here update dx/dy to avoid note move out of screen
              });
            });
          })
          .alpha(1)
          .restart();

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
      let annIndex = this.annotations.findIndex(ann =>
        ann.annotations().find(n => n.data.dataId == item.dataId)
      );
      if (annIndex >= 0) {
        this.annotations.splice(annIndex, 1);
        d3.select(node.parentNode)
          .select("#annotation-" + item.dataId)
          .remove();
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
        };

        const type = d3Annotation.annotationCallout;
        // Make a function for each note, otherwise user's positioning would be lost at each "update"
        let makeAnnotations = d3Annotation
          .annotation()
          .editMode(true)
          .notePadding(15)
          .type(type)
          .annotations([newAnn])
          .accessors({ x: d => d.x, y: d => d.y });

        d3.select(node.parentNode)
          .append("g")
          .attr("class", "annotation-group")
          .attr("id", "annotation-" + item.dataId)
          .call(makeAnnotations);

        this.annotations.push(makeAnnotations);

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

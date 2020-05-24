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
import * as d3 from "d3";
import d3Annotation from "d3-svg-annotation";

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
      csvData: state => state.data.csvData
    }),
    ...mapGetters({
      filteredData: "data/filteredData",
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
        .domain(new Set(csvData.map(e => e["Priority"])))
        .range(["#D4003D", "#EAEA6A", "#00E4A2"]);

      let ageScale = d3
        .scaleOrdinal()
        .domain(new Set(csvData.map(e => e["Age"])))
        .range(["rgb(221,221,221)", "rgb(253, 137, 60)", "rgb(128, 0, 38)"]);

      let esposizioneScale = d3
        .scaleOrdinal()
        .domain(new Set(csvData.map(e => e["Fattore di Esposizione"])))
        .range(["rgb(221,221,221)", "rgb(253, 137, 60)", "rgb(128, 0, 38)"]);


      this.colorScales = {
        "Priority": priorityScale,
        "Age": ageScale,
        "Fattore di Esposizione": esposizioneScale
      };

      /*this.legendLabels = {
        lastmonth: "last month volume",
        lastday: "last day volume",
        email_score_name: "reputation",
        blacklists_count: "blacklist count"
      };*/

      this.initialized = true;
    },
    draw() {
      !this.initialized && this.init();

      let self = this;
      let vHeight = this.height;
      let vWidth = this.width;

      const svg = d3
        .select(this.$refs.mainChart)
        .attr("width", vWidth)
        .attr("height", vHeight);

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
        
        //TODO implement transitions
        svg.selectAll("*").remove();
        
        // Define margins
        var margin = {
            top: 5,
            right: 25,
            bottom: 0,
            left: 25
        };

        //define title space
        var titleSpace = 30;
  
        var groups = d3.nest()
            .key(d => d[this.groupBy])
            .entries(this.filteredData)

        // define single beswarm plot height, depending on the number of bar charts
        var w = +vWidth - margin.left - margin.right,
            h = (+vHeight - margin.bottom - margin.top - ((titleSpace) * (groups.length - 1))) / groups.length;

        var xScale = d3.scaleLinear()

        let xMax = d3.max(groups, function(d) {
            return d3.max(d.values, function(e) {
                return e['CVSS Score'];
            })
        })
        let xMin = d3.min(groups, function(d) {
            return d3.min(d.values, function(e) {
                return e['CVSS Score'];
            })
        })
        // if (values.type() == 'Date') {
        //     xMin = new Date(xMin);
        //     xMax = new Date(xMax)
        // }

        xScale.range([10, w - 10])
            .domain([xMin, xMax]);

        // Spatialization iterations
        var anticollisionIterations = 1
        var marginCircles = 0.5
        // Space between barcharts
        var padding = 10
        var minRadius = 2
        var maxRadius = 20
        var radius = 5

        groups.forEach((item, index) => {

        let beeswarm = svg.append("g")
            .attr('id', item.key === "undefined" ? "swarm" : "swarm-" + item.key)
            .attr("transform", "translate(" + margin.left + "," + index * (h + titleSpace) + ")");

        // Draw title
        beeswarm.append("text")
            .attr("x", -margin.left)
            .attr("y", titleSpace - 7)
            .style("font-size", "10px")
            .style("font-family", "Arial, Helvetica")
            .text(item.key);

        let data = item.values;

        var simulation = d3.forceSimulation(data)
            .force("x",
                d3.forceX(function(d) {
                    return xScale(d['CVSS Score'])
                })
                .strength(1)
            )
            .force("y", d3.forceY(h / 2))
            .force("collide", d3.forceCollide(function(d) {
                //return radius(d.radius) + marginCircles()
                return radius + marginCircles
            }).iterations(anticollisionIterations))
            .stop()

        for (var i = 0; i < 240; ++i) simulation.tick();

        let bees = beeswarm.append('g')
            .attr('id', 'circles')
            .attr('class', 'bees')
            .selectAll("circle")
            .data(data).enter()
            .append('circle')
            .attr('id', function(d) {
                return d['Code']
            })
            .attr('r', function(d) {
                //return radius(d.radius)
                return radius
            })
            .attr('cx', function(d) {
                return d.x
            })
            .attr('cy', function(d) {
                return d.y
            })
            .attr("fill", function(d) {
              return self.colorScales[self.colorBy](d[self.colorBy])
            })
            .on("click", function(d) {
              self.addAnnotation(d, this)
            })

        let labels = beeswarm.append('g')
            .attr('id', 'labels')
            .attr('class', 'label')
            .selectAll("text")
            .data(data).enter()
            .append('text')
            .attr('x', function(d) {
                return d.x
            })
            .attr('y', function(d) {
                return d.y
            })
            .attr('text-anchor', 'middle')
            .attr('fill', '#000')
            .text(function(d) {
                if (d.label) return d.label;
            })
        })

        // After all the charts, draw x axis
        svg.append("g")
            .attr('id', '"x-axis')
            .attr("class", "x axis")
            .style("font-size", "10px")
            .style("font-family", "Arial, Helvetica")
            .attr("transform", "translate(" + margin.left + "," + (0) + ")")
            .call(d3.axisBottom(xScale));

        // Set styles
        d3.selectAll(".axis line, .axis path")
            .style("shape-rendering", "crispEdges")
            .style("fill", "none")
            .style("stroke", "#ccc");

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
    addAnnotation(item, node) {

      const type = d3Annotation.annotationCallout

      const annotations = [{
        note: {
          title: item['Vulnerability'] || item['Code'],
          label: item['Vulnerability description:'] || item['Code'],
          bgPadding: {"top":15,"left":10,"right":10,"bottom":10}
        },
        //can use x, y directly instead of data
        data: item,
        className: "show-bg",
        y: item.y,
        x: item.x,
        dx: 100,
        dy: 100
      }]

      const makeAnnotations = d3Annotation.annotation()
        // TODO Make only one handle of annotation in "edit mode"
        .editMode(true)
        .notePadding(15)
        .type(type)
        .annotations(annotations)

      d3.select(node.parentNode)
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations)
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

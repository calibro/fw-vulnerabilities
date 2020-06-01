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
      sortBy: state => state.sortBy,
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
        //svg.selectAll("*").remove();
        
        // Define margins
        var margin = {
            top: 25,
            right: 25,
            bottom: 0,
            left: 25
        };
        var groupLabelWidth = 300
  
        var groups = d3.nest()
            .key(d => d[this.groupBy])
            .entries(this.filteredData)
            .sort((a, b) => {
              if (self.sortBy == 'count'){
                return a.values.length > b.values.length ? -1 : 1
              } else {
                return a.key > b.key ? 1 : -1
              }
            })

        // define single beswarm plot height, depending on the number of bar charts
        var w = +vWidth - margin.left - margin.right,
            h = (+vHeight - margin.bottom - margin.top) / groups.length;

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

        xScale.range([groupLabelWidth , w])
            .domain([xMin, xMax]);

        // Spatialization iterations
        var anticollisionIterations = 1
        var marginCircles = 0.5
        // Space between barcharts
        var padding = 10
        var minRadius = 2
        var maxRadius = 20
        var radius = 4

        let beeswarm = svg
              .selectAll("g.beeswarm")
              .data(groups, d => d.key)

        let beeswarmEnter = beeswarm.enter()
              .append('g')
              .attr('class', 'beeswarm')
              .attr('id', (d) => d.key === "undefined" ? "swarm" : "swarm-" + d.key)

        beeswarmEnter.append('g')
              .attr('id', 'labels')
              .attr('class', 'label')
              .style("font-size", "30px")
              .append('text')
              .attr('text-anchor', 'start')
              .attr('alignment-baseline', 'middle')
              .attr('fill', '#000')
              .text(function(d) {
                if (d.key) return d.key;
              })

        beeswarmEnter
            .append("line")
            .attr("class", "group-bottom-line")
            .style("stroke", "#ccc")

        beeswarmEnter
            .append("line")
            .attr("class", "group-middle-line")
            .style("stroke", "#ccc")

        beeswarm.exit().remove()
        beeswarm = beeswarm.merge(beeswarmEnter)

        beeswarm
          .attr("transform", (d, i) => "translate(" + margin.left  + "," + (margin.top + i * h) + ")");

        beeswarm.selectAll('.label text')
            .attr('x', margin.left)
            .attr('y', h/2)

        beeswarm.selectAll('.group-bottom-line')
            .attr("x1", margin.left)
            .attr("y1", h)
            .attr("x2", w - margin.right)
            .attr("y2", h)

        beeswarm.selectAll('.group-middle-line')
            .attr("x1", xScale(xMin) - margin.right)
            .attr("y1", h/2)
            .attr("x2", xScale(xMax) - margin.right)
            .attr("y2", h/2);

        let data = []
        groups.forEach((g, gIndex) => {
          data = data.concat(g.values.map(e => {
            return {
              ...e,
              groupIndex: gIndex,
              x: vWidth/2,
              y: vHeight/2
            }
          }))
        })
        
        this.simulation = d3.forceSimulation(data)
            .force("x",
                d3.forceX(function(d) {
                    return xScale(d['CVSS Score'])
                })
                .strength(1)
            )
            .force("y", d3.forceY(function(d) {
                    return (h * d.groupIndex) + margin.top + h/2
                }))
            .force("collide", d3.forceCollide(function(d) {
                //return radius(d.radius) + marginCircles()
                return radius + marginCircles
            }).iterations(anticollisionIterations)
            )
    
        //.stop()

        //for (var i = 0; i < 240; ++i) simulation.tick();

        let bees = svg
              .selectAll(".bee")
              .data(data, d => d.dataId)

        let beesEnter = bees.enter()
            .append('circle')
            .attr('class', 'bee')
            .attr('r', radius)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .on("click", function(d) {
              self.addAnnotation(d, this)
            })

        bees.exit().remove();

        bees = bees.merge(beesEnter);

        this.simulation
        .nodes(data)
        .on("tick", function(d){
              bees
                  .attr("cx", function(d){ return d.x; })
                  .attr("cy", function(d){ return d.y; })
            })
        .alpha(1).restart()
        //

        // Alternative to simulation ticks (stop simulation, run ticks, then update bees position)
        bees
          .attr("fill", function(d) {
              return self.colorScales[self.colorBy](d[self.colorBy])
            })
        /*
          .transition()
          .duration(1000)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
        */

        // After all the charts, draw x axis
        svg.selectAll("g.axis").remove()

        svg.append("g")
            .attr('id', '"x-axis')
            .attr("class", "x axis")
            .style("font-size", "18px")
            .style("font-family", "Arial, Helvetica")
            .attr("transform", "translate(" + (0) + "," + ( margin.top ) + ")")
            .call(
              d3.axisTop(xScale)
              .tickSize(-vHeight)
              );

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
      //TODO: Update annotation with nodes
      const type = d3Annotation.annotationCallout

      const annotations = [{
        note: {
          title: item['Vulnerability'] || item['Code'],
          label: item['CVSS Score'],
          bgPadding: {"top":15,"left":10,"right":10,"bottom":10}
        },
        //can use x, y directly instead of data
        data: item,
        className: "show-bg",
        dx: (item.x > this.width / 2) ? -50 : 50,
        dy: 100
      }]

      let makeAnnotations = d3Annotation.annotation()
        .editMode(true)
        .notePadding(15)
        .type(type)
        .annotations(annotations)
        .accessors({ x: d => d.x , y: d => d.y})

      d3.select(node.parentNode)
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations)

      // Remove draggable handle on the note target
      let annHanldes = d3.selectAll('g.annotation')
      .select("circle.handle")
      annHanldes.remove();


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

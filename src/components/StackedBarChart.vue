<template>
  <div>
    <svg id="chart" width="650" height="420"></svg>

    Select year:
    <select id="year"></select>
  </div>
</template>


<script>
import * as d3 from "d3";

export default {
  name: "StackedBarChart",

  data() {
    return {};
  },

  async mounted() {
    const csv = await d3.csv("data.csv");

    var keys = csv.columns.slice(2);

    var year = [...new Set(csv.map((d) => d.Year))];
    var states = [...new Set(csv.map((d) => d.State))];

    var options = d3
      .select("#year")
      .selectAll("option")
      .data(year)
      .enter()
      .append("option")
      .text((d) => d);

    var svg = d3
        .select("#chart")
        .attr("width", 650)
        .attr("height", 420),
      margin = { top: 35, left: 35, bottom: 0, right: 15 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var y = d3
      .scaleBand()
      .range([margin.top, height - margin.bottom])
      .padding(0.1)
      .paddingOuter(0.2)
      .paddingInner(0.2);

    var x = d3.scaleLinear().range([margin.left, width - margin.right]);

    var yAxis = svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis");

    var xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${margin.top})`)
      .attr("class", "x-axis");

    var z = d3
      .scaleOrdinal()
      .range(["steelblue", "darkorange", "lightblue"])
      .domain(keys);

    function update(input, speed) {
      var data = csv.filter((f) => f.Year == input);

      data.forEach(function (d) {
        d.total = d3.sum(keys, (k) => +d[k]);
        return d;
      });

      x.domain([0, d3.max(data, (d) => d.total)]).nice();

      svg
        .selectAll(".x-axis")
        .transition()
        .duration(speed)
        .call(d3.axisTop(x).ticks(null, "s"));

      y.domain(data.map((d) => d.State));

      svg
        .selectAll(".y-axis")
        .transition()
        .duration(speed)
        .call(d3.axisLeft(y).tickSizeOuter(0));

      var group = svg
        .selectAll("g.layer")
        .data(d3.stack().keys(keys)(data), (d) => d.key);

      group.exit().remove();

      group
        .enter()
        .insert("g", ".y-axis")
        .append("g")
        .classed("layer", true)
        .attr("fill", (d) => z(d.key));

      var bars = svg
        .selectAll("g.layer")
        .selectAll("rect")
        .data(
          (d) => d,
          (e) => e.data.State
        );

      bars.exit().remove();

      bars
        .enter()
        .append("rect")
        .attr("height", y.bandwidth())
        .merge(bars)
        .transition()
        .duration(speed)
        .attr("y", (d) => y(d.data.State))
        .attr("x", (d) => x(d[0]))
        .attr("width", (d) => x(d[1]) - x(d[0]));

      var text = svg.selectAll(".text").data(data, (d) => d.State);

      text.exit().remove();

      text
        .enter()
        .append("text")
        .attr("class", "text")
        .attr("text-anchor", "start")
        .style("font-size", "16px")
        .merge(text)
        .transition()
        .duration(speed)
        .attr("y", (d) => y(d.State) + y.bandwidth() / 2)
        .attr("x", (d) => x(d.total) + 5)
        .text((d) => d.total);
    }

    update(d3.select("#year").property("value"), 0);

    var select = d3.select("#year").on("change", function () {
      update(this.value, 750);
    });

    var checkbox = d3.select("#sort").on("click", function () {
      update(select.property("value"), 750);
    });
  },
};
</script>
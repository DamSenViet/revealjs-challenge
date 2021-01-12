<template>
  <svg></svg>
</template>


<script>
import * as d3 from "d3";

export default {
  name: "GDPChart",

  data() {
    return {};
  },

  mounted() {
    const gdp = [
      { country: "USA", value: 20.5 },
      { country: "China", value: 13.4 },
      { country: "Germany", value: 4.0 },
      { country: "Japan", value: 4.9 },
      { country: "France", value: 2.8 },
    ];

    const svg = d3
      .select(this.$el)
      .attr("viewBox", `0 0 300 300`)

    const sortedGDP = gdp.slice().sort((a, b) => (a.value > b.value ? 1 : -1));
    const color = d3.scaleOrdinal(d3.schemeDark2);
    const max_gdp = d3.max(sortedGDP, (o) => o.value);

    const angleScale = d3
      .scaleLinear()
      .domain([0, max_gdp])
      .range([0, 1.5 * Math.PI]);

    const arc = d3
      .arc()
      .innerRadius((d, i) => (i + 1) * 25)
      .outerRadius((d, i) => (i + 2) * 25)
      .startAngle(angleScale(0))
      .endAngle((d) => angleScale(d.value));

    const g = svg.append("g");
    g.selectAll("path")
      .data(sortedGDP)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "#FFF")
      .attr("stroke-width", "1px")
      .on("mouseenter", function () {
        d3.select(this).transition().duration(200).attr("opacity", 0.5);
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("opacity", 1);
      });

    g.selectAll("text")
      .data(gdp)
      .enter()
      .append("text")
      .text((d) => `${d.country} -  ${d.value} Trillion`)
      .style("font-size", "16px")
      .attr("x", -150)
      .attr("dy", -8)
      .attr("y", (d, i) => -(i + 1) * 25);

    g.attr("transform", "translate(150,150)");
  },
};
</script>


<style lang="scss" scoped>

text {
  font-size: 10px;
}

</style>
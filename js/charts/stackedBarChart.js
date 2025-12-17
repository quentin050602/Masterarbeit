// js/charts/stackedBarChart.js
// Forschungsfrage 1: Eignung der Items (Stacked Bar Chart)
// Erwartet: itemEignungData (Array), basisdimensionen (Array)
// Nutzt globales d3 (wird in index.html geladen).

export function initEignungChart({ itemEignungData, basisdimensionen }) {
  const svg = d3.select("#svg-eignung-items");
  const tooltip = d3.select("#tooltip");

  const margin = { top: 50, right: 50, bottom: 80, left: 70 };
  const width = 1000 - margin.left - margin.right;
  const height = 420 - margin.top - margin.bottom;

  svg.attr(
    "viewBox",
    `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`
  );

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Einheitlicher Rahmen (Plot-Frame)
  g.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("stroke", "#cfd6e4")
    .attr("stroke-width", 1);

  const xScale = d3.scaleBand()
    .padding(0.25)
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(["suitable", "partlySuitable", "notSuitable"])
    .range(["#2e7d32", "#ffb300", "#c62828"]);

  const xAxisGroup = g.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`);

  const yAxisGroup = g.append("g")
    .attr("class", "axis y-axis");

  g.append("text")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("font-size", "0.9rem")
    .text("Anzahl Indikatoren");

  g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("font-size", "0.9rem")
    .text("Items");

  const chartTitle = g.append("text")
    .attr("x", width / 2)
    .attr("y", -15)
    .attr("text-anchor", "middle")
    .attr("fill", "#222")
    .attr("font-size", "1rem")
    .attr("font-weight", "600");

// Legende (zentriert, horizontal)
const legendData = [
  { key: "suitable", label: "geeignet" },
  { key: "partlySuitable", label: "bedingt geeignet" },
  { key: "notSuitable", label: "nicht geeignet" }
];

const legend = g.append("g")
  .attr("class", "legend");

const legendGroups = legend.selectAll("g")
  .data(legendData)
  .enter()
  .append("g")
    .attr("transform", (d, i) => `translate(${i * 165}, 0)`);

legendGroups.append("rect")
  .attr("width", 12)
  .attr("height", 12)
  .attr("y", -10)
  .attr("rx", 3)
  .attr("fill", d => colorScale(d.key));

legendGroups.append("text")
  .attr("x", 18)
  .attr("y", 0)
  .attr("dominant-baseline", "middle")
  .attr("fill", "#2a2f3a")
  .text(d => d.label);

// nach dem Render zentrieren (liegt im oberen Margin-Bereich)
const legendBox = legend.node().getBBox();
legend.attr("transform", `translate(${(width - legendBox.width) / 2}, -40)`);

  const dimSelect = document.getElementById("dim-select-eignung");
  basisdimensionen.forEach(dim => {
    const opt = document.createElement("option");
    opt.value = dim;
    opt.textContent = dim;
    dimSelect.appendChild(opt);
  });

  dimSelect.addEventListener("change", () => {
    updateChart(dimSelect.value);
  });

  const stack = d3.stack()
    .keys(["suitable", "partlySuitable", "notSuitable"]);

  function updateChart(selectedDimension) {
    const dimData = itemEignungData.filter(d => d.basisdimension === selectedDimension);

    const stackedInput = dimData.map(d => ({
      itemCode: d.itemCode,
      itemLabel: d.itemLabel,
      suitable: d.suitable,
      partlySuitable: d.partlySuitable,
      notSuitable: d.notSuitable,
      totalIndicators: d.totalIndicators
    }));

    const series = stack(stackedInput);

    xScale.domain(dimData.map(d => d.itemCode));

    const maxIndicators = d3.max(dimData, d => d.totalIndicators);
    yScale.domain([0, maxIndicators]).nice();

    xAxisGroup.call(d3.axisBottom(xScale));
    xAxisGroup.selectAll("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(0, 5)");

    yAxisGroup.call(d3.axisLeft(yScale).ticks(maxIndicators <= 5 ? maxIndicators : 5));

    chartTitle.text(selectedDimension);

    const groups = g.selectAll(".stack-group")
      .data(series, d => d.key);

    const groupsEnter = groups.enter()
      .append("g")
      .attr("class", "stack-group")
      .attr("fill", d => colorScale(d.key));

    groupsEnter.merge(groups)
      .selectAll("rect")
      .data(d => d, d => d.data.itemCode + "-" + d[0])
      .join(
        enter => enter.append("rect")
          .attr("x", d => xScale(d.data.itemCode))
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("width", xScale.bandwidth())
          .on("mouseover", (event, d) => {
            const stackKey = event.currentTarget.parentNode.__data__.key;
            const labelMap = {
              suitable: "geeignet",
              partlySuitable: "bedingt geeignet",
              notSuitable: "nicht geeignet"
            };
            tooltip
              .style("opacity", 1)
              .html(
                `<strong>${d.data.itemCode} – ${d.data.itemLabel}</strong><br>` +
                `Kategorie: <strong>${labelMap[stackKey]}</strong><br>` +
                `Anzahl Indikatoren: <strong>${d[1] - d[0]}</strong><br>` +
                `Gesamtindikatoren des Items: <strong>${d.data.totalIndicators}</strong>`
              )
              .style("left", (event.pageX + 12) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on("mousemove", (event) => {
            tooltip
              .style("left", (event.pageX + 12) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", () => {
            tooltip.style("opacity", 0);
          }),
        update => update
          .transition()
          .duration(400)
          .attr("x", d => xScale(d.data.itemCode))
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("width", xScale.bandwidth()),
        exit => exit.remove()
      );

    groups.exit().remove();
  }

  updateChart(basisdimensionen[0]);
}

// --------------------------------------------------------
// 2) Forschungsfrage 2 – Vergleich Mensch vs. KI (Punkteplot)
// --------------------------------------------------------

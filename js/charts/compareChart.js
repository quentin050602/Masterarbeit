// js/charts/compareChart.js
// Forschungsfrage 2: Vergleich Mensch vs. KI auf Itemebene (Bar Chart)
// Erwartet: itemCompareData (Array), basisdimensionen (Array)
// Nutzt globales d3 (wird in index.html geladen).

export function initCompareChart({ itemCompareData, basisdimensionen }) {
  const svg = d3.select("#svg-compare");
  const tooltip = d3.select("#tooltip");

  const margin = { top: 50, right: 40, bottom: 80, left: 70 };
  const width = 1200 - margin.left - margin.right;
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


  const xScale = d3.scalePoint()
    .range([0, width])
    .padding(0.6);

  const yScale = d3.scaleLinear()
    .domain([1, 4])
    .nice()
    .range([height, 0]);

  const colorScale = d3.scaleOrdinal()
    .domain(["human", "ki"])
    .range(["#2271b3", "#ff9800"]);

  const xAxisGroup = g.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`);

  const yAxisGroup = g.append("g")
    .attr("class", "axis y-axis");

  yAxisGroup.call(d3.axisLeft(yScale).ticks(4));

  g.append("text")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("font-size", "0.9rem")
    .text("Mittelwert (Likert 1–4)");

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
  { key: "human", label: "Mensch" },
  { key: "ki", label: "KI" }
];

const legend = g.append("g")
  .attr("class", "legend");

const lgGroups = legend.selectAll("g")
  .data(legendData)
  .enter()
  .append("g")
    .attr("transform", (d, i) => `translate(${i * 120}, 0)`);

lgGroups.append("rect")
  .attr("width", 12)
  .attr("height", 12)
  .attr("y", -10)
  .attr("rx", 3)
  .attr("fill", d => colorScale(d.key));

lgGroups.append("text")
  .attr("x", 18)
  .attr("y", 0)
  .attr("dominant-baseline", "middle")
  .attr("fill", "#2a2f3a")
  .text(d => d.label);

const legendBox = legend.node().getBBox();
legend.attr("transform", `translate(${(width - legendBox.width) / 2}, -40)`);

const dotsHumanGroup = g.append("g").attr("class", "dots-human");
  const dotsKiGroup = g.append("g").attr("class", "dots-ki");

  const dimSelect = document.getElementById("dim-select-compare");
  let currentDimension = basisdimensionen[0];

  basisdimensionen.forEach(dim => {
    const opt = document.createElement("option");
    opt.value = dim;
    opt.textContent = dim;
    dimSelect.appendChild(opt);
  });

  dimSelect.addEventListener("change", () => {
    updateChart(dimSelect.value);
  });

  document.getElementById("toggle-human").addEventListener("change", applyVisibility);
  document.getElementById("toggle-ki").addEventListener("change", applyVisibility);

  const filterSuitableCheckbox = document.getElementById("filter-suitable");
  filterSuitableCheckbox.addEventListener("change", () => {
    updateChart(currentDimension);
  });

  function updateChart(selectedDimension) {
    currentDimension = selectedDimension;

    let dimData = itemCompareData.filter(d => d.basisdimension === selectedDimension);

    const filterSuitable = filterSuitableCheckbox.checked;
    if (filterSuitable) {
      const suitableItems = itemEignungData
        .filter(d =>
          d.basisdimension === selectedDimension &&
          d.notSuitable === 0
        )
        .map(d => d.itemCode);

      dimData = dimData.filter(d => suitableItems.includes(d.itemCode));
    }

    xScale.domain(dimData.map(d => d.itemCode));

    xAxisGroup.call(d3.axisBottom(xScale));
    xAxisGroup.selectAll("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(0, 5)");

    if (dimData.length === 0) {
      chartTitle.text(selectedDimension + " – keine Items für die aktuelle Filtereinstellung");
      dotsHumanGroup.selectAll("circle").remove();
      dotsKiGroup.selectAll("circle").remove();
      return;
    } else {
      chartTitle.text(selectedDimension);
    }

    const humanDots = dotsHumanGroup.selectAll("circle")
      .data(dimData, d => d.itemCode);

    humanDots.enter()
      .append("circle")
        .attr("class", "dot dot-human")
        .attr("r", 6)
        .attr("fill", colorScale("human"))
        .attr("cx", d => xScale(d.itemCode) - 10)
        .attr("cy", d => yScale(d.meanHuman))
        .on("mouseover", (event, d) => showTooltip(event, d, "human"))
        .on("mousemove", (event, d) => moveTooltip(event))
        .on("mouseout", hideTooltip)
      .merge(humanDots)
        .transition()
        .duration(400)
        .attr("cx", d => xScale(d.itemCode) - 10)
        .attr("cy", d => yScale(d.meanHuman));

    humanDots.exit().remove();

    const kiDots = dotsKiGroup.selectAll("circle")
      .data(dimData, d => d.itemCode);

    kiDots.enter()
      .append("circle")
        .attr("class", "dot dot-ki")
        .attr("r", 6)
        .attr("fill", colorScale("ki"))
        .attr("cx", d => xScale(d.itemCode) + 10)
        .attr("cy", d => yScale(d.meanKI))
        .on("mouseover", (event, d) => showTooltip(event, d, "ki"))
        .on("mousemove", (event, d) => moveTooltip(event))
        .on("mouseout", hideTooltip)
      .merge(kiDots)
        .transition()
        .duration(400)
        .attr("cx", d => xScale(d.itemCode) + 10)
        .attr("cy", d => yScale(d.meanKI));

    kiDots.exit().remove();

    applyVisibility();
  }

  function showTooltip(event, d, type) {
    const tooltip = d3.select("#tooltip");
    const human = d.meanHuman.toFixed(2);
    const ki = d.meanKI.toFixed(2);
    const diff = (d.meanKI - d.meanHuman).toFixed(2);
    const corr = d.correlation !== null ? d.correlation.toFixed(2) : "n. a.";
    const title = type === "human" ? "Menschliches Rating" : "KI Rating";

    tooltip
      .style("opacity", 1)
      .html(
        `<strong>${title}</strong><br>` +
        `<strong>Basisdimension:</strong> ${d.basisdimension}<br>` +
        `<strong>Item:</strong> ${d.itemCode} – ${d.itemLabel}<br>` +
        `<strong>Mensch:</strong> ${human}<br>` +
        `<strong>KI:</strong> ${ki}<br>` +
        `<strong>Δ (KI − Mensch):</strong> ${diff}<br>` +
        `<strong>n Paare:</strong> ${d.nPairs}<br>` +
        `<strong>Mittlere Abweichung:</strong> ${d.meanAbsDiff.toFixed(2)}<br>` +
        `<strong>r (Mensch–KI):</strong> ${corr}`
      )
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  }

  function moveTooltip(event) {
    d3.select("#tooltip")
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  }

  function hideTooltip() {
    d3.select("#tooltip").style("opacity", 0);
  }

  function applyVisibility() {
    const showHuman = document.getElementById("toggle-human").checked;
    const showKi = document.getElementById("toggle-ki").checked;

    d3.selectAll(".dot-human").classed("hidden", !showHuman);
    d3.selectAll(".dot-ki").classed("hidden", !showKi);
  }

  updateChart(basisdimensionen[0]);
}

// --------------------------------------------------------
// 3) Forschungsfrage 1 – Indikator-Heatmap (Pixelvisualisierung)
//    x = Position des Indikators im Item, y = Item
// --------------------------------------------------------

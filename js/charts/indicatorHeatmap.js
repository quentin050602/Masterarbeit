// js/charts/indicatorHeatmap.js
// Forschungsfrage 3: Indikatoren (Heatmap)
// Erwartet: indicatorData (Array), basisdimensionen (Array)
// Nutzt globales d3 (wird in index.html geladen).

export function initIndicatorHeatmap({ indicatorData, basisdimensionen }) {
  if (typeof indicatorData === "undefined" || indicatorData.length === 0) {
    return;
  }

  const svg = d3.select("#svg-indikatoren");
  const tooltip = d3.select("#tooltip");

  const margin = { top: 50, right: 180, bottom: 80, left: 80 };
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


  // Items (Zeilen) in der Reihenfolge aus itemEignungData
  const itemOrder = itemEignungData.map(d => d.itemCode);

  // Indikatoren pro Item sortieren und Spaltenindex vergeben
  const processedIndicators = [];
  const byItem = d3.group(indicatorData, d => d.itemCode);

  byItem.forEach((list, itemCode) => {
    list.sort((a, b) => Number(a.indicatorId) - Number(b.indicatorId));
    list.forEach((d, i) => {
      d.colIndex = i + 1; // 1,2,3,... innerhalb des Items
      processedIndicators.push(d);
    });
  });

  const maxCols = d3.max(processedIndicators, d => d.colIndex);

  const xScale = d3.scaleBand()
    .domain(d3.range(1, maxCols + 1).map(String))
    .range([0, width])
    .padding(0.05);

  const yScale = d3.scaleBand()
    .domain(itemOrder)
    .range([0, height])
    .padding(0.05);

  // Farbskala für Anteil 99 – 5 Klassen, passend zur Legende
  const thresholds = [5, 15, 30, 50];
  const colorRange = [
    "#e8f5e9", // <5 %
    "#c8e6c9", // 5–<15 %
    "#fff9c4", // 15–<30 %
    "#ffcc80", // 30–<50 %
    "#c62828"  // ≥50 %
  ];

  const colorScale = d3.scaleThreshold()
    .domain(thresholds)
    .range(colorRange);

  const xAxisGroup = g.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`);

  const yAxisGroup = g.append("g")
    .attr("class", "axis y-axis");

  // Achsenticks und -beschriftungen
  xAxisGroup.call(d3.axisBottom(xScale));
  xAxisGroup.selectAll("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, 5)");

  yAxisGroup.call(d3.axisLeft(yScale));

  // Achsentitel
  g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("font-size", "0.9rem")
    .text("Indikator-Position innerhalb des Items");

  g.append("text")
    .attr("x", -height / 2)
    .attr("y", -55)
    .attr("transform", "rotate(-90)")
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
    .attr("font-weight", "600")
    .text("Alle Indikatoren – Pixel-Heatmap nach Item und Indikator");

  // Legende für Farbe (Anteil 99)
  const legendColor = g.append("g")
    .attr("class", "legend legend-color")
    .attr("transform", `translate(${width + 20}, 10)`);

  const colorLabels = [
    "<5 %",
    "5–<15 %",
    "15–<30 %",
    "30–<50 %",
    "≥50 %"
  ];

  legendColor.append("text")
    .attr("x", 0)
    .attr("y", -10)
    .attr("fill", "#333")
    .attr("font-size", "0.85rem")
    .text("Anteil 99");

  const legendRows = legendColor.selectAll("g.legend-row")
    .data(colorLabels)
    .enter()
    .append("g")
      .attr("class", "legend-row")
      .attr("transform", (d, i) => `translate(0, ${i * 18})`);

  legendRows.append("rect")
    .attr("width", 14)
    .attr("height", 14)
    .attr("y", -10)
    .attr("rx", 3)
    .attr("fill", (d, i) => colorRange[i]);

  legendRows.append("text")
    .attr("x", 20)
    .attr("y", 2)
    .text(d => d);

  // Heatmap-Zellen – einheitlicher Rahmen
  g.selectAll("rect.heat-cell")
    .data(processedIndicators, d => d.itemCode + "-" + d.indicatorId)
    .enter()
    .append("rect")
      .attr("class", "heat-cell")
      .attr("x", d => xScale(String(d.colIndex)))
      .attr("y", d => yScale(d.itemCode))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", d => colorScale(d.perc99))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.itemCode} – ${d.itemLabel}</strong><br>` +
            `<strong>Indikator ${d.indicatorId} (${d.indicatorLabel})</strong><br>` +
            `Basisdimension: <strong>${d.basisdimension}</strong><br>` +
            `Anteil 99: <strong>${d.perc99.toFixed(1)} %</strong><br>` +
            `Eignung: <strong>${d.suitability}</strong><br>` +
            (d.description ? `<em>${d.description}</em>` : "")
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
      });
}


// --------------------------------------------------------
// 4) Item-Scores pro Beobachtung (Grouped Bar Chart: KI vs Mensch)
// Auswahl: Item (KA1..KA4, KU1..KU4, SK1..SK3)
// Pro Item: bis zu 18 Beobachtungen (z.B. Transkripte). 99 (n.b.) wird rausgefiltert.
// --------------------------------------------------------

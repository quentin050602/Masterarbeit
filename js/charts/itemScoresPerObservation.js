// js/charts/itemScoresPerObservation.js
// Zusatz: Scores pro Beobachtung (je Item Mensch vs. KI, gruppierte Balken)
// Erwartet: itemObservationScores (Objekt)
// Nutzt globales d3 (wird in index.html geladen).

export function initItemScoresPerObservationChart({ itemObservationScores }) {
  const svg = d3.select("#svg-item-scores");
  const select = d3.select("#item-select-scores");

  if (svg.empty() || select.empty()) return;
  if (!itemObservationScores) return;

  // Dropdown befüllen (Optgroups)
  const groups = [
    { label: "Kognitive Aktivierung", items: ["KA1", "KA2", "KA3", "KA4"] },
    { label: "Konstruktive Unterstützung", items: ["KU1", "KU2", "KU3", "KU4"] },
    { label: "Klassenführung", items: ["SK1", "SK2", "SK3"] }
  ];

  select.selectAll("*").remove();
  groups.forEach(grp => {
    const og = select.append("optgroup").attr("label", grp.label);
    grp.items.forEach(itemKey => {
      og.append("option").attr("value", itemKey).text(itemKey);
    });
  });

  // Layout
  const margin = { top: 65, right: 25, bottom: 70, left: 60 };
  const width = 1200 - margin.left - margin.right;
  const height = 420 - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
     .style("width", "100%")
     .style("height", "auto");

  svg.selectAll("*").remove();

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Frame
  g.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 1);

  const title = g.append("text")
    .attr("x", width / 2)
    .attr("y", -38)
    .attr("text-anchor", "middle")
    .attr("fill", "#222")
    .attr("font-size", "1rem")
    .attr("font-weight", "600");

  const subtitle = g.append("text")
    .attr("x", width / 2)
    .attr("y", -18)
    .attr("text-anchor", "middle")
    .attr("fill", "#666")
    .attr("font-size", "0.82rem");

  // Scales
  const x0 = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.35)   // Abstand zwischen Beobachtungspaaren
    .paddingOuter(0.10);

  const x1 = d3.scaleBand()
    .domain(["human", "ki"])
    .padding(0.12);

  const y = d3.scaleLinear()
    .domain([0, 4])       // feste Skala 0..4 (99 wird gefiltert)
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .domain(["human", "ki"])
    .range(["#2271b3", "#ff9800"]); // Konsistent mit Compare-Chart

  // Axes
  const xAxisGroup = g.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`);

  const yAxisGroup = g.append("g")
    .attr("class", "axis y-axis");

  yAxisGroup.call(d3.axisLeft(y).ticks(4));

  // Axis labels
  g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 52)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("font-size", "0.85rem")
    .text("Beobachtung (1–18)");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -45)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("font-size", "0.85rem")
    .text("Score");

  // Legend (zentriert)
  const legend = g.append("g")
    .attr("class", "legend");

  const legendData = [
    { key: "human", label: "Mensch" },
    { key: "ki", label: "KI" }
  ];

  const lg = legend.selectAll("g")
    .data(legendData)
    .enter()
    .append("g")
      .attr("transform", (d, i) => `translate(${i * 110}, 0)`);

  lg.append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("y", -10)
    .attr("fill", d => color(d.key));

  lg.append("text")
    .attr("x", 18)
    .attr("y", 0)
    .attr("dominant-baseline", "middle")
    .attr("fill", "#333")
    .text(d => d.label);

  // Legend zentrieren (nach Render)
  const legendBox = legend.node().getBBox();
  legend.attr("transform", `translate(${(width - legendBox.width) / 2}, -52)`);

  const barsGroup = g.append("g");

  function render(itemKey) {
    const raw = itemObservationScores[itemKey] || [];

    // 99/n.b. raus, damit Skala nicht „auseinandergezogen“ wird
    const data = raw
      .filter(d => d.ki !== null && d.human !== null)
      .map(d => ({
        obs: d.obs,
        human: +d.human,
        ki: +d.ki
      }));

    title.text(`${itemKey}: Scores pro Beobachtung (KI vs. Mensch)`);
    subtitle.text(`n = ${data.length} (99/n.b. ausgeschlossen)`);

    if (data.length === 0) {
      barsGroup.selectAll("*").remove();
      xAxisGroup.call(d3.axisBottom(x0));
      barsGroup.append("text")
        .attr("class", "no-data")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .text("Keine gültigen Werte (nur 99/n.b.)");
      return;
    }

    x0.domain(data.map(d => d.obs));
    x1.range([0, x0.bandwidth()]);

    xAxisGroup.call(
      d3.axisBottom(x0)
        .tickSizeOuter(0)
    );

    // JOIN: pro Beobachtung ein Container-G
    const obsGroups = barsGroup.selectAll("g.obs")
      .data(data, d => d.obs);

    obsGroups.exit().remove();

    const obsEnter = obsGroups.enter()
      .append("g")
        .attr("class", "obs");

    const obsMerge = obsEnter.merge(obsGroups)
      .attr("transform", d => `translate(${x0(d.obs)},0)`);

    // Für jedes obs: 2 Balken (human, ki) nebeneinander
    const barSeries = (d) => ([
      { key: "human", value: d.human, obs: d.obs },
      { key: "ki", value: d.ki, obs: d.obs }
    ]);

    const bars = obsMerge.selectAll("rect.bar")
      .data(barSeries, d => d.key);

    bars.exit().remove();

    bars.enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", d => x1(d.key))
        .attr("width", x1.bandwidth())
        .attr("y", y(0))
        .attr("height", 0)
        .attr("fill", d => color(d.key))
      .merge(bars)
        .transition()
        .duration(400)
        .attr("x", d => x1(d.key))
        .attr("width", x1.bandwidth())
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value));

    // Wert-Labels (optional, dezent)
    const labels = obsMerge.selectAll("text.bar-label")
      .data(barSeries, d => d.key);

    labels.exit().remove();

    labels.enter()
      .append("text")
        .attr("class", "bar-label")
        .attr("text-anchor", "middle")
        .attr("fill", "#333")
        .attr("font-size", "0.72rem")
      .merge(labels)
        .transition()
        .duration(400)
        .attr("x", d => x1(d.key) + x1.bandwidth() / 2)
        .attr("y", d => y(d.value) - 6)
        .text(d => (Number.isFinite(d.value) ? d.value.toString().replace(".", ",") : ""));
  }

  // Default
  const defaultItem = "KA1";
  select.property("value", defaultItem);
  render(defaultItem);

  select.on("change", (event) => {
    render(event.target.value);
  });
}

// --------------------------------------------------------
// 5) Basisdimensionen-Zusammenfassung (Vergleich Mensch vs. KI)
//     Aggregation über Items je Basisdimension (gewichtete Mittelwerte nach nPairs).
//     Zusätzlich: Anteil gleicher Ratings, MAD, maxDiff (aus den Itemtabellen).
// --------------------------------------------------------

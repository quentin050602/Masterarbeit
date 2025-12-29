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

  // Layout (mehr Luft oben, damit Titel + Legende nicht kollidieren)
  const margin = { top: 92, right: 28, bottom: 74, left: 62 };
  const width = 1200 - margin.left - margin.right;
  const height = 420 - margin.top - margin.bottom;

  svg.attr(
    "viewBox",
    `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`
  );

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Einheitlicher Rahmen
  g.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("stroke", "#cfd6e4")
    .attr("stroke-width", 1);

  const chartTitle = g.append("text")
    .attr("x", width / 2)
    .attr("y", -56)
    .attr("text-anchor", "middle")
    .attr("fill", "#111827")
    .attr("font-size", "1rem")
    .attr("font-weight", "700");

  const chartSubtitle = g.append("text")
    .attr("x", width / 2)
    .attr("y", -34)
    .attr("text-anchor", "middle")
    .attr("fill", "#6b7280")
    .attr("font-size", "0.82rem");

  // Legende zentriert über dem Plot (unter dem Titel)
  const legend = g.append("g").attr("class", "legend");
  const legendData = [
    { key: "human", label: "Mensch", color: "#2271b3" },
    { key: "ki", label: "KI", color: "#ff9800" }
  ];

  const lg = legend.selectAll("g")
    .data(legendData)
    .enter()
    .append("g")
      .attr("transform", (d, i) => `translate(${i * 120}, 0)`);

  lg.append("rect")
    .attr("x", 0)
    .attr("y", -14)
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", d => d.color)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);

  lg.append("text")
    .attr("x", 18)
    .attr("y", -8)
    .attr("dominant-baseline", "middle")
    .attr("fill", "#2a2f3a")
    .attr("font-size", "0.9rem")
    .text(d => d.label);

  const legendBox = legend.node().getBBox();
  legend.attr("transform", `translate(${(width - legendBox.width) / 2}, -18)`);

  // Skalen
  const x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.18)
    .paddingOuter(0.06);

  const xInner = d3.scaleBand()
    .domain(["human", "ki"])
    .range([0, x.bandwidth()])
    .padding(0.18);

  const y = d3.scaleLinear()
    .domain([0, 4])
    .range([height, 0]);

  // Achsen
  const xAxisG = g.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`);

  const yAxisG = g.append("g")
    .attr("class", "axis y-axis");

  yAxisG.call(d3.axisLeft(y).ticks(4));

  xAxisG.call(d3.axisBottom(x));

  // Achsentitel
  g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 56)
    .attr("text-anchor", "middle")
    .attr("fill", "#374151")
    .attr("font-size", "0.85rem")
    .text("Beobachtung (1–18)");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -46)
    .attr("text-anchor", "middle")
    .attr("fill", "#374151")
    .attr("font-size", "0.85rem")
    .text("Score");

  const barsG = g.append("g").attr("class", "bars");
  const labelsG = g.append("g").attr("class", "bar-labels");

  const color = d3.scaleOrdinal()
    .domain(["human", "ki"])
    .range(["#2271b3", "#ff9800"]);

  function formatScore(v) {
    if (!Number.isFinite(v)) return "";
    const isInt = Math.abs(v - Math.round(v)) < 1e-9;
    return (isInt ? String(Math.round(v)) : v.toFixed(1)).replace(".", ",");
  }

  function buildDataForItem(itemKey) {
    const series = itemObservationScores[itemKey] || [];

    // Exkludiere 99/n.b.
    const filtered = series
      .filter(d => d.scoreHuman !== 99 && d.scoreKI !== 99)
      .map(d => ({
        obs: d.observation,
        human: d.scoreHuman,
        ki: d.scoreKI
      }));

    // Sortiere nach Beobachtung
    filtered.sort((a, b) => d3.ascending(a.obs, b.obs));

    const obsLabels = filtered.map(d => String(d.obs));

    return { filtered, obsLabels };
  }

  function update(itemKey) {
    svg.selectAll("g").remove();

    // Rebuild the whole chart each time to keep layout stable (and avoid leftover labels)
    const g2 = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Rahmen
    g2.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("stroke", "#cfd6e4")
      .attr("stroke-width", 1);

    const title = g2.append("text")
      .attr("x", width / 2)
      .attr("y", -56)
      .attr("text-anchor", "middle")
      .attr("fill", "#111827")
      .attr("font-size", "1rem")
      .attr("font-weight", "700");

    const subtitle = g2.append("text")
      .attr("x", width / 2)
      .attr("y", -34)
      .attr("text-anchor", "middle")
      .attr("fill", "#6b7280")
      .attr("font-size", "0.82rem");

    // Legende
    const legend2 = g2.append("g").attr("class", "legend");
    const lg2 = legend2.selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
        .attr("transform", (d, i) => `translate(${i * 120}, 0)`);

    lg2.append("rect")
      .attr("x", 0)
      .attr("y", -14)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", d => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);

    lg2.append("text")
      .attr("x", 18)
      .attr("y", -8)
      .attr("dominant-baseline", "middle")
      .attr("fill", "#2a2f3a")
      .attr("font-size", "0.9rem")
      .text(d => d.label);

    const lb = legend2.node().getBBox();
    legend2.attr("transform", `translate(${(width - lb.width) / 2}, -18)`);

    const { filtered, obsLabels } = buildDataForItem(itemKey);

    title.text(`${itemKey}: Scores pro Beobachtung (KI vs. Mensch)`);
    subtitle.text(`n = ${filtered.length} (99/n.b. ausgeschlossen)`);

    // Skalen
    x.domain(obsLabels);
    xInner.range([0, x.bandwidth()]);

    const xAxisG2 = g2.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    xAxisG2.selectAll("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(0, 5)");

    g2.append("g")
      .attr("class", "axis y-axis")
      .call(d3.axisLeft(y).ticks(4));

    // Achsentitel
    g2.append("text")
      .attr("x", width / 2)
      .attr("y", height + 56)
      .attr("text-anchor", "middle")
      .attr("fill", "#374151")
      .attr("font-size", "0.85rem")
      .text("Beobachtung (1–18)");

    g2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -46)
      .attr("text-anchor", "middle")
      .attr("fill", "#374151")
      .attr("font-size", "0.85rem")
      .text("Score");

    const bars = g2.append("g").attr("class", "bars");
    const lbls = g2.append("g").attr("class", "bar-labels");

    // Daten in Long-Form
    const longData = [];
    filtered.forEach(d => {
      longData.push({ obs: String(d.obs), who: "human", value: d.human });
      longData.push({ obs: String(d.obs), who: "ki", value: d.ki });
    });

    bars.selectAll("rect")
      .data(longData)
      .enter()
      .append("rect")
        .attr("x", d => x(d.obs) + xInner(d.who))
        .attr("y", d => y(d.value))
        .attr("width", xInner.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => color(d.who));

    // Werte über Balken (mit genug Abstand)
    lbls.selectAll("text")
      .data(longData)
      .enter()
      .append("text")
        .attr("x", d => x(d.obs) + xInner(d.who) + xInner.bandwidth() / 2)
        .attr("y", d => y(d.value) - 7)
        .attr("text-anchor", "middle")
        .attr("fill", "#111827")
        .attr("font-size", "0.72rem")
        .text(d => formatScore(d.value));
  }

  // Initial
  const first = select.property("value") || groups[0].items[0];
  update(first);

  select.on("change", function () {
    update(this.value);
  });
}

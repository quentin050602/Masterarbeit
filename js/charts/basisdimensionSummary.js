// js/charts/basisdimensionSummary.js
// Basisdimensionen-Zusammenfassung (Dumbbell-Plot + Summenzeilen)
// Erwartet: itemCompareData (Array)
// Nutzt globales d3 (wird in index.html geladen).

export function initBasisdimensionSummaryChart({ itemCompareData }) {
  const svg = d3.select("#svg-basis-summary");
  if (svg.empty()) return;

  const tooltip = d3.select("#tooltip");

  // ----------------------------
  // Datenaufbereitung: Items + Summenzeilen je Basisdimension + Gesamt
  // ----------------------------
  const dims = [
    "Kognitive Aktivierung",
    "Konstruktive Unterstützung",
    "Strukturierte Klassenführung"
  ];

  const dimShort = {
    "Kognitive Aktivierung": "KA",
    "Konstruktive Unterstützung": "KU",
    "Strukturierte Klassenführung": "SK"
  };

  function safeWeightedMean(rows, valueKey, weightKey) {
    const valid = rows.filter(r => Number.isFinite(r[valueKey]) && Number.isFinite(r[weightKey]));
    const wSum = d3.sum(valid, r => r[weightKey]);
    if (!wSum) return null;
    return d3.sum(valid, r => r[valueKey] * r[weightKey]) / wSum;
  }

  function computeSummaryForRows(rows) {
    const nPairs = d3.sum(rows, d => d.nPairs);
    const nIdentical = d3.sum(rows, d => d.nIdentical);
    const percIdentical = nPairs > 0 ? (nIdentical / nPairs) * 100 : null;

    const meanHuman = safeWeightedMean(rows, "meanHuman", "nPairs");
    const meanKI = safeWeightedMean(rows, "meanKI", "nPairs");
    const meanAbsDiff = safeWeightedMean(rows, "meanAbsDiff", "nPairs");
    const maxDiff = d3.max(rows, d => d.maxDiff);

    const rowsWithR = rows.filter(d => d.correlation !== null && Number.isFinite(d.correlation));
    const corr = safeWeightedMean(
      rowsWithR.map(d => ({ ...d, corrValue: d.correlation })),
      "corrValue",
      "nPairs"
    );

    return {
      nPairs,
      nIdentical,
      nDifferent: nPairs - nIdentical,
      percIdentical,
      meanHuman,
      meanKI,
      meanAbsDiff,
      maxDiff,
      correlation: corr
    };
  }

  const rows = [];
  const groupSpans = []; // für Hintergrund + Überschriften

  dims.forEach(dim => {
    const items = itemCompareData
      .filter(d => d.basisdimension === dim)
      .slice()
      .sort((a, b) => d3.ascending(a.itemCode, b.itemCode));

    const startIndex = rows.length;

    items.forEach(it => {
      rows.push({
        ...it,
        rowType: "item",
        group: dim,
        key: it.itemCode,
        label: `${it.itemCode} – ${it.itemLabel}`
      });
    });

    const sum = computeSummaryForRows(items);
    rows.push({
      basisdimension: dim,
      itemCode: `${dimShort[dim]}_gesamt`,
      itemLabel: "Gesamt",
      ...sum,
      rowType: "groupSummary",
      group: dim,
      key: `${dimShort[dim]}_gesamt`,
      label: `${dimShort[dim]} gesamt`
    });

    groupSpans.push({
      dim,
      startKey: rows[startIndex].key,
      endKey: rows[rows.length - 1].key
    });
  });

  const allSum = computeSummaryForRows(itemCompareData);
  rows.push({
    basisdimension: "Basisdimensionen zusammenfassung",
    itemCode: "ALL_gesamt",
    itemLabel: "Gesamt",
    ...allSum,
    rowType: "overallSummary",
    group: "ALL",
    key: "Basisdimensionen zusammenfassung",
    label: "Basisdimensionen zusammenfassung"
  });

  // ----------------------------
  // Layout (mehr Platz, damit es wirklich lesbar ist)
  // ----------------------------
  const rowH = 28;
  const innerHeight = Math.max(460, rows.length * rowH);

  const margin = { top: 84, right: 300, bottom: 70, left: 360 };
  const width = 1200 - margin.left - margin.right;
  const height = innerHeight;

  svg.attr(
    "viewBox",
    `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`
  );

  svg.selectAll("*").remove();

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Rahmen
  g.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width + (margin.right - 18))
    .attr("height", height)
    .attr("fill", "none")
    .attr("stroke", "#cfd6e4")
    .attr("stroke-width", 1);

  const x = d3.scaleLinear()
    .domain([1, 4])
    .range([0, width])
    .nice();

  const y = d3.scaleBand()
    .domain(rows.map(d => d.key))
    .range([0, height])
    .padding(0.32);

  // Gridlines (Likert 1–4)
  g.append("g")
    .attr("class", "grid")
    .call(
      d3.axisTop(x)
        .ticks(4)
        .tickSize(-height)
        .tickFormat("")
    )
    .selectAll("line")
      .attr("stroke", "#e7ecf6");

  g.select(".grid").selectAll("path").remove();

  // Hintergrund-Bänder pro Basisdimension (dezent)
  groupSpans.forEach((span, i) => {
    const yStart = y(span.startKey);
    const yEnd = y(span.endKey) + y.bandwidth();
    g.append("rect")
      .attr("x", 0)
      .attr("y", yStart - 8)
      .attr("width", width + (margin.right - 18))
      .attr("height", (yEnd - yStart) + 16)
      .attr("fill", i % 2 === 0 ? "#f7f9fe" : "#ffffff")
      .attr("opacity", 0.9)
      .lower();
  });

  // Achsen
  const xAxis = d3.axisBottom(x).ticks(4);
  g.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(y)
    .tickSize(0)
    .tickPadding(10)
    .tickFormat(key => (rows.find(r => r.key === key)?.label ?? key));

  const yAxisG = g.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis);

  // Summenzeilen im y-Axis-Label fett
  yAxisG.selectAll(".tick text")
    .attr("fill", d => {
      const r = rows.find(x => x.key === d);
      return (r && (r.rowType === "groupSummary" || r.rowType === "overallSummary")) ? "#111827" : "#374151";
    })
    .attr("font-weight", d => {
      const r = rows.find(x => x.key === d);
      return (r && (r.rowType === "groupSummary" || r.rowType === "overallSummary")) ? 700 : 500;
    });

  // Titel
  g.append("text")
    .attr("x", (width + (margin.right - 18)) / 2)
    .attr("y", -26)
    .attr("text-anchor", "middle")
    .attr("fill", "#222")
    .attr("font-size", "1rem")
    .attr("font-weight", "700")
    .text("Basisdimensionen zusammenfassung");

  // Untertitel (was bedeutet der Plot)
  g.append("text")
    .attr("x", (width + (margin.right - 18)) / 2)
    .attr("y", -7)
    .attr("text-anchor", "middle")
    .attr("fill", "#6b7280")
    .attr("font-size", "0.82rem")
    .text("Dumbbell-Plot: Mittelwerte Mensch vs. KI (1–4) je Item, inkl. Summenzeilen");

  // Legende (zentriert)
  const color = d3.scaleOrdinal()
    .domain(["human", "ki"])
    .range(["#2271b3", "#ff9800"]);

  const legend = g.append("g").attr("class", "legend");
  const legendData = [
    { key: "human", label: "Mensch" },
    { key: "ki", label: "KI" }
  ];

  const lg = legend.selectAll("g")
    .data(legendData)
    .enter()
    .append("g")
      .attr("transform", (d, i) => `translate(${i * 120}, 0)`);

  lg.append("circle")
    .attr("r", 6)
    .attr("cy", -52)
    .attr("cx", 0)
    .attr("fill", d => color(d.key))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.2);

  lg.append("text")
    .attr("x", 12)
    .attr("y", -52)
    .attr("dominant-baseline", "middle")
    .attr("fill", "#2a2f3a")
    .text(d => d.label);

  const legendBox = legend.node().getBBox();
  legend.attr("transform", `translate(${((width + (margin.right - 18)) - legendBox.width) / 2}, 0)`);

  // Spaltenkopf rechts (Metriken)
  g.append("text")
    .attr("x", width + 18)
    .attr("y", -10)
    .attr("fill", "#6b7280")
    .attr("font-size", "0.78rem")
    .attr("font-weight", "600")
    .text("Δ (KI−M) · gleich% · MAD · n");

  function fmt(n, digits = 2) {
    return Number.isFinite(n) ? n.toFixed(digits).replace(".", ",") : "n. a.";
  }

  function showTooltip(event, r) {
    const human = fmt(r.meanHuman, 2);
    const ki = fmt(r.meanKI, 2);
    const diff = (Number.isFinite(r.meanHuman) && Number.isFinite(r.meanKI))
      ? fmt(r.meanKI - r.meanHuman, 2)
      : "n. a.";
    const mad = fmt(r.meanAbsDiff, 2);
    const maxD = Number.isFinite(r.maxDiff) ? r.maxDiff.toFixed(1).replace(".", ",") : "n. a.";
    const ident = Number.isFinite(r.percIdentical) ? r.percIdentical.toFixed(1).replace(".", ",") : "n. a.";
    const corr = (r.correlation !== null && Number.isFinite(r.correlation)) ? r.correlation.toFixed(2).replace(".", ",") : "n. a.";

    tooltip
      .style("opacity", 1)
      .html(
        `<strong>${r.label}</strong><br>` +
        `<strong>Mensch:</strong> ${human}<br>` +
        `<strong>KI:</strong> ${ki}<br>` +
        `<strong>Δ (KI − Mensch):</strong> ${diff}<br>` +
        `<strong>n Paare:</strong> ${r.nPairs}<br>` +
        `<strong>gleich:</strong> ${ident} %<br>` +
        `<strong>MAD:</strong> ${mad}<br>` +
        `<strong>max. Diff:</strong> ${maxD}<br>` +
        `<strong>r (falls berichtet):</strong> ${corr}`
      )
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  }

  function moveTooltip(event) {
    tooltip
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  }

  function hideTooltip() {
    tooltip.style("opacity", 0);
  }

  // Dumbbells
  const rowG = g.append("g").attr("class", "rows");

  // Verbindungslinie
  rowG.selectAll("line.dumbbell")
    .data(rows.filter(r => Number.isFinite(r.meanHuman) && Number.isFinite(r.meanKI)))
    .enter()
    .append("line")
      .attr("class", "dumbbell")
      .attr("x1", d => x(d.meanHuman))
      .attr("x2", d => x(d.meanKI))
      .attr("y1", d => y(d.key) + y.bandwidth() / 2)
      .attr("y2", d => y(d.key) + y.bandwidth() / 2)
      .attr("stroke", "#9aa3b2")
      .attr("stroke-width", d => (d.rowType === "groupSummary" || d.rowType === "overallSummary") ? 3.2 : 2.2)
      .attr("opacity", 0.85)
      .on("mouseover", (event, d) => showTooltip(event, d))
      .on("mousemove", (event) => moveTooltip(event))
      .on("mouseout", hideTooltip);

  // Punkte: Mensch
  rowG.selectAll("circle.dot-human")
    .data(rows.filter(r => Number.isFinite(r.meanHuman)))
    .enter()
    .append("circle")
      .attr("class", "dot dot-human")
      .attr("cx", d => x(d.meanHuman))
      .attr("cy", d => y(d.key) + y.bandwidth() / 2)
      .attr("r", d => (d.rowType === "groupSummary" || d.rowType === "overallSummary") ? 6.2 : 5.2)
      .attr("fill", color("human"))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.2)
      .on("mouseover", (event, d) => showTooltip(event, d))
      .on("mousemove", (event) => moveTooltip(event))
      .on("mouseout", hideTooltip);

  // Punkte: KI
  rowG.selectAll("circle.dot-ki")
    .data(rows.filter(r => Number.isFinite(r.meanKI)))
    .enter()
    .append("circle")
      .attr("class", "dot dot-ki")
      .attr("cx", d => x(d.meanKI))
      .attr("cy", d => y(d.key) + y.bandwidth() / 2)
      .attr("r", d => (d.rowType === "groupSummary" || d.rowType === "overallSummary") ? 6.2 : 5.2)
      .attr("fill", color("ki"))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.2)
      .on("mouseover", (event, d) => showTooltip(event, d))
      .on("mousemove", (event) => moveTooltip(event))
      .on("mouseout", hideTooltip);

  // Rechte Metriken je Zeile
  rowG.selectAll("text.metrics")
    .data(rows)
    .enter()
    .append("text")
      .attr("class", "metrics")
      .attr("x", width + 18)
      .attr("y", d => y(d.key) + y.bandwidth() / 2)
      .attr("dominant-baseline", "middle")
      .attr("fill", "#4b5563")
      .attr("font-size", "0.78rem")
      .attr("font-weight", d => (d.rowType === "groupSummary" || d.rowType === "overallSummary") ? 700 : 500)
      .text(d => {
        const diff = (Number.isFinite(d.meanHuman) && Number.isFinite(d.meanKI)) ? fmt(d.meanKI - d.meanHuman, 2) : "n. a.";
        const ident = Number.isFinite(d.percIdentical) ? d.percIdentical.toFixed(0) : "n. a.";
        const mad = Number.isFinite(d.meanAbsDiff) ? d.meanAbsDiff.toFixed(2).replace(".", ",") : "n. a.";
        return `Δ=${diff} · gleich=${ident}% · MAD=${mad} · n=${d.nPairs}`;
      });

  // Gruppenüberschriften links (in der Margin)
  groupSpans.forEach(span => {
    const firstY = y(span.startKey);
    g.append("text")
      .attr("x", -margin.left + 18)
      .attr("y", firstY - 14)
      .attr("fill", "#111827")
      .attr("font-size", "0.82rem")
      .attr("font-weight", "700")
      .text(span.dim);

    // Trennlinie nach der Summenzeile
    const endY = y(span.endKey) + y.bandwidth() + 10;
    g.append("line")
      .attr("x1", 0)
      .attr("x2", width + (margin.right - 18))
      .attr("y1", endY)
      .attr("y2", endY)
      .attr("stroke", "#e1e7f3")
      .attr("stroke-width", 1);
  });
}

// js/app.js
// Entry point: lädt Daten + initialisiert alle Visualisierungen.
// D3 wird in index.html als globales Script geladen.

import {
  itemEignungData,
  itemCompareData,
  indicatorData,
  itemObservationScores
} from "./data.js";

import { initEignungChart } from "./charts/stackedBarChart.js";
import { initCompareChart } from "./charts/compareChart.js";
import { initIndicatorHeatmap } from "./charts/indicatorHeatmap.js";
import { initItemScoresPerObservationChart } from "./charts/itemScoresPerObservation.js";
import { initBasisdimensionSummaryChart } from "./charts/basisdimensionSummary.js";

// Basisdimensionen aus den Item-Eignungsdaten ableiten (ist die gemeinsame "Quelle der Wahrheit" im UI)
const basisdimensionen = Array.from(new Set(itemEignungData.map(d => d.basisdimension)));

document.addEventListener("DOMContentLoaded", () => {
  initEignungChart({ itemEignungData, basisdimensionen });
  initCompareChart({ itemCompareData, basisdimensionen });
  initIndicatorHeatmap({ indicatorData, basisdimensionen });
  initItemScoresPerObservationChart({ itemObservationScores });
  initBasisdimensionSummaryChart({ itemCompareData });
});

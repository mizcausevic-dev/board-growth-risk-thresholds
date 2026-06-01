import type { BoardGrowthRiskThresholdExport } from "./types.js";

export function formatSummary(report: BoardGrowthRiskThresholdExport) {
  return [
    "Board Growth Risk Thresholds",
    `Generated: ${report.generatedAt}`,
    `Lanes: ${report.summary.items}`,
    `Breaches: ${report.summary.breaches}`,
    `Interventions: ${report.summary.interventions}`,
    `Average board confidence: ${report.summary.averageBoardConfidence}`,
    `Value at stake: $${report.summary.valueAtStakeMillions}M`,
    `Lead: ${report.summary.leadingMessage}`
  ].join("\n");
}

export function formatJson(report: BoardGrowthRiskThresholdExport) {
  return JSON.stringify(report, null, 2);
}

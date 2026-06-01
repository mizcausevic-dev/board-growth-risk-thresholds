import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardGrowthRiskThresholds } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardGrowthRiskThresholds, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardGrowthRiskThresholds.length);
  });

  it("counts threshold breaches", () => {
    const report = analyze(sampleBoardGrowthRiskThresholds, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.breaches).toBeGreaterThan(0);
  });

  it("counts intervention actions", () => {
    const report = analyze(sampleBoardGrowthRiskThresholds, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.interventions).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardGrowthRiskThresholds, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(140);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardGrowthRiskThresholds, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });
});

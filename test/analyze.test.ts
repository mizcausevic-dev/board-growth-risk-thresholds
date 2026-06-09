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

  it("handles an empty estate without divide-by-zero drift", () => {
    const report = analyze([], { now: "2026-06-01T00:00:00Z" });

    expect(report.summary.items).toBe(0);
    expect(report.summary.averageBoardConfidence).toBe(0);
    expect(report.summary.breaches).toBe(0);
  });

  it("classifies fully covered lanes as inside board guardrails", () => {
    const item = {
      ...sampleBoardGrowthRiskThresholds[0],
      action: "ADVANCE" as const,
      dependencyCoverageScore: 90,
      operatingDisciplineScore: 90,
      downsideContainmentScore: 90,
      cashExposureScore: 90,
      boardConfidenceScore: 90
    };

    const report = analyze([item], { now: "2026-06-01T00:00:00Z" });

    expect(report.summary.breaches).toBe(0);
    expect(report.items[0]?.dependencyAssessment.severity).toBe("WATCH");
    expect(report.items[0]?.confidenceAssessment.severity).toBe("WATCH");
    expect(report.summary.leadingMessage).toContain("inside");
  });

  it("classifies pressure lanes without immediate breach escalation", () => {
    const item = {
      ...sampleBoardGrowthRiskThresholds[0],
      action: "HOLD" as const,
      dependencyCoverageScore: 65,
      operatingDisciplineScore: 65,
      downsideContainmentScore: 65,
      cashExposureScore: 65,
      boardConfidenceScore: 65
    };

    const report = analyze([item], { now: "2026-06-01T00:00:00Z" });

    expect(report.summary.breaches).toBe(0);
    expect(report.items[0]?.operatingAssessment.severity).toBe("PRESSURE");
    expect(report.items[0]?.cashAssessment.severity).toBe("PRESSURE");
  });
});

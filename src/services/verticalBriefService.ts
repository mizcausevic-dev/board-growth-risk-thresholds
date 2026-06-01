import { analyze } from "../analyze.js";
import { sampleBoardGrowthRiskThresholds } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardGrowthRiskThresholds, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Advance procurement and AI inside guardrails, hold identity and biotech at the current edge, intervene on revenue systems, and reallocate attention to fragmented FinTech thresholds."
  };
}

export function thresholdLane() {
  return sampleBoardGrowthRiskThresholds.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    thresholdTheme: item.thresholdTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove
  }));
}

export function triggerLedger() {
  return sampleBoardGrowthRiskThresholds.map((item) => ({
    lane: item.lane,
    failureTrigger: item.failureTrigger,
    downsideTrigger: item.downsideTrigger,
    interventionOwner: item.interventionOwner,
    requiredEvidence: item.requiredEvidence
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeRiskScore: item.compositeRiskScore,
    dependency: item.dependencyAssessment,
    operating: item.operatingAssessment,
    downside: item.downsideAssessment,
    cash: item.cashAssessment,
    confidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeRiskScore: item.compositeRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic growth-threshold data only - no live board packets, budgets, or actual intervention thresholds are included.",
    "Scores are modeled to show how Kinetic Gain can convert expansion complexity into board guardrails and intervention triggers.",
    "All routes are read-only and meant to demonstrate threshold packaging, not production decision automation."
  ];
}

export function payload() {
  return {
    report,
    thresholdLane: thresholdLane(),
    triggerLedger: triggerLedger(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardGrowthRiskThresholds
  };
}

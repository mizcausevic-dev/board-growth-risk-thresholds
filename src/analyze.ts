import type {
  BoardGrowthRiskThresholdExport,
  BoardGrowthRiskThresholdItem,
  BoardGrowthRiskThresholdReportItem,
  ThresholdAssessment,
  ThresholdSeverity
} from "./types.js";

function assess(score: number, pass: number, watch: number, good: string, warn: string, breach: string): ThresholdAssessment {
  let severity: ThresholdSeverity = "BREACH";
  let ok = false;
  let message = breach;

  if (score >= pass) {
    severity = "WATCH";
    ok = true;
    message = good;
  } else if (score >= watch) {
    severity = "PRESSURE";
    message = warn;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardGrowthRiskThresholdItem[],
  options: { now?: string } = {}
): BoardGrowthRiskThresholdExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardGrowthRiskThresholdReportItem[] = items.map((item) => {
    const dependencyAssessment = assess(
      item.dependencyCoverageScore,
      78,
      62,
      "Dependency coverage remains inside threshold for the current growth posture.",
      "Dependency coverage is drifting toward threshold pressure and needs tighter board guardrails.",
      "Dependency coverage is below threshold and should trigger immediate board-visible intervention."
    );

    const operatingAssessment = assess(
      item.operatingDisciplineScore,
      76,
      60,
      "Operating discipline supports the current growth motion without forcing a pause.",
      "Operating discipline is under pressure and could undermine the next growth claim.",
      "Operating discipline is below threshold and should block the next growth expansion."
    );

    const downsideAssessment = assess(
      item.downsideContainmentScore,
      74,
      58,
      "Downside containment remains credible for the current board story.",
      "Downside containment is thinning and needs visible triggers before expansion continues.",
      "Downside containment is below threshold and the board should intervene before scale widens exposure."
    );

    const cashAssessment = assess(
      item.cashExposureScore,
      72,
      56,
      "Cash exposure remains inside the current risk tolerance.",
      "Cash exposure is rising toward a board-level watch threshold.",
      "Cash exposure is below the accepted threshold and should trigger a capital conversation."
    );

    const confidenceAssessment = assess(
      item.boardConfidenceScore,
      75,
      59,
      "Board confidence is strong enough to support the current lane narrative.",
      "Board confidence is fragile and depends on a tighter threshold packet.",
      "Board confidence is too weak to support the current growth claim."
    );

    const compositeRiskScore = Math.round(
      (100 -
        (item.dependencyCoverageScore +
          item.operatingDisciplineScore +
          item.downsideContainmentScore +
          item.cashExposureScore +
          item.boardConfidenceScore) /
          5) *
        10
    ) / 10;

    return {
      ...item,
      dependencyAssessment,
      operatingAssessment,
      downsideAssessment,
      cashAssessment,
      confidenceAssessment,
      compositeRiskScore
    };
  });

  const breaches = reportItems.filter(
    (item) =>
      item.dependencyAssessment.severity === "BREACH" ||
      item.operatingAssessment.severity === "BREACH" ||
      item.downsideAssessment.severity === "BREACH" ||
      item.cashAssessment.severity === "BREACH" ||
      item.confidenceAssessment.severity === "BREACH"
  ).length;

  const interventions = reportItems.filter((item) => item.action === "INTERVENE" || item.action === "REALLOCATE").length;
  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round(
          (reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10
        ) / 10;
  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    breaches === 0
      ? "Current growth lanes remain inside their board-approved guardrails."
      : breaches <= 2
        ? "A few lanes are approaching or breaching thresholds; the board should tighten intervention triggers now."
        : "Multiple growth lanes are below threshold and need intervention before leadership widens the story.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      breaches,
      interventions,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardGrowthRiskThresholdItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}

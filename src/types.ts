export type GrowthRiskTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type ThresholdAction = "ADVANCE" | "HOLD" | "INTERVENE" | "REALLOCATE";

export type ThresholdSeverity = "WATCH" | "PRESSURE" | "BREACH";

export interface BoardGrowthRiskThresholdItem {
  id: string;
  lane: string;
  track: GrowthRiskTrack;
  action: ThresholdAction;
  thresholdTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  failureTrigger: string;
  downsideTrigger: string;
  interventionOwner: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  dependencyCoverageScore: number;
  operatingDisciplineScore: number;
  downsideContainmentScore: number;
  cashExposureScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface ThresholdAssessment {
  severity: ThresholdSeverity;
  ok: boolean;
  message: string;
}

export interface BoardGrowthRiskThresholdReportItem
  extends BoardGrowthRiskThresholdItem {
  dependencyAssessment: ThresholdAssessment;
  operatingAssessment: ThresholdAssessment;
  downsideAssessment: ThresholdAssessment;
  cashAssessment: ThresholdAssessment;
  confidenceAssessment: ThresholdAssessment;
  compositeRiskScore: number;
}

export interface BoardGrowthRiskThresholdSummary {
  items: number;
  breaches: number;
  interventions: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardGrowthRiskThresholdExport {
  generatedAt: string;
  summary: BoardGrowthRiskThresholdSummary;
  items: BoardGrowthRiskThresholdReportItem[];
}

export interface BoardGrowthRiskThresholdPayload {
  report: BoardGrowthRiskThresholdExport;
  thresholdLane: ReturnType<typeof import("./services/verticalBriefService.js").thresholdLane>;
  triggerLedger: ReturnType<typeof import("./services/verticalBriefService.js").triggerLedger>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardGrowthRiskThresholdItem[];
}

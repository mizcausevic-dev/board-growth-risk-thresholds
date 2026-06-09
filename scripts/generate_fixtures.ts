import { toExport } from "../src/analyze.js";
import { sampleBoardGrowthRiskThresholds } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const FIXTURE_GENERATED_AT = "2026-06-01T00:00:00Z";

const clean = sampleBoardGrowthRiskThresholds.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync("fixtures/board-growth-risk-thresholds.json", JSON.stringify(toExport(sampleBoardGrowthRiskThresholds, { now: FIXTURE_GENERATED_AT }), null, 2));
writeFileSync("fixtures/board-growth-risk-thresholds-clean.json", JSON.stringify(toExport(clean, { now: FIXTURE_GENERATED_AT }), null, 2));

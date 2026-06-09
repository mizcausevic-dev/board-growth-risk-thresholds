import { describe, expect, it } from "vitest";
import { formatJson, formatSummary } from "./format.js";
import { payload } from "./services/verticalBriefService.js";

describe("format", () => {
  const report = payload().report;

  it("formats an executive summary for CLI output", () => {
    const summary = formatSummary(report);

    expect(summary).toContain("Board Growth Risk Thresholds");
    expect(summary).toContain(`Lanes: ${report.summary.items}`);
    expect(summary).toContain(`Value at stake: $${report.summary.valueAtStakeMillions}M`);
  });

  it("formats JSON output without losing report fields", () => {
    const parsed = JSON.parse(formatJson(report));

    expect(parsed.generatedAt).toBe(report.generatedAt);
    expect(parsed.summary.leadingMessage).toBe(report.summary.leadingMessage);
  });
});

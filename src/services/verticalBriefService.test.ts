import { describe, expect, it } from "vitest";
import { interventionPosture, payload, summary, thresholdLane, triggerLedger, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the threshold summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the threshold lane view", () => {
    expect(thresholdLane().length).toBeGreaterThan(0);
  });

  it("returns the trigger ledger view", () => {
    expect(triggerLedger().length).toBeGreaterThan(0);
  });

  it("returns the intervention posture view", () => {
    expect(interventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});

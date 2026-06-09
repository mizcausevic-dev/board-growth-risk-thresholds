import { describe, expect, it } from "vitest";
import {
  renderCapacityMap,
  renderDeliveryBottlenecks,
  renderDocs,
  renderGrowthSequencing,
  renderOverview,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderOverview()).toContain("Board Growth Risk Thresholds");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });

  it("renders every public proof route with shared product context", () => {
    const pages = [
      renderOverview(),
      renderCapacityMap(),
      renderDeliveryBottlenecks(),
      renderGrowthSequencing(),
      renderVerification(),
      renderDocs()
    ];

    for (const page of pages) {
      expect(page).toContain("Kinetic Gain");
      expect(page).toContain("Board Growth Risk Thresholds");
    }

    expect(renderOverview()).toContain("What this product does");
    expect(renderDocs()).toContain("What these repos have in common");
  });
});

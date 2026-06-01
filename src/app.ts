import express from "express";
import {
  payload,
  riskMap,
  summary,
  thresholdLane,
  triggerLedger,
  interventionPosture,
  verification
} from "./services/verticalBriefService.js";
import {
  renderCapacityMap,
  renderDeliveryBottlenecks,
  renderDocs,
  renderGrowthSequencing,
  renderOverview,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/threshold-lane", (_req, res) => res.type("html").send(renderCapacityMap()));
  app.get("/trigger-ledger", (_req, res) => res.type("html").send(renderDeliveryBottlenecks()));
  app.get("/intervention-posture", (_req, res) => res.type("html").send(renderGrowthSequencing()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/threshold-lane", (_req, res) => res.json(thresholdLane()));
  app.get("/api/trigger-ledger", (_req, res) => res.json(triggerLedger()));
  app.get("/api/intervention-posture", (_req, res) => res.json(interventionPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, "127.0.0.1", () => {
    console.log(`board-growth-risk-thresholds listening on http://127.0.0.1:${port}`);
  });
}

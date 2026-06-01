#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { formatJson, formatSummary } from "./format.js";
import type { BoardGrowthRiskThresholdExport } from "./types.js";

const defaultPath = "fixtures/board-growth-risk-thresholds.json";
const args = process.argv.slice(2);
const formatFlagIndex = args.indexOf("--format");

if (formatFlagIndex === -1 || !args[formatFlagIndex + 1]) {
  console.error("Usage: board-growth-risk-thresholds <file> --format <summary|json>");
  process.exit(1);
}

const inputPath = args[0] && !args[0].startsWith("--") ? args[0] : defaultPath;
const selectedFormat = args[formatFlagIndex + 1];
const report = JSON.parse(readFileSync(inputPath, "utf8")) as BoardGrowthRiskThresholdExport;

if (selectedFormat === "summary") {
  console.log(formatSummary(report));
} else if (selectedFormat === "json") {
  console.log(formatJson(report));
} else {
  console.error("Unsupported format. Use summary or json.");
  process.exit(1);
}

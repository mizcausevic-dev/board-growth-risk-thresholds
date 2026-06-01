import {
  interventionPosture,
  payload,
  riskMap,
  summary,
  thresholdLane,
  triggerLedger,
  verification
} from "./verticalBriefService.js";

const productTitle = "Board Growth Risk Thresholds";
const domain = "https://thresholds.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/threshold-lane", "Threshold lane"],
    ["/trigger-ledger", "Trigger ledger"],
    ["/intervention-posture", "Intervention posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = thresholdLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Threshold theme:</strong> ${escapeHtml(item.thresholdTheme)}</p>
        <p><strong>Board confidence:</strong> ${item.boardConfidenceScore}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeRiskScore} · $${item.valueAtStakeMillions}M at stake</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Growth guardrails</span>
      <h1>Where do growth claims still sit inside threshold, where do they breach, and when should the board intervene?</h1>
      <p class="lede">Board Growth Risk Thresholds turns AI, identity, revenue, FinTech, biotech, and procurement expansion pressure into one board-readable guardrail packet for intervention, pause, or reallocation decisions.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Threshold lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled lanes in the current board threshold packet.</div></div>
        <div class="metric"><span class="metric-label">Breaches</span><span class="metric-value">${executiveSummary.breaches}</span><div class="metric-copy">Lanes currently below one or more board-approved thresholds.</div></div>
        <div class="metric"><span class="metric-label">Interventions</span><span class="metric-value">${executiveSummary.interventions}</span><div class="metric-copy">Lanes requiring intervention or capital reallocation.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to getting threshold discipline wrong.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Threshold lane</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible exposures</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready threshold surface for pacing guardrails, downside triggers, intervention posture, and value-at-stake across the executive estate."
  );
}

export function renderCapacityMap() {
  const rows = thresholdLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.thresholdTheme)}</td>
        <td>${item.boardConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Threshold lane",
    "/threshold-lane",
    `<section class="hero">
      <span class="eyebrow">Threshold lane</span>
      <h1>Every growth claim stays tied to one threshold theme, one board audience, and one safe next move.</h1>
      <p class="lede">The threshold lane keeps expansion posture readable instead of hiding guardrails across scattered operating updates and investor-language shortcuts.</p>
      <div class="nav">${navLinks("/threshold-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Threshold theme</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Growth-threshold view showing actions, themes, and board-confidence strength."
  );
}

export function renderDeliveryBottlenecks() {
  const rows = triggerLedger()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.failureTrigger)}</td>
        <td>${escapeHtml(item.downsideTrigger)}</td>
        <td>${escapeHtml(item.interventionOwner)}</td>
        <td>${escapeHtml(item.requiredEvidence.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Trigger ledger",
    "/trigger-ledger",
    `<section class="hero">
      <span class="eyebrow">Trigger ledger</span>
      <h1>Failure triggers, downside triggers, and intervention owners stay visible before leadership crosses the line.</h1>
      <p class="lede">This view makes it obvious which threshold breaches should halt the next growth claim and who must respond when a lane drifts below tolerance.</p>
      <div class="nav">${navLinks("/trigger-ledger")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Failure trigger</th><th>Downside trigger</th><th>Intervention owner</th><th>Required evidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Trigger-ledger view for failure signals, downside triggers, and named intervention ownership."
  );
}

export function renderGrowthSequencing() {
  const rows = interventionPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeRiskScore}</td>
        <td>${escapeHtml(item.dependency.severity)}</td>
        <td>${escapeHtml(item.downside.severity)}</td>
        <td>${escapeHtml(item.confidence.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Intervention posture",
    "/intervention-posture",
    `<section class="hero">
      <span class="eyebrow">Intervention posture</span>
      <h1>See where leadership can advance, where it should hold, and where the board should intervene or reallocate.</h1>
      <p class="lede">This posture view keeps risk scores and threshold severities connected so the board can react before expansion multiplies the downside.</p>
      <div class="nav">${navLinks("/intervention-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Composite risk</th><th>Dependency</th><th>Downside</th><th>Confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Intervention posture view for threshold severities, risk scores, and board-safe action."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this threshold packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, threshold assumptions, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Growth Risk Thresholds sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Growth Risk Thresholds docs</h1>
      <p class="lede">This surface packages board-readable growth guardrails into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/threshold-lane</code> keeps actions, threshold themes, and next moves readable.</li>
        <li><code>/trigger-ledger</code> compares failure triggers, downside triggers, and intervention ownership.</li>
        <li><code>/intervention-posture</code> shows which lanes can advance, hold, intervene, or reallocate.</li>
        <li><code>/api/payload</code> exposes the reproducible board-threshold packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Growth Risk Thresholds and its board-ready routes."
  );
}

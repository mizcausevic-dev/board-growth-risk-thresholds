# Architecture

Board Growth Risk Thresholds is a static-friendly TypeScript executive-intelligence surface for showing where growth claims remain inside tolerance, which lanes are approaching breach, and where the board should hold, intervene, or reallocate.

## Routes

- `/`
- `/threshold-lane`
- `/trigger-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample threshold items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores dependency coverage, operating discipline, downside containment, cash exposure, and board confidence against defined thresholds.
3. `src/services/verticalBriefService.ts` shapes the board-readable guardrail packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.

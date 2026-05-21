# AI Cognitive Archetype Quiz

A dark-first frontend quiz for developers by The Thinking Engineer. The quiz asks scenario-based, single-select questions and maps answers to one of four AI cognitive archetypes:

- AI Architect
- AI Balancer
- Autopilot Builder
- AI Passenger

The app is frontend-only. It does not use a backend, persistence, analytics, or tracking.

## Tech Stack

- Vite
- React
- TypeScript
- Vitest
- Playwright
- Biome
- `html-to-image` for result card PNG export

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Run verification:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

GitHub Actions runs the same verification flow on pushes and pull requests to `main`.

## Project Structure

- `src/components/quiz/` - quiz UI components and reducer-driven flow
- `src/lib/quiz/quiz-data.ts` - questions and weighted answer data
- `src/lib/quiz/scoring.ts` - deterministic dimension and archetype scoring
- `src/lib/quiz/archetypes.ts` - result metadata and improvement actions
- `src/lib/quiz/links.ts` - Gumroad and quiz share URLs

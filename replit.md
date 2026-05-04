# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Billions Allocation Dashboard (`artifacts/billions-dashboard`)

- **Framework**: Next.js 15 App Router + TypeScript
- **Styling**: Tailwind CSS v3 with cyberpunk dark theme (neon cyan #00f0ff + magenta #ff00aa)
- **Wallet**: wagmi v2 + viem + RainbowKit (Ethereum + BNB Chain)
- **Port**: 3000
- **Workflow**: "Billions Dashboard"
- **Features**:
  - BILLIONS logo navbar with RainbowKit wallet connect
  - Live countdown timer to May 4, 2026 00:00 UTC
  - Power Points display (animated counter) after wallet connect
  - Estimated $BILL allocation section (TBA)
  - Community 6.28% TGE unlock progress bar
  - Disabled "Prepare Claim" button with tooltip
  - Glassmorphic cards, glitch effects, scanline overlay
  - Fully responsive, dark mode only, loading skeletons
- **Env vars needed**: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (from cloud.walletconnect.com)

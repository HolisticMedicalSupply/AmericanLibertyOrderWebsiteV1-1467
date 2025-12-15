# Claude.md - American Liberty Order Website

## Project Overview

This is the **American Liberty Order (ALO)** website - a modern, full-stack civic organization platform dedicated to defending constitutional principles, expanding citizen influence, and strengthening American liberty through concrete policy reforms and community engagement.

**Tech Stack:**
- **Frontend:** React 19 + TypeScript 5.8 + Vite 7.1
- **Backend:** Cloudflare Workers + Hono.js framework
- **Database:** Cloudflare D1 (SQLite) + Drizzle ORM
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **Auth:** Better Auth with email/password
- **AI:** Vercel AI SDK with Claude & GPT models
- **Billing:** Autumn.js
- **Package Manager:** Bun (recommended)

## Quick Reference

### Essential Commands
```bash
bun install                                    # Install dependencies
bun run dev                                    # Start dev server (localhost:5173)
bun run build                                  # Production build
bun run pre-deploy                             # Build + generate migrations
bun x tsc --noEmit -p ./tsconfig.app.json      # Typecheck frontend
bun x tsc --noEmit -p ./tsconfig.worker.json   # Typecheck backend
```

### Project Structure
```
├── src/                    # Frontend React application
│   ├── pages/              # Page components (11 pages)
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # shadcn/ui primitives
│   │   ├── billing/        # Billing components
│   │   └── chat/           # AI chat interface
│   ├── lib/                # Utilities (auth, api-client, etc.)
│   ├── data/               # JSON data (policies, programs)
│   ├── styles/             # Global CSS
│   └── app.tsx             # Router configuration
├── worker/                 # Cloudflare Workers backend
│   ├── routes/             # API route handlers
│   ├── middleware/         # Auth middleware
│   ├── db/                 # Drizzle ORM schema
│   └── app.ts              # Hono app setup
├── public/                 # Static assets
└── Configuration files     # Various configs at root
```

## Non-Negotiable Rules

### 1. Type Safety is Mandatory
Always run typechecks before completing any task:
```bash
bun x tsc --noEmit -p ./tsconfig.app.json      # Frontend
bun x tsc --noEmit -p ./tsconfig.worker.json   # Worker
```

### 2. Import Path Rules
- **Frontend (`src/*`):** Use `@/*` alias (e.g., `@/lib/auth`, `@/components/ui/button`)
- **Worker (`worker/*`):** Use **relative paths only** (e.g., `../middleware/auth`, `../db/schema`)
- **Never** use `@/*` inside worker directory - it will cause build errors

### 3. No Browser Storage for App Data
- **Allowed:** Theme preference in localStorage
- **Not allowed:** User data, auth state, application data in browser storage
- **Required:** Use backend routes + Drizzle ORM for all persistent data

### 4. Authentication Patterns
```typescript
// Frontend: ALWAYS use authClient from @/lib/auth
import { authClient } from '@/lib/auth';
await authClient.signIn.email({ email, password });
await authClient.getSession();

// NEVER use apiClient for auth - it doesn't expose auth routes
// ❌ apiClient.auth.signIn() - THIS WILL ERROR
```

### 5. API Route Typing
```typescript
// Worker routes MUST use HonoContext for proper typing
import { Hono } from 'hono';
import type { HonoContext } from '../types';

export const myRoutes = new Hono<HonoContext>()  // ✅ Correct
  .get('/', async (c) => {
    const db = c.get('db');    // Properly typed
    const user = c.get('user'); // Properly typed
  });

// ❌ new Hono() without <HonoContext> will cause typing errors
```

## Key Files Reference

| Purpose | Location |
|---------|----------|
| Site metadata | `website.config.json` |
| Frontend routes | `src/app.tsx` |
| API routes | `worker/routes/index.ts` |
| Auth setup | `worker/auth.ts`, `src/lib/auth.ts` |
| Database schema | `worker/db/auth-schema.ts` |
| Policy data | `src/data/policy-data.json` |
| Program data | `src/data/programs-data.json` |
| Global styles | `src/styles/global.css` |
| Type definitions | `src/types/`, `worker/types.ts` |

## Design System

### Theme Modes (OKLCH Color Space)

**Light Mode - "Parchment Old World":**
- **Background:** Warm parchment `oklch(0.94 0.025 75)` with aged paper texture
- **Primary:** Deep colonial navy `oklch(0.25 0.12 264)` for headers
- **Accent:** Antique gold `oklch(0.65 0.15 85)` for highlights and CTAs
- **Surface:** Lighter parchment `oklch(0.96 0.018 75)` for cards
- **Text:** Sepia-toned dark `oklch(0.25 0.02 60)`

**Dark Mode - "Tech Colonial":**
- **Background:** Deep navy `oklch(0.14 0.035 264)` with subtle tech grid pattern
- **Primary:** Luminous gold `oklch(0.78 0.16 85)` for headers (high visibility)
- **Accent:** Bright amber `oklch(0.72 0.18 85)` for highlights
- **Surface:** Navy glass `oklch(0.18 0.04 264)` with luminous borders
- **Text:** Cream white `oklch(0.96 0.02 85)`

### Special Classes
- `.gradient-text` - Theme-adaptive gradient text with glow effects in dark mode
- `.glass` - Glassmorphism effect, adapts to light/dark themes

### Theme Support
- Light mode by default (`defaultTheme: "light"` in config)
- Theme toggle stored in localStorage as `theme`
- CSS variables defined in `src/styles/global.css`

### Component Library
Using shadcn/ui with Radix primitives. Add components:
```bash
bun x shadcn@latest add <component-name>
```

## Common Development Patterns

### Adding a New Page
1. Create page: `src/pages/NewPage.tsx`
2. Register route in `src/app.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```
3. If protected, wrap with `<RequireAuth>` or `<RequireAdmin>`

### Adding a New API Route
1. Create route file: `worker/routes/my-routes.ts`
```typescript
import { Hono } from 'hono';
import { authenticatedOnly } from '../middleware/auth';
import type { HonoContext } from '../types';

export const myRoutes = new Hono<HonoContext>()
  .use('*', authenticatedOnly)
  .get('/', async (c) => {
    const user = c.get('user');
    return c.json({ data: 'example' });
  });
```

2. Register in `worker/routes/index.ts`:
```typescript
import { myRoutes } from './my-routes';
export const apiRoutes = new Hono<HonoContext>()
  .route('/my-endpoint', myRoutes);
```

### Frontend API Calls
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

// GET request
const { data } = useQuery({
  queryKey: ['my-data'],
  queryFn: async () => {
    const res = await apiClient['my-endpoint'].$get();
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
});

// POST request
const mutation = useMutation({
  mutationFn: async (body: MyType) => {
    const res = await apiClient['my-endpoint'].$post({ json: body });
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
});
```

## Content Data Structure

### Policies (10 pillars)
Located in `src/data/policy-data.json`:
- Economic Freedom & Anti-Cronyism
- Food & Health Sovereignty
- Property Rights
- Government Accountability
- Election Integrity
- Constitutional Rights Suite
- Foreign Policy & National Interest
- Monetary & Currency Reform
- Tax Reform
- Drug Policy Reform
- Housing Reform

### Programs (11 categories)
Located in `src/data/programs-data.json`:
- Member Support, Community Service, Youth Programs
- Media & Public Influence, Education & Training
- Professional Development, Preparedness & Self-Reliance

## AI Integration

### Backend Route
`POST /api/ai/chat` - Streaming chat completions

### Supported Models
- OpenAI: `gpt-5`, `gpt-5-codex`, `gpt-5-mini`, `gpt-5-nano`
- Anthropic: `claude-4`, `claude-4.5-sonnet`

### Frontend Usage
```typescript
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({ api: '/api/ai/chat' }),
});
```

## Database Schema

Four core tables (Better Auth):
- `users` - User accounts with role, ban status
- `sessions` - Session tokens with geolocation
- `accounts` - OAuth provider links
- `verifications` - Email verification codes

## Deployment

**Platform:** Cloudflare Workers + D1 + Pages (auto-deploy via GitHub)

**Live Deployment:**
- GitHub pushes to `main` auto-deploy to Cloudflare
- Preview deployments created for PRs
- D1 Database: `american-liberty-order-db`

**Manual Commands:**
```bash
bun run pre-deploy         # Prepare for deployment
bunx wrangler deploy       # Deploy to Cloudflare
```

**Configuration:** `wrangler.jsonc` contains D1 bindings and worker settings

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module '@/worker/...'` | Using `@/*` in worker | Use relative imports |
| `c.get('db')` typed as `never` | Missing `HonoContext` | Add `<HonoContext>` to Hono constructor |
| `Property 'auth' does not exist` | Using apiClient for auth | Use `authClient` instead |
| Type errors in components | Unused imports | Remove unused imports/variables |

## Organization Context

**Mission:** Defend constitutional principles, expand citizen influence, and strengthen American liberty through implementable reforms.

**Core Values:** Limited government, individual liberty, constitutional fidelity, local control, rule of law, transparency, accountability, market-based solutions.

**Target Audience:** Civic-minded Americans, small business owners, parents, veterans, community leaders, students, and anyone concerned about government overreach.

**Strategic Approach:** State-first strategy, phased implementation, coalition building, transparency, education before advocacy.

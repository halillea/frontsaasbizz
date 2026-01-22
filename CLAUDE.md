# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SaaSBizz is a Nuxt 4 static site that displays a leaderboard of verified SaaS startups. The site is pre-rendered for static hosting (e.g., Bluehost).

## Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Build for production (generates static files)
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Architecture

**Framework**: Nuxt 4 with Vue 3, Tailwind CSS, SSR enabled for static generation.

**Data Source**: All startup data lives in `content/startups.json`. This JSON is imported directly in components and in `nuxt.config.ts` to generate static routes.

**Route Structure**:

- `/` - Main leaderboard (top 30 earners + recently added)
- `/startup/[slug]` - Individual startup detail pages (slug = `trustmrr_profile_url`)
- `/founder/[slug]` - Founder profile pages showing all startups by that founder

**Static Generation**: Routes are explicitly listed in `nuxt.config.ts` under `nitro.prerender.routes`. The config imports `startups.json` and generates paths for all startups and valid founders. Crawl-based discovery is disabled (`crawlLinks: false`).

**Key Patterns**:

- Revenue parsing: Strings like "$116,350" are parsed with regex removing non-numeric chars
- Founder slug generation: Names are cleaned (alphanumeric + spaces), lowercased, spaces replaced with hyphens
- Founder validation: Entries with `null,` or length <= 2 are filtered out
- Favicon images: Fetched from Google's favicon service using startup domain
- Founder images: Stored locally in `/public/founder_images/`

**Components**:

- `StartupCard.vue` - Reusable card showing startup info, MRR, growth, and founder link

## Available Commands

Local slash commands available in this project:

- `/test-all` - Run full test suite with coverage
- `/test-quick` - Run tests on changed files only

## Test Commands

- Run tests: `npm run test`
- Coverage: `npm run test:coverage`

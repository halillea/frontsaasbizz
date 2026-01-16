---
description: Run code quality check on all frontend components
---

## Code Quality Check

Analyze the following components and provide:
- Quality score (1-10) for each component
- Performance concerns (loading, bundle size)
- Best practice violations
- Specific improvement suggestions

### Files to Review:
1. `pages/index.vue` - Homepage
2. `pages/startup/[slug].vue` - Startup detail
3. `pages/founder/[slug].vue` - Founder detail
4. `components/StartupCard.vue` - Main card component
5. `components/SearchSection.vue` - Search with autocomplete
6. `layouts/default.vue` - Main layout
7. `assets/css/main.css` - Global styles
8. `nuxt.config.ts` - Nuxt configuration

### Check for:
- SSR/SSG optimization
- Image lazy loading
- Unused code/imports
- Accessibility (a11y)
- SEO meta tags
- Bundle size concerns

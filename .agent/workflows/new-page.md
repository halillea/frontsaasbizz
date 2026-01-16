---
description: Create a new page with standard SaaSBizz structure
---

## Create New Page

When creating a new page, follow this template structure:

### Template Structure:
```vue
<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="text-center py-8">
      <h1 class="text-4xl font-black tracking-tight text-white mb-4">
        Page Title
      </h1>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto">
        Page description
      </p>
    </header>

    <!-- Content -->
    <section class="glass-card rounded-3xl p-8">
      <!-- Page content here -->
    </section>

    <!-- Search Section (optional) -->
    <SearchSection />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Page Title - SaaSBizz',
  description: 'Page description for SEO',
  ogTitle: 'Page Title - SaaSBizz',
  ogDescription: 'Page description for SEO',
})
</script>
```

### Checklist:
- [ ] Add SEO meta tags
- [ ] Use glass-card for main content areas
- [ ] Add SearchSection if appropriate
- [ ] Update footer links in `layouts/default.vue` if needed
- [ ] Add route to `nuxt.config.ts` prerender routes if static

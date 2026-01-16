<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="text-center py-8">
      <h1 class="text-4xl font-black tracking-tight text-white mb-4">
        Search Startups
      </h1>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto">
        Find verified SaaS startups by name, founder, category, domain, or social handle
      </p>
    </header>

    <!-- Search Section -->
    <SearchSection />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Search Startups - SaaSBizz',
  description: 'Search the SaaSBizz database of verified SaaS startups by name, founder, category, domain, or social handle.',
  ogTitle: 'Search Startups - SaaSBizz',
  ogDescription: 'Search the SaaSBizz database of verified SaaS startups by name, founder, category, domain, or social handle.',
})
</script>

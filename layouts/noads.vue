<template>
  <div class="min-h-screen bg-[#030712] font-sans text-slate-200 selection:bg-blue-500/30 selection:text-blue-200">
    <!-- Main Layout Container - No Sidebars -->
    <main id="main-content" class="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6" role="main">
      <!-- Header -->
      <header class="sticky top-0 z-40 backdrop-blur-xl bg-[#030712]/80 border-b border-white/5 rounded-2xl px-6 py-4 mb-6" role="banner">
        <nav class="flex items-center justify-center" aria-label="Main navigation">
          <NuxtLink
            to="/"
            class="group flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#030712] rounded-md"
            aria-label="SaaSBizz home page"
          >
            <span class="text-3xl font-black uppercase tracking-tight text-white italic group-hover:text-blue-400 transition-colors">
              SaaSBizz
            </span>
          </NuxtLink>
        </nav>
      </header>

      <!-- Page Content -->
      <section class="relative">
        <ErrorBoundary>
          <slot />
        </ErrorBoundary>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

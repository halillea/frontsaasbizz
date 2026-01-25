<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <span class="text-3xl" aria-hidden="true">📂</span>
      <h2 class="text-3xl font-black tracking-tight text-white uppercase italic font-outfit">
        Browse Categories
      </h2>
    </div>

    <!-- Category Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="category in categories"
        :key="category.slug"
        :to="`/category/${category.slug}`"
        class="group flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-[#0f172a]/50 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
      >
        <!-- Icon -->
        <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-800/50 text-2xl group-hover:scale-110 transition-transform duration-300 shrink-0 border border-white/5">
          {{ category.icon }}
        </div>

        <!-- Text Content -->
        <div class="flex flex-col gap-1">
          <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors font-outfit">
            {{ category.name }}
          </h3>
          <p class="text-xs text-slate-400 font-medium leading-relaxed">
            {{ category.description }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategories } from '~/composables/useCategories'

const { categories } = useCategories()

useSeoMeta({
  title: 'Browse Categories - SaaSBizz',
  description: 'Explore verified SaaS startups by category: AI, Marketing, eCommerce, and more.',
})
</script>

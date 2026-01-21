<template>
  <article class="glass-card rounded-3xl p-8 min-h-[80vh]">
    <!-- Not Found State -->
    <div v-if="!startup" class="text-center py-20 text-slate-400">
      <h1 class="text-2xl font-bold text-white">Startup not found</h1>
      <NuxtLink
        to="/"
        class="text-blue-400 underline mt-4 block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] rounded"
      >
        Return to Leaderboard
      </NuxtLink>
    </div>

    <!-- Startup Content -->
    <div v-else>
      <!-- Header Area with Valuation Calculator -->
      <div class="flex flex-col lg:flex-row gap-8 items-start mb-10">
        
        <!-- Left Side: Logo & Info -->
        <div class="flex-1 w-full">
          <header class="flex flex-col md:flex-row gap-6 items-start">
            <!-- Logo -->
            <div class="relative flex-shrink-0">
              <div class="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl"></div>
              <img
                :src="`https://www.google.com/s2/favicons?domain=${startup.domain}&sz=256`"
                :alt="`${startup.startup_name} logo`"
                class="relative w-32 h-32 rounded-3xl border-4 border-white/10 shadow-lg bg-slate-900 object-contain p-2"
                width="128"
                height="128"
                @error="handleLogoError"
              >
            </div>

            <!-- Text Content -->
            <div class="flex-1 pt-1 min-w-0">
              <div class="flex flex-col gap-2">
                <h1 class="text-5xl font-black text-white tracking-tight">{{ startup.startup_name }}</h1>
                
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-slate-500 text-xs font-medium">Verified SaaS</span>
                </div>
                
                <p class="text-lg text-slate-400 leading-relaxed font-medium mb-4">{{ startup.tagline || startup.full_description }}</p>

                <!-- Moved Visit Website Button -->
                <a
                  v-if="startup.domain"
                  :href="`https://${startup.domain}`"
                  target="_blank"  
                  rel="noopener noreferrer"
                  :class="themeColor === 'white' 
                    ? 'bg-slate-200 text-slate-700 hover:bg-slate-300 shadow-slate-200/20' 
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'"
                  class="inline-flex items-center justify-center w-full md:w-auto self-start gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] active:scale-95 shadow-lg"
                  :aria-label="`Visit ${startup.startup_name} website (opens in new tab)`"
                >
                  Visit Website
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </header>
        </div>
        <!-- Right Side: Valuation Calculator -->
        <div class="w-full lg:w-[420px] flex-shrink-0">
          <ValuationCalculator :revenue="startup.total_revenue" />
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" role="group" aria-label="Startup statistics">
        <!-- Total Revenue -->
        <div :class="themeColor === 'white' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/50 border-white/5'" class="p-5 rounded-2xl border flex flex-col justify-center h-32">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 truncate">
            Total Revenue <span class="text-blue-400 font-extrabold ml-2">#{{ startupRank }}</span>
          </div>
          <div class="text-2xl font-mono font-bold text-white">{{ formatCurrency(startup.total_revenue) }}</div>
          <div v-if="hasValidGrowth" class="text-[10px] text-green-400 font-bold mt-1">
            <span aria-hidden="true">↑</span> {{ formatGrowth(startup.mom_growth) }} Monthly Growth
          </div>
        </div>

        <!-- MRR -->
        <div :class="themeColor === 'white' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/50 border-white/5'" class="p-5 rounded-2xl border flex flex-col justify-center h-32">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">MRR</div>
          <div class="text-2xl font-mono font-bold text-white">{{ formatCurrency(startup.mrr) }}</div>
          <div v-if="startup.subscriptions" class="text-[10px] text-slate-500 font-bold mt-1">
            {{ startup.subscriptions }} Subscribers
          </div>
        </div>

        <!-- Founder -->
        <div :class="themeColor === 'white' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/50 border-white/5'" class="p-5 rounded-2xl border flex flex-col justify-center h-32">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Founder</div>
          <div class="flex items-center gap-3">
            <NuxtLink
              v-if="hasValidFounder"
              :to="`/founder/${founderSlug}`"
              class="flex-shrink-0 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              :aria-label="`View ${startup.founder_name}'s profile`"
            >
              <NuxtImg
                v-if="startup.founder_image_local_path"
                :src="`/founder_images/${startup.founder_image_local_path}`"
                :alt="`${startup.founder_name} profile photo`"
                class="w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-blue-400"
                width="40"
                height="40"
                loading="lazy"
              />
              <div v-else class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs" aria-hidden="true">
                {{ startup.founder_name?.charAt(0) || '?' }}
              </div>
            </NuxtLink>
            <div class="min-w-0 overflow-hidden">
              <NuxtLink
                v-if="hasValidFounder"
                :to="`/founder/${founderSlug}`"
                class="text-sm font-bold text-white truncate hover:text-blue-400 transition-colors block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                {{ startup.founder_name }}
              </NuxtLink>
              <span v-else class="text-sm font-bold text-slate-500 block">Anonymous</span>

              <a
                v-if="startup.founder_social"
                :href="`https://x.com/${startup.founder_social.replace('@', '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[9px] text-blue-400 hover:underline block mt-0.5 truncate focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                :aria-label="`${startup.founder_name} on X - ${formatFollowers(startup.x_follower_count)} followers (opens in new tab)`"
              >
                {{ formatFollowers(startup.x_follower_count) }} followers on X @{{ startup.founder_social.replace('@', '') }}
              </a>
            </div>
          </div>
        </div>

        <!-- Founded -->
        <div :class="themeColor === 'white' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/50 border-white/5'" class="p-5 rounded-2xl border flex flex-col justify-center h-32">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 truncate">
            Founded <span class="text-slate-400 ml-2">{{ startup.category }}</span>
          </div>
          <div class="text-lg font-bold text-white">{{ startup.founded_date || 'N/A' }}</div>
          <div v-if="startup.location" class="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tight flex items-center gap-1">
            <span aria-hidden="true">📍</span> {{ startup.location }}
          </div>
        </div>
      </div>

      <!-- Business Overview -->
      <section :class="themeColor === 'white' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/50 border-white/5'" class="rounded-2xl p-6 border" aria-labelledby="overview-heading">
        <h2 id="overview-heading" class="text-sm font-bold text-white uppercase tracking-wide mb-4 border-b border-white/10 pb-2">Business Overview</h2>
        <p class="text-slate-400 leading-7 whitespace-pre-wrap">{{ startup.full_description }}</p>
      </section>

      <!-- Search Section -->
      <SearchSection />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import allStartups from '~/content/startups.json'
import { parseRevenue, getFounderSlug, isValidFounder, isValidGrowth, formatFollowers, formatCurrency, formatGrowth } from '~/utils/helpers'
import { useTheme } from '~/composables/useTheme'
import type { Startup } from '~/types/startup'

const { themeColor } = useTheme()
const route = useRoute()
const startups = allStartups as Startup[]

const startup = computed(() =>
  startups.find(s => s.trustmrr_link === route.params.slug)
)

const startupRank = computed(() => {
  if (!startup.value) return '-'
  const sorted = [...startups].sort((a, b) => parseRevenue(b.total_revenue) - parseRevenue(a.total_revenue))
  return sorted.findIndex(s => s.id === startup.value!.id) + 1
})

const hasValidFounder = computed(() => isValidFounder(startup.value?.founder_name))
const hasValidGrowth = computed(() => isValidGrowth(startup.value?.mom_growth))
const founderSlug = computed(() => getFounderSlug(startup.value?.founder_name))

// Image error handling
const handleLogoError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="%2394a3b8">?</text></svg>'
}

// SEO Meta
useSeoMeta({
  title: () => startup.value ? `${startup.value.startup_name} - Verified SaaS Stats` : 'Startup Not Found',
  description: () => startup.value?.tagline || startup.value?.full_description || 'View verified SaaS startup metrics',
  ogTitle: () => startup.value ? `${startup.value.startup_name} - Verified SaaS Stats` : 'Startup Not Found',
  ogDescription: () => startup.value?.tagline || startup.value?.full_description || 'View verified SaaS startup metrics',
  ogUrl: () => `https://saasbizz.com/startup/${route.params.slug}/`,
  twitterTitle: () => startup.value ? `${startup.value.startup_name} - Verified SaaS Stats` : 'Startup Not Found',
  twitterDescription: () => startup.value?.tagline || startup.value?.full_description || 'View verified SaaS startup metrics',
})

// JSON-LD Structured Data
useHead({
  script: startup.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: startup.value.startup_name,
        description: startup.value.full_description || startup.value.tagline,
        url: startup.value.domain,
        applicationCategory: startup.value.category || 'BusinessApplication',
        operatingSystem: 'Web',
        author: startup.value.founder_name ? {
          '@type': 'Person',
          name: startup.value.founder_name
        } : undefined,
        datePublished: startup.value.founded_date,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          ratingCount: '1'
        }
      })
    }
  ] : []
})
</script>

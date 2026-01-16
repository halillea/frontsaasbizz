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
      <!-- Header -->
      <header class="flex flex-col md:flex-row gap-6 mb-10 items-start">
        <div class="relative flex-shrink-0">
          <div class="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl"></div>
          <img
            :src="`https://www.google.com/s2/favicons?domain=${startup.domain || startup.website_url}&sz=256`"
            :alt="`${startup.startup_name} logo`"
            class="relative w-32 h-32 rounded-3xl border-4 border-white/10 shadow-lg bg-slate-900 object-contain p-2"
            width="128"
            height="128"
            @error="handleLogoError"
          >
        </div>
        <div class="flex-1 pt-1">
          <div class="flex justify-between items-start">
            <h1 class="text-5xl font-black text-white tracking-tight mb-3">{{ startup.startup_name }}</h1>
            <a
              v-if="startup.website_url"
              :href="startup.website_url"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden md:flex items-center gap-1 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] active:scale-95"
              :aria-label="`Visit ${startup.startup_name} website (opens in new tab)`"
            >
              Visit Website
            </a>
          </div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-slate-500 text-xs font-medium">Verified SaaS</span>
          </div>
          <p class="text-lg text-slate-400 leading-relaxed font-medium">{{ startup.tagline || startup.full_description }}</p>
        </div>
      </header>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" role="group" aria-label="Startup statistics">
        <!-- Total Revenue -->
        <div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-center h-32">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 truncate">
            Total Revenue <span class="text-blue-400 font-extrabold ml-2">#{{ startupRank }}</span>
          </div>
          <div class="text-2xl font-mono font-bold text-white">{{ startup.total_revenue }}</div>
          <div v-if="hasValidGrowth" class="text-[10px] text-green-400 font-bold mt-1">
            <span aria-hidden="true">↑</span> {{ startup.mom_growth }} Monthly Growth
          </div>
        </div>

        <!-- MRR -->
        <div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-center h-32">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">MRR</div>
          <div class="text-2xl font-mono font-bold text-white">{{ startup.mrr }}</div>
          <div v-if="startup.subscriptions" class="text-[10px] text-slate-500 font-bold mt-1">
            {{ startup.subscriptions }} Subscribers
          </div>
        </div>

        <!-- Founder -->
        <div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-center h-32">
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
        <div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-center h-32">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 truncate">
            Founded <span class="text-slate-400 ml-2">{{ startup.category }}</span>
          </div>
          <div class="text-lg font-bold text-white">{{ startup.founded_date || 'N/A' }}</div>
          <div v-if="startup.country" class="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tight flex items-center gap-1">
            <span aria-hidden="true">📍</span> {{ startup.country }}
          </div>
        </div>
      </div>

      <!-- Business Overview -->
      <section class="bg-slate-800/50 rounded-2xl p-6 border border-white/5" aria-labelledby="overview-heading">
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
import { parseRevenue, getFounderSlug, isValidFounder, isValidGrowth, formatFollowers } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const route = useRoute()
const startups = allStartups as Startup[]

const startup = computed(() =>
  startups.find(s => s.trustmrr_profile_url === route.params.slug)
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
        url: startup.value.website_url,
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

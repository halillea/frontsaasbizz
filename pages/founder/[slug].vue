<template>
  <div>
    <!-- Not Found State -->
    <div v-if="!profile" class="text-center py-20 glass-card rounded-3xl">
      <h1 class="text-2xl font-bold text-white">Founder not found</h1>
      <NuxtLink
        to="/"
        class="mt-4 inline-block text-blue-400 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] rounded"
      >
        Go Home
      </NuxtLink>
    </div>

    <!-- Founder Profile -->
    <article v-else class="glass-card rounded-3xl p-8 min-h-[80vh]">
      <!-- Profile Header -->
      <header class="flex flex-col items-center text-center mb-12">
        <div class="relative">
          <div class="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
          <NuxtImg
            v-if="profile.founder_image_local_path"
            :src="`/founder_images/${profile.founder_image_local_path}`"
            :alt="`${profile.founder_name} profile photo`"
            class="relative w-32 h-32 rounded-full object-cover border-4 border-white/10 shadow-xl mb-6 bg-slate-900"
            width="128"
            height="128"
            loading="eager"
            @error="handleImageError"
          />
          <div 
            v-else 
            class="relative w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-4xl font-black text-slate-500 border-4 border-white/10 mb-6"
          >
            {{ profile.founder_name?.charAt(0) || '?' }}
          </div>
        </div>
        <h1 class="text-4xl font-black text-white tracking-tight">{{ profile.founder_name }}</h1>

        <div class="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400 font-medium flex-wrap">
          <span class="text-white font-bold">{{ projects.length }} startup{{ projects.length !== 1 ? 's' : '' }}</span>
          <span class="text-slate-600" aria-hidden="true">·</span>
          <span>{{ formatFollowers(profile.x_follower_count) }} X followers</span>
          <a
            v-if="profile.founder_social"
            :href="`https://x.com/${profile.founder_social.replace('@', '')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:underline hover:text-blue-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            :aria-label="`${profile.founder_name} on X (opens in new tab)`"
          >
            @{{ profile.founder_social.replace('@', '') }}
          </a>
        </div>
      </header>

      <!-- Portfolio Section -->
      <section aria-labelledby="portfolio-heading">
        <h2 id="portfolio-heading" class="text-xl font-bold text-white border-b border-white/10 pb-2 tracking-tight uppercase italic flex items-center justify-between mb-6">
          <span>Portfolio</span>
        </h2>
        <div class="space-y-4" role="list" aria-label="Founder's startups">
          <StartupCard v-for="startup in projects" :key="startup.id" :startup="startup" />
        </div>
      </section>

      <!-- Search Section -->
      <SearchSection />
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import allStartups from '~/content/startups.json'
import { getFounderSlug, formatFollowers } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const route = useRoute()
const startups = allStartups as Startup[]

const currentSlug = decodeURIComponent(route.params.slug as string)

const projects = computed(() =>
  startups.filter(s => getFounderSlug(s.founder_name) === currentSlug)
)

const profile = computed(() => projects.value.length > 0 ? projects.value[0] : null)

// Image error handling
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

// SEO Meta
useSeoMeta({
  title: () => profile.value ? `${profile.value.founder_name} - Founder Profile` : 'Founder Not Found',
  description: () => profile.value
    ? `${profile.value.founder_name} is building ${projects.value.length} verified SaaS startup${projects.value.length !== 1 ? 's' : ''} on SaaSBizz.`
    : 'View founder profile on SaaSBizz',
  ogTitle: () => profile.value ? `${profile.value.founder_name} - Founder Profile` : 'Founder Not Found',
  ogDescription: () => profile.value
    ? `${profile.value.founder_name} is building ${projects.value.length} verified SaaS startup${projects.value.length !== 1 ? 's' : ''} on SaaSBizz.`
    : 'View founder profile on SaaSBizz',
  ogUrl: () => `https://saasbizz.com/founder/${route.params.slug}/`,
  twitterTitle: () => profile.value ? `${profile.value.founder_name} - Founder Profile` : 'Founder Not Found',
  twitterDescription: () => profile.value
    ? `${profile.value.founder_name} is building ${projects.value.length} verified SaaS startup${projects.value.length !== 1 ? 's' : ''} on SaaSBizz.`
    : 'View founder profile on SaaSBizz',
})

// JSON-LD Structured Data
useHead({
  script: profile.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.value.founder_name,
        url: `https://saasbizz.com/founder/${currentSlug}/`,
        sameAs: profile.value.founder_social
          ? [`https://x.com/${profile.value.founder_social.replace('@', '')}`]
          : [],
        image: profile.value.founder_image_local_path
          ? `https://saasbizz.com/founder_images/${profile.value.founder_image_local_path}`
          : undefined,
        jobTitle: 'Founder',
        worksFor: projects.value.map(p => ({
          '@type': 'Organization',
          name: p.startup_name,
          url: p.website_url
        }))
      })
    }
  ] : []
})
</script>

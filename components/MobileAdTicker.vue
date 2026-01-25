<template>
  <!-- Mobile-only sponsor ticker - fixed at top -->
  <div class="lg:hidden fixed top-0 left-0 right-0 z-[60] h-9 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-b border-white/10 overflow-hidden">
    <!-- Ticker Track -->
    <div class="h-full flex items-center">
      <div class="flex items-center gap-8 whitespace-nowrap animate-ad-ticker pl-4">
        <!-- First set of ads -->
        <a 
          v-for="ad in allAds" 
          :key="ad.id"
          :href="ad.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
          <!-- Logo or Emoji -->
          <img 
            v-if="ad.logoUrl" 
            :src="ad.logoUrl" 
            :alt="ad.name"
            class="w-5 h-5 rounded object-contain"
            @error="handleImageError"
          >
          <span 
            v-else-if="ad.emoji" 
            class="text-sm"
          >{{ ad.emoji }}</span>
          
          <!-- Sponsor Name -->
          <span class="text-[11px] font-semibold tracking-wide">{{ ad.name }}</span>
        </a>
        
        <!-- Duplicated set for seamless loop -->
        <a 
          v-for="ad in allAds" 
          :key="'dup-' + ad.id"
          :href="ad.href"
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden="true"
          class="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          tabindex="-1"
        >
          <img 
            v-if="ad.logoUrl" 
            :src="ad.logoUrl" 
            :alt="ad.name"
            class="w-5 h-5 rounded object-contain"
            @error="handleImageError"
          >
          <span 
            v-else-if="ad.emoji" 
            class="text-sm"
          >{{ ad.emoji }}</span>
          <span class="text-[11px] font-semibold tracking-wide">{{ ad.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import allSponsors from '~/content/sponsors.json'
import type { Ad } from '~/types/startup'

/** Fallback emojis when no logo is available */
const FALLBACK_EMOJIS = ['🚀', '⚡', '🔥', '💎', '💰', '📈', '🎯', '⭐', '🌟', '✨'] as const

// Filter active sponsors and map to Ad format
const allAds = computed<Ad[]>(() => {
  const activeSponsors = (allSponsors as any[]).filter(s => s.status === 'active')
  
  return activeSponsors.map((sponsor, i) => {
    let domain = ''
    try {
      if (sponsor.website_url) {
        domain = new URL(sponsor.website_url).hostname.replace('www.', '')
      }
    } catch { domain = '' }

    return {
      id: sponsor.id || i,
      name: sponsor.business_name || sponsor.startup_name || 'Sponsor',
      emoji: FALLBACK_EMOJIS[i % FALLBACK_EMOJIS.length] || '🚀',
      logoUrl: sponsor.logo_url || '',
      copy: sponsor.tagline || '',
      href: sponsor.website_url || '#',
      domain,
      bg: '#172554'
    }
  })
})

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<style scoped>
@keyframes adTicker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-ad-ticker {
  animation: adTicker 45s linear infinite;
}

/* Pause on hover for better UX */
.animate-ad-ticker:hover {
  animation-play-state: paused;
}
</style>

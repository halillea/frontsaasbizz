<template>
  <a
    :href="ad.href || '#'"
    :class="[
      'block px-6 py-5 rounded-xl glass-card transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden',
      index % 5 === 0 ? 'bg-blue-500/5 border-blue-500/10' :
      index % 5 === 1 ? 'bg-indigo-500/5 border-indigo-500/10' :
      index % 5 === 2 ? 'bg-purple-500/5 border-purple-500/10' :
      index % 5 === 3 ? 'bg-emerald-500/5 border-emerald-500/10' :
      'bg-slate-500/5 border-slate-500/10'
    ]"
    :aria-label="`${ad.name} - ${ad.copy}`"
  >
    <!-- Background Glow -->
    <div 
      class="absolute -right-4 -top-4 w-20 h-20 blur-2xl transition-opacity duration-300 opacity-20 group-hover:opacity-50"
      :class="[
        index % 5 === 0 ? 'bg-blue-500' :
        index % 5 === 1 ? 'bg-indigo-500' :
        index % 5 === 2 ? 'bg-purple-500' :
        index % 5 === 3 ? 'bg-emerald-500' :
        'bg-slate-500'
      ]"
    ></div>

    <div class="flex items-center gap-3 mb-1.5 relative z-10">
      <span 
        v-if="ad.emoji" 
        class="text-xl filter drop-shadow-sm grayscale group-hover:grayscale-0 transition-all duration-300" 
        aria-hidden="true"
      >{{ ad.emoji }}</span>
      <span 
        v-else 
        class="w-6 h-6 rounded bg-white/5 text-blue-400 flex items-center justify-center text-[11px] font-black uppercase tracking-wider border border-white/10" 
        aria-hidden="true"
      >Ad</span>
      <span class="font-black text-sm text-slate-200 group-hover:text-blue-400 truncate">{{ ad.name }}</span>
    </div>
    <p class="text-[12px] leading-snug text-slate-400 font-medium relative z-10 line-clamp-2">{{ ad.copy }}</p>
  </a>
</template>

<script setup lang="ts">
import type { Ad } from '~/types/startup'

defineProps<{
  ad: Ad
  index: number
}>()
</script>

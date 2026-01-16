<template>
  <div class="mb-8 max-w-[80%] mx-auto">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Sponsored Preview</span>
      <div class="h-px bg-slate-700 flex-grow"></div>
    </div>
    
    <div class="relative w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white/10 bg-black">
      <!-- Aspect Ratio Container (16:9) -->
      <div class="relative pt-[56.25%]">
        <iframe
          class="absolute top-0 left-0 w-full h-full pointer-events-auto"
          :src="`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&controls=1&fs=1&disablekb=0&iv_load_policy=3`"
          :title="title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

        <!-- Targeted Link Deactivation Overlay -->
        <!-- This div specifically blocks the YouTube logo area in the bottom right corner -->
        <div 
          class="absolute bottom-0 right-0 w-[15%] h-[15%] bg-transparent pointer-events-auto cursor-default"
          title="Watch on SaaSBizz"
        ></div>
      </div>
      
      <!-- Premium Overlay Effect/Gradient (optional polish) -->
      <div class="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  videoId?: string
  title?: string
}>(), {
  videoId: '6P_H9eDNBcA',
  title: 'Featured Video'
})
</script>

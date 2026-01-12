<template>
  <div class="block group relative bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all hover:border-blue-200 overflow-hidden">
    <div class="flex items-center gap-4 p-3">
      
      <div v-if="rank" class="text-gray-300 font-mono text-xs font-bold w-6 text-center flex-shrink-0">
        {{ rank }}
      </div>

      <NuxtLink :to="`/startup/${startup.trustmrr_profile_url}`" class="flex-grow flex items-center gap-4 min-w-0 pr-4 md:w-1/2">
        <div class="flex-shrink-0">
          <img 
            :src="`https://www.google.com/s2/favicons?domain=${startup.domain || startup.website_url}&sz=128`" 
            class="w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 object-cover"
            alt="Logo"
            loading="lazy"
          >
        </div>

        <div class="min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <h3 class="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {{ startup.startup_name }}
            </h3>
            <span v-if="startup.category" class="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[9px] font-semibold uppercase tracking-wide">
              {{ startup.category }}
            </span>
          </div>
          <p class="text-xs text-gray-500 truncate">{{ startup.tagline || startup.full_description }}</p>
        </div>
      </NuxtLink>

      <div class="flex items-center justify-end gap-4 md:gap-6 flex-shrink-0 ml-auto">
        
        <div class="hidden md:flex items-center gap-2 text-right w-40 justify-end relative z-10">
           <NuxtLink 
            v-if="isFounderValid" 
            :to="`/founder/${getFounderSlug(startup.founder_name)}`" 
            class="min-w-0 flex-1 hover:opacity-80 transition-opacity"
           >
             <div class="text-xs font-bold text-gray-700 truncate underline decoration-dotted decoration-gray-300 underline-offset-2">
               {{ startup.founder_name }}
             </div>
             <div class="text-[9px] text-gray-400 uppercase font-medium">Founder</div>
           </NuxtLink>
           <div v-else class="min-w-0 flex-1">
             <div class="text-xs font-bold text-gray-400 truncate italic">Anonymous</div>
             <div class="text-[9px] text-gray-400 uppercase font-medium">Founder</div>
           </div>
           
           <img 
            v-if="startup.founder_image_local_path"
            :src="`/founder_images/small/${startup.founder_image_local_path}`" 
            class="w-8 h-8 rounded-full object-cover border border-gray-100 bg-gray-50 flex-shrink-0"
            alt=""
          >
        </div>

        <NuxtLink :to="`/startup/${startup.trustmrr_profile_url}`" class="flex items-center gap-4 md:gap-6">
          <div class="text-right w-24">
            <div class="font-mono font-bold text-sm text-gray-900">{{ startup.mrr }}</div>
            <div class="text-[9px] text-gray-400 uppercase font-medium">MRR</div>
          </div>

          <div class="text-right w-16">
            <div v-if="isValidGrowth" class="font-mono font-bold text-sm text-green-600">{{ startup.mom_growth }}</div>
            <div v-else class="font-mono font-bold text-sm text-gray-300">-</div>
            <div class="text-[9px] text-gray-400 uppercase font-medium">Growth</div>
          </div>
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  startup: { type: Object, required: true },
  rank: { type: Number, default: null }
})

// Helper to clean founder names for URLs (matching the sitemap and config)
const getFounderSlug = (name) => {
  if (!name) return ''
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
}

const isFounderValid = computed(() => {
  return props.startup.founder_name && 
         props.startup.founder_name !== 'null,' && 
         props.startup.founder_name.length > 2
})

const isValidGrowth = computed(() => {
  return props.startup.mom_growth && 
         props.startup.mom_growth.includes('%')
})
</script>
<template>
  <NuxtLink :to="`/startup/${startup.company_name}`" class="block group">
    <div class="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all hover:border-blue-200">
      
      <div v-if="rank" class="text-gray-300 font-mono text-xs font-bold w-5 text-center">
        {{ rank }}
      </div>

      <div class="flex-shrink-0">
        <img 
          :src="`https://www.google.com/s2/favicons?domain=${startup.website_url}&sz=128`" 
          class="w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 object-cover"
          alt="Logo"
          loading="lazy"
        >
      </div>

      <div class="flex-grow min-w-0">
        <div class="flex items-center gap-2 mb-0.5">
          <h3 class="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {{ startup.company_name }}
          </h3>
          <span v-if="startup.category" class="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[9px] font-semibold uppercase tracking-wide">
            {{ startup.category }}
          </span>
        </div>
        <p class="text-xs text-gray-500 truncate">{{ startup.tagline }}</p>
      </div>

      <div class="text-right flex-shrink-0">
        <div v-if="sortBy === 'MRR'">
          <div class="font-mono font-bold text-sm text-gray-900">{{ startup.mrr }}</div>
          <div class="text-[9px] text-gray-400 uppercase font-medium">MRR</div>
        </div>
        
        <div v-else>
          <div class="font-mono font-bold text-sm text-emerald-600">{{ startup.total_revenue || 'N/A' }}</div>
          <div class="text-[9px] text-gray-400 uppercase font-medium">Total Rev</div>
        </div>
      </div>

    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  startup: { type: Object, required: true },
  rank: { type: Number, default: null },
  sortBy: { type: String, default: 'MRR' } // Receiving state from parent
})
</script>
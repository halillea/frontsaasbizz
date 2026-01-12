<template>
  <NuxtLink :to="`/startup/${startup.company_name}`" class="block group">
    <div class="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all hover:border-blue-200">
      
      <div v-if="rank" class="text-gray-300 font-mono text-xs font-bold w-6 text-center flex-shrink-0">
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

      <div class="flex-grow min-w-0 pr-4 md:w-1/2">
        <div class="flex items-center gap-2 mb-0.5">
          <h3 class="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {{ startup.company_name }}
          </h3>
          <span v-if="startup.category" class="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[9px] font-semibold uppercase tracking-wide">
            {{ startup.category }}
          </span>
        </div>
        <p class="text-xs text-gray-500 truncate">{{ startup.tagline }}</p>
      </div>

      <div class="flex items-center justify-end gap-4 md:gap-6 flex-shrink-0 ml-auto">
        
        <div class="hidden md:flex items-center gap-2 text-right w-36 justify-end">
           <div class="min-w-0 flex-1">
             <div class="text-xs font-bold text-gray-700 truncate">{{ startup.founder_name || 'Unknown' }}</div>
             <div class="text-[9px] text-gray-400 uppercase font-medium">Founder</div>
           </div>
           
           <img 
            v-if="startup.founder_image_local_path"
            :src="`/founder_images/small/${startup.founder_image_local_path}`" 
            class="w-8 h-8 rounded-full object-cover border border-gray-100 bg-gray-50 flex-shrink-0"
            alt=""
            loading="lazy"
          >
          <div v-else class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
             {{ startup.founder_name?.charAt(0) || '?' }}
          </div>
        </div>

        <div class="text-right w-24">
          <div v-if="sortBy === 'MRR'">
            <div class="font-mono font-bold text-sm text-gray-900">{{ startup.mrr }}</div>
            <div class="text-[9px] text-gray-400 uppercase font-medium">MRR</div>
          </div>
          <div v-else>
            <div class="font-mono font-bold text-sm text-emerald-600">{{ startup.total_revenue || '-' }}</div>
            <div class="text-[9px] text-gray-400 uppercase font-medium">Total Rev</div>
          </div>
        </div>

        <div class="text-right w-16">
          <div class="font-mono font-bold text-sm text-green-600">{{ startup.mom_growth || '0%' }}</div>
          <div class="text-[9px] text-gray-400 uppercase font-medium">Growth</div>
        </div>

      </div>

    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  startup: { type: Object, required: true },
  rank: { type: Number, default: null },
  sortBy: { type: String, default: 'MRR' }
})
</script>
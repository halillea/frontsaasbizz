<template>
  <div class="space-y-4">
    
    <!-- Table Container -->
    <div class="w-full overflow-hidden rounded-xl border border-white/5 bg-[#020617]">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="border-b border-white/5 bg-white/[0.02]">
              <th scope="col" class="py-3 pl-4 pr-3 text-xs font-semibold tracking-wider text-slate-500 w-16 text-center">
                Rank
              </th>
              <th scope="col" class="py-3 pl-4 pr-3 text-xs font-semibold tracking-wider text-slate-500">
                Startup
              </th>
              <th scope="col" class="py-3 pl-4 pr-3 text-xs font-semibold tracking-wider text-slate-500">
                Founder
              </th>
              
              <!-- Sortable Headers -->
              <th 
                scope="col" 
                class="hidden px-3 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 sm:table-cell cursor-pointer hover:text-white transition-colors group select-none"
                @click="$emit('toggleSort', 'total_revenue')"
              >
                <div class="flex items-center justify-end gap-1">
                  Total Rev
                  <ArrowsUpDownIcon v-if="sortField !== 'total_revenue'" class="w-3 h-3 opacity-30" />
                  <ArrowUpIcon v-else-if="sortDirection === 'asc'" class="w-3 h-3 text-blue-500" />
                  <ArrowDownIcon v-else class="w-3 h-3 text-blue-500" />
                </div>
              </th>
              
              <th 
                scope="col" 
                class="px-3 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 cursor-pointer hover:text-white transition-colors group select-none"
                @click="$emit('toggleSort', 'mrr')"
              >
                <div class="flex items-center justify-end gap-1">
                  MRR
                  <ArrowsUpDownIcon v-if="sortField !== 'mrr'" class="w-3 h-3 opacity-30" />
                  <ArrowUpIcon v-else-if="sortDirection === 'asc'" class="w-3 h-3 text-blue-500" />
                  <ArrowDownIcon v-else class="w-3 h-3 text-blue-500" />
                </div>
              </th>
              
              <th 
                scope="col" 
                class="hidden px-3 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 sm:table-cell cursor-pointer hover:text-white transition-colors group select-none"
                @click="$emit('toggleSort', 'mom_growth')"
              >
                <div class="flex items-center justify-end gap-1">
                  Growth
                  <ArrowsUpDownIcon v-if="sortField !== 'mom_growth'" class="w-3 h-3 opacity-30" />
                  <ArrowUpIcon v-else-if="sortDirection === 'asc'" class="w-3 h-3 text-blue-500" />
                  <ArrowDownIcon v-else class="w-3 h-3 text-blue-500" />
                </div>
              </th>
              

            </tr>
          </thead>
          <tbody class="divide-y divide-white/5" role="list">
            
            <!-- Items -->
            <StartupCard 
              v-for="(startup, index) in startups" 
              :key="startup.id" 
              :startup="startup"
              :rank="startRank + index"
            />
            
            <!-- Empty State -->
            <tr v-if="startups.length === 0">
              <td colspan="6" class="p-0">
                <EmptyState 
                  title="No startups found" 
                  description="Try adjusting your search or filters to find what you're looking for."
                />
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowsUpDownIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/outline'
import type { Startup } from '~/types/startup'
import type { SortField, SortDirection } from '~/composables/useTableControls'
import EmptyState from './ui/EmptyState.vue'

defineProps<{
  startups: Startup[]
  startRank: number
  sortField: SortField
  sortDirection: SortDirection
}>()

defineEmits<{
  toggleSort: [field: SortField]
}>()
</script>

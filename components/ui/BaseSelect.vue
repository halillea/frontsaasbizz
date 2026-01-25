<template>
  <div class="relative">
    <label v-if="label" class="block text-xs font-medium text-slate-400 mb-1.5 ml-0.5">
      {{ label }}
    </label>
    <div class="relative">
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        class="w-full appearance-none bg-[#020617] border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer hover:bg-slate-900"
      >
        <option 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
          class="bg-[#020617] text-white"
        >
          {{ option.label }}
        </option>
      </select>
      
      <!-- Custom Chevron arrow -->
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  label: string
  value: string | number
}

defineProps<{
  modelValue: string | number
  options: SelectOption[]
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

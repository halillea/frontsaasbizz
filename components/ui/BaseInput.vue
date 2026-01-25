<template>
  <div class="relative group">
    <div 
      v-if="icon" 
      class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none"
    >
      <component :is="icon" class="w-4 h-4" />
    </div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :placeholder="placeholder"
      class="w-full bg-[#0f172a] border border-white/10 rounded-lg py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      :class="[
        icon ? 'pl-9 pr-4' : 'px-4',
        customClass
      ]"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number
  type?: string
  placeholder?: string
  icon?: any
  customClass?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

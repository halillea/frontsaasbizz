<template>
  <div 
    class="animate-pulse bg-white/5 rounded"
    :class="[
      rounded ? 'rounded-full' : 'rounded-md',
      customClass
    ]"
    :style="{
      width: width,
      height: height
    }"
  ></div>
</template>

<script setup lang="ts">
defineProps<{
  width?: string
  height?: string
  rounded?: boolean
  customClass?: string
}>()
</script>

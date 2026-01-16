import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ad } from '~/types/startup'

const BLUE_PALETTE = ['#eff6ff', '#dbeafe', '#e0f2fe', '#cffafe', '#e0e7ff']
const ROTATION_INTERVAL = 8000 // 8 seconds

export function useAds() {
  const adInventory: Ad[] = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    name: `Partner ${i + 1}`,
    emoji: ['🚀', '⚡', '🔥', '💎', '💰', '📈', '🎯', '⭐'][i % 8],
    copy: 'Scale your SaaS faster. Join 500+ founders who trust us.',
    bg: BLUE_PALETTE[i % 5]
  }))

  const adGroupIndex = ref(0)
  let adInterval: ReturnType<typeof setInterval> | null = null

  // Right sidebar shows 8 ads, rotating between two groups
  const currentRightAds = computed(() =>
    adInventory.slice(
      adGroupIndex.value === 0 ? 0 : 8,
      adGroupIndex.value === 0 ? 8 : 16
    )
  )

  const startRotation = () => {
    adInterval = setInterval(() => {
      adGroupIndex.value = adGroupIndex.value === 0 ? 1 : 0
    }, ROTATION_INTERVAL)
  }

  const stopRotation = () => {
    if (adInterval) {
      clearInterval(adInterval)
      adInterval = null
    }
  }

  onMounted(startRotation)
  onUnmounted(stopRotation)

  return {
    adGroupIndex,
    currentRightAds
  }
}

import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ad } from '~/types/startup'

/** Blue-themed color palette for ad backgrounds */
const BLUE_PALETTE = ['#eff6ff', '#dbeafe', '#e0f2fe', '#cffafe', '#e0e7ff'] as const

/** Rotation interval in milliseconds (8 seconds) */
const ROTATION_INTERVAL = 8000

/**
 * Composable for managing advertisement display and rotation.
 * 
 * Provides 16 placeholder ads divided into 2 groups of 8,
 * rotating between groups every 8 seconds.
 * 
 * @returns {Object} Ad management utilities
 * @returns {Ref<number>} adGroupIndex - Current ad group (0 or 1)
 * @returns {ComputedRef<Ad[]>} currentRightAds - Currently visible ads (8 items)
 * 
 * @example
 * const { currentRightAds } = useAds()
 * // Use currentRightAds.value in template
 */
export function useAds() {
  /** Mock ad inventory - 16 placeholder ads */
  const adInventory: Ad[] = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    name: `Partner ${i + 1}`,
    emoji: ['🚀', '⚡', '🔥', '💎', '💰', '📈', '🎯', '⭐'][i % 8],
    copy: 'Scale your SaaS faster. Join 500+ founders who trust us.',
    bg: BLUE_PALETTE[i % 5]
  }))

  const adGroupIndex = ref(0)
  let adInterval: ReturnType<typeof setInterval> | null = null

  /** Currently visible ads (8 items from current group) */
  const currentRightAds = computed(() =>
    adInventory.slice(
      adGroupIndex.value === 0 ? 0 : 8,
      adGroupIndex.value === 0 ? 8 : 16
    )
  )

  /** Start ad rotation timer */
  const startRotation = (): void => {
    adInterval = setInterval(() => {
      adGroupIndex.value = adGroupIndex.value === 0 ? 1 : 0
    }, ROTATION_INTERVAL)
  }

  /** Stop ad rotation timer and cleanup */
  const stopRotation = (): void => {
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

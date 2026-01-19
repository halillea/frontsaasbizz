import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ad } from '~/types/startup'

/** Blue-themed color palette for ad backgrounds */
const BLUE_PALETTE = ['#eff6ff', '#dbeafe', '#e0f2fe', '#cffafe', '#e0e7ff'] as const

/** Rotation interval in milliseconds (15 seconds) */
const ROTATION_INTERVAL = 15000

/**
 * Composable for managing advertisement display and rotation.
 * 
 * Provides 12 placeholder ads divided into 2 groups of 6,
 * rotating between groups every 15 seconds.
 * 
 * @returns {Object} Ad management utilities
 * @returns {Ref<number>} adGroupIndex - Current ad group (0 or 1)
 * @returns {ComputedRef<Ad[]>} currentRightAds - Currently visible ads (6 items)
 * 
 * @example
 * const { currentRightAds } = useAds()
 * // Use currentRightAds.value in template
 */
export function useAds() {
  /** Mock ad inventory - 12 placeholder ads */
  const adInventory: Ad[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Partner ${i + 1}`,
    emoji: (['🚀', '⚡', '🔥', '💎', '💰', '📈', '🎯', '⭐'][i % 8] || '🚀'),
    copy: 'Scale your SaaS faster. Join 500+ founders who trust us.',
    bg: (BLUE_PALETTE[i % 5] || BLUE_PALETTE[0])
  }))

  const adGroupIndex = ref(0)
  let adInterval: ReturnType<typeof setInterval> | null = null

  /** Currently visible ads (6 items from current group) */
  const currentRightAds = computed(() =>
    adInventory.slice(
      adGroupIndex.value === 0 ? 0 : 6,
      adGroupIndex.value === 0 ? 6 : 12
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

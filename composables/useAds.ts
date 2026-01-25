import { ref, computed, onMounted, onUnmounted } from 'vue'
import allSponsors from '~/content/sponsors.json'
import type { Ad } from '~/types/startup'

/** Fallback emojis when no logo is available */
const FALLBACK_EMOJIS = ['🚀', '⚡', '🔥', '💎', '💰', '📈', '🎯', '⭐', '🌟', '✨'] as const

/** Rotation interval in milliseconds (12 seconds) */
const ROTATION_INTERVAL = 12000

/**
 * Composable for managing advertisement display and rotation.
 * 
 * Loads sponsors from sponsors.json and displays them in rotating groups.
 * 
 * @returns {Object} Ad management utilities
 * @returns {Ref<number>} adGroupIndex - Current ad group (0 or 1)
 * @returns {ComputedRef<Ad[]>} currentRightAds - Currently visible ads (6 items)
 */
export function useAds() {
  // Filter active sponsors only
  const activeSponsors = (allSponsors as any[]).filter(s => s.status === 'active')

  // Map sponsors to Ad format
  const adInventory: Ad[] = activeSponsors.map((sponsor, i) => {
    // Extract domain from website_url
    let domain = ''
    try {
      if (sponsor.website_url) {
        domain = new URL(sponsor.website_url).hostname.replace('www.', '')
      }
    } catch { domain = '' }

    return {
      id: sponsor.id || i,
      name: sponsor.business_name || sponsor.startup_name || 'Sponsor',
      emoji: FALLBACK_EMOJIS[i % FALLBACK_EMOJIS.length] || '🚀',
      logoUrl: sponsor.logo_url || '',
      copy: sponsor.tagline || sponsor.description || 'Check out our sponsor',
      href: sponsor.website_url || '#',
      domain,
      bg: '#eff6ff'
    }
  })

  // Ensure we have at least 10 ads for rotation (pad with duplicates if needed)
  while (adInventory.length < 10 && adInventory.length > 0) {
    const sourceAd = adInventory[adInventory.length % activeSponsors.length]!
    adInventory.push({ ...sourceAd, id: Date.now() + adInventory.length })
  }

  const adGroupIndex = ref(0)
  let adInterval: ReturnType<typeof setInterval> | null = null

  /** Currently visible ads (5 items from current group) */
  const currentRightAds = computed(() =>
    adInventory.slice(
      adGroupIndex.value === 0 ? 0 : 5,
      adGroupIndex.value === 0 ? 5 : 10
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


import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { Ad } from '~/types/startup'

/** Fallback emojis when no logo is available */
const FALLBACK_EMOJIS = ['🚀', '⚡', '🔥', '💎', '💰', '📈', '🎯', '⭐', '🌟', '✨'] as const

/** Rotation interval in milliseconds (12 seconds) */
const ROTATION_INTERVAL = 12000

export function useAds() {
  const adInventory = ref<Ad[]>([])

  // Use async data to fetch sponsors once (SSR compatible)
  const { data } = useAsyncData('ads-inventory', async () => {
    const supabase = useSupabaseClient()
    const { data: sponsors } = await supabase
      .from('sponsors')
      .select('*')
      .eq('status', 'active')

    return (sponsors || []).map((sponsor: any, i: number) => {
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
      } as Ad
    })
  })

  // Watch for data availability
  watch(data, (newVal) => {
    if (newVal) {
      const ads = [...newVal]

      // Pad if needed
      while (ads.length < 10 && ads.length > 0) {
        const sourceAd = ads[ads.length % newVal.length]!
        ads.push({ ...sourceAd, id: Date.now() + ads.length })
      }
      adInventory.value = ads
    }
  }, { immediate: true })

  const adGroupIndex = ref(0)
  let adInterval: ReturnType<typeof setInterval> | null = null

  /** Currently visible ads (5 items from current group) */
  const currentRightAds = computed(() =>
    adInventory.value.slice(
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


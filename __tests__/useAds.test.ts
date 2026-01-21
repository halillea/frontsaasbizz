import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'

// Mock Vue lifecycle hooks
vi.mock('vue', async () => {
    const actual = await vi.importActual('vue')
    return {
        ...actual,
        onMounted: vi.fn((cb) => cb()),
        onUnmounted: vi.fn()
    }
})

// Import after mocking
import { useAds } from '../composables/useAds'

describe('useAds', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns adGroupIndex and currentRightAds', () => {
        const { adGroupIndex, currentRightAds } = useAds()

        expect(adGroupIndex).toBeDefined()
        expect(currentRightAds).toBeDefined()
    })

    it('initializes with adGroupIndex = 0', () => {
        const { adGroupIndex } = useAds()
        expect(adGroupIndex.value).toBe(0)
    })

    it('returns 6 ads in currentRightAds', () => {
        const { currentRightAds } = useAds()
        expect(currentRightAds.value).toHaveLength(6)
    })

    it('each ad has required properties', () => {
        const { currentRightAds } = useAds()
        const firstAd = currentRightAds.value[0]

        expect(firstAd).toHaveProperty('id')
        expect(firstAd).toHaveProperty('name')
        expect(firstAd).toHaveProperty('emoji')
        expect(firstAd).toHaveProperty('copy')
        expect(firstAd).toHaveProperty('bg')
    })

    it('ads have blue palette backgrounds', () => {
        const { currentRightAds } = useAds()
        const bluePalette = ['#eff6ff', '#dbeafe', '#e0f2fe', '#cffafe', '#e0e7ff']

        currentRightAds.value.forEach(ad => {
            expect(bluePalette).toContain(ad.bg)
        })
    })

    it('first ad has a valid id when group is 0', () => {
        const { adGroupIndex, currentRightAds } = useAds()
        adGroupIndex.value = 0

        expect(typeof currentRightAds.value[0].id).toBe('number')
    })

    it('ad groups have different first ads when toggled', () => {
        const { adGroupIndex, currentRightAds } = useAds()

        adGroupIndex.value = 0
        const firstAdGroup0 = currentRightAds.value[0].id

        adGroupIndex.value = 1
        const firstAdGroup1 = currentRightAds.value[0].id

        expect(firstAdGroup0).not.toBe(firstAdGroup1)
    })
})

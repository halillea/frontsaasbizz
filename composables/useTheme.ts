import { watch, onMounted } from 'vue'

/** Available theme options */
export type ThemeColor = 'blue' | 'white'

/** Cookie key for persisting theme preference */
const COOKIE_KEY = 'saasbizz-theme'
const LEGACY_STORAGE_KEY = 'saasbizz-theme'

/**
 * Composable for managing application theme (blue/white).
 * 
 * Uses cookies for SSR-safe persistence. Theme is available on both
 * server and client, preventing hydration mismatches.
 * 
 * @returns {Object} Theme management utilities
 * @returns {Ref<ThemeColor>} themeColor - Current theme ('blue' | 'white')
 * @returns {Function} setTheme - Set specific theme
 * @returns {Function} toggleTheme - Toggle between themes
 * 
 * @example
 * const { themeColor, toggleTheme } = useTheme()
 * toggleTheme() // Switch from blue to white or vice versa
 */
export function useTheme() {
    // SSR-safe cookie-based theme state
    const themeColor = useCookie<ThemeColor>(COOKIE_KEY, {
        default: () => 'blue',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax'
    })

    // One-time migration from localStorage to cookie (client only)
    onMounted(() => {
        if (typeof window !== 'undefined') {
            const legacyTheme = localStorage.getItem(LEGACY_STORAGE_KEY) as ThemeColor
            if (legacyTheme && (legacyTheme === 'blue' || legacyTheme === 'white')) {
                // Migrate to cookie and remove old localStorage entry
                if (!themeColor.value || themeColor.value !== legacyTheme) {
                    themeColor.value = legacyTheme
                }
                localStorage.removeItem(LEGACY_STORAGE_KEY)
            }
            // Sync DOM attribute
            document.documentElement.setAttribute('data-theme', themeColor.value || 'blue')
        }
    })

    /**
     * Set the application theme
     * @param color - Theme to apply ('blue' | 'white')
     */
    function setTheme(color: ThemeColor): void {
        themeColor.value = color
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', color)
        }
    }

    /** Toggle between blue and white themes */
    function toggleTheme(): void {
        setTheme(themeColor.value === 'blue' ? 'white' : 'blue')
    }

    // Watch for changes and update DOM
    watch(themeColor, (newColor) => {
        if (typeof window !== 'undefined' && newColor) {
            document.documentElement.setAttribute('data-theme', newColor)
        }
    }, { immediate: true })

    return {
        themeColor,
        setTheme,
        toggleTheme
    }
}

import { ref, watch } from 'vue'

/** Available theme options */
export type ThemeColor = 'blue' | 'white'

/** LocalStorage key for persisting theme preference */
const STORAGE_KEY = 'saasbizz-theme'

/** Global reactive theme state (singleton pattern) */
const themeColor = ref<ThemeColor>('blue')

// Initialize from localStorage on client side
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeColor
    if (saved === 'blue' || saved === 'white') {
        themeColor.value = saved
    }
}

/**
 * Composable for managing application theme (blue/white).
 * 
 * Persists theme preference to localStorage and syncs with DOM
 * via `data-theme` attribute on the document element.
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
    /**
     * Set the application theme
     * @param color - Theme to apply ('blue' | 'white')
     */
    function setTheme(color: ThemeColor): void {
        themeColor.value = color
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, color)
            document.documentElement.setAttribute('data-theme', color)
        }
    }

    /** Toggle between blue and white themes */
    function toggleTheme(): void {
        setTheme(themeColor.value === 'blue' ? 'white' : 'blue')
    }

    // Watch for changes and update DOM
    watch(themeColor, (newColor) => {
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', newColor)
        }
    }, { immediate: true })

    return {
        themeColor,
        setTheme,
        toggleTheme
    }
}

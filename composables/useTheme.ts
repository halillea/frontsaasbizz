import { ref, watch } from 'vue'

export type ThemeColor = 'blue' | 'white'

const themeColor = ref<ThemeColor>('blue')

// Initialize from localStorage on client side
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('saasbizz-theme') as ThemeColor
    if (saved === 'blue' || saved === 'white') {
        themeColor.value = saved
    }
}

export function useTheme() {
    function setTheme(color: ThemeColor) {
        themeColor.value = color
        if (typeof window !== 'undefined') {
            localStorage.setItem('saasbizz-theme', color)
            // Update document class for CSS
            document.documentElement.setAttribute('data-theme', color)
        }
    }

    function toggleTheme() {
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

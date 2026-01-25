import { ref, computed } from 'vue'
import type { Startup } from '~/types/startup'

export type SortField = 'total_revenue' | 'mrr' | 'mom_growth'
export type SortDirection = 'asc' | 'desc'

export function useTableControls(initialData: Startup[]) {
    // State
    const searchQuery = ref('')
    const selectedCategory = ref('all')
    const sortField = ref<SortField>('total_revenue')
    const sortDirection = ref<SortDirection>('desc')
    const isVerifiedOnly = ref(false)

    // Options
    const categoryOptions = computed(() => {
        // Extract unique categories from data
        const categories = new Set(initialData.map(s => s.category).filter(Boolean))
        return [
            { label: 'All Categories', value: 'all' },
            ...Array.from(categories).map(c => ({
                label: c!.charAt(0).toUpperCase() + c!.slice(1),
                value: c!
            })).sort((a, b) => a.label.localeCompare(b.label))
        ]
    })

    // Filtered & Sorted Data
    const filteredData = computed(() => {
        let result = [...initialData]

        // 1. Search
        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase()
            result = result.filter(s =>
                (s.startup_name && s.startup_name.toLowerCase().includes(query)) ||
                (s.founder_name && s.founder_name.toLowerCase().includes(query)) ||
                (s.tagline && s.tagline.toLowerCase().includes(query))
            )
        }

        // 2. Category Filter
        if (selectedCategory.value !== 'all') {
            result = result.filter(s => s.category === selectedCategory.value)
        }

        // 3. Verified Only Filter (Mock logic - assuming verified if trustmrr_link exists)
        if (isVerifiedOnly.value) {
            result = result.filter(s => s.trustmrr_link)
        }

        // 4. Sorting
        result.sort((a, b) => {
            let aValue = a[sortField.value] || 0
            let bValue = b[sortField.value] || 0

            // Handle strings/nulls if necessary
            if (typeof aValue === 'string') aValue = parseFloat(aValue)
            if (typeof bValue === 'string') bValue = parseFloat(bValue)

            return sortDirection.value === 'asc'
                ? (aValue as number) - (bValue as number)
                : (bValue as number) - (aValue as number)
        })

        return result
    })

    // Actions
    function toggleSort(field: SortField) {
        if (sortField.value === field) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
        } else {
            sortField.value = field
            sortDirection.value = 'desc' // Default to desc for metrics
        }
    }

    function setCategory(category: string) {
        selectedCategory.value = category
    }

    return {
        searchQuery,
        selectedCategory,
        sortField,
        sortDirection,
        isVerifiedOnly,
        categoryOptions,
        filteredData,
        toggleSort,
        setCategory
    }
}

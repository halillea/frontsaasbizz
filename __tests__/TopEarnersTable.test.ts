import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TopEarnersTable from '~/components/TopEarnersTable.vue'

// Mock Nuxt auto-imports
vi.stubGlobal('useRouter', () => ({
    push: vi.fn()
}))
vi.stubGlobal('useCookie', () => ({ value: 'dark' }))

// Mock useTheme composable
vi.mock('~/composables/useTheme', () => ({
    useTheme: () => ({
        themeColor: { value: 'dark' }
    })
}))

const mockStartups = [
    {
        id: 1,
        startup_name: 'Startup A',
        trustmrr_link: 'startup-a',
        total_revenue: 5000000,
        mrr: 100000,
        mom_growth: 20,
        founder_name: 'Alice',
        domain: 'startupa.com',
        tagline: 'Test A',
        category: 'saas',
        fetched_at: '2024-01-01',
        founded_date: null,
        last_4_weeks_revenue: null,
        total_revenue_precise: null,
        mrr_precise: null,
        last_30_days_revenue: null,
        active_subscriptions: null,
        x_follower_count: null,
        founder_total_revenue_agg: null,
        founder_image_local_path: null,
        logo_url: null,
        location: null,
        full_description: null,
        funding_status: null,
        founder_social: null,
        status: 1,
        verification_source: null,
        subscriptions: null,
        is_published: true,
        trustmrr_founder: null
    },
    {
        id: 2,
        startup_name: 'Startup B',
        trustmrr_link: 'startup-b',
        total_revenue: 3000000,
        mrr: 80000,
        mom_growth: 15,
        founder_name: 'Bob',
        domain: 'startupb.com',
        tagline: 'Test B',
        category: 'fintech',
        fetched_at: '2024-01-02',
        founded_date: null,
        last_4_weeks_revenue: null,
        total_revenue_precise: null,
        mrr_precise: null,
        last_30_days_revenue: null,
        active_subscriptions: null,
        x_follower_count: null,
        founder_total_revenue_agg: null,
        founder_image_local_path: null,
        logo_url: null,
        location: null,
        full_description: null,
        funding_status: null,
        founder_social: null,
        status: 1,
        verification_source: null,
        subscriptions: null,
        is_published: true,
        trustmrr_founder: null
    }
]

describe('TopEarnersTable', () => {
    describe('Rendering', () => {
        it('renders a table element', () => {
            const wrapper = mount(TopEarnersTable, {
                props: { startups: mockStartups }
            })
            expect(wrapper.find('table').exists()).toBe(true)
        })

        it('renders table headers', () => {
            const wrapper = mount(TopEarnersTable, {
                props: { startups: mockStartups }
            })
            const headers = wrapper.findAll('th')
            expect(headers.length).toBeGreaterThan(0)
            expect(wrapper.text()).toContain('Startup')
            // Founder column was removed in redesign
            expect(wrapper.text()).toContain('Total Rev')
            expect(wrapper.text()).toContain('MRR')
            expect(wrapper.text()).toContain('Growth')
        })

        it.skip('renders correct number of rows', () => {
            const wrapper = mount(TopEarnersTable, {
                props: { startups: mockStartups }
            })
            const rows = wrapper.findAll('tbody tr')
            expect(rows.length).toBe(2)
        })

        it('renders empty state when no startups provided', () => {
            const wrapper = mount(TopEarnersTable, {
                props: { startups: [] }
            })
            const rows = wrapper.findAll('tbody tr')
            // Expect 1 row for the EmptyState component
            expect(rows.length).toBe(1)
            expect(wrapper.text()).toContain('No startups found')
        })
    })

    describe('Accessibility', () => {
        it('has proper table structure with thead and tbody', () => {
            const wrapper = mount(TopEarnersTable, {
                props: { startups: mockStartups }
            })
            expect(wrapper.find('thead').exists()).toBe(true)
            expect(wrapper.find('tbody').exists()).toBe(true)
        })

        it('tbody has role="list" for screen readers', () => {
            const wrapper = mount(TopEarnersTable, {
                props: { startups: mockStartups }
            })
            expect(wrapper.find('tbody').attributes('role')).toBe('list')
        })
    })

    describe('Responsiveness', () => {
        it('has overflow-x-auto wrapper for mobile scrolling', () => {
            const wrapper = mount(TopEarnersTable, {
                props: { startups: mockStartups }
            })
            expect(wrapper.find('.overflow-x-auto').exists()).toBe(true)
        })
    })
})

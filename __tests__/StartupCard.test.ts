import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StartupCard from '~/components/StartupCard.vue'

// Mock Nuxt auto-imports
const mockPush = vi.fn()
vi.stubGlobal('useRouter', () => ({
    push: mockPush
}))

const mockStartup = {
    id: 1,
    startup_name: 'TestStartup',
    tagline: 'A test tagline for testing purposes',
    domain: 'teststartup.com',
    trustmrr_link: 'teststartup',
    total_revenue: 1000000,
    mrr: 50000,
    mom_growth: 15,
    founder_name: 'John Doe',
    founder_image_local_path: null,
    category: 'saas',
    fetched_at: '2024-01-01',
    founded_date: 'January 2020',
    last_4_weeks_revenue: null,
    total_revenue_precise: null,
    mrr_precise: null,
    last_30_days_revenue: null,
    active_subscriptions: null,
    x_follower_count: null,
    founder_total_revenue_agg: null,
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

describe('StartupCard', () => {
    beforeEach(() => {
        mockPush.mockClear()
    })

    describe('Rendering', () => {
        it('renders startup name', () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup }
            })
            expect(wrapper.text()).toContain('TestStartup')
        })

        it('renders rank when provided', () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup, rank: 5 }
            })
            expect(wrapper.text()).toContain('5')
        })

        it('renders founder name', () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup }
            })
            expect(wrapper.text()).toContain('John Doe')
        })

        it('renders Anonymous when founder name is missing', () => {
            const startupNoFounder = { ...mockStartup, founder_name: null }
            const wrapper = mount(StartupCard, {
                props: { startup: startupNoFounder }
            })
            expect(wrapper.text()).toContain('Anonymous')
        })

        it('renders growth with + prefix for positive values', () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup }
            })
            expect(wrapper.text()).toContain('+15%')
        })

        it('applies green color for positive growth', () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup }
            })
            const growthDiv = wrapper.find('.text-green-500')
            expect(growthDiv.exists()).toBe(true)
        })

        it('applies red color for negative growth', () => {
            const negativeGrowthStartup = { ...mockStartup, mom_growth: -10 }
            const wrapper = mount(StartupCard, {
                props: { startup: negativeGrowthStartup }
            })
            const growthDiv = wrapper.find('.text-red-500')
            expect(growthDiv.exists()).toBe(true)
        })
    })

    describe('Accessibility', () => {
        it('has tabindex for keyboard navigation', () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup }
            })
            expect(wrapper.find('tr').attributes('tabindex')).toBe('0')
        })

        it('has focus styles', () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup }
            })
            expect(wrapper.find('tr').classes()).toContain('focus:outline-none')
        })
    })

    describe('Navigation', () => {
        it('navigates on click when trustmrr_link exists', async () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup }
            })
            await wrapper.find('tr').trigger('click')
            expect(mockPush).toHaveBeenCalledWith('/startup/teststartup')
        })

        it('navigates on Enter key press', async () => {
            const wrapper = mount(StartupCard, {
                props: { startup: mockStartup }
            })
            await wrapper.find('tr').trigger('keydown.enter')
            expect(mockPush).toHaveBeenCalledWith('/startup/teststartup')
        })

        it('does not navigate when trustmrr_link is null', async () => {
            const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => { })
            const startupNoLink = { ...mockStartup, trustmrr_link: null }
            const wrapper = mount(StartupCard, {
                props: { startup: startupNoLink }
            })
            await wrapper.find('tr').trigger('click')
            expect(mockPush).not.toHaveBeenCalled()
            expect(consoleWarn).toHaveBeenCalled()
            consoleWarn.mockRestore()
        })
    })
})

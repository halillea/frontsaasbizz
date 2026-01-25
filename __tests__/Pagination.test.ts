import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '~/components/Pagination.vue'

// Mock Nuxt auto-imports and composables
vi.stubGlobal('useCookie', () => ({ value: 'dark' }))

// Mock useTheme composable
vi.mock('~/composables/useTheme', () => ({
    useTheme: () => ({
        themeColor: { value: 'dark' }
    })
}))

describe('Pagination', () => {
    describe('Rendering', () => {
        it('renders current page and total pages', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 2,
                    totalPages: 5,
                    itemName: 'items'
                }
            })
            expect(wrapper.text()).toContain('2')
            expect(wrapper.text()).toContain('5')
        })

        it('does not render when totalPages is 1', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 1,
                    totalPages: 1,
                    itemName: 'items'
                }
            })
            expect(wrapper.find('nav').exists()).toBe(false)
        })

        it('renders when totalPages is greater than 1', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 1,
                    totalPages: 3,
                    itemName: 'items'
                }
            })
            expect(wrapper.find('nav').exists()).toBe(true)
        })
    })

    describe('Button States', () => {
        it('disables prev button on first page', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 1,
                    totalPages: 5,
                    itemName: 'items'
                }
            })
            const prevButton = wrapper.findAll('button')[0]
            expect(prevButton.attributes('disabled')).toBeDefined()
        })

        it('enables prev button when not on first page', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 2,
                    totalPages: 5,
                    itemName: 'items'
                }
            })
            const prevButton = wrapper.findAll('button')[0]
            expect(prevButton.attributes('disabled')).toBeUndefined()
        })

        it('disables next button on last page', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 5,
                    totalPages: 5,
                    itemName: 'items'
                }
            })
            const buttons = wrapper.findAll('button')
            const nextButton = buttons[buttons.length - 1]
            expect(nextButton.attributes('disabled')).toBeDefined()
        })

        it('enables next button when not on last page', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 3,
                    totalPages: 5,
                    itemName: 'items'
                }
            })
            const buttons = wrapper.findAll('button')
            const nextButton = buttons[buttons.length - 1]
            expect(nextButton.attributes('disabled')).toBeUndefined()
        })
    })

    describe('Events', () => {
        it('emits prev event when prev button is clicked', async () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 3,
                    totalPages: 5,
                    itemName: 'items'
                }
            })
            const prevButton = wrapper.findAll('button')[0]
            await prevButton.trigger('click')
            expect(wrapper.emitted('prev')).toBeTruthy()
        })

        it('emits next event when next button is clicked', async () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 3,
                    totalPages: 5,
                    itemName: 'items'
                }
            })
            const buttons = wrapper.findAll('button')
            const nextButton = buttons[buttons.length - 1]
            await nextButton.trigger('click')
            expect(wrapper.emitted('next')).toBeTruthy()
        })
    })

    describe('Accessibility', () => {
        it('has proper aria-label when provided', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 1,
                    totalPages: 5,
                    itemName: 'items',
                    ariaLabel: 'Pagination for items list'
                }
            })
            expect(wrapper.find('nav').attributes('aria-label')).toBe('Pagination for items list')
        })

        it('has aria-live on page indicator', () => {
            const wrapper = mount(Pagination, {
                props: {
                    currentPage: 1,
                    totalPages: 5,
                    itemName: 'items'
                }
            })
            expect(wrapper.find('[aria-live="polite"]').exists()).toBe(true)
        })
    })
})

export interface Category {
    name: string
    slug: string
    icon: string
    description: string
}

export const useCategories = () => {
    const categories: Category[] = [
        {
            name: 'Artificial Intelligence',
            slug: 'ai',
            icon: '🤖',
            description: 'Generative agents, LLM tools, and automation.'
        },
        {
            name: 'SaaS',
            slug: 'saas',
            icon: '🚀',
            description: 'Software as a Service products and platforms.'
        },
        {
            name: 'Marketing',
            slug: 'marketing',
            icon: '📈',
            description: 'Growth, SEO, and social media tools.'
        },
        {
            name: 'Ecommerce',
            slug: 'ecommerce',
            icon: '🛍️',
            description: 'Store builders, dropshipping, and retail tools.'
        },
        {
            name: 'Developer Tools',
            slug: 'developer-tools',
            icon: '💻',
            description: 'APIs, SDKs, and workflow enhancement.'
        },
        {
            name: 'Fintech',
            slug: 'fintech',
            icon: '💳',
            description: 'Financial technology, banking, and crypto.'
        },
        {
            name: 'Education',
            slug: 'education',
            icon: '📚',
            description: 'LMS, course platforms, and ed-tech.'
        },
        {
            name: 'No Code',
            slug: 'no-code',
            icon: '⚡',
            description: 'Build without code using visual editors.'
        },
        {
            name: 'Design Tools',
            slug: 'design-tools',
            icon: '🎨',
            description: 'UI/UX, graphics, and creative software.'
        },
        {
            name: 'Productivity',
            slug: 'productivity',
            icon: '✅',
            description: 'Task management, notes, and efficiency.'
        },
        {
            name: 'Health & Fitness',
            slug: 'health-fitness',
            icon: '❤️',
            description: 'Wellness, tracking, and medical tech.'
        },
        {
            name: 'Real Estate',
            slug: 'real-estate',
            icon: '🏠',
            description: 'Property management and proptech.'
        },
        {
            name: 'Legal',
            slug: 'legal',
            icon: '⚖️',
            description: 'Compliance, contracts, and legal tech.'
        },
        {
            name: 'Analytics',
            slug: 'analytics',
            icon: '📊',
            description: 'Data visualization and business intelligence.'
        }
    ]

    return {
        categories
    }
}

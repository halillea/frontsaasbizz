/**
 * Parse revenue string like "$116,350" into number 116350
 */
export function parseRevenue(val: string | null | undefined): number {
  if (!val || typeof val !== 'string') return 0
  return Number(val.replace(/[^0-9.-]+/g, ''))
}

/**
 * Convert founder name to URL-safe slug
 * "John Doe" -> "john-doe"
 */
export function getFounderSlug(name: string | null | undefined): string {
  if (!name) return ''
  return name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}

/**
 * Check if founder name is valid (not null, not "null,", length > 2)
 */
export function isValidFounder(founderName: string | null | undefined): boolean {
  return Boolean(
    founderName &&
    founderName !== 'null,' &&
    founderName.length > 2
  )
}

/**
 * Format follower count (e.g., 1910 -> "1.9k", 150 -> "150")
 */
export function formatFollowers(count: number | string | null | undefined): string {
  if (!count) return '0'
  const num = Number(String(count).replace(/,/g, ''))
  if (isNaN(num)) return String(count)
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toLocaleString()
}

/**
 * Check if growth value is valid (contains %)
 */
export function isValidGrowth(growth: string | null | undefined): boolean {
  return Boolean(growth && growth.includes('%'))
}

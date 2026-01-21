/**
 * Pre-sort startups.json for optimal homepage loading
 * Sorts by MRR descending (top earners first)
 * Run: node scripts/presort-startups.js
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const jsonPath = join(__dirname, '../content/startups.json')

// Read current data
const startups = JSON.parse(readFileSync(jsonPath, 'utf-8'))

// Parse revenue helper (same logic as helpers.ts)
function parseRevenue(val) {
    if (val === null || val === undefined) return 0
    if (typeof val === 'number') return val
    return Number(String(val).replace(/[^0-9.-]+/g, ''))
}

// Sort by total_revenue descending (top earners first)
const sorted = [...startups].sort((a, b) => parseRevenue(b.total_revenue) - parseRevenue(a.total_revenue))

// Write back
writeFileSync(jsonPath, JSON.stringify(sorted, null, 2))

console.log(`✅ Sorted ${sorted.length} startups by total_revenue descending`)
console.log(`   Top 3: ${sorted.slice(0, 3).map(s => `${s.startup_name} ($${parseRevenue(s.total_revenue).toLocaleString()})`).join(', ')}`)

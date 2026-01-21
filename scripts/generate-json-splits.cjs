/**
 * Generate JSON Splits for SaaSBizz
 * 
 * Creates optimized JSON files for different page loads:
 * - startups-homepage.json (Top 30 + Recent 20)
 * - startups-pagination.json (Top 31-150 + Recent 21-60)
 * - startups-ticker.json (200 random, MRR>$100, growth>=1%, name<10)
 * - startups-search-index.json (name -> file mapping)
 * - startups-category-{slug}.json (per category)
 */

const fs = require('fs');
const path = require('path');

// Load source data
const SOURCE_FILE = path.join(__dirname, '../content/startups.json');
const OUTPUT_DIR = path.join(__dirname, '../content');

const allStartups = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));

console.log('=== JSON Split Generator ===');
console.log('Source startups:', allStartups.length);

// Helper: Parse revenue string to number
function parseRevenue(val) {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'number') return val;
    return Number(String(val).replace(/[^0-9.-]+/g, '')) || 0;
}

// Helper: Parse growth percentage
function parseGrowth(val) {
    if (val === null || val === undefined) return -Infinity;
    if (typeof val === 'number') return val;
    return parseFloat(String(val).replace('%', '')) || -Infinity;
}

// Sort by total revenue descending
const byRevenue = [...allStartups].sort((a, b) =>
    parseRevenue(b.total_revenue) - parseRevenue(a.total_revenue)
);

// Sort by fetched_at descending (newest first)
const byDate = [...allStartups].sort((a, b) =>
    new Date(b.fetched_at || '').getTime() - new Date(a.fetched_at || '').getTime()
);

// Get IDs of top earners to exclude from "recent"
const topEarnerIds = new Set(byRevenue.slice(0, 150).map(s => s.id));

// Recent = not in top 150
const recent = byDate.filter(s => !topEarnerIds.has(s.id));

// === Generate Files ===

const searchIndex = {};

// 1. Homepage: Top 30 + Recent 20
const homepageTop = byRevenue.slice(0, 30);
const homepageRecent = recent.slice(0, 20);
const homepage = [...homepageTop, ...homepageRecent];

// Add to search index
homepage.forEach(s => { searchIndex[s.startup_name] = 'startups-homepage.json'; });

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'startups-homepage.json'),
    JSON.stringify(homepage, null, 2)
);
console.log('✓ startups-homepage.json:', homepage.length, 'startups');

// 2. Pagination: Top 31-150 + Recent 21-60
const paginationTop = byRevenue.slice(30, 150);
const paginationRecent = recent.slice(20, 60);
const pagination = [...paginationTop, ...paginationRecent];

// Add to search index
pagination.forEach(s => { searchIndex[s.startup_name] = 'startups-pagination.json'; });

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'startups-pagination.json'),
    JSON.stringify(pagination, null, 2)
);
console.log('✓ startups-pagination.json:', pagination.length, 'startups');

// 3. Ticker: 200 random with MRR>$100, growth>=1%, name<10 chars
const tickerCandidates = allStartups.filter(s => {
    const mrr = parseRevenue(s.mrr);
    if (mrr < 100) return false;

    const growth = parseGrowth(s.mom_growth);
    if (growth < 1) return false;

    return s.startup_name && s.startup_name.length > 0 && s.startup_name.length < 10;
});

// Shuffle (Fisher-Yates)
for (let i = tickerCandidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tickerCandidates[i], tickerCandidates[j]] = [tickerCandidates[j], tickerCandidates[i]];
}

const ticker = tickerCandidates.slice(0, 200);

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'startups-ticker.json'),
    JSON.stringify(ticker, null, 2)
);
console.log('✓ startups-ticker.json:', ticker.length, 'startups (from', tickerCandidates.length, 'candidates)');

// 4. Category files
const categories = {};
allStartups.forEach(s => {
    if (!s.category) return;
    const slug = s.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!categories[slug]) categories[slug] = [];
    categories[slug].push(s);
});

// Track which startups are in which category file
const categoryFiles = {};

Object.entries(categories).forEach(([slug, startups]) => {
    const filename = `startups-category-${slug}.json`;

    // Sort by MRR descending within category
    startups.sort((a, b) => parseRevenue(b.mrr) - parseRevenue(a.mrr));

    fs.writeFileSync(
        path.join(OUTPUT_DIR, filename),
        JSON.stringify(startups, null, 2)
    );

    // Add to search index (only if not already in homepage/pagination)
    startups.forEach(s => {
        if (!searchIndex[s.startup_name]) {
            searchIndex[s.startup_name] = filename;
        }
    });

    categoryFiles[slug] = startups.length;
});

console.log('✓ Category files:', Object.keys(categories).length, 'categories');
Object.entries(categoryFiles).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([slug, count]) => {
    console.log('  -', slug + ':', count, 'startups');
});

// 5. Search index
fs.writeFileSync(
    path.join(OUTPUT_DIR, 'startups-search-index.json'),
    JSON.stringify(searchIndex)
);
console.log('✓ startups-search-index.json:', Object.keys(searchIndex).length, 'entries');

// Summary
console.log('\n=== Summary ===');
const stats = {
    'startups-homepage.json': homepage.length,
    'startups-pagination.json': pagination.length,
    'startups-ticker.json': ticker.length,
    'startups-search-index.json': Object.keys(searchIndex).length + ' entries',
    'category files': Object.keys(categories).length + ' files'
};
Object.entries(stats).forEach(([file, count]) => {
    console.log('-', file + ':', count);
});

console.log('\n✅ All files generated successfully!');

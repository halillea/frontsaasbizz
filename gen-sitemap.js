import fs from 'fs';
import path from 'path';

// 1. Setup paths relative to the project root
const startupsPath = path.resolve('./content/startups.json');
const outputPath = path.resolve('./public/sitemap.xml');

// 2. Load the data manually to avoid "assert" or path issues
const startups = JSON.parse(fs.readFileSync(startupsPath, 'utf-8'));

const BASE_URL = 'https://saasbizz.com';
const date = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc><lastmod>${date}</lastmod><priority>1.0</priority></url>`;

// 3. Add Startup Pages
startups.forEach(s => {
  xml += `\n  <url><loc>${BASE_URL}/startup/${s.trustmrr_link}/</loc><priority>0.8</priority></url>`;
});

// 4. Add Founder Pages (Filtering out the 3 broken ones)
const founders = [...new Set(startups
  .filter(s => s.founder_name &&
    s.founder_name !== 'null,' &&
    s.founder_name.length > 2 &&
    !s.founder_name.includes('|') &&
    !s.founder_name.includes('𝕏'))
  .map(s => s.founder_name))];

founders.forEach(name => {
  xml += `\n  <url><loc>${BASE_URL}/founder/${encodeURIComponent(name)}/</loc><priority>0.5</priority></url>`;
});

xml += '\n</urlset>';

// 5. Ensure the public directory exists and write the file
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}

fs.writeFileSync(outputPath, xml);
console.log('------------------------------------------');
console.log('✅ Success! sitemap.xml created in /public');
console.log(`📍 Path: ${outputPath}`);
console.log('------------------------------------------');
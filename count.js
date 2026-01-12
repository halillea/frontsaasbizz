#!/usr/bin/env node
"use strict";

const fs = require("fs");

let cheerio;
try {
  cheerio = require("cheerio");
} catch (e) {
  console.error("Missing dependency: cheerio");
  console.error("Install it with: npm i cheerio");
  process.exit(1);
}

function normalizeWhitespace(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

// Counts “word-like” tokens (letters/digits) using Unicode property escapes.
// Requires Node 10+ (Unicode property escapes). Modern Node is fine.
function countWords(s) {
  const matches = normalizeWhitespace(s).match(/[\p{L}\p{N}]+/gu);
  return matches ? matches.length : 0;
}

function readAllStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => (data += chunk));
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

async function main() {
  const fileArg = process.argv[2];

  const html = fileArg
    ? fs.readFileSync(fileArg, "utf8")
    : await readAllStdin();

  if (!html || !html.trim()) {
    console.error("No HTML provided. Usage:");
    console.error("  node count-indexable-words.js page.html");
    console.error("  cat page.html | node count-indexable-words.js");
    process.exit(1);
  }

  const $ = cheerio.load(html);

  // Remove typically non-indexable / non-visible content
  $("script, style, noscript, template").remove();

  const titleText = normalizeWhitespace($("title").first().text());

  // "Visible" is approximated as text content excluding removed tags.
  // Server-side HTML parsing cannot perfectly replicate browser visibility rules.
  const bodyText = normalizeWhitespace($("body").text() || $.root().text());

  const altText = normalizeWhitespace(
    $("img[alt]")
      .map((_, el) => $(el).attr("alt"))
      .get()
      .filter(Boolean)
      .join(" ")
  );

  const ariaLabels = normalizeWhitespace(
    $("[aria-label]")
      .map((_, el) => $(el).attr("aria-label"))
      .get()
      .filter(Boolean)
      .join(" ")
  );

  const counts = {
    visible_body_only: countWords(bodyText),
    title_plus_visible: countWords(`${titleText} ${bodyText}`),
    visible_plus_alt: countWords(`${bodyText} ${altText}`),
    title_plus_visible_plus_alt: countWords(`${titleText} ${bodyText} ${altText}`),
    title_plus_visible_plus_alt_plus_aria: countWords(
      `${titleText} ${bodyText} ${altText} ${ariaLabels}`
    )
  };

  // Print results
  for (const [k, v] of Object.entries(counts)) {
    console.log(`${k}: ${v}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

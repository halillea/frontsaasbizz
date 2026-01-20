import { d as defineEventHandler, c as createError } from '../../_/nitro.mjs';
import { promises } from 'node:fs';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';

const scanArticles_get = defineEventHandler(async () => {
  const articlesNewPath = path.resolve(process.cwd(), "articles/new");
  try {
    try {
      await promises.access(articlesNewPath);
    } catch {
      return { articles: [], message: "No /articles/new/ folder found" };
    }
    const files = await promises.readdir(articlesNewPath);
    const mdFiles = files.filter((f) => f.endsWith(".md"));
    const articles = [];
    for (const filename of mdFiles) {
      const filePath = path.join(articlesNewPath, filename);
      const content = await promises.readFile(filePath, "utf-8");
      const lines = content.split("\n");
      let title = filename.replace(".md", "");
      const titleMatch = content.match(/^##\s+(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
      let source = "";
      const sourceMatch = content.match(/\*\*Source:\*\*\s*\[?[^\]]*\]?\(?([^)\s]+)\)?/i);
      if (sourceMatch) {
        source = sourceMatch[1];
      }
      let author = "SaaSBizz Team";
      const authorMatch = content.match(/\*\*Author:\*\*\s*(.+)$/m);
      if (authorMatch) {
        author = authorMatch[1].trim();
      }
      const slug = filename.replace(".md", "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      let excerpt = "";
      const paragraphs = content.split("\n\n");
      for (const para of paragraphs) {
        const trimmed = para.trim();
        if (trimmed && !trimmed.startsWith("##") && !trimmed.startsWith("**") && !trimmed.startsWith("*") && !trimmed.startsWith("-") && trimmed.length > 50) {
          excerpt = trimmed.slice(0, 200);
          break;
        }
      }
      articles.push({
        filename,
        title,
        slug,
        author,
        source,
        excerpt,
        content,
        category: "News"
      });
    }
    return {
      articles,
      count: articles.length
    };
  } catch (error) {
    console.error("Scan articles error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to scan articles folder"
    });
  }
});

export { scanArticles_get as default };
//# sourceMappingURL=scan-articles.get.mjs.map

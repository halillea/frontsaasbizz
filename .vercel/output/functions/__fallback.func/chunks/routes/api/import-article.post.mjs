import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { promises } from 'node:fs';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';

const importArticle_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.title || !body.slug || !body.content) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: title, slug, content"
    });
  }
  const articlesPath = path.resolve(process.cwd(), "content/articles.json");
  const articlesNewPath = path.resolve(process.cwd(), "articles/new");
  const articlesProcessedPath = path.resolve(process.cwd(), "articles/processed");
  try {
    let articles = [];
    try {
      const fileData = await promises.readFile(articlesPath, "utf-8");
      articles = JSON.parse(fileData);
    } catch {
      articles = [];
    }
    if (articles.some((a) => a.slug === body.slug)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Article with slug "${body.slug}" already exists`
      });
    }
    const newArticle = {
      id: Date.now(),
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      status: "published",
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || body.content.slice(0, 200),
      content: body.content,
      category: body.category || "News",
      featured_image: body.featured_image || "",
      author: body.author || "SaaSBizz Team",
      source: body.source || ""
    };
    articles.unshift(newArticle);
    await promises.writeFile(articlesPath, JSON.stringify(articles, null, 2), "utf-8");
    if (body.filename) {
      try {
        await promises.mkdir(articlesProcessedPath, { recursive: true });
        const sourcePath = path.join(articlesNewPath, body.filename);
        const destPath = path.join(articlesProcessedPath, body.filename);
        await promises.rename(sourcePath, destPath);
      } catch (moveError) {
        console.log("Could not move file:", moveError);
      }
    }
    return {
      success: true,
      message: `Article "${body.title}" imported successfully`,
      article: newArticle
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Import article error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to import article"
    });
  }
});

export { importArticle_post as default };
//# sourceMappingURL=import-article.post.mjs.map

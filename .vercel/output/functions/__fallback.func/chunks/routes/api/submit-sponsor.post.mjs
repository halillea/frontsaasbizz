import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { promises } from 'node:fs';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';

const submitSponsor_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.business_name || !body.website_url) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields"
    });
  }
  const sponsorsPath = path.resolve(process.cwd(), "content/sponsors.json");
  try {
    let sponsors = [];
    try {
      const fileData = await promises.readFile(sponsorsPath, "utf-8");
      sponsors = JSON.parse(fileData);
    } catch (e) {
      sponsors = [];
    }
    const newEntry = {
      id: Date.now(),
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      startup_name: body.business_name,
      website_url: body.website_url,
      tagline: body.tagline || null,
      category: body.keywords || null,
      mrr: "Pending",
      status: "pending"
    };
    sponsors.push(newEntry);
    await promises.writeFile(sponsorsPath, JSON.stringify(sponsors, null, 2), "utf-8");
    console.log(`[EMAIL SENDING] To: info@totakeaction.com`);
    console.log(`[EMAIL SUBJECT] New Sponsor Submission: ${body.business_name}`);
    console.log(`[EMAIL BODY]:`);
    console.log(`Business: ${body.business_name}`);
    console.log(`URL: ${body.website_url}`);
    console.log(`Tagline: ${body.tagline}`);
    console.log(`Keywords: ${body.keywords}`);
    return {
      success: true,
      message: "Sponsor data saved and email notification logged"
    };
  } catch (error) {
    console.error("API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to process submission"
    });
  }
});

export { submitSponsor_post as default };
//# sourceMappingURL=submit-sponsor.post.mjs.map

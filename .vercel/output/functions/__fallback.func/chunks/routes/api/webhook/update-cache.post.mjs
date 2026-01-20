import { d as defineEventHandler, r as readBody, g as getHeader, c as createError } from '../../../_/nitro.mjs';
import { createHash } from 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "saasbizz-webhook-secret-2026";
const updateCache_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const signature = getHeader(event, "x-hub-signature-256");
  if (signature) {
    const hmac = createHash("sha256");
    hmac.update(WEBHOOK_SECRET);
    const expectedSig = "sha256=" + createHash("sha256").update(JSON.stringify(body) + WEBHOOK_SECRET).digest("hex");
    const authHeader = getHeader(event, "authorization");
    if (!(authHeader == null ? void 0 : authHeader.includes(WEBHOOK_SECRET)) && signature !== expectedSig) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized"
      });
    }
  }
  console.log("\u{1F504} Webhook received: Refreshing article cache...");
  const timestamp = Date.now();
  return {
    success: true,
    message: "Cache invalidated successfully",
    timestamp,
    note: "Articles will be re-read from disk on next request"
  };
});

export { updateCache_post as default };
//# sourceMappingURL=update-cache.post.mjs.map

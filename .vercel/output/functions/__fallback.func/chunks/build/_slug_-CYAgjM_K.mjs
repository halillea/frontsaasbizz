import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { a as allArticles } from './articles-UYFHqK-6.mjs';
import { u as useRoute, a as useRuntimeConfig } from './server.mjs';
import { u as useSeoMeta, a as useHead } from './composables-BsSii2E9.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slug = route.params.slug;
    const article = computed(
      () => allArticles.find((a) => a.slug === slug && a.status === "published")
    );
    const renderedContent = computed(() => {
      if (!article.value) return "";
      let content = article.value.content.replace(/^##\s+.+$/m, "").replace(/\*\*Source:\*\*.*/gi, "").replace(/\*\*Author:\*\*.*/gi, "");
      let html = content.replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^\* (.+)$/gm, "<li>$1</li>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-blue-400 hover:underline">$1</a>').replace(/\n\n/g, "</p><p>").trim();
      return `<p>${html}</p>`.replace(/<p><h/g, "<h").replace(/<\/h(\d)><\/p>/g, "</h$1>").replace(/<p><\/p>/g, "");
    });
    const normalizedAuthor = computed(() => {
      const author = article.value?.author?.toLowerCase() || "";
      const genericAuthors = ["staff writer", "press release", "staff", "admin", "editor", "team", "saasbizz team", "anonymous"];
      const isGeneric = genericAuthors.some((g) => author.includes(g));
      const hasFullName = author.trim().includes(" ") && author.length > 5;
      if (isGeneric || !hasFullName) {
        return "Hal Smith";
      }
      return article.value?.author || "Hal Smith";
    });
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    }
    const config = useRuntimeConfig();
    const baseUrl = config.public?.siteUrl || "https://saasbizz.com";
    const canonicalUrl = `${baseUrl}/news/${slug}`;
    useSeoMeta({
      title: article.value ? `${article.value.title} - SaaSBizz News` : "Article Not Found - SaaSBizz",
      description: article.value?.excerpt || "Article not found",
      ogTitle: article.value?.title,
      ogDescription: article.value?.excerpt,
      ogImage: article.value?.featured_image,
      ogType: "article"
    });
    useHead({
      link: [
        { rel: "canonical", href: canonicalUrl }
      ],
      script: article.value ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.value.title,
            "description": article.value.excerpt,
            "image": article.value.featured_image || "",
            "datePublished": article.value.created_at,
            "author": {
              "@type": "Person",
              "name": article.value.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "SaaSBizz",
              "url": baseUrl
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            }
          })
        }
      ] : []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/news",
        class: "inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm mb-8 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Back to News `);
          } else {
            return [
              createTextVNode(" ← Back to News ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!article.value) {
        _push(`<div class="text-center py-20"><div class="text-5xl mb-4">📰</div><h1 class="text-2xl font-bold text-white mb-4">Article Not Found</h1><p class="text-slate-400 mb-6">The article you&#39;re looking for doesn&#39;t exist.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/news",
          class: "bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Browse All Articles `);
            } else {
              return [
                createTextVNode(" Browse All Articles ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<article class="space-y-6"><header class="space-y-3 mb-4"><div class="flex items-center gap-3 text-xs text-slate-500 uppercase tracking-widest"><span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">${ssrInterpolate(article.value.category)}</span><span>${ssrInterpolate(formatDate(article.value.created_at))}</span></div><h1 class="text-3xl md:text-4xl font-black text-white leading-tight">${ssrInterpolate(article.value.title)}</h1></header><div class="prose prose-invert prose-lg max-w-none">`);
        if (article.value.featured_image) {
          _push(`<img${ssrRenderAttr("src", article.value.featured_image)}${ssrRenderAttr("alt", article.value.title)} class="w-32 h-32 object-cover rounded-xl float-left mr-3 mb-2" loading="lazy" width="128" height="128">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-slate-400 text-sm mb-3">Author: ${ssrInterpolate(normalizedAuthor.value)}</p><div class="article-content">${renderedContent.value ?? ""}</div></div><footer class="pt-8 border-t border-white/10 clear-both"><div class="flex items-center justify-between">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/news",
          class: "text-blue-400 hover:text-blue-300 font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ← More Articles `);
            } else {
              return [
                createTextVNode(" ← More Articles ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></footer></article>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CYAgjM_K.mjs.map

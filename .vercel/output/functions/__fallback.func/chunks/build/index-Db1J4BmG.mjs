import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { _ as __nuxt_component_3 } from './SearchSection-DktYSMHr.mjs';
import { defineComponent, computed, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { a as allArticles } from './articles-UYFHqK-6.mjs';
import { u as useSeoMeta } from './composables-BsSii2E9.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './StartupCard-BhfBq3MU.mjs';
import './useTheme-ew5KROLl.mjs';
import './startups-B8z0MfgU.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const publishedArticles = computed(
      () => allArticles.filter((a) => a.status === "published").sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    );
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }
    function getCategoryEmoji(category) {
      const emojis = {
        "Trends": "📈",
        "Growth": "💰",
        "News": "📰",
        "Guides": "📚",
        "Interviews": "🎙️",
        "Tools": "🛠️"
      };
      return emojis[category] || "📝";
    }
    function getGradientClass(category) {
      const gradients = {
        "Trends": "bg-gradient-to-br from-blue-600 to-purple-600",
        "Growth": "bg-gradient-to-br from-green-600 to-teal-600",
        "News": "bg-gradient-to-br from-orange-600 to-red-600",
        "Guides": "bg-gradient-to-br from-indigo-600 to-blue-600",
        "Interviews": "bg-gradient-to-br from-pink-600 to-purple-600",
        "Tools": "bg-gradient-to-br from-cyan-600 to-blue-600"
      };
      return gradients[category] || "bg-gradient-to-br from-slate-600 to-slate-700";
    }
    useSeoMeta({
      title: "News & Blog - SaaSBizz",
      description: "Latest trends, insights, and stories from the SaaS world. Stay updated with SaaSBizz News.",
      ogTitle: "News & Blog - SaaSBizz",
      ogDescription: "Latest trends, insights, and stories from the SaaS world."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_SearchSection = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><header class="text-center py-8"><h1 class="text-4xl font-black tracking-tight text-white mb-4"> 📰 SaaSBizz News </h1><p class="text-slate-400 text-lg max-w-2xl mx-auto"> Stay updated with the latest trends, insights, and stories from the SaaS world </p></header><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><!--[-->`);
      ssrRenderList(publishedArticles.value, (article) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: article.id,
          to: `/news/${article.slug}`,
          class: "glass-card rounded-2xl overflow-hidden hover-glow transition-all cursor-pointer block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (article.featured_image) {
                _push2(`<div class="h-48 bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${article.featured_image})` })}"${_scopeId}></div>`);
              } else {
                _push2(`<div class="${ssrRenderClass([getGradientClass(article.category), "h-48 flex items-center justify-center"])}"${_scopeId}><span class="text-6xl"${_scopeId}>${ssrInterpolate(getCategoryEmoji(article.category))}</span></div>`);
              }
              _push2(`<div class="p-6 space-y-4"${_scopeId}><div class="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(article.created_at))}</span><span${_scopeId}>•</span><span${_scopeId}>${ssrInterpolate(article.category)}</span></div><h2 class="text-xl font-bold text-white"${_scopeId}>${ssrInterpolate(article.title)}</h2><p class="text-slate-400 text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(article.excerpt)}</p><div class="pt-4 border-t border-white/5 flex items-center justify-between"${_scopeId}><span class="text-xs text-slate-500"${_scopeId}>By ${ssrInterpolate(article.author)}</span><span class="text-blue-400 text-sm font-medium"${_scopeId}> Read more → </span></div></div>`);
            } else {
              return [
                article.featured_image ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "h-48 bg-cover bg-center",
                  style: { backgroundImage: `url(${article.featured_image})` }
                }, null, 4)) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: ["h-48 flex items-center justify-center", getGradientClass(article.category)]
                }, [
                  createVNode("span", { class: "text-6xl" }, toDisplayString(getCategoryEmoji(article.category)), 1)
                ], 2)),
                createVNode("div", { class: "p-6 space-y-4" }, [
                  createVNode("div", { class: "flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest" }, [
                    createVNode("span", null, toDisplayString(formatDate(article.created_at)), 1),
                    createVNode("span", null, "•"),
                    createVNode("span", null, toDisplayString(article.category), 1)
                  ]),
                  createVNode("h2", { class: "text-xl font-bold text-white" }, toDisplayString(article.title), 1),
                  createVNode("p", { class: "text-slate-400 text-sm leading-relaxed" }, toDisplayString(article.excerpt), 1),
                  createVNode("div", { class: "pt-4 border-t border-white/5 flex items-center justify-between" }, [
                    createVNode("span", { class: "text-xs text-slate-500" }, "By " + toDisplayString(article.author), 1),
                    createVNode("span", { class: "text-blue-400 text-sm font-medium" }, " Read more → ")
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (publishedArticles.value.length === 0) {
        _push(`<div class="text-center py-12"><div class="text-5xl mb-4">📝</div><p class="text-slate-400">No articles published yet. Check back soon!</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="glass-card rounded-2xl p-8 text-center"><h3 class="text-xl font-bold text-white mb-2">📬 Stay in the Loop</h3><p class="text-slate-400 mb-6 max-w-md mx-auto"> Get weekly insights on SaaS trends, founder stories, and revenue data delivered to your inbox. </p><div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"><input type="email" placeholder="your@email.com" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"><button class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"> Subscribe </button></div><p class="text-xs text-slate-500 mt-3">No spam, unsubscribe anytime</p></div>`);
      _push(ssrRenderComponent(_component_SearchSection, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Db1J4BmG.mjs.map

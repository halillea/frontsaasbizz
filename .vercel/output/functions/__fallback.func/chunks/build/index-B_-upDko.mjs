import { _ as __nuxt_component_0 } from './LoadingSkeleton-BAYOmH1U.mjs';
import { _ as __nuxt_component_1 } from './StartupCard-BhfBq3MU.mjs';
import { _ as __nuxt_component_2 } from './Pagination-f59Ny8g1.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, createVNode, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { p as parseRevenue, u as useTheme } from './useTheme-ew5KROLl.mjs';
import { a as allArticles } from './articles-UYFHqK-6.mjs';
import { _ as __nuxt_component_3$1 } from './SearchSection-DktYSMHr.mjs';
import { a as allStartups } from './startups-B8z0MfgU.mjs';
import { u as useSeoMeta, a as useHead } from './composables-BsSii2E9.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NewsBox",
  __ssrInlineRender: true,
  setup(__props) {
    const { themeColor } = useTheme();
    const displayedArticles = computed(
      () => allArticles.filter((a) => a.status === "published").sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4).map((article) => ({
        ...article,
        // Use 64x64 thumbnail if available
        thumbnail: article.featured_image?.replace("/200by200/", "/64by64/")
      }))
    );
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
        "Guides": "bg-gradient-to-br from-indigo-600 to-blue-600"
      };
      return gradients[category] || "bg-gradient-to-br from-slate-600 to-slate-700";
    }
    function getTrendIcon(id) {
      const icons = ["📈", "🔥", "⚡", "📉", "💡", "🚀", "⭐", "💎"];
      return icons[id % icons.length];
    }
    function getTrendClass(id) {
      const classes = ["text-green-400", "text-orange-400", "text-yellow-400", "text-red-400"];
      return classes[id % classes.length];
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card rounded-xl p-3 mb-4" }, _attrs))}><div class="flex items-center justify-between mb-2"><h3 class="text-sm font-bold text-white uppercase tracking-wider">📰 Latest News</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/news",
        class: "text-[10px] text-blue-400 hover:text-blue-300 uppercase tracking-widest font-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All → `);
          } else {
            return [
              createTextVNode(" View All → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-2"><!--[-->`);
      ssrRenderList(displayedArticles.value, (article) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: article.id,
          to: `/news/${article.slug}`,
          class: ["group block rounded-lg p-2 transition-all cursor-pointer", unref(themeColor) === "white" ? "bg-slate-100/80 hover:bg-slate-200/80" : "bg-slate-800/50 hover:bg-slate-700/50"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-start gap-2"${_scopeId}>`);
              if (article.thumbnail) {
                _push2(`<img${ssrRenderAttr("src", article.thumbnail)}${ssrRenderAttr("alt", article.title)} class="w-10 h-10 rounded-md object-cover flex-shrink-0"${_scopeId}>`);
              } else {
                _push2(`<div class="${ssrRenderClass([getGradientClass(article.category), "w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center text-lg"])}"${_scopeId}>${ssrInterpolate(getCategoryEmoji(article.category))}</div>`);
              }
              _push2(`<div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-1"${_scopeId}><span class="${ssrRenderClass([getTrendClass(article.id), "text-xs animate-pulse"])}"${_scopeId}>${ssrInterpolate(getTrendIcon(article.id))}</span><span class="text-[9px] text-slate-500 uppercase"${_scopeId}>${ssrInterpolate(article.category)}</span></div><h4 class="${ssrRenderClass([unref(themeColor) === "white" ? "text-slate-800 group-hover:text-blue-600" : "text-slate-200 group-hover:text-blue-400", "text-[11px] font-bold line-clamp-2 leading-tight transition-colors"])}"${_scopeId}>${ssrInterpolate(article.title)}</h4></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-start gap-2" }, [
                  article.thumbnail ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: article.thumbnail,
                    alt: article.title,
                    class: "w-10 h-10 rounded-md object-cover flex-shrink-0"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: ["w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center text-lg", getGradientClass(article.category)]
                  }, toDisplayString(getCategoryEmoji(article.category)), 3)),
                  createVNode("div", { class: "flex-1 min-w-0" }, [
                    createVNode("div", { class: "flex items-center gap-1" }, [
                      createVNode("span", {
                        class: ["text-xs animate-pulse", getTrendClass(article.id)]
                      }, toDisplayString(getTrendIcon(article.id)), 3),
                      createVNode("span", { class: "text-[9px] text-slate-500 uppercase" }, toDisplayString(article.category), 1)
                    ]),
                    createVNode("h4", {
                      class: ["text-[11px] font-bold line-clamp-2 leading-tight transition-colors", unref(themeColor) === "white" ? "text-slate-800 group-hover:text-blue-600" : "text-slate-200 group-hover:text-blue-400"]
                    }, toDisplayString(article.title), 3)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NewsBox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "NewsBox" });
const EARNER_PER_PAGE = 40;
const RECENT_PER_PAGE = 30;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const startups = allStartups;
    const isLoading = ref(true);
    const topEarnersPage = ref(1);
    const recentPage = ref(1);
    const topEarners = computed(() => {
      return [...startups].sort((a, b) => parseRevenue(b.total_revenue) - parseRevenue(a.total_revenue)).slice(0, 150);
    });
    const recentlyAdded = computed(() => {
      const topEarnerIds = new Set(topEarners.value.map((s) => s.id));
      return [...startups].filter((s) => !topEarnerIds.has(s.id)).sort((a, b) => new Date(b.fetched_at || "").getTime() - new Date(a.fetched_at || "").getTime()).slice(0, 60);
    });
    const paginatedTopEarners = computed(() => {
      const start = (topEarnersPage.value - 1) * EARNER_PER_PAGE;
      return topEarners.value.slice(start, start + EARNER_PER_PAGE);
    });
    const paginatedRecentlyAdded = computed(() => {
      const start = (recentPage.value - 1) * RECENT_PER_PAGE;
      return recentlyAdded.value.slice(start, start + RECENT_PER_PAGE);
    });
    const topEarnersTotalPages = computed(() => Math.ceil(topEarners.value.length / EARNER_PER_PAGE));
    const recentTotalPages = computed(() => Math.ceil(recentlyAdded.value.length / RECENT_PER_PAGE));
    useSeoMeta({
      title: "SaaSBizz - Verified SaaS Leaderboard",
      description: "Discover verified SaaS startups ranked by revenue. Real MRR data from founders building in public.",
      ogTitle: "SaaSBizz - Verified SaaS Leaderboard",
      ogDescription: "Discover verified SaaS startups ranked by revenue. Real MRR data from founders building in public.",
      ogUrl: "https://saasbizz.com",
      twitterTitle: "SaaSBizz - Verified SaaS Leaderboard",
      twitterDescription: "Discover verified SaaS startups ranked by revenue. Real MRR data from founders building in public."
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SaaSBizz",
            url: "https://saasbizz.com",
            description: "Verified SaaS Leaderboard - Real MRR data from founders building in public",
            publisher: {
              "@type": "Organization",
              name: "SaaSBizz",
              url: "https://saasbizz.com"
            }
          })
        }
      ],
      style: [
        {
          innerHTML: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSkeleton = __nuxt_component_0;
      const _component_StartupCard = __nuxt_component_1;
      const _component_Pagination = __nuxt_component_2;
      const _component_NewsBox = __nuxt_component_3;
      const _component_SearchSection = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}>`);
      if (isLoading.value) {
        _push(`<div><div class="flex items-center gap-3 mb-6"><span class="text-2xl">🏆</span><h2 class="text-2xl font-black tracking-tight text-white uppercase italic">Top Earners</h2></div>`);
        _push(ssrRenderComponent(_component_LoadingSkeleton, { count: 10 }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><section aria-labelledby="top-earners-heading"><div class="flex items-center gap-3 mb-0"><span class="text-2xl" aria-hidden="true">🏆</span><h2 id="top-earners-heading" class="text-2xl font-black tracking-tight text-white uppercase italic"> Top 40 Earners </h2></div><div class="hidden lg:flex items-center gap-4 px-4 py-1 mb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5"><div class="w-[35%] flex gap-12"><span>Startup</span></div><div class="w-[65%] flex items-center px-4"><span class="w-[140px] text-left">Founder</span><span class="w-28 text-right ml-10">Total Revenue</span><span class="w-32 text-right ml-auto">MRR</span><span class="w-16 text-right ml-4">MoM Growth</span></div></div><div class="space-y-2" role="list" aria-label="Top earning startups"><!--[-->`);
        ssrRenderList(paginatedTopEarners.value, (startup, index) => {
          _push(ssrRenderComponent(_component_StartupCard, {
            key: "earner-" + startup.id,
            startup,
            rank: (topEarnersPage.value - 1) * EARNER_PER_PAGE + index + 1
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_Pagination, {
          "current-page": topEarnersPage.value,
          "total-pages": topEarnersTotalPages.value,
          "item-name": "top earners",
          "aria-label": "Top earners pagination",
          onPrev: ($event) => topEarnersPage.value--,
          onNext: ($event) => topEarnersPage.value++
        }, null, _parent));
        _push(`</section>`);
        _push(ssrRenderComponent(_component_NewsBox, null, null, _parent));
        _push(`<section aria-labelledby="recent-heading" class="mt-16"><div class="flex items-center gap-3 mb-0"><span class="text-2xl" aria-hidden="true">✨</span><h2 id="recent-heading" class="text-2xl font-black tracking-tight text-white uppercase italic"> Recently Added (30) </h2></div><div class="hidden lg:flex items-center gap-4 px-4 py-1 mb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5"><div class="w-[35%] flex gap-12"><span>Startup</span></div><div class="w-[65%] flex items-center px-4"><span class="w-[140px] text-left">Founder</span><span class="w-28 text-right ml-10">Total Revenue</span><span class="w-32 text-right ml-auto">MRR</span><span class="w-16 text-right ml-4">MoM Growth</span></div></div><div class="space-y-2" role="list" aria-label="Recently added startups"><!--[-->`);
        ssrRenderList(paginatedRecentlyAdded.value, (startup) => {
          _push(ssrRenderComponent(_component_StartupCard, {
            key: "recent-" + startup.id,
            startup
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_Pagination, {
          "current-page": recentPage.value,
          "total-pages": recentTotalPages.value,
          "item-name": "recent startups",
          "aria-label": "Recently added pagination",
          onPrev: ($event) => recentPage.value--,
          onNext: ($event) => recentPage.value++
        }, null, _parent));
        _push(`</section>`);
        _push(ssrRenderComponent(_component_SearchSection, null, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B_-upDko.mjs.map

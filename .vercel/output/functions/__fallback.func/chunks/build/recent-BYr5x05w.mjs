import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { _ as __nuxt_component_2 } from './Pagination-f59Ny8g1.mjs';
import { _ as __nuxt_component_3 } from './SearchSection-DktYSMHr.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { a as allStartups } from './startups-B8z0MfgU.mjs';
import { f as formatCurrency } from './useTheme-ew5KROLl.mjs';
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

const PER_PAGE = 30;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "recent",
  __ssrInlineRender: true,
  setup(__props) {
    const currentPage = ref(1);
    const startups = allStartups;
    const sortedStartups = computed(() => {
      return [...startups].sort(
        (a, b) => new Date(b.fetched_at || "").getTime() - new Date(a.fetched_at || "").getTime()
      );
    });
    const totalPages = computed(() => Math.ceil(sortedStartups.value.length / PER_PAGE));
    const paginatedStartups = computed(() => {
      const start = (currentPage.value - 1) * PER_PAGE;
      return sortedStartups.value.slice(start, start + PER_PAGE);
    });
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    function handleImageError(e) {
      const img = e.target;
      img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100" rx="12"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="%2394a3b8">?</text></svg>';
    }
    useSeoMeta({
      title: "Recently Added Startups - SaaSBizz",
      description: "Browse the newest startups added to the SaaSBizz leaderboard, sorted by date.",
      ogTitle: "Recently Added Startups - SaaSBizz",
      ogDescription: "Browse the newest startups added to the SaaSBizz leaderboard, sorted by date."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Pagination = __nuxt_component_2;
      const _component_SearchSection = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><header class="flex items-center gap-3"><span class="text-3xl" aria-hidden="true">✨</span><div><h1 class="text-3xl font-black tracking-tight text-white uppercase italic"> Recently Added </h1><p class="text-slate-400 text-sm mt-1">Newest startups added to the leaderboard, sorted by date</p></div></header><div class="hidden lg:flex items-center gap-4 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5"><div class="w-[35%] flex gap-12"><span>Startup</span></div><div class="w-[65%] flex items-center gap-8 px-4 justify-end"><span class="w-[140px] text-left">Founder</span><div class="flex gap-5 flex-shrink-0 text-right min-w-[280px] justify-end"><span class="w-28">Total Revenue</span><span class="w-24">MRR</span><span class="w-16">Added</span></div></div></div><div class="space-y-2" role="list" aria-label="Recently added startups"><!--[-->`);
      ssrRenderList(paginatedStartups.value, (startup) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: startup.id,
          to: `/startup/${startup.trustmrr_link}`,
          class: "group relative flex items-center gap-4 py-2 px-4 rounded-xl glass-card hover-glow border-[1px] border-white/5 transition-all duration-300",
          role: "listitem"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-[35%] flex items-center gap-3 flex-shrink-0 min-w-0"${_scopeId}><div class="relative flex-shrink-0"${_scopeId}><img${ssrRenderAttr("src", `https://www.google.com/s2/favicons?domain=${startup.domain}&sz=64`)}${ssrRenderAttr("alt", `${startup.startup_name} logo`)} class="relative w-8 h-8 rounded-lg border border-white/10 bg-slate-900 object-cover" loading="lazy" width="32" height="32"${_scopeId}></div><div class="flex flex-col min-w-0"${_scopeId}><h3 class="font-normal text-sm text-white truncate group-hover:text-blue-400 transition-colors"${_scopeId}>${ssrInterpolate(startup.startup_name)}</h3><p class="text-[11px] text-slate-400 truncate font-light mt-0.5"${_scopeId}>${ssrInterpolate(startup.tagline || startup.full_description)}</p></div></div><div class="w-[65%] flex items-center gap-8 px-4 border-l border-white/5 justify-end"${_scopeId}><div class="flex items-center gap-2 w-[140px] flex-shrink-0"${_scopeId}><div class="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-slate-800 flex-shrink-0"${_scopeId}>`);
              if (startup.founder_image_local_path) {
                _push2(`<img${ssrRenderAttr("src", `/founder_images/${startup.founder_image_local_path}`)}${ssrRenderAttr("alt", startup.founder_name)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="w-full h-full flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase"${_scopeId}>${ssrInterpolate((startup.founder_name || "A").charAt(0))}</div>`);
              }
              _push2(`</div><div class="text-sm font-medium text-slate-300 truncate"${_scopeId}>${ssrInterpolate(startup.founder_name || "Anonymous")}</div></div><div class="flex items-center gap-5 flex-shrink-0 text-right min-w-[280px] justify-end"${_scopeId}><div class="w-28 text-right"${_scopeId}><div class="font-mono font-bold text-lg text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(startup.total_revenue))}</div></div><div class="w-24 text-right"${_scopeId}><div class="font-mono font-bold text-lg text-slate-200"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(startup.mrr))}</div></div><div class="w-16 text-right"${_scopeId}><div class="font-mono text-xs text-slate-400"${_scopeId}>${ssrInterpolate(formatDate(startup.fetched_at))}</div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "w-[35%] flex items-center gap-3 flex-shrink-0 min-w-0" }, [
                  createVNode("div", { class: "relative flex-shrink-0" }, [
                    createVNode("img", {
                      src: `https://www.google.com/s2/favicons?domain=${startup.domain}&sz=64`,
                      alt: `${startup.startup_name} logo`,
                      class: "relative w-8 h-8 rounded-lg border border-white/10 bg-slate-900 object-cover",
                      loading: "lazy",
                      width: "32",
                      height: "32",
                      onError: handleImageError
                    }, null, 40, ["src", "alt"])
                  ]),
                  createVNode("div", { class: "flex flex-col min-w-0" }, [
                    createVNode("h3", { class: "font-normal text-sm text-white truncate group-hover:text-blue-400 transition-colors" }, toDisplayString(startup.startup_name), 1),
                    createVNode("p", { class: "text-[11px] text-slate-400 truncate font-light mt-0.5" }, toDisplayString(startup.tagline || startup.full_description), 1)
                  ])
                ]),
                createVNode("div", { class: "w-[65%] flex items-center gap-8 px-4 border-l border-white/5 justify-end" }, [
                  createVNode("div", { class: "flex items-center gap-2 w-[140px] flex-shrink-0" }, [
                    createVNode("div", { class: "w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-slate-800 flex-shrink-0" }, [
                      startup.founder_image_local_path ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `/founder_images/${startup.founder_image_local_path}`,
                        alt: startup.founder_name,
                        class: "w-full h-full object-cover",
                        onError: (e) => e.target.style.display = "none"
                      }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "w-full h-full flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase"
                      }, toDisplayString((startup.founder_name || "A").charAt(0)), 1))
                    ]),
                    createVNode("div", { class: "text-sm font-medium text-slate-300 truncate" }, toDisplayString(startup.founder_name || "Anonymous"), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-5 flex-shrink-0 text-right min-w-[280px] justify-end" }, [
                    createVNode("div", { class: "w-28 text-right" }, [
                      createVNode("div", { class: "font-mono font-bold text-lg text-white" }, toDisplayString(unref(formatCurrency)(startup.total_revenue)), 1)
                    ]),
                    createVNode("div", { class: "w-24 text-right" }, [
                      createVNode("div", { class: "font-mono font-bold text-lg text-slate-200" }, toDisplayString(unref(formatCurrency)(startup.mrr)), 1)
                    ]),
                    createVNode("div", { class: "w-16 text-right" }, [
                      createVNode("div", { class: "font-mono text-xs text-slate-400" }, toDisplayString(formatDate(startup.fetched_at)), 1)
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_Pagination, {
        "current-page": currentPage.value,
        "total-pages": totalPages.value,
        "item-name": "startups",
        "aria-label": "Recently added pagination",
        onPrev: ($event) => currentPage.value--,
        onNext: ($event) => currentPage.value++
      }, null, _parent));
      _push(ssrRenderComponent(_component_SearchSection, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=recent-BYr5x05w.mjs.map

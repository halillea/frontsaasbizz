import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, unref, renderSlot, createTextVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useTheme, f as formatCurrency } from './useTheme-ew5KROLl.mjs';
import { a as allStartups } from './startups-B8z0MfgU.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_1$1 } from './ErrorBoundary-29hSkXAx.mjs';
import { _ as _imports_0 } from './virtual_public-BpVXPysT.mjs';
import { useRoute } from 'vue-router';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ThemeSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { themeColor } = useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all", unref(themeColor) === "blue" ? "text-slate-500 hover:text-blue-400" : "text-slate-600 hover:text-slate-800"],
        "aria-label": `Switch to ${unref(themeColor) === "blue" ? "light" : "dark"} theme`
      }, _attrs))}>`);
      if (unref(themeColor) === "blue") {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`);
      }
      _push(`<span>${ssrInterpolate(unref(themeColor) === "blue" ? "Blue" : "Sunny")}</span></button>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThemeSwitcher.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$3, { __name: "ThemeSwitcher" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SaasBizzIndex",
  __ssrInlineRender: true,
  setup(__props) {
    const { themeColor } = useTheme();
    const tickerStartups = computed(() => {
      return allStartups.filter((s) => {
        const mrrStr = String(s.mrr).toLowerCase();
        if (mrrStr === "pre-revenue" || mrrStr === "$0" || s.mrr === 0) return false;
        return s.startup_name && s.startup_name.length < 10;
      }).slice(0, 25);
    });
    function getGrowthColor(growth) {
      if (growth === null || growth === void 0) return "text-slate-500";
      if (String(growth).startsWith("-")) return "text-red-600";
      return "text-green-600";
    }
    function isPositiveGrowth(growth) {
      if (growth === null || growth === void 0) return false;
      return !String(growth).startsWith("-");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["w-full h-11 flex items-center gap-3 p-1.5 mb-1 rounded-2xl border transition-colors duration-300", unref(themeColor) === "white" ? "bg-slate-50 border-slate-200" : "bg-slate-800/50 border-white/5"]
      }, _attrs))} data-v-930ca814><div class="pl-3 shrink-0" data-v-930ca814><span class="${ssrRenderClass([unref(themeColor) === "white" ? "text-blue-900" : "text-blue-400", "text-xs font-black uppercase tracking-widest whitespace-nowrap"])}" data-v-930ca814> SaaSBizz Index </span></div><div class="${ssrRenderClass([unref(themeColor) === "white" ? "bg-white border-slate-200 shadow-sm" : "bg-slate-100/95 border-white/10", "flex-1 h-full overflow-hidden relative flex items-center rounded-xl border transition-colors duration-300"])}" data-v-930ca814><div class="flex items-center gap-6 whitespace-nowrap animate-ticker pl-4" data-v-930ca814><!--[-->`);
      ssrRenderList(tickerStartups.value, (startup) => {
        _push(`<div class="flex items-baseline gap-3 text-xs" data-v-930ca814><span class="font-bold transition-colors text-blue-500" data-v-930ca814>${ssrInterpolate(startup.startup_name)}</span><span class="font-black font-mono text-black transition-colors" data-v-930ca814>${ssrInterpolate(unref(formatCurrency)(startup.mrr))}</span>`);
        if (startup.mom_growth) {
          _push(`<span class="${ssrRenderClass([getGrowthColor(startup.mom_growth), "font-bold flex items-center gap-1"])}" data-v-930ca814>`);
          if (isPositiveGrowth(startup.mom_growth)) {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-930ca814><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-930ca814></path></svg>`);
          } else {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-930ca814><path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" data-v-930ca814></path></svg>`);
          }
          _push(` ${ssrInterpolate(startup.mom_growth)}${ssrInterpolate(typeof startup.mom_growth === "number" ? "%" : "")}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(tickerStartups.value, (startup) => {
        _push(`<div class="flex items-baseline gap-3 text-xs" data-v-930ca814><span class="font-bold transition-colors text-blue-500" data-v-930ca814>${ssrInterpolate(startup.startup_name)}</span><span class="font-black font-mono text-black transition-colors" data-v-930ca814>${ssrInterpolate(unref(formatCurrency)(startup.mrr))}</span>`);
        if (startup.mom_growth) {
          _push(`<span class="${ssrRenderClass([getGrowthColor(startup.mom_growth), "font-bold flex items-center gap-1"])}" data-v-930ca814>`);
          if (isPositiveGrowth(startup.mom_growth)) {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-930ca814><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-930ca814></path></svg>`);
          } else {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-930ca814><path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" data-v-930ca814></path></svg>`);
          }
          _push(` ${ssrInterpolate(startup.mom_growth)}${ssrInterpolate(typeof startup.mom_growth === "number" ? "%" : "")}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SaasBizzIndex.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-930ca814"]]), { __name: "SaasBizzIndex" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdCard",
  __ssrInlineRender: true,
  props: {
    ad: {},
    index: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.ad.href || "#",
        class: [
          "block px-6 py-5 rounded-xl glass-card transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden",
          __props.index % 5 === 0 ? "bg-blue-500/5 border-blue-500/10" : __props.index % 5 === 1 ? "bg-indigo-500/5 border-indigo-500/10" : __props.index % 5 === 2 ? "bg-purple-500/5 border-purple-500/10" : __props.index % 5 === 3 ? "bg-emerald-500/5 border-emerald-500/10" : "bg-slate-500/5 border-slate-500/10"
        ],
        "aria-label": `${__props.ad.name} - ${__props.ad.copy}`
      }, _attrs))}><div class="${ssrRenderClass([[
        __props.index % 5 === 0 ? "bg-blue-500" : __props.index % 5 === 1 ? "bg-indigo-500" : __props.index % 5 === 2 ? "bg-purple-500" : __props.index % 5 === 3 ? "bg-emerald-500" : "bg-slate-500"
      ], "absolute -right-4 -top-4 w-20 h-20 blur-2xl transition-opacity duration-300 opacity-20 group-hover:opacity-50"])}"></div><div class="flex items-center gap-3 mb-1.5 relative z-10">`);
      if (__props.ad.emoji) {
        _push(`<span class="text-xl filter drop-shadow-sm grayscale group-hover:grayscale-0 transition-all duration-300" aria-hidden="true">${ssrInterpolate(__props.ad.emoji)}</span>`);
      } else {
        _push(`<span class="w-6 h-6 rounded bg-white/5 text-blue-400 flex items-center justify-center text-[11px] font-black uppercase tracking-wider border border-white/10" aria-hidden="true">Ad</span>`);
      }
      _push(`<span class="font-black text-sm text-slate-200 group-hover:text-blue-400 truncate">${ssrInterpolate(__props.ad.name)}</span></div><p class="text-[12px] leading-snug text-slate-400 font-medium relative z-10 line-clamp-2">${ssrInterpolate(__props.ad.copy)}</p></a>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "AdCard" });
const BLUE_PALETTE = ["#eff6ff", "#dbeafe", "#e0f2fe", "#cffafe", "#e0e7ff"];
function useAds() {
  const adInventory = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Partner ${i + 1}`,
    emoji: ["🚀", "⚡", "🔥", "💎", "💰", "📈", "🎯", "⭐"][i % 8] || "🚀",
    copy: "Scale your SaaS faster. Join 500+ founders who trust us.",
    bg: BLUE_PALETTE[i % 5] || BLUE_PALETTE[0]
  }));
  const adGroupIndex = ref(0);
  const currentRightAds = computed(
    () => adInventory.slice(
      adGroupIndex.value === 0 ? 0 : 6,
      adGroupIndex.value === 0 ? 6 : 12
    )
  );
  return {
    adGroupIndex,
    currentRightAds
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { themeColor } = useTheme();
    const { currentRightAds } = useAds();
    const route = useRoute();
    const isHomePage = computed(() => route.path === "/");
    const isAdminPage = computed(() => route.path === "/admin" || route.path === "/login");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ThemeSwitcher = __nuxt_component_1;
      const _component_SaasBizzIndex = __nuxt_component_2;
      const _component_ErrorBoundary = __nuxt_component_1$1;
      const _component_AdCard = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#030712] font-sans text-slate-200 selection:bg-blue-500/30 selection:text-blue-200" }, _attrs))} data-v-bcc2c881><a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none" data-v-bcc2c881> Skip to main content </a>`);
      if (!isAdminPage.value) {
        _push(`<header class="bg-slate-900 text-white border-b border-slate-800 relative z-50 pt-4 pb-4" role="banner" data-v-bcc2c881><div class="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-2" data-v-bcc2c881>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "flex items-center gap-3 shrink-0 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1",
          "aria-label": "SaaSBizz Home"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="SaaSBizz Logo" class="w-8 h-8 rounded shadow-lg group-hover:scale-105 transition-transform duration-300" width="32" height="32" data-v-bcc2c881${_scopeId}><div class="flex flex-col hidden sm:flex" data-v-bcc2c881${_scopeId}><span class="font-black text-lg tracking-tight text-white leading-none group-hover:text-blue-200 transition-colors" data-v-bcc2c881${_scopeId}>SaaSBizz</span><span class="text-[9px] uppercase tracking-[0.2em] text-blue-400 font-bold leading-none mt-0.5" data-v-bcc2c881${_scopeId}>Verified</span></div>`);
            } else {
              return [
                createVNode("img", {
                  src: _imports_0,
                  alt: "SaaSBizz Logo",
                  class: "w-8 h-8 rounded shadow-lg group-hover:scale-105 transition-transform duration-300",
                  width: "32",
                  height: "32"
                }),
                createVNode("div", { class: "flex flex-col hidden sm:flex" }, [
                  createVNode("span", { class: "font-black text-lg tracking-tight text-white leading-none group-hover:text-blue-200 transition-colors" }, "SaaSBizz"),
                  createVNode("span", { class: "text-[9px] uppercase tracking-[0.2em] text-blue-400 font-bold leading-none mt-0.5" }, "Verified")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex-1 flex justify-center text-center" data-v-bcc2c881><a href="https://saasitron.com" target="_blank" rel="noopener noreferrer" class="group flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md p-1" aria-label="SAASitron Sponsor Link (opens in new tab)" data-v-bcc2c881><span class="text-sm md:text-base font-medium truncate max-w-[200px] md:max-w-none" data-v-bcc2c881><span class="font-bold text-blue-400" data-v-bcc2c881>SAASitron:</span><span class="hidden md:inline" data-v-bcc2c881>Stop coding from scratch. Ship in days.</span><span class="md:hidden" data-v-bcc2c881>Ship your SaaS in days.</span></span><span class="group-hover:translate-x-1 transition-transform text-base" aria-hidden="true" data-v-bcc2c881>→</span></a></div><div class="flex items-center gap-4 shrink-0" data-v-bcc2c881>`);
        _push(ssrRenderComponent(_component_ThemeSwitcher, null, null, _parent));
        _push(`<a href="/advertise/" target="_blank" rel="noopener noreferrer" class="${ssrRenderClass([unref(themeColor) === "white" ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:text-blue-600" : "bg-slate-800/50 border-transparent text-slate-400 hover:text-white hover:border-slate-700", "hidden md:flex text-[10px] uppercase font-bold tracking-widest transition-colors focus:outline-none border px-3 py-1.5 rounded-lg"])}" aria-label="Advertise on SaaSBizz (opens in new tab)" data-v-bcc2c881> Advertise </a></div></div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main id="main-content" class="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6" role="main" data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_SaasBizzIndex, null, null, _parent));
      _push(`<div class="${ssrRenderClass(isAdminPage.value ? "grid grid-cols-1" : "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start")}" data-v-bcc2c881><div class="${ssrRenderClass(isAdminPage.value ? "col-span-1" : "col-span-1 lg:col-span-9 flex flex-col gap-6")}" data-v-bcc2c881><section class="relative" data-v-bcc2c881>`);
      if (isHomePage.value) {
        _push(`<div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/20 blur-[100px] -z-10 rounded-full pointer-events-none mix-blend-screen" data-v-bcc2c881></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ErrorBoundary, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</section><footer class="mt-20 pt-12 border-t border-white/5 pb-12" data-v-bcc2c881><div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" data-v-bcc2c881><div class="space-y-6 text-center" data-v-bcc2c881><h4 class="text-white font-black uppercase italic tracking-wider text-sm" data-v-bcc2c881>Navigation</h4><ul class="space-y-3 text-sm font-medium text-slate-400" data-v-bcc2c881><li data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Search`);
          } else {
            return [
              createTextVNode("Search")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/advertise",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Advertise`);
          } else {
            return [
              createTextVNode("Advertise")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/saas",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Categories`);
          } else {
            return [
              createTextVNode("Categories")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/recent",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Recently Added`);
          } else {
            return [
              createTextVNode("Recently Added")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tos",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of Service`);
          } else {
            return [
              createTextVNode("Terms of Service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="space-y-6 text-center" data-v-bcc2c881><h4 class="text-white font-black uppercase italic tracking-wider text-sm" data-v-bcc2c881>Browse Startups</h4><div class="flex flex-col gap-3 text-sm font-medium text-slate-400" data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/ai",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Artificial Intelligence`);
          } else {
            return [
              createTextVNode("Artificial Intelligence")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/saas",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`SaaS`);
          } else {
            return [
              createTextVNode("SaaS")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/developer-tools",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Developer Tools`);
          } else {
            return [
              createTextVNode("Developer Tools")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/fintech",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Fintech`);
          } else {
            return [
              createTextVNode("Fintech")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/marketing",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Marketing`);
          } else {
            return [
              createTextVNode("Marketing")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="space-y-6 text-center" data-v-bcc2c881><h4 class="text-white font-black uppercase italic tracking-wider text-sm" data-v-bcc2c881>More Categories</h4><div class="flex flex-col gap-3 text-sm font-medium text-slate-400" data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/ecommerce",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`E-commerce`);
          } else {
            return [
              createTextVNode("E-commerce")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/productivity",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Productivity`);
          } else {
            return [
              createTextVNode("Productivity")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/design-tools",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Design Tools`);
          } else {
            return [
              createTextVNode("Design Tools")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/no-code",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`No-Code`);
          } else {
            return [
              createTextVNode("No-Code")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "hover:text-blue-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Login`);
          } else {
            return [
              createTextVNode("Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest" data-v-bcc2c881><span data-v-bcc2c881>© 2026 SaaSBizz. Verified MRR Leaderboard.</span><div class="flex items-center gap-6" data-v-bcc2c881>`);
      _push(ssrRenderComponent(_component_ThemeSwitcher, null, null, _parent));
      _push(`<a href="https://x.com/1Halille" target="_blank" rel="noopener noreferrer" class="hover:text-slate-400" data-v-bcc2c881>Twitter (X)</a><a href="https://www.linkedin.com/in/halille-azami-33b432165/" target="_blank" rel="noopener noreferrer" class="hover:text-slate-400" data-v-bcc2c881>LinkedIn</a></div></div></footer></div>`);
      if (!isAdminPage.value) {
        _push(`<aside class="hidden lg:block lg:col-span-3 space-y-3 sticky top-0 mt-4" role="complementary" aria-label="Featured tools" data-v-bcc2c881><div class="space-y-3 animate-fade-in" data-v-bcc2c881><!--[-->`);
        ssrRenderList(unref(currentRightAds), (ad, index) => {
          _push(`<div data-v-bcc2c881>`);
          _push(ssrRenderComponent(_component_AdCard, {
            ad,
            index
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bcc2c881"]]);

export { _default as default };
//# sourceMappingURL=default-BKROmK7h.mjs.map

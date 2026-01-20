import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, unref, createBlock, openBlock, toDisplayString, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { p as parseRevenue, i as isValidFounder, b as isValidGrowth, g as getFounderSlug, f as formatCurrency, c as formatGrowth, a as formatFollowers } from './useTheme-ew5KROLl.mjs';
import { u as useRoute, _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-Bgm3gh6G.mjs';
import { _ as __nuxt_component_3 } from './SearchSection-DktYSMHr.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './StartupCard-BhfBq3MU.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ValuationCalculator",
  __ssrInlineRender: true,
  props: {
    revenue: {
      type: [String, Number],
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const baseMultiples = [2, 3, 8, 12, 15];
    const aiMultipliers = [1.2, 1.6, 1.8, 2.2];
    const currentBaseIndex = ref(3);
    const currentAiIndex = ref(3);
    const growthRate = ref(45);
    const isValidating = ref(false);
    const revenueValue = computed(() => {
      if (typeof props.revenue === "number") return props.revenue;
      return parseRevenue(props.revenue);
    });
    const currentMultiple = computed(() => baseMultiples[currentBaseIndex.value] ?? 1);
    const currentAiMod = computed(() => aiMultipliers[currentAiIndex.value] ?? 1);
    const valuation = computed(() => {
      return revenueValue.value * currentMultiple.value * currentAiMod.value;
    });
    const formattedRevenue = computed(() => {
      const val = revenueValue.value;
      if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
      if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
      return `$${val}`;
    });
    const formattedValuation = computed(() => {
      const val = valuation.value;
      if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
      if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
      return `$${val.toLocaleString()}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card rounded-2xl p-6 border border-white/5 bg-slate-800/50" }, _attrs))} data-v-ec3294a9><div class="flex items-center gap-3 mb-4" data-v-ec3294a9><div class="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20" data-v-ec3294a9><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ec3294a9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-ec3294a9></path></svg></div><h2 class="text-xl font-bold text-white" data-v-ec3294a9>Startup Valuation Card</h2></div><div class="flex gap-2 mb-6" data-v-ec3294a9><span class="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium text-slate-300" data-v-ec3294a9>Valuation</span><span class="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium text-slate-300" data-v-ec3294a9>VC</span><span class="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium text-slate-300" data-v-ec3294a9>Finance</span></div><div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-inner overflow-hidden relative transition-all duration-500" data-v-ec3294a9><div class="space-y-3" data-v-ec3294a9><div class="flex justify-between items-center text-sm" data-v-ec3294a9><span class="text-slate-600 font-medium" data-v-ec3294a9>ARR:</span><span class="font-bold text-slate-900 animate-arr-pulse" data-v-ec3294a9>${ssrInterpolate(formattedRevenue.value)}</span></div><div class="flex justify-between items-center text-sm" data-v-ec3294a9><span class="text-slate-600 font-medium" data-v-ec3294a9>Growth:</span><span class="font-bold text-green-600 flex items-center gap-1" data-v-ec3294a9><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ec3294a9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-ec3294a9></path></svg> ${ssrInterpolate(growthRate.value)}% </span></div><div class="flex justify-between items-center text-sm group" data-v-ec3294a9><span class="text-slate-600 font-medium" data-v-ec3294a9>Base Multiple:</span><span class="font-bold text-blue-600 transition-all duration-500 transform" data-v-ec3294a9>${ssrInterpolate(currentMultiple.value)}x </span></div><div class="flex justify-between items-center text-sm" data-v-ec3294a9><span class="text-slate-600 font-medium" data-v-ec3294a9>AI Enhancement:</span><span class="font-bold text-purple-600 flex items-center gap-1 transition-all duration-500" data-v-ec3294a9><svg class="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ec3294a9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-ec3294a9></path></svg> ${ssrInterpolate(currentAiMod.value)}x </span></div><div class="h-px bg-slate-200 my-4" data-v-ec3294a9></div><div class="flex justify-between items-baseline" data-v-ec3294a9><span class="text-slate-900 font-bold" data-v-ec3294a9>Valuation:</span><span class="${ssrRenderClass([{ "animate-stock-blink": isValidating.value }, "text-sm font-bold text-green-600 transition-all duration-300"])}" data-v-ec3294a9>${ssrInterpolate(formattedValuation.value)}</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ValuationCalculator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-ec3294a9"]]), { __name: "ValuationCalculator" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const startups = allStartups;
    const startup = computed(
      () => startups.find((s) => s.trustmrr_link === route.params.slug)
    );
    const startupRank = computed(() => {
      if (!startup.value) return "-";
      const sorted = [...startups].sort((a, b) => parseRevenue(b.total_revenue) - parseRevenue(a.total_revenue));
      return sorted.findIndex((s) => s.id === startup.value.id) + 1;
    });
    const hasValidFounder = computed(() => isValidFounder(startup.value?.founder_name));
    const hasValidGrowth = computed(() => isValidGrowth(startup.value?.mom_growth));
    const founderSlug = computed(() => getFounderSlug(startup.value?.founder_name));
    useSeoMeta({
      title: () => startup.value ? `${startup.value.startup_name} - Verified SaaS Stats` : "Startup Not Found",
      description: () => startup.value?.tagline || startup.value?.full_description || "View verified SaaS startup metrics",
      ogTitle: () => startup.value ? `${startup.value.startup_name} - Verified SaaS Stats` : "Startup Not Found",
      ogDescription: () => startup.value?.tagline || startup.value?.full_description || "View verified SaaS startup metrics",
      ogUrl: () => `https://saasbizz.com/startup/${route.params.slug}/`,
      twitterTitle: () => startup.value ? `${startup.value.startup_name} - Verified SaaS Stats` : "Startup Not Found",
      twitterDescription: () => startup.value?.tagline || startup.value?.full_description || "View verified SaaS startup metrics"
    });
    useHead({
      script: startup.value ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: startup.value.startup_name,
            description: startup.value.full_description || startup.value.tagline,
            url: startup.value.domain,
            applicationCategory: startup.value.category || "BusinessApplication",
            operatingSystem: "Web",
            author: startup.value.founder_name ? {
              "@type": "Person",
              name: startup.value.founder_name
            } : void 0,
            datePublished: startup.value.founded_date,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              ratingCount: "1"
            }
          })
        }
      ] : []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ValuationCalculator = __nuxt_component_1;
      const _component_NuxtImg = __nuxt_component_2;
      const _component_SearchSection = __nuxt_component_3;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "glass-card rounded-3xl p-8 min-h-[80vh]" }, _attrs))}>`);
      if (!startup.value) {
        _push(`<div class="text-center py-20 text-slate-400"><h1 class="text-2xl font-bold text-white">Startup not found</h1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-blue-400 underline mt-4 block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] rounded"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to Leaderboard `);
            } else {
              return [
                createTextVNode(" Return to Leaderboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div class="flex flex-col lg:flex-row gap-8 items-start mb-10"><div class="flex-1 w-full"><header class="flex flex-col md:flex-row gap-6 items-start"><div class="relative flex-shrink-0"><div class="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl"></div><img${ssrRenderAttr("src", `https://www.google.com/s2/favicons?domain=${startup.value.domain}&sz=256`)}${ssrRenderAttr("alt", `${startup.value.startup_name} logo`)} class="relative w-32 h-32 rounded-3xl border-4 border-white/10 shadow-lg bg-slate-900 object-contain p-2" width="128" height="128"></div><div class="flex-1 pt-1 min-w-0"><div class="flex flex-col gap-2"><h1 class="text-5xl font-black text-white tracking-tight">${ssrInterpolate(startup.value.startup_name)}</h1><div class="flex items-center gap-2 mb-2"><span class="text-slate-500 text-xs font-medium">Verified SaaS</span></div><p class="text-lg text-slate-400 leading-relaxed font-medium mb-4">${ssrInterpolate(startup.value.tagline || startup.value.full_description)}</p>`);
        if (startup.value.domain) {
          _push(`<a${ssrRenderAttr("href", `https://${startup.value.domain}`)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full md:w-auto self-start gap-2 bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] active:scale-95 shadow-lg shadow-blue-500/20"${ssrRenderAttr("aria-label", `Visit ${startup.value.startup_name} website (opens in new tab)`)}> Visit Website <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></header></div><div class="w-full lg:w-[420px] flex-shrink-0">`);
        _push(ssrRenderComponent(_component_ValuationCalculator, {
          revenue: startup.value.total_revenue
        }, null, _parent));
        _push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" role="group" aria-label="Startup statistics"><div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-center h-32"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 truncate"> Total Revenue <span class="text-blue-400 font-extrabold ml-2">#${ssrInterpolate(startupRank.value)}</span></div><div class="text-2xl font-mono font-bold text-white">${ssrInterpolate(unref(formatCurrency)(startup.value.total_revenue))}</div>`);
        if (hasValidGrowth.value) {
          _push(`<div class="text-[10px] text-green-400 font-bold mt-1"><span aria-hidden="true">↑</span> ${ssrInterpolate(unref(formatGrowth)(startup.value.mom_growth))} Monthly Growth </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-center h-32"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">MRR</div><div class="text-2xl font-mono font-bold text-white">${ssrInterpolate(unref(formatCurrency)(startup.value.mrr))}</div>`);
        if (startup.value.subscriptions) {
          _push(`<div class="text-[10px] text-slate-500 font-bold mt-1">${ssrInterpolate(startup.value.subscriptions)} Subscribers </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-center h-32"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Founder</div><div class="flex items-center gap-3">`);
        if (hasValidFounder.value) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/founder/${founderSlug.value}`,
            class: "flex-shrink-0 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full",
            "aria-label": `View ${startup.value.founder_name}'s profile`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (startup.value.founder_image_local_path) {
                  _push2(ssrRenderComponent(_component_NuxtImg, {
                    src: `/founder_images/${startup.value.founder_image_local_path}`,
                    alt: `${startup.value.founder_name} profile photo`,
                    class: "w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-blue-400",
                    width: "40",
                    height: "40",
                    loading: "lazy"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs" aria-hidden="true"${_scopeId}>${ssrInterpolate(startup.value.founder_name?.charAt(0) || "?")}</div>`);
                }
              } else {
                return [
                  startup.value.founder_image_local_path ? (openBlock(), createBlock(_component_NuxtImg, {
                    key: 0,
                    src: `/founder_images/${startup.value.founder_image_local_path}`,
                    alt: `${startup.value.founder_name} profile photo`,
                    class: "w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-blue-400",
                    width: "40",
                    height: "40",
                    loading: "lazy"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs",
                    "aria-hidden": "true"
                  }, toDisplayString(startup.value.founder_name?.charAt(0) || "?"), 1))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="min-w-0 overflow-hidden">`);
        if (hasValidFounder.value) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/founder/${founderSlug.value}`,
            class: "text-sm font-bold text-white truncate hover:text-blue-400 transition-colors block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(startup.value.founder_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(startup.value.founder_name), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<span class="text-sm font-bold text-slate-500 block">Anonymous</span>`);
        }
        if (startup.value.founder_social) {
          _push(`<a${ssrRenderAttr("href", `https://x.com/${startup.value.founder_social.replace("@", "")}`)} target="_blank" rel="noopener noreferrer" class="text-[9px] text-blue-400 hover:underline block mt-0.5 truncate focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"${ssrRenderAttr("aria-label", `${startup.value.founder_name} on X - ${unref(formatFollowers)(startup.value.x_follower_count)} followers (opens in new tab)`)}>${ssrInterpolate(unref(formatFollowers)(startup.value.x_follower_count))} followers on X @${ssrInterpolate(startup.value.founder_social.replace("@", ""))}</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-center h-32"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 truncate"> Founded <span class="text-slate-400 ml-2">${ssrInterpolate(startup.value.category)}</span></div><div class="text-lg font-bold text-white">${ssrInterpolate(startup.value.founded_date || "N/A")}</div>`);
        if (startup.value.location) {
          _push(`<div class="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tight flex items-center gap-1"><span aria-hidden="true">📍</span> ${ssrInterpolate(startup.value.location)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><section class="bg-slate-800/50 rounded-2xl p-6 border border-white/5" aria-labelledby="overview-heading"><h2 id="overview-heading" class="text-sm font-bold text-white uppercase tracking-wide mb-4 border-b border-white/10 pb-2">Business Overview</h2><p class="text-slate-400 leading-7 whitespace-pre-wrap">${ssrInterpolate(startup.value.full_description)}</p></section>`);
        _push(ssrRenderComponent(_component_SearchSection, null, null, _parent));
        _push(`</div>`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/startup/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-Day3-LI7.mjs.map

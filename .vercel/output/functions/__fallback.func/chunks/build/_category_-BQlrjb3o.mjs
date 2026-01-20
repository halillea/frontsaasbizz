import { _ as __nuxt_component_0 } from './LoadingSkeleton-BAYOmH1U.mjs';
import { _ as __nuxt_component_1 } from './StartupCard-BhfBq3MU.mjs';
import { _ as __nuxt_component_2 } from './Pagination-f59Ny8g1.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { a as allStartups } from './startups-B8z0MfgU.mjs';
import { p as parseRevenue } from './useTheme-ew5KROLl.mjs';
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

const ITEMS_PER_PAGE = 50;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[category]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const startups = allStartups;
    const isLoading = ref(true);
    const currentPage = ref(1);
    const categorySlug = computed(() => {
      const c = route.params.category;
      return Array.isArray(c) ? c[0] : c;
    });
    const formattedCategoryName = computed(() => {
      if (!categorySlug.value) return "";
      return categorySlug.value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    });
    const filteredStartups = computed(() => {
      if (!categorySlug.value) return [];
      const targetCategory = categorySlug.value.toLowerCase();
      return startups.filter((s) => {
        if (!s.category) return false;
        const sCategoryNormalized = s.category.toLowerCase().replace(/\s+/g, "-");
        return sCategoryNormalized === targetCategory || s.category.toLowerCase().includes(targetCategory.replace(/-/g, " "));
      }).sort((a, b) => {
        return parseRevenue(b.mrr) - parseRevenue(a.mrr);
      });
    });
    const paginatedStartups = computed(() => {
      const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
      return filteredStartups.value.slice(start, start + ITEMS_PER_PAGE);
    });
    const totalPages = computed(() => Math.ceil(filteredStartups.value.length / ITEMS_PER_PAGE));
    watch(categorySlug, () => {
      currentPage.value = 1;
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
    });
    useSeoMeta({
      title: computed(() => `${formattedCategoryName.value} Startups - SaaSBizz`),
      description: computed(() => `Discover top ${formattedCategoryName.value} SaaS startups ranked by MRR.`)
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSkeleton = __nuxt_component_0;
      const _component_StartupCard = __nuxt_component_1;
      const _component_Pagination = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><div class="flex items-center gap-3 mb-6"><span class="text-2xl" aria-hidden="true">📂</span><h2 class="text-2xl font-black tracking-tight text-white uppercase italic"> Category: <span class="text-blue-500">${ssrInterpolate(formattedCategoryName.value)}</span></h2></div>`);
      if (isLoading.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_LoadingSkeleton, { count: 10 }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[-->`);
        if (paginatedStartups.value.length > 0) {
          _push(`<div><div class="hidden lg:flex items-center gap-4 px-4 py-1 mb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5"><div class="w-[35%] flex gap-12"><span>Startup</span></div><div class="w-[65%] flex items-center px-4"><span class="w-[140px] text-left">Founder</span><span class="w-28 text-right ml-10">Total Revenue</span><span class="w-32 text-right ml-auto">MRR</span><span class="w-16 text-right ml-4">MoM Growth</span></div></div><div class="space-y-2" role="list"${ssrRenderAttr("aria-label", "Startups in " + formattedCategoryName.value)}><!--[-->`);
          ssrRenderList(paginatedStartups.value, (startup, index) => {
            _push(ssrRenderComponent(_component_StartupCard, {
              key: startup.id,
              startup,
              rank: (currentPage.value - 1) * ITEMS_PER_PAGE + index + 1
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
          _push(ssrRenderComponent(_component_Pagination, {
            "current-page": currentPage.value,
            "total-pages": totalPages.value,
            "item-name": formattedCategoryName.value + " startups",
            onPrev: ($event) => currentPage.value--,
            onNext: ($event) => currentPage.value++
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="text-center py-20 text-slate-500"><p class="text-xl">No startups found in this category.</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/",
            class: "text-blue-500 hover:text-blue-400 mt-4 inline-block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Back to Home`);
              } else {
                return [
                  createTextVNode("Back to Home")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/category/[category].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_category_-BQlrjb3o.mjs.map

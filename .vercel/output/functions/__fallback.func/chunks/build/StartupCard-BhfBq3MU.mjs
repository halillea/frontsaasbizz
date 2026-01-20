import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createBlock, createCommentVNode, createVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { b as isValidGrowth, f as formatCurrency, c as formatGrowth } from './useTheme-ew5KROLl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StartupCard",
  __ssrInlineRender: true,
  props: {
    startup: {},
    rank: {}
  },
  setup(__props) {
    const props = __props;
    const hasValidGrowth = computed(() => isValidGrowth(props.startup.mom_growth));
    const isGrowthPositive = computed(() => {
      if (props.startup.mom_growth === null || props.startup.mom_growth === void 0) return false;
      if (typeof props.startup.mom_growth === "number") return props.startup.mom_growth >= 0;
      return !String(props.startup.mom_growth).startsWith("-");
    });
    const handleImageError = (e) => {
      const img = e.target;
      img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100" rx="12"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="%2394a3b8">?</text></svg>';
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/startup/${__props.startup.trustmrr_link}`,
        class: "group relative flex items-center gap-4 py-0 px-4 rounded-xl glass-card hover-glow border-[1px] border-white/5 transition-all duration-300",
        role: "listitem",
        "aria-label": `View details for ${__props.startup.startup_name}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.rank) {
              _push2(`<div class="${ssrRenderClass([[
                __props.rank === 1 ? "bg-yellow-400 text-yellow-900" : __props.rank === 2 ? "bg-slate-300 text-slate-900" : __props.rank === 3 ? "bg-amber-600 text-amber-100" : "bg-slate-800 text-slate-400"
              ], "absolute -left-2 -top-2 w-5 h-5 rounded-full flex items-center justify-center font-black font-mono text-[9px] shadow-lg border border-white/10 z-10"])}"${_scopeId}>${ssrInterpolate(__props.rank)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="w-[35%] flex items-center gap-3 flex-shrink-0 min-w-0"${_scopeId}><div class="relative flex-shrink-0"${_scopeId}><img${ssrRenderAttr("src", `https://www.google.com/s2/favicons?domain=${__props.startup.domain}&sz=64`)}${ssrRenderAttr("alt", `${__props.startup.startup_name} logo`)} class="relative w-8 h-8 rounded-lg border border-white/10 bg-slate-900 object-cover" loading="lazy" width="32" height="32"${_scopeId}></div><div class="flex flex-col min-w-0"${_scopeId}><h3 class="font-normal text-sm text-white truncate group-hover:text-blue-400 transition-colors"${_scopeId}>${ssrInterpolate(__props.startup.startup_name)}</h3><p class="text-[11px] text-slate-400 truncate font-light mt-0.5"${_scopeId}>${ssrInterpolate(__props.startup.tagline || __props.startup.full_description)}</p></div></div><div class="w-[65%] flex items-center px-4 border-l border-white/5"${_scopeId}><div class="flex items-center gap-2 w-[140px] flex-shrink-0"${_scopeId}><div class="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-slate-800 flex-shrink-0"${_scopeId}>`);
            if (__props.startup.founder_image_local_path) {
              _push2(`<img${ssrRenderAttr("src", `/founder_images/${__props.startup.founder_image_local_path}`)}${ssrRenderAttr("alt", __props.startup.founder_name)} class="w-full h-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase"${_scopeId}>${ssrInterpolate((__props.startup.founder_name || "A").charAt(0))}</div>`);
            }
            _push2(`</div><div class="text-sm font-medium text-slate-300 truncate"${_scopeId}>${ssrInterpolate(__props.startup.founder_name || "Anonymous")}</div></div><div class="w-28 text-right ml-10"${_scopeId}><div class="font-mono font-bold text-lg text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.startup.total_revenue))}</div></div><div class="w-32 text-right ml-auto"${_scopeId}><div class="font-mono font-bold text-lg text-slate-200 whitespace-nowrap"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.startup.mrr))}</div></div><div class="w-16 text-right ml-4"${_scopeId}>`);
            if (hasValidGrowth.value) {
              _push2(`<div class="${ssrRenderClass([isGrowthPositive.value ? "text-green-400" : "text-red-400", "font-mono font-bold text-[15px]"])}"${_scopeId}>${ssrInterpolate(unref(formatGrowth)(__props.startup.mom_growth))}</div>`);
            } else {
              _push2(`<div class="font-mono text-[15px] text-slate-600"${_scopeId}>-</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              __props.rank ? (openBlock(), createBlock("div", {
                key: 0,
                class: ["absolute -left-2 -top-2 w-5 h-5 rounded-full flex items-center justify-center font-black font-mono text-[9px] shadow-lg border border-white/10 z-10", [
                  __props.rank === 1 ? "bg-yellow-400 text-yellow-900" : __props.rank === 2 ? "bg-slate-300 text-slate-900" : __props.rank === 3 ? "bg-amber-600 text-amber-100" : "bg-slate-800 text-slate-400"
                ]]
              }, toDisplayString(__props.rank), 3)) : createCommentVNode("", true),
              createVNode("div", { class: "w-[35%] flex items-center gap-3 flex-shrink-0 min-w-0" }, [
                createVNode("div", { class: "relative flex-shrink-0" }, [
                  createVNode("img", {
                    src: `https://www.google.com/s2/favicons?domain=${__props.startup.domain}&sz=64`,
                    alt: `${__props.startup.startup_name} logo`,
                    class: "relative w-8 h-8 rounded-lg border border-white/10 bg-slate-900 object-cover",
                    loading: "lazy",
                    width: "32",
                    height: "32",
                    onError: handleImageError
                  }, null, 40, ["src", "alt"])
                ]),
                createVNode("div", { class: "flex flex-col min-w-0" }, [
                  createVNode("h3", { class: "font-normal text-sm text-white truncate group-hover:text-blue-400 transition-colors" }, toDisplayString(__props.startup.startup_name), 1),
                  createVNode("p", { class: "text-[11px] text-slate-400 truncate font-light mt-0.5" }, toDisplayString(__props.startup.tagline || __props.startup.full_description), 1)
                ])
              ]),
              createVNode("div", { class: "w-[65%] flex items-center px-4 border-l border-white/5" }, [
                createVNode("div", { class: "flex items-center gap-2 w-[140px] flex-shrink-0" }, [
                  createVNode("div", { class: "w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-slate-800 flex-shrink-0" }, [
                    __props.startup.founder_image_local_path ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: `/founder_images/${__props.startup.founder_image_local_path}`,
                      alt: __props.startup.founder_name,
                      class: "w-full h-full object-cover",
                      onError: (e) => e.target.style.display = "none"
                    }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "w-full h-full flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase"
                    }, toDisplayString((__props.startup.founder_name || "A").charAt(0)), 1))
                  ]),
                  createVNode("div", { class: "text-sm font-medium text-slate-300 truncate" }, toDisplayString(__props.startup.founder_name || "Anonymous"), 1)
                ]),
                createVNode("div", { class: "w-28 text-right ml-10" }, [
                  createVNode("div", { class: "font-mono font-bold text-lg text-white" }, toDisplayString(unref(formatCurrency)(__props.startup.total_revenue)), 1)
                ]),
                createVNode("div", { class: "w-32 text-right ml-auto" }, [
                  createVNode("div", { class: "font-mono font-bold text-lg text-slate-200 whitespace-nowrap" }, toDisplayString(unref(formatCurrency)(__props.startup.mrr)), 1)
                ]),
                createVNode("div", { class: "w-16 text-right ml-4" }, [
                  hasValidGrowth.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ["font-mono font-bold text-[15px]", isGrowthPositive.value ? "text-green-400" : "text-red-400"]
                  }, toDisplayString(unref(formatGrowth)(__props.startup.mom_growth)), 3)) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "font-mono text-[15px] text-slate-600"
                  }, "-"))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StartupCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "StartupCard" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=StartupCard-BhfBq3MU.mjs.map

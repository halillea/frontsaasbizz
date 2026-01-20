import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useTheme } from './useTheme-ew5KROLl.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    totalPages: {},
    itemName: {},
    ariaLabel: {}
  },
  emits: ["prev", "next"],
  setup(__props) {
    const { themeColor } = useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.totalPages > 1) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          class: "flex items-center justify-center gap-2 mt-6",
          "aria-label": __props.ariaLabel
        }, _attrs))}><button${ssrIncludeBooleanAttr(__props.currentPage === 1) ? " disabled" : ""} class="${ssrRenderClass([unref(themeColor) === "white" ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50" : "bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-700/50", "px-4 py-2 text-sm font-medium rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"])}"${ssrRenderAttr("aria-label", `Previous page of ${__props.itemName}`)}> Previous </button><span class="text-sm text-slate-400" aria-live="polite"> Page ${ssrInterpolate(__props.currentPage)} of ${ssrInterpolate(__props.totalPages)}</span><button${ssrIncludeBooleanAttr(__props.currentPage === __props.totalPages) ? " disabled" : ""} class="${ssrRenderClass([unref(themeColor) === "white" ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50" : "bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-700/50", "px-4 py-2 text-sm font-medium rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"])}"${ssrRenderAttr("aria-label", `Next page of ${__props.itemName}`)}> Next </button></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "Pagination" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=Pagination-f59Ny8g1.mjs.map

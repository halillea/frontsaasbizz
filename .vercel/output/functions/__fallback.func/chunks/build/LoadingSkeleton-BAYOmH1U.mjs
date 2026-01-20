import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoadingSkeleton",
  __ssrInlineRender: true,
  props: {
    count: { default: 5 }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "space-y-3",
        role: "status",
        "aria-label": "Loading content"
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.count, (i) => {
        _push(`<div class="animate-pulse"><div class="bg-slate-800/50 border border-white/5 rounded-xl p-3"><div class="flex items-center gap-4"><div class="w-6 h-4 bg-slate-700/50 rounded"></div><div class="w-10 h-10 bg-slate-700/50 rounded-lg"></div><div class="flex-1 space-y-2"><div class="h-4 bg-slate-700/50 rounded w-1/3"></div><div class="h-3 bg-slate-700/50 rounded w-2/3"></div></div><div class="hidden md:flex items-center gap-4"><div class="w-24 space-y-1"><div class="h-4 bg-slate-700/50 rounded"></div><div class="h-2 bg-slate-700/50 rounded w-1/2"></div></div><div class="w-16 space-y-1"><div class="h-4 bg-slate-700/50 rounded"></div><div class="h-2 bg-slate-700/50 rounded w-1/2"></div></div></div></div></div></div>`);
      });
      _push(`<!--]--><span class="sr-only">Loading...</span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoadingSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "LoadingSkeleton" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=LoadingSkeleton-BAYOmH1U.mjs.map

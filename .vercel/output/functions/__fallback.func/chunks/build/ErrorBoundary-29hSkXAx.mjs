import { defineComponent, ref, onErrorCaptured, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ErrorBoundary",
  __ssrInlineRender: true,
  setup(__props) {
    const error = ref(null);
    const errorMessage = ref("An unexpected error occurred. Please try again.");
    onErrorCaptured((err) => {
      error.value = err;
      errorMessage.value = err.message || "An unexpected error occurred. Please try again.";
      console.error("ErrorBoundary caught:", err);
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (error.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[50vh] flex items-center justify-center" }, _attrs))}><div class="text-center p-8 glass-card rounded-2xl max-w-md"><div class="text-4xl mb-4">⚠️</div><h2 class="text-xl font-bold text-white mb-2">Something went wrong</h2><p class="text-slate-400 text-sm mb-6">${ssrInterpolate(errorMessage.value)}</p><button class="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] active:scale-95" aria-label="Try again"> Try Again </button></div></div>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ErrorBoundary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "ErrorBoundary" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ErrorBoundary-29hSkXAx.mjs.map

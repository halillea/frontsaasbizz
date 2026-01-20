import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { _ as __nuxt_component_1 } from './ErrorBoundary-29hSkXAx.mjs';
import { mergeProps, withCtx, createVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  const _component_ErrorBoundary = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#030712] font-sans text-slate-200 selection:bg-blue-500/30 selection:text-blue-200" }, _attrs))}><main id="main-content" class="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6" role="main"><header class="sticky top-0 z-40 backdrop-blur-xl bg-[#030712]/80 border-b border-white/5 rounded-2xl px-6 py-4 mb-6" role="banner"><nav class="flex items-center justify-center" aria-label="Main navigation">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "group flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#030712] rounded-md",
    "aria-label": "SaaSBizz home page"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="text-3xl font-black uppercase tracking-tight text-white italic group-hover:text-blue-400 transition-colors"${_scopeId}> SaaSBizz </span>`);
      } else {
        return [
          createVNode("span", { class: "text-3xl font-black uppercase tracking-tight text-white italic group-hover:text-blue-400 transition-colors" }, " SaaSBizz ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</nav></header><section class="relative">`);
  _push(ssrRenderComponent(_component_ErrorBoundary, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</section></main></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/noads.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const noads = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { noads as default };
//# sourceMappingURL=noads-CkBCfGCR.mjs.map

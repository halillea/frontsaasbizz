import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { a as useHead } from './composables-BsSii2E9.mjs';
import './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    useHead({
      title: "Advertise - SaaSBizz",
      script: [
        {
          src: "https://www.paypal.com/sdk/js?client-id=AWjiSeIg9VVJvWMs9BdmcdshPfMY4a31dAiTYDCgD7Cag2_SPO8W-V8zhSnvNmuEeDD0h89smU_1UF7e&vault=true&intent=subscription",
          "data-sdk-integration-source": "button-factory",
          async: true,
          id: "paypal-sdk-script"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-12 px-4" }, _attrs))}><div class="text-center mb-12"><h1 class="text-4xl font-black text-white uppercase italic tracking-tight mb-4"> Advertise on <span class="text-blue-500">SaaSBizz</span></h1><p class="text-slate-400 text-lg"> Reach thousands of entrepreneurs and founders daily. </p></div><div class="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"><div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div><div class="relative z-10 space-y-8"><div><h2 class="text-xl font-bold text-white mb-3 flex items-center gap-2"><span class="text-blue-500">🚀</span> How it works </h2><p class="text-slate-400 leading-relaxed"> Your startup appears in rotating sponsor slots on sidebars and mobile banners across all Saasbizz pages. Sponsors rotate every 10 seconds to ensure high visibility and fair exposure. </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-white/5 border border-white/10 rounded-2xl p-4"><div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Maximum Spots</div><div class="text-2xl font-black text-white">20</div></div><div class="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4"><div class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Availability</div><div class="text-2xl font-black text-green-400">Spots Available</div></div></div><div class="text-center py-8 border-y border-white/5"><div class="text-slate-500 text-sm font-medium mb-1">Monthly Subscription</div><div class="flex items-center justify-center gap-2"><span class="text-5xl font-black text-white">$999</span><span class="text-xl text-slate-500 font-medium">/ month</span></div></div><div class="min-h-[150px]"><div id="paypal-button-container-P-6LY87750XT365015WNFLLZOQ"></div></div><p class="text-center text-xs text-slate-500 italic"> Secure payment processed via PayPal. No hidden fees. Cancel anytime. </p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/advertise/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Diz9AYOR.mjs.map

import { _ as __nuxt_component_3 } from './SearchSection-DktYSMHr.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSeoMeta } from './composables-BsSii2E9.mjs';
import './nuxt-link-CIKQ30WB.mjs';
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
import './useTheme-ew5KROLl.mjs';
import './startups-B8z0MfgU.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Search Startups - SaaSBizz",
      description: "Search the SaaSBizz database of verified SaaS startups by name, founder, category, domain, or social handle.",
      ogTitle: "Search Startups - SaaSBizz",
      ogDescription: "Search the SaaSBizz database of verified SaaS startups by name, founder, category, domain, or social handle."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchSection = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><header class="text-center py-8"><h1 class="text-4xl font-black tracking-tight text-white mb-4"> Search Startups </h1><p class="text-slate-400 text-lg max-w-2xl mx-auto"> Find verified SaaS startups by name, founder, category, domain, or social handle </p></header>`);
      _push(ssrRenderComponent(_component_SearchSection, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=search-D6fUWnRk.mjs.map

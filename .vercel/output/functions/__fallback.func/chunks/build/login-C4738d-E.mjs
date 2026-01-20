import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-BpVXPysT.mjs';
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
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const error = ref("");
    const form = reactive({
      username: "",
      password: ""
    });
    useSeoMeta({
      title: "Admin Login - SaaSBizz",
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto py-16" }, _attrs))}><div class="text-center mb-10"><img${ssrRenderAttr("src", _imports_0)} alt="SaaSBizz Logo" class="w-16 h-16 mx-auto rounded-2xl shadow-lg shadow-blue-500/30 mb-4"><h1 class="text-3xl font-black text-white tracking-tight mb-2"> Admin Login </h1><p class="text-slate-400"> Sign in to manage SaaSBizz </p></div><div class="glass-card rounded-3xl p-8"><form class="space-y-6"><div class="space-y-2"><label for="username" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Username </label><input id="username"${ssrRenderAttr("value", form.username)} type="text" required placeholder="Enter username" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"></div><div class="space-y-2"><label for="password" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Password </label><input id="password"${ssrRenderAttr("value", form.password)} type="password" required placeholder="••••••••" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"></div>`);
      if (error.value) {
        _push(`<div class="text-red-400 text-sm text-center">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
      if (isLoading.value) {
        _push(`<span class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isLoading.value ? "Signing in..." : "Sign In")}</button></form></div><div class="mt-8 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-slate-400 hover:text-blue-400 text-sm transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Back to Homepage `);
          } else {
            return [
              createTextVNode(" ← Back to Homepage ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-C4738d-E.mjs.map

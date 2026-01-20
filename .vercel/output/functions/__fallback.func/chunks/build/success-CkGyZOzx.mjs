import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { a as useHead } from './composables-BsSii2E9.mjs';
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
  __name: "success",
  __ssrInlineRender: true,
  setup(__props) {
    const submitted = ref(false);
    const isSubmitting = ref(false);
    const keywordTags = ref([]);
    const keywordInput = ref("");
    ref(null);
    const form = reactive({
      business_name: "",
      website_url: "",
      logo_url: "",
      tagline: "",
      description: "",
      keywords: "",
      contact_email: "",
      contact_name: ""
    });
    useHead({
      title: "Complete Your Ad - SaaSBizz"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-12 px-4" }, _attrs))}><div class="text-center mb-10"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><h1 class="text-4xl font-black text-white uppercase italic tracking-tight mb-2"> Payment Success! </h1><p class="text-slate-400 text-lg"> Thank you for choosing SaaSBizz. Please provide your business details to start your campaign. </p></div><div class="glass-card rounded-3xl p-8 relative overflow-hidden">`);
      if (!submitted.value) {
        _push(`<form class="space-y-6 relative z-10"><div class="space-y-2"><label for="business_name" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Business Name <span class="text-red-500">*</span></label><input id="business_name"${ssrRenderAttr("value", form.business_name)} type="text" required placeholder="e.g. Acme SaaS" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"></div><div class="space-y-2"><label for="website_url" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Website URL <span class="text-red-500">*</span></label><input id="website_url"${ssrRenderAttr("value", form.website_url)} type="url" required placeholder="https://yourwebsite.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"></div><div class="space-y-2"><label for="logo_url" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Logo URL (Optional) </label><input id="logo_url"${ssrRenderAttr("value", form.logo_url)} type="url" placeholder="https://yourwebsite.com/logo.png" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"><p class="text-xs text-slate-500">Direct link to your logo image (PNG, JPG, SVG)</p></div><div class="space-y-2"><label for="tagline" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Tagline (Optional) </label><input id="tagline"${ssrRenderAttr("value", form.tagline)} type="text" maxlength="80" placeholder="Short catchy phrase (max 80 chars)" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"><p class="text-xs text-slate-500">${ssrInterpolate(form.tagline.length)}/80 characters</p></div><div class="space-y-2"><label for="description" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Description (Optional) </label><textarea id="description" rows="5" maxlength="500" placeholder="Describe your business, what you offer, and why users should click. This helps us understand your product better and create an effective ad." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none">${ssrInterpolate(form.description)}</textarea><p class="text-xs text-slate-500">${ssrInterpolate(form.description.length)}/500 characters</p></div><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Keywords (Optional) </label><div class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center min-h-[50px] focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-text"><!--[-->`);
        ssrRenderList(keywordTags.value, (keyword, index) => {
          _push(`<span class="inline-flex items-center gap-1 bg-slate-700 text-slate-200 text-sm px-3 py-1 rounded-lg">${ssrInterpolate(keyword)} <button type="button" class="text-slate-400 hover:text-white transition-colors"${ssrRenderAttr("aria-label", `Remove ${keyword}`)}><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg></button></span>`);
        });
        _push(`<!--]--><input${ssrRenderAttr("value", keywordInput.value)} type="text" placeholder="Type and press Enter..." class="flex-1 min-w-[150px] bg-transparent text-white focus:outline-none placeholder:text-slate-600"></div><p class="text-xs text-slate-500">Press Enter after each keyword to add it</p></div><div class="space-y-2"><label for="contact_email" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Contact Email <span class="text-red-500">*</span></label><input id="contact_email"${ssrRenderAttr("value", form.contact_email)} type="email" required placeholder="you@company.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"><p class="text-xs text-slate-500">We&#39;ll send confirmation and updates to this email</p></div><div class="space-y-2"><label for="contact_name" class="block text-xs font-bold text-slate-500 uppercase tracking-widest"> Full Name (Optional) </label><input id="contact_name"${ssrRenderAttr("value", form.contact_name)} type="text" placeholder="John Doe" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"></div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
        if (isSubmitting.value) {
          _push(`<span class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(isSubmitting.value ? "Submitting..." : "Submit Business Info")}</button></form>`);
      } else {
        _push(`<div class="text-center py-12 space-y-6 relative z-10"><div class="text-green-400 font-bold text-xl italic tracking-tight uppercase">Successfully Submitted!</div><p class="text-slate-400 max-w-sm mx-auto"> We&#39;ve received your business information. Your ad will be reviewed and activated within 24-48 hours. A confirmation has been sent to ${ssrInterpolate(form.contact_email)}. </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl transition-colors font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to SaaSBizz `);
            } else {
              return [
                createTextVNode(" Return to SaaSBizz ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/advertise/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=success-CkGyZOzx.mjs.map

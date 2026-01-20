import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-Bgm3gh6G.mjs';
import { _ as __nuxt_component_1 } from './StartupCard-BhfBq3MU.mjs';
import { _ as __nuxt_component_3 } from './SearchSection-DktYSMHr.mjs';
import { defineComponent, computed, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { a as allStartups } from './startups-B8z0MfgU.mjs';
import { g as getFounderSlug, a as formatFollowers } from './useTheme-ew5KROLl.mjs';
import { u as useRoute } from './server.mjs';
import { u as useSeoMeta, a as useHead } from './composables-BsSii2E9.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const startups = allStartups;
    const currentSlug = decodeURIComponent(route.params.slug);
    const projects = computed(
      () => startups.filter((s) => getFounderSlug(s.founder_name) === currentSlug)
    );
    const profile = computed(() => projects.value.length > 0 ? projects.value[0] : null);
    const handleImageError = (e) => {
      const img = e.target;
      img.style.display = "none";
    };
    useSeoMeta({
      title: () => profile.value ? `${profile.value.founder_name} - Founder Profile` : "Founder Not Found",
      description: () => profile.value ? `${profile.value.founder_name} is building ${projects.value.length} verified SaaS startup${projects.value.length !== 1 ? "s" : ""} on SaaSBizz.` : "View founder profile on SaaSBizz",
      ogTitle: () => profile.value ? `${profile.value.founder_name} - Founder Profile` : "Founder Not Found",
      ogDescription: () => profile.value ? `${profile.value.founder_name} is building ${projects.value.length} verified SaaS startup${projects.value.length !== 1 ? "s" : ""} on SaaSBizz.` : "View founder profile on SaaSBizz",
      ogUrl: () => `https://saasbizz.com/founder/${route.params.slug}/`,
      twitterTitle: () => profile.value ? `${profile.value.founder_name} - Founder Profile` : "Founder Not Found",
      twitterDescription: () => profile.value ? `${profile.value.founder_name} is building ${projects.value.length} verified SaaS startup${projects.value.length !== 1 ? "s" : ""} on SaaSBizz.` : "View founder profile on SaaSBizz"
    });
    useHead({
      script: profile.value ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.value.founder_name,
            url: `https://saasbizz.com/founder/${currentSlug}/`,
            sameAs: profile.value.founder_social ? [`https://x.com/${profile.value.founder_social.replace("@", "")}`] : [],
            image: profile.value.founder_image_local_path ? `https://saasbizz.com/founder_images/${profile.value.founder_image_local_path}` : void 0,
            jobTitle: "Founder",
            worksFor: projects.value.map((p) => ({
              "@type": "Organization",
              name: p.startup_name,
              url: p.domain ? `https://${p.domain}` : void 0
            }))
          })
        }
      ] : []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_2;
      const _component_StartupCard = __nuxt_component_1;
      const _component_SearchSection = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!profile.value) {
        _push(`<div class="text-center py-20 glass-card rounded-3xl"><h1 class="text-2xl font-bold text-white">Founder not found</h1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "mt-4 inline-block text-blue-400 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] rounded"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go Home `);
            } else {
              return [
                createTextVNode(" Go Home ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<article class="glass-card rounded-3xl p-8 min-h-[80vh]"><header class="flex flex-col items-center text-center mb-12"><div class="relative"><div class="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>`);
        if (profile.value.founder_image_local_path) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: `/founder_images/${profile.value.founder_image_local_path}`,
            alt: `${profile.value.founder_name} profile photo`,
            class: "relative w-32 h-32 rounded-full object-cover border-4 border-white/10 shadow-xl mb-6 bg-slate-900",
            width: "128",
            height: "128",
            loading: "eager",
            onError: handleImageError
          }, null, _parent));
        } else {
          _push(`<div class="relative w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-4xl font-black text-slate-500 border-4 border-white/10 mb-6">${ssrInterpolate(profile.value.founder_name?.charAt(0) || "?")}</div>`);
        }
        _push(`</div><h1 class="text-4xl font-black text-white tracking-tight">${ssrInterpolate(profile.value.founder_name)}</h1><div class="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400 font-medium flex-wrap"><span class="text-white font-bold">${ssrInterpolate(projects.value.length)} startup${ssrInterpolate(projects.value.length !== 1 ? "s" : "")}</span><span class="text-slate-600" aria-hidden="true">·</span><span>${ssrInterpolate(unref(formatFollowers)(profile.value.x_follower_count))} X followers</span>`);
        if (profile.value.founder_social) {
          _push(`<a${ssrRenderAttr("href", `https://x.com/${profile.value.founder_social.replace("@", "")}`)} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline hover:text-blue-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"${ssrRenderAttr("aria-label", `${profile.value.founder_name} on X (opens in new tab)`)}> @${ssrInterpolate(profile.value.founder_social.replace("@", ""))}</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></header><section aria-labelledby="portfolio-heading"><h2 id="portfolio-heading" class="text-xl font-bold text-white border-b border-white/10 pb-2 tracking-tight uppercase italic flex items-center justify-between mb-6"><span>Portfolio</span></h2><div class="space-y-4" role="list" aria-label="Founder&#39;s startups"><!--[-->`);
        ssrRenderList(projects.value, (startup) => {
          _push(ssrRenderComponent(_component_StartupCard, {
            key: startup.id,
            startup
          }, null, _parent));
        });
        _push(`<!--]--></div></section>`);
        _push(ssrRenderComponent(_component_SearchSection, null, null, _parent));
        _push(`</article>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/founder/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CDPgtYOO.mjs.map

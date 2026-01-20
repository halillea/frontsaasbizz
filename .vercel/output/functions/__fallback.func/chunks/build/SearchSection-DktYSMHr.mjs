import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { _ as __nuxt_component_1 } from './StartupCard-BhfBq3MU.mjs';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { u as useTheme } from './useTheme-ew5KROLl.mjs';
import { a as allStartups } from './startups-B8z0MfgU.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SearchSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { themeColor } = useTheme();
    const router = useRouter();
    const route = useRoute();
    const searchQuery = ref("");
    const showDropdown = ref(false);
    const selectedIndex = ref(0);
    const startups = allStartups;
    watch(() => route.query.search, (newSearch) => {
      if (newSearch) {
        searchQuery.value = newSearch;
        showDropdown.value = false;
        setTimeout(scrollToResults, 200);
      }
    });
    const categories = [
      { name: "Artificial Intelligence", slug: "ai", icon: "🤖" },
      { name: "SaaS", slug: "saas", icon: "☁️" },
      { name: "Developer Tools", slug: "developer-tools", icon: "🛠️" },
      { name: "Fintech", slug: "fintech", icon: "💰" },
      { name: "Productivity", slug: "productivity", icon: "✅" },
      { name: "Marketing", slug: "marketing", icon: "📣" },
      { name: "E-commerce", slug: "ecommerce", icon: "🛒" },
      { name: "Design Tools", slug: "design-tools", icon: "🎨" },
      { name: "No-Code", slug: "no-code", icon: "📦" },
      { name: "Analytics", slug: "analytics", icon: "📊" },
      { name: "Education", slug: "education", icon: "🎓" },
      { name: "Health & Fitness", slug: "health-fitness", icon: "❤️" },
      { name: "Social Media", slug: "social-media", icon: "📱" },
      { name: "Content Creation", slug: "content-creation", icon: "✍️" },
      { name: "Sales", slug: "sales", icon: "📈" },
      { name: "Customer Support", slug: "customer-support", icon: "🎧" },
      { name: "Recruiting & HR", slug: "recruiting-hr", icon: "👥" },
      { name: "Real Estate", slug: "real-estate", icon: "🏠" },
      { name: "Travel", slug: "travel", icon: "✈️" },
      { name: "Security", slug: "security", icon: "🛡️" }
    ];
    const filteredSuggestions = computed(() => {
      if (!searchQuery.value) return [];
      const q = searchQuery.value.toLowerCase();
      return startups.filter(
        (s) => s.startup_name.toLowerCase().includes(q) || s.founder_name && s.founder_name.toLowerCase().includes(q) || s.category && s.category.toLowerCase().includes(q) || s.domain && s.domain.toLowerCase().includes(q) || s.founder_social && s.founder_social.toLowerCase().includes(q)
      ).slice(0, 8);
    });
    const filteredResults = computed(() => {
      if (!searchQuery.value) return [];
      const q = searchQuery.value.toLowerCase();
      return startups.filter(
        (s) => s.startup_name.toLowerCase().includes(q) || s.founder_name && s.founder_name.toLowerCase().includes(q) || s.category && s.category.toLowerCase().includes(q) || s.domain && s.domain.toLowerCase().includes(q) || s.founder_social && s.founder_social.toLowerCase().includes(q)
      ).slice(0, 50);
    });
    function navigateToStartup(slug) {
      showDropdown.value = false;
      router.push(`/startup/${slug}`);
    }
    function scrollToResults() {
      setTimeout(() => {
        (void 0).getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    function handleLogoError(e) {
      const img = e.target;
      img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="%2394a3b8">?</text></svg>';
    }
    watch(searchQuery, () => {
      selectedIndex.value = 0;
      if (searchQuery.value) {
        showDropdown.value = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_StartupCard = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mt-20 pt-12 border-t border-white/5" }, _attrs))}><div class="max-w-3xl mx-auto text-center space-y-8"><h2 class="text-3xl font-black text-white tracking-tight"> The database of profitable startup with positive MRR </h2><div class="flex justify-center"><div class="relative flex-grow max-w-xl group w-full"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors z-10"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></span><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search startups, founders, categories.." class="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all">`);
      if (showDropdown.value && searchQuery.value && filteredSuggestions.value.length > 0) {
        _push(`<div class="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"><!--[-->`);
        ssrRenderList(filteredSuggestions.value, (startup, index) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: startup.id,
            to: `/startup/${startup.trustmrr_link}`,
            class: ["flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors border-b border-white/5 last:border-b-0", { "bg-slate-800": index === selectedIndex.value }],
            onMousedown: ($event) => navigateToStartup(startup.trustmrr_link)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", `https://www.google.com/s2/favicons?domain=${startup.domain}&sz=64`)}${ssrRenderAttr("alt", `${startup.startup_name} logo`)} class="w-10 h-10 rounded-lg border border-white/10 bg-slate-800 object-contain p-1 flex-shrink-0"${_scopeId}><div class="min-w-0 flex-1 text-left"${_scopeId}><div class="text-sm font-bold text-white truncate"${_scopeId}>${ssrInterpolate(startup.startup_name)}</div><div class="text-xs text-slate-400 truncate"${_scopeId}>${ssrInterpolate(startup.tagline || startup.full_description)}</div></div>`);
              } else {
                return [
                  createVNode("img", {
                    src: `https://www.google.com/s2/favicons?domain=${startup.domain}&sz=64`,
                    alt: `${startup.startup_name} logo`,
                    class: "w-10 h-10 rounded-lg border border-white/10 bg-slate-800 object-contain p-1 flex-shrink-0",
                    onError: handleLogoError
                  }, null, 40, ["src", "alt"]),
                  createVNode("div", { class: "min-w-0 flex-1 text-left" }, [
                    createVNode("div", { class: "text-sm font-bold text-white truncate" }, toDisplayString(startup.startup_name), 1),
                    createVNode("div", { class: "text-xs text-slate-400 truncate" }, toDisplayString(startup.tagline || startup.full_description), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div id="categories" class="mt-20 space-y-10"><div class="text-center"><h3 class="text-xl font-black text-white uppercase italic tracking-widest">Explore by category</h3></div><div class="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto"><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: cat.name,
          to: `/category/${cat.slug}`,
          class: ["group flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all duration-500 border", unref(themeColor) === "white" ? "bg-slate-100 text-slate-900 border-slate-200 hover:bg-white" : "bg-slate-900/40 text-slate-400 border-white/5 hover:border-blue-500/20 hover:bg-slate-800"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="${ssrRenderClass([unref(themeColor) === "white" ? "" : "grayscale group-hover:grayscale-0", "text-lg transition-all duration-300"])}"${_scopeId}>${ssrInterpolate(cat.icon)}</span><span class="${ssrRenderClass([unref(themeColor) === "white" ? "group-hover:text-blue-600" : "group-hover:text-blue-400", "text-sm font-bold transition-colors uppercase tracking-wide"])}"${_scopeId}>${ssrInterpolate(cat.name)}</span>`);
            } else {
              return [
                createVNode("span", {
                  class: ["text-lg transition-all duration-300", unref(themeColor) === "white" ? "" : "grayscale group-hover:grayscale-0"]
                }, toDisplayString(cat.icon), 3),
                createVNode("span", {
                  class: ["text-sm font-bold transition-colors uppercase tracking-wide", unref(themeColor) === "white" ? "group-hover:text-blue-600" : "group-hover:text-blue-400"]
                }, toDisplayString(cat.name), 3)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
      if (searchQuery.value && !showDropdown.value) {
        _push(`<div id="search-results" class="mt-16 space-y-6"><div class="flex items-center justify-between border-b border-white/5 pb-4"><h3 class="text-lg font-black text-white uppercase italic">Search Results (${ssrInterpolate(filteredResults.value.length)})</h3><button class="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Clear results</button></div>`);
        if (filteredResults.value.length > 0) {
          _push(`<div class="space-y-2"><!--[-->`);
          ssrRenderList(filteredResults.value, (startup) => {
            _push(ssrRenderComponent(_component_StartupCard, {
              key: "search-" + startup.id,
              startup
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="py-20 text-center"><div class="text-4xl mb-4">🔍</div><p class="text-slate-500 font-bold uppercase tracking-widest">No startups found matching your query</p></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "SearchSection" });

export { __nuxt_component_3 as _ };
//# sourceMappingURL=SearchSection-DktYSMHr.mjs.map

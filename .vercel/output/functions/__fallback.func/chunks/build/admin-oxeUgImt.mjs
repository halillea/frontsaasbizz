import { _ as __nuxt_component_0 } from './nuxt-link-CIKQ30WB.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { a as allStartups } from './startups-B8z0MfgU.mjs';
import { a as allArticles } from './articles-UYFHqK-6.mjs';
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

const allSponsors = [
  {
    id: 1768496428519,
    created_at: "2026-01-15T17:00:28.519Z",
    startup_name: "digilemon is back",
    website_url: "https://deltaroi.com",
    tagline: "Maximize your Return on Investment",
    category: "roi , return on investment",
    mrr: "Pending",
    status: "pending"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const isAuthenticated = ref(false);
    const activeTab = ref("blog");
    const startupSearch = ref("");
    const statusMessage = ref("");
    ref(false);
    ref(false);
    const openMenuId = ref(null);
    const showArticleEditor = ref(false);
    const editingArticle = ref(null);
    const articleForm = ref({
      title: "",
      slug: "",
      category: "Trends",
      status: "pending",
      author: "SaaSBizz Team",
      featured_image: "",
      excerpt: "",
      content: ""
    });
    const isScanning = ref(false);
    const isImporting = ref(false);
    const hasScanned = ref(false);
    const newArticles = ref([]);
    const deleteConfirm = ref({
      show: false,
      type: "",
      item: null,
      itemName: ""
    });
    const deleteConfirmInput = ref("");
    const startups = ref([...allStartups]);
    const sponsors = ref([...allSponsors]);
    const articles = ref([...allArticles]);
    const pendingAdverts = ref([]);
    const activeStartups = computed(() => startups.value.filter((s) => s.status !== 9));
    const activeSponsors = computed(() => sponsors.value.filter((s) => s.status !== 9));
    const publishedArticles = computed(() => articles.value.filter((a) => a.status === "published"));
    const pendingArticles = computed(() => articles.value.filter((a) => a.status === "pending"));
    const filteredStartups = computed(() => {
      const active = activeStartups.value;
      if (!startupSearch.value) return active.slice(0, 50);
      const q = startupSearch.value.toLowerCase();
      return active.filter(
        (s) => s.startup_name.toLowerCase().includes(q) || s.founder_name && s.founder_name.toLowerCase().includes(q)
      ).slice(0, 50);
    });
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    useSeoMeta({
      title: "Admin Dashboard - SaaSBizz",
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      if (!isAuthenticated.value) {
        _push(`<div class="text-center py-20"><div class="text-4xl mb-4">🔒</div><p class="text-slate-400 mb-4">You need to be logged in to access the admin dashboard.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go to Login `);
            } else {
              return [
                createTextVNode(" Go to Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><header class="flex items-center justify-between"><div class="flex items-center gap-3"><span class="text-3xl" aria-hidden="true">⚙️</span><div><h1 class="text-3xl font-black tracking-tight text-white uppercase italic"> Admin Dashboard </h1><p class="text-slate-400 text-sm mt-1">Manage startups, sponsors, blog, and content</p></div></div><button class="text-xs text-slate-500 hover:text-red-400 uppercase tracking-widest font-bold"> Logout </button></header><div class="grid grid-cols-2 md:grid-cols-5 gap-4"><div class="glass-card rounded-xl p-4 text-center"><div class="text-2xl font-black text-white">${ssrInterpolate(activeStartups.value.length)}</div><div class="text-xs text-slate-400 uppercase tracking-widest">Startups</div></div><div class="glass-card rounded-xl p-4 text-center"><div class="text-2xl font-black text-green-400">${ssrInterpolate(activeSponsors.value.length)}</div><div class="text-xs text-slate-400 uppercase tracking-widest">Sponsors</div></div><div class="glass-card rounded-xl p-4 text-center"><div class="text-2xl font-black text-yellow-400">${ssrInterpolate(pendingAdverts.value.length)}</div><div class="text-xs text-slate-400 uppercase tracking-widest">Pending Ads</div></div><div class="glass-card rounded-xl p-4 text-center"><div class="text-2xl font-black text-blue-400">${ssrInterpolate(publishedArticles.value.length)}</div><div class="text-xs text-slate-400 uppercase tracking-widest">Articles</div></div><div class="glass-card rounded-xl p-4 text-center"><div class="text-2xl font-black text-purple-400">$999</div><div class="text-xs text-slate-400 uppercase tracking-widest">Ad Rate</div></div></div><div class="flex flex-wrap gap-2 border-b border-white/10 pb-2"><button class="${ssrRenderClass([activeTab.value === "blog" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white", "px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"])}"> 📰 Blog (${ssrInterpolate(pendingArticles.value.length)} pending) </button><button class="${ssrRenderClass([activeTab.value === "startups" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white", "px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"])}"> 🚀 Startups </button><button class="${ssrRenderClass([activeTab.value === "sponsors" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white", "px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"])}"> 💰 Sponsors </button><button class="${ssrRenderClass([activeTab.value === "pending" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white", "px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"])}"> 📋 Pending Ads (${ssrInterpolate(pendingAdverts.value.length)}) </button></div>`);
        if (activeTab.value === "startups") {
          _push(`<div class="space-y-4"><div class="flex items-center justify-between"><h2 class="text-lg font-bold text-white">Manage Startups</h2><button class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest"> + Add Startup </button></div><input${ssrRenderAttr("value", startupSearch.value)} type="text" placeholder="Search startups..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"><div class="space-y-2 max-h-[500px] overflow-y-auto"><!--[-->`);
          ssrRenderList(filteredStartups.value, (startup) => {
            _push(`<div class="glass-card rounded-xl p-4 flex items-center justify-between"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", `https://www.google.com/s2/favicons?domain=${startup.domain}&sz=32`)} class="w-8 h-8 rounded"><div><div class="font-bold text-white">${ssrInterpolate(startup.startup_name)}</div><div class="text-xs text-slate-400">${ssrInterpolate(startup.founder_name)} • ${ssrInterpolate(startup.mrr)}</div></div></div><div class="flex items-center gap-3"><button class="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-widest font-bold">Edit</button><div class="relative"><button class="text-slate-500 hover:text-slate-300 text-lg px-2">⋯</button>`);
            if (openMenuId.value === `startup-${startup.id}`) {
              _push(`<div class="absolute right-0 top-8 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 min-w-[120px]"><button class="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 text-xs uppercase tracking-widest font-bold rounded-lg">🗑️ Delete</button></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "sponsors") {
          _push(`<div class="space-y-4"><div class="flex items-center justify-between"><h2 class="text-lg font-bold text-white">Approved Sponsors</h2><div class="flex items-center gap-2"><button class="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest"> 📤 Export CSV </button><button class="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest"> 📤 Export JSON </button><label class="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest cursor-pointer"> 📥 Import <input type="file" accept=".csv,.json" class="hidden"></label><button class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest"> + Add Sponsor </button></div></div><div class="space-y-2"><!--[-->`);
          ssrRenderList(activeSponsors.value, (sponsor) => {
            _push(`<div class="glass-card rounded-xl p-4 flex items-center justify-between"><div><div class="font-bold text-white">${ssrInterpolate(sponsor.startup_name)}</div><div class="text-xs text-slate-400">${ssrInterpolate(sponsor.website_url)}</div><div class="text-xs text-green-400">${ssrInterpolate(sponsor.status)}</div></div><div class="flex items-center gap-3"><button class="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-widest font-bold">Edit</button><div class="relative"><button class="text-slate-500 hover:text-slate-300 text-lg px-2">⋯</button>`);
            if (openMenuId.value === `sponsor-${sponsor.id}`) {
              _push(`<div class="absolute right-0 top-8 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 min-w-[120px]"><button class="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 text-xs uppercase tracking-widest font-bold rounded-lg">🗑️ Delete</button></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></div>`);
          });
          _push(`<!--]-->`);
          if (activeSponsors.value.length === 0) {
            _push(`<div class="text-center py-8 text-slate-500">No approved sponsors yet</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "pending") {
          _push(`<div class="space-y-4"><h2 class="text-lg font-bold text-white">Pending Ad Submissions</h2><div class="space-y-2"><!--[-->`);
          ssrRenderList(pendingAdverts.value, (advert) => {
            _push(`<div class="glass-card rounded-xl p-4"><div class="flex items-center justify-between mb-3"><div class="font-bold text-white">${ssrInterpolate(advert.business_name)}</div><span class="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded uppercase">${ssrInterpolate(advert.status)}</span></div><div class="text-sm text-slate-400 space-y-1"><div><strong>URL:</strong> ${ssrInterpolate(advert.website_url)}</div><div><strong>Tagline:</strong> ${ssrInterpolate(advert.tagline || "N/A")}</div><div><strong>Contact:</strong> ${ssrInterpolate(advert.contact_email)}</div>`);
            if (advert.description) {
              _push(`<div><strong>Description:</strong> ${ssrInterpolate(advert.description)}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="mt-4 flex gap-2"><button class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest">Approve</button><button class="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest">Reject</button></div></div>`);
          });
          _push(`<!--]-->`);
          if (pendingAdverts.value.length === 0) {
            _push(`<div class="text-center py-8 text-slate-500">No pending submissions</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "blog") {
          _push(`<div class="space-y-6"><div class="glass-card rounded-xl p-6 border-2 border-dashed border-blue-500/30"><div class="flex items-center justify-between mb-4"><div><h3 class="text-lg font-bold text-white">📂 Import from /articles/new/</h3><p class="text-xs text-slate-400">Scan for new markdown files and import them as pending articles</p></div><div class="flex gap-2"><button${ssrIncludeBooleanAttr(isScanning.value) ? " disabled" : ""} class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest disabled:opacity-50">${ssrInterpolate(isScanning.value ? "Scanning..." : "🔄 Scan Folder")}</button>`);
          if (newArticles.value.length > 0) {
            _push(`<button${ssrIncludeBooleanAttr(isImporting.value) ? " disabled" : ""} class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest disabled:opacity-50">${ssrInterpolate(isImporting.value ? "Importing..." : `⬇️ Import All (${newArticles.value.length})`)}</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
          if (newArticles.value.length > 0) {
            _push(`<div class="space-y-2"><!--[-->`);
            ssrRenderList(newArticles.value, (article) => {
              _push(`<div class="bg-slate-800/50 rounded-lg p-4 flex items-start justify-between gap-4"><div class="flex-1"><div class="flex items-center gap-2 mb-1"><span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded uppercase font-bold">New</span><span class="text-xs text-slate-500">${ssrInterpolate(article.filename)}</span></div><div class="font-bold text-white">${ssrInterpolate(article.title)}</div><div class="text-xs text-slate-400 mt-1">${ssrInterpolate(article.excerpt?.slice(0, 100))}...</div><div class="text-xs text-slate-500 mt-1">By ${ssrInterpolate(article.author)}</div></div><button${ssrIncludeBooleanAttr(isImporting.value) ? " disabled" : ""} class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest disabled:opacity-50"> Import </button></div>`);
            });
            _push(`<!--]--></div>`);
          } else if (hasScanned.value) {
            _push(`<div class="text-center py-4 text-slate-500"> No new articles found in /articles/new/ </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center justify-between"><h2 class="text-lg font-bold text-white">Manage Blog Articles</h2><button class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest"> + New Article </button></div><div class="space-y-2"><!--[-->`);
          ssrRenderList(articles.value, (article) => {
            _push(`<div class="glass-card rounded-xl p-4"><div class="flex items-start justify-between gap-4"><div class="flex-1"><div class="flex items-center gap-2 mb-1"><span class="${ssrRenderClass([article.status === "published" ? "bg-green-500/20 text-green-400" : article.status === 9 ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400", "text-xs px-2 py-0.5 rounded uppercase font-bold"])}">${ssrInterpolate(article.status === 9 ? "Deleted" : article.status)}</span><span class="text-xs text-slate-500">${ssrInterpolate(article.category)}</span></div><div class="font-bold text-white">${ssrInterpolate(article.title)}</div><div class="text-xs text-slate-400 mt-1">${ssrInterpolate(article.excerpt?.slice(0, 100))}...</div><div class="text-xs text-slate-500 mt-2"> By ${ssrInterpolate(article.author)} • ${ssrInterpolate(formatDate(article.created_at))}</div></div><div class="flex items-center gap-3"><button class="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-widest font-bold">Edit</button><div class="relative"><button class="text-slate-500 hover:text-slate-300 text-lg px-2">⋯</button>`);
            if (openMenuId.value === `article-${article.id}`) {
              _push(`<div class="absolute right-0 top-8 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 min-w-[120px]"><button class="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 text-xs uppercase tracking-widest font-bold rounded-lg">🗑️ Delete</button></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></div></div>`);
          });
          _push(`<!--]-->`);
          if (articles.value.length === 0) {
            _push(`<div class="text-center py-8 text-slate-500">No articles yet. Create your first one!</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (showArticleEditor.value) {
          _push(`<div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"><div class="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"><div class="flex items-center justify-between mb-6"><h3 class="text-xl font-black text-white uppercase">${ssrInterpolate(editingArticle.value ? "Edit Article" : "New Article")}</h3><button class="text-slate-400 hover:text-white text-2xl">×</button></div><form class="space-y-4"><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Title <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", articleForm.value.title)} type="text" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Article title..."></div><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">URL Slug <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", articleForm.value.slug)} type="text" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="article-url-slug"><p class="text-xs text-slate-500">/news/${ssrInterpolate(articleForm.value.slug || "article-slug")}</p></div><div class="grid grid-cols-2 gap-4"><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label><input${ssrRenderAttr("value", articleForm.value.category)} type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Trends, Growth, News..."></div><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label><select class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(articleForm.value.status) ? ssrLooseContain(articleForm.value.status, "pending") : ssrLooseEqual(articleForm.value.status, "pending")) ? " selected" : ""}>Pending Review</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(articleForm.value.status) ? ssrLooseContain(articleForm.value.status, "draft") : ssrLooseEqual(articleForm.value.status, "draft")) ? " selected" : ""}>Draft</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(articleForm.value.status) ? ssrLooseContain(articleForm.value.status, "published") : ssrLooseEqual(articleForm.value.status, "published")) ? " selected" : ""}>Published</option></select></div></div><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Author</label><input${ssrRenderAttr("value", articleForm.value.author)} type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Author name..."></div><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Featured Image URL (Optional)</label><input${ssrRenderAttr("value", articleForm.value.featured_image)} type="url" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg"></div><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Excerpt <span class="text-red-500">*</span></label><textarea required rows="2" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Short summary for article previews...">${ssrInterpolate(articleForm.value.excerpt)}</textarea><p class="text-xs text-slate-500">${ssrInterpolate(articleForm.value.excerpt?.length || 0)}/200 characters</p></div><div class="space-y-2"><label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Content (Markdown) <span class="text-red-500">*</span></label><textarea required rows="12" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" placeholder="Write your article content in Markdown...">${ssrInterpolate(articleForm.value.content)}</textarea><p class="text-xs text-slate-500">Supports Markdown: ## Headings, **bold**, *italic*, [links](url), etc.</p></div><div class="flex gap-3 pt-4"><button type="button" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors"> Cancel </button><button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">${ssrInterpolate(editingArticle.value ? "Save Changes" : "Publish Article")}</button></div></form></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (deleteConfirm.value.show) {
          _push(`<div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"><div class="bg-slate-900 border border-red-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"><div class="text-center"><div class="text-5xl mb-4">⚠️</div><h3 class="text-xl font-black text-white uppercase mb-2">Confirm Deactivation</h3><p class="text-slate-400 mb-2">You are about to deactivate:</p><p class="text-lg font-bold text-red-400 mb-4">${ssrInterpolate(deleteConfirm.value.itemName)}</p><div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6"><p class="text-red-400 text-sm font-medium"> ⚠️ This will set the status to INACTIVE (status: 9). The entry will be hidden but can be reactivated later if needed. </p></div><p class="text-xs text-slate-500 mb-6">Type <strong class="text-white">DELETE</strong> to confirm:</p><input${ssrRenderAttr("value", deleteConfirmInput.value)} type="text" placeholder="Type DELETE" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"><div class="flex gap-3"><button class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">Cancel</button><button${ssrIncludeBooleanAttr(deleteConfirmInput.value !== "DELETE") ? " disabled" : ""} class="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed">Deactivate</button></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (statusMessage.value) {
          _push(`<div class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg">${ssrInterpolate(statusMessage.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-oxeUgImt.mjs.map

<template>
  <div class="space-y-8">
    <!-- Auth Check -->
    <div v-if="!isAuthenticated" class="text-center py-20">
      <div class="text-4xl mb-4">🔒</div>
      <p class="text-slate-400 mb-4">You need to be logged in to access the admin dashboard.</p>
      <NuxtLink to="/login" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-colors">
        Go to Login
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Header -->
      <header class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-3xl" aria-hidden="true">⚙️</span>
          <div>
            <h1 class="text-3xl font-black tracking-tight text-white uppercase italic">
              Admin Dashboard
            </h1>
            <p class="text-slate-400 text-sm mt-1">Manage startups, sponsors, blog, and content</p>
          </div>
        </div>
        <button @click="logout" class="text-xs text-slate-500 hover:text-red-400 uppercase tracking-widest font-bold">
          Logout
        </button>
      </header>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="glass-card rounded-xl p-4 text-center">
          <div class="text-2xl font-black text-white">{{ activeStartups.length }}</div>
          <div class="text-xs text-slate-400 uppercase tracking-widest">Startups</div>
        </div>
        <div class="glass-card rounded-xl p-4 text-center">
          <div class="text-2xl font-black text-green-400">{{ activeSponsors.length }}</div>
          <div class="text-xs text-slate-400 uppercase tracking-widest">Sponsors</div>
        </div>
        <div class="glass-card rounded-xl p-4 text-center">
          <div class="text-2xl font-black text-yellow-400">{{ pendingAdverts.length }}</div>
          <div class="text-xs text-slate-400 uppercase tracking-widest">Pending Ads</div>
        </div>
        <div class="glass-card rounded-xl p-4 text-center">
          <div class="text-2xl font-black text-blue-400">{{ publishedArticles.length }}</div>
          <div class="text-xs text-slate-400 uppercase tracking-widest">Articles</div>
        </div>
        <div class="glass-card rounded-xl p-4 text-center">
          <div class="text-2xl font-black text-purple-400">$999</div>
          <div class="text-xs text-slate-400 uppercase tracking-widest">Ad Rate</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex flex-wrap gap-2 border-b border-white/10 pb-2">
        <button 
          @click="activeTab = 'blog'"
          class="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"
          :class="activeTab === 'blog' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'"
        >
          📰 Blog ({{ pendingArticles.length }} pending)
        </button>
        <button 
          @click="activeTab = 'startups'"
          class="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"
          :class="activeTab === 'startups' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'"
        >
          🚀 Startups
        </button>
        <button 
          @click="activeTab = 'sponsors'"
          class="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"
          :class="activeTab === 'sponsors' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'"
        >
          💰 Sponsors
        </button>
        <button 
          @click="activeTab = 'pending'"
          class="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"
          :class="activeTab === 'pending' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'"
        >
          📋 Pending Ads ({{ pendingAdverts.length }})
        </button>
      </div>

      <!-- Startups Tab -->
      <div v-if="activeTab === 'startups'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-white">Manage Startups</h2>
          <button @click="showAddStartup = true" class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest">
            + Add Startup
          </button>
        </div>
        
        <input 
          v-model="startupSearch" 
          type="text" 
          placeholder="Search startups..." 
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        
        <div class="space-y-2 max-h-[500px] overflow-y-auto">
          <div 
            v-for="startup in filteredStartups" 
            :key="startup.id"
            class="glass-card rounded-xl p-4 flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <img 
                :src="`https://www.google.com/s2/favicons?domain=${startup.domain}&sz=32`"
                class="w-8 h-8 rounded"
                @error="(e) => (e.target as HTMLImageElement).src = '/apple-touch-icon.png'"
              >
              <div>
                <div class="font-bold text-white">{{ startup.startup_name }}</div>
                <div class="text-xs text-slate-400">{{ startup.founder_name }} • {{ startup.mrr }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button @click="editStartup(startup)" class="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-widest font-bold">Edit</button>
              <div class="relative">
                <button @click="toggleMenu('startup', startup.id)" class="text-slate-500 hover:text-slate-300 text-lg px-2">⋯</button>
                <div v-if="openMenuId === `startup-${startup.id}`" class="absolute right-0 top-8 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 min-w-[120px]">
                  <button @click="confirmDelete('startup', startup)" class="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 text-xs uppercase tracking-widest font-bold rounded-lg">🗑️ Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sponsors Tab -->
      <div v-if="activeTab === 'sponsors'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-white">Approved Sponsors</h2>
          <div class="flex items-center gap-2">
            <button @click="exportSponsorsCSV" class="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest">
              📤 Export CSV
            </button>
            <button @click="exportSponsorsJSON" class="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest">
              📤 Export JSON
            </button>
            <label class="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest cursor-pointer">
              📥 Import
              <input type="file" accept=".csv,.json" @change="importSponsors" class="hidden">
            </label>
            <button @click="showAddSponsor = true" class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest">
              + Add Sponsor
            </button>
          </div>
        </div>
        
        <div class="space-y-2">
          <div v-for="sponsor in activeSponsors" :key="sponsor.id" class="glass-card rounded-xl p-4 flex items-center justify-between">
            <div>
              <div class="font-bold text-white">{{ sponsor.startup_name }}</div>
              <div class="text-xs text-slate-400">{{ sponsor.website_url }}</div>
              <div class="text-xs text-green-400">{{ sponsor.status }}</div>
            </div>
            <div class="flex items-center gap-3">
              <button @click="editSponsor(sponsor)" class="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-widest font-bold">Edit</button>
              <div class="relative">
                <button @click="toggleMenu('sponsor', sponsor.id)" class="text-slate-500 hover:text-slate-300 text-lg px-2">⋯</button>
                <div v-if="openMenuId === `sponsor-${sponsor.id}`" class="absolute right-0 top-8 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 min-w-[120px]">
                  <button @click="confirmDelete('sponsor', sponsor)" class="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 text-xs uppercase tracking-widest font-bold rounded-lg">🗑️ Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeSponsors.length === 0" class="text-center py-8 text-slate-500">No approved sponsors yet</div>
        </div>
      </div>

      <!-- Pending Tab -->
      <div v-if="activeTab === 'pending'" class="space-y-4">
        <h2 class="text-lg font-bold text-white">Pending Ad Submissions</h2>
        
        <div class="space-y-2">
          <div v-for="advert in pendingAdverts" :key="advert.id" class="glass-card rounded-xl p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="font-bold text-white">{{ advert.business_name }}</div>
              <span class="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded uppercase">{{ advert.status }}</span>
            </div>
            <div class="text-sm text-slate-400 space-y-1">
              <div><strong>URL:</strong> {{ advert.website_url }}</div>
              <div><strong>Tagline:</strong> {{ advert.tagline || 'N/A' }}</div>
              <div><strong>Contact:</strong> {{ advert.contact_email }}</div>
              <div v-if="advert.description"><strong>Description:</strong> {{ advert.description }}</div>
            </div>
            <div class="mt-4 flex gap-2">
              <button @click="approveSponsor(advert)" class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest">Approve</button>
              <button @click="rejectAdvert(advert.id)" class="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest">Reject</button>
            </div>
          </div>
          <div v-if="pendingAdverts.length === 0" class="text-center py-8 text-slate-500">No pending submissions</div>
        </div>
      </div>

      <!-- Blog Tab -->
      <div v-if="activeTab === 'blog'" class="space-y-6">
        <!-- Scan New Articles Section -->
        <div class="glass-card rounded-xl p-6 border-2 border-dashed border-blue-500/30">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-white">📂 Import from /articles/new/</h3>
              <p class="text-xs text-slate-400">Scan for new markdown files and import them as pending articles</p>
            </div>
            <div class="flex gap-2">
              <button 
                @click="scanArticles" 
                :disabled="isScanning"
                class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest disabled:opacity-50"
              >
                {{ isScanning ? 'Scanning...' : '🔄 Scan Folder' }}
              </button>
              <button 
                v-if="newArticles.length > 0"
                @click="importAllArticles"
                :disabled="isImporting"
                class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest disabled:opacity-50"
              >
                {{ isImporting ? 'Importing...' : `⬇️ Import All (${newArticles.length})` }}
              </button>
            </div>
          </div>
          
          <!-- New Articles List -->
          <div v-if="newArticles.length > 0" class="space-y-2">
            <div v-for="article in newArticles" :key="article.filename" class="bg-slate-800/50 rounded-lg p-4 flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded uppercase font-bold">New</span>
                  <span class="text-xs text-slate-500">{{ article.filename }}</span>
                </div>
                <div class="font-bold text-white">{{ article.title }}</div>
                <div class="text-xs text-slate-400 mt-1">{{ article.excerpt?.slice(0, 100) }}...</div>
                <div class="text-xs text-slate-500 mt-1">By {{ article.author }}</div>
              </div>
              <button 
                @click="importSingleArticle(article)"
                :disabled="isImporting"
                class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest disabled:opacity-50"
              >
                Import
              </button>
            </div>
          </div>
          <div v-else-if="hasScanned" class="text-center py-4 text-slate-500">
            No new articles found in /articles/new/
          </div>
        </div>

        <!-- Header -->
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-white">Manage Blog Articles</h2>
          <button @click="openArticleEditor(null)" class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest">
            + New Article
          </button>
        </div>
        
        <!-- Article List -->
        <div class="space-y-2">
          <div v-for="article in articles" :key="article.id" class="glass-card rounded-xl p-4">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span 
                    class="text-xs px-2 py-0.5 rounded uppercase font-bold"
                    :class="article.status === 'published' ? 'bg-green-500/20 text-green-400' : article.status === 9 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'"
                  >
                    {{ article.status === 9 ? 'Deleted' : article.status }}
                  </span>
                  <span class="text-xs text-slate-500">{{ article.category }}</span>
                </div>
                <div class="font-bold text-white">{{ article.title }}</div>
                <div class="text-xs text-slate-400 mt-1">{{ article.excerpt?.slice(0, 100) }}...</div>
                <div class="text-xs text-slate-500 mt-2">
                  By {{ article.author }} • {{ formatDate(article.created_at) }}
                </div>
              </div>
              <div class="flex items-center gap-3">
                <button @click="openArticleEditor(article)" class="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-widest font-bold">Edit</button>
                <div class="relative">
                  <button @click="toggleMenu('article', article.id)" class="text-slate-500 hover:text-slate-300 text-lg px-2">⋯</button>
                  <div v-if="openMenuId === `article-${article.id}`" class="absolute right-0 top-8 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 min-w-[120px]">
                    <button @click="confirmDelete('article', article)" class="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 text-xs uppercase tracking-widest font-bold rounded-lg">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="articles.length === 0" class="text-center py-8 text-slate-500">No articles yet. Create your first one!</div>
        </div>
      </div>

      <!-- Article Editor Modal -->
      <div v-if="showArticleEditor" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-black text-white uppercase">{{ editingArticle ? 'Edit Article' : 'New Article' }}</h3>
            <button @click="showArticleEditor = false" class="text-slate-400 hover:text-white text-2xl">&times;</button>
          </div>
          
          <form @submit.prevent="saveArticle" class="space-y-4">
            <!-- Title -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Title <span class="text-red-500">*</span></label>
              <input v-model="articleForm.title" type="text" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Article title...">
            </div>

            <!-- Slug -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">URL Slug <span class="text-red-500">*</span></label>
              <input v-model="articleForm.slug" type="text" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="article-url-slug">
              <p class="text-xs text-slate-500">/news/{{ articleForm.slug || 'article-slug' }}</p>
            </div>

            <!-- Category & Status Row -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                <input v-model="articleForm.category" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Trends, Growth, News...">
              </div>
              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                <select v-model="articleForm.status" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="pending">Pending Review</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <!-- Author -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Author</label>
              <input v-model="articleForm.author" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Author name...">
            </div>

            <!-- Featured Image URL -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Featured Image URL (Optional)</label>
              <input v-model="articleForm.featured_image" type="url" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg">
            </div>

            <!-- Excerpt -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Excerpt <span class="text-red-500">*</span></label>
              <textarea v-model="articleForm.excerpt" required rows="2" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Short summary for article previews..."></textarea>
              <p class="text-xs text-slate-500">{{ articleForm.excerpt?.length || 0 }}/200 characters</p>
            </div>

            <!-- Content -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Content (Markdown) <span class="text-red-500">*</span></label>
              <textarea v-model="articleForm.content" required rows="12" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" placeholder="Write your article content in Markdown..."></textarea>
              <p class="text-xs text-slate-500">Supports Markdown: ## Headings, **bold**, *italic*, [links](url), etc.</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-4">
              <button type="button" @click="showArticleEditor = false" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
                {{ editingArticle ? 'Save Changes' : 'Publish Article' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="deleteConfirm.show" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div class="bg-slate-900 border border-red-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div class="text-center">
            <div class="text-5xl mb-4">⚠️</div>
            <h3 class="text-xl font-black text-white uppercase mb-2">Confirm Deactivation</h3>
            <p class="text-slate-400 mb-2">You are about to deactivate:</p>
            <p class="text-lg font-bold text-red-400 mb-4">{{ deleteConfirm.itemName }}</p>
            <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p class="text-red-400 text-sm font-medium">
                ⚠️ This will set the status to INACTIVE (status: 9). The entry will be hidden but can be reactivated later if needed.
              </p>
            </div>
            <p class="text-xs text-slate-500 mb-6">Type <strong class="text-white">DELETE</strong> to confirm:</p>
            <input v-model="deleteConfirmInput" type="text" placeholder="Type DELETE" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:ring-2 focus:ring-red-500 mb-4">
            <div class="flex gap-3">
              <button @click="cancelDelete" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">Cancel</button>
              <button @click="executeDelete" :disabled="deleteConfirmInput !== 'DELETE'" class="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed">Deactivate</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Message -->
      <div v-if="statusMessage" class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg">
        {{ statusMessage }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import allStartups from '~/content/startups.json'
import allSponsors from '~/content/sponsors.json'
import allArticles from '~/content/articles.json'

const isAuthenticated = ref(false)
const activeTab = ref('blog')
const startupSearch = ref('')
const statusMessage = ref('')
const showAddStartup = ref(false)
const showAddSponsor = ref(false)
const openMenuId = ref<string | null>(null)

// Article editor state
const showArticleEditor = ref(false)
const editingArticle = ref<any>(null)
const articleForm = ref({
  title: '',
  slug: '',
  category: 'Trends',
  status: 'pending',
  author: 'SaaSBizz Team',
  featured_image: '',
  excerpt: '',
  content: ''
})

// Scan/Import state
const isScanning = ref(false)
const isImporting = ref(false)
const hasScanned = ref(false)
const newArticles = ref<any[]>([])

// Delete confirmation state
const deleteConfirm = ref({
  show: false,
  type: '' as 'startup' | 'sponsor' | 'article',
  item: null as any,
  itemName: ''
})
const deleteConfirmInput = ref('')

const startups = ref<any[]>([...allStartups])
const sponsors = ref<any[]>([...allSponsors])
const articles = ref<any[]>([...allArticles])
const pendingAdverts = ref<any[]>([])

// Filter out deleted items (status === 9)
const activeStartups = computed(() => startups.value.filter(s => s.status !== 9))
const activeSponsors = computed(() => sponsors.value.filter(s => s.status !== 9))
const publishedArticles = computed(() => articles.value.filter(a => a.status === 'published'))
const pendingArticles = computed(() => articles.value.filter(a => a.status === 'pending'))

const filteredStartups = computed(() => {
  const active = activeStartups.value
  if (!startupSearch.value) return active.slice(0, 50)
  const q = startupSearch.value.toLowerCase()
  return active.filter(s => 
    s.startup_name.toLowerCase().includes(q) ||
    (s.founder_name && s.founder_name.toLowerCase().includes(q))
  ).slice(0, 50)
})

onMounted(async () => {
  if (typeof window !== 'undefined') {
    isAuthenticated.value = sessionStorage.getItem('saasbizz-admin-auth') === 'authenticated'
  }
  
  try {
    const adverts = await import('~/content/toreview_advert.json')
    pendingAdverts.value = adverts.default
  } catch (e) {
    pendingAdverts.value = []
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('.relative')) {
        openMenuId.value = null
      }
    })
  }
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function toggleMenu(type: string, id: number) {
  const menuId = `${type}-${id}`
  openMenuId.value = openMenuId.value === menuId ? null : menuId
}

function logout() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('saasbizz-admin-auth')
  }
  navigateTo('/login')
}

function showStatus(message: string) {
  statusMessage.value = message
  setTimeout(() => { statusMessage.value = '' }, 3000)
}

function editStartup(startup: any) {
  openMenuId.value = null
  showStatus(`Editing ${startup.startup_name} - Feature coming soon!`)
}

function editSponsor(sponsor: any) {
  openMenuId.value = null
  showStatus(`Editing ${sponsor.startup_name} - Feature coming soon!`)
}

// Sponsor Export/Import functions
const SPONSOR_FIELDS = ['id', 'created_at', 'startup_name', 'website_url', 'logo_url', 'tagline', 'description', 'keywords', 'contact_email', 'contact_name', 'category', 'mrr', 'status']

function exportSponsorsCSV() {
  const data = activeSponsors.value
  if (data.length === 0) {
    showStatus('No sponsors to export')
    return
  }
  
  const headers = SPONSOR_FIELDS.join(',')
  const rows = data.map(s => SPONSOR_FIELDS.map(f => `"${String(s[f] || '').replace(/"/g, '""')}"`).join(','))
  const csv = [headers, ...rows].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sponsors_${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
  showStatus(`Exported ${data.length} sponsors to CSV`)
}

function exportSponsorsJSON() {
  const data = activeSponsors.value
  if (data.length === 0) {
    showStatus('No sponsors to export')
    return
  }
  
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sponsors_${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  showStatus(`Exported ${data.length} sponsors to JSON`)
}

function importSponsors(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string
      let imported: any[] = []
      
      if (file.name.endsWith('.json')) {
        imported = JSON.parse(content)
      } else if (file.name.endsWith('.csv')) {
        const lines = content.split('\n').filter(l => l.trim())
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].match(/(".*?"|[^,]+)/g) || []
          const obj: any = {}
          headers.forEach((h, idx) => {
            obj[h] = values[idx]?.replace(/^"|"$/g, '').replace(/""/g, '"') || ''
          })
          imported.push(obj)
        }
      }
      
      if (!Array.isArray(imported) || imported.length === 0) {
        showStatus('Invalid file format or empty data')
        return
      }
      
      // Add imported sponsors with new IDs
      let addedCount = 0
      imported.forEach(s => {
        if (s.startup_name) {
          sponsors.value.push({
            ...s,
            id: Date.now() + addedCount,
            status: s.status || 'approved'
          })
          addedCount++
        }
      })
      
      showStatus(`Imported ${addedCount} sponsors`)
    } catch (err) {
      showStatus('Error parsing file')
      console.error('Import error:', err)
    }
  }
  reader.readAsText(file)
  input.value = '' // Reset input
}

// Article functions
function openArticleEditor(article: any) {
  openMenuId.value = null
  if (article) {
    editingArticle.value = article
    articleForm.value = { ...article }
  } else {
    editingArticle.value = null
    articleForm.value = {
      title: '',
      slug: '',
      category: 'Trends',
      status: 'pending',
      author: 'SaaSBizz Team',
      featured_image: '',
      excerpt: '',
      content: ''
    }
  }
  showArticleEditor.value = true
}

function saveArticle() {
  if (editingArticle.value) {
    // Update existing article
    const index = articles.value.findIndex(a => a.id === editingArticle.value.id)
    if (index !== -1) {
      articles.value[index] = {
        ...articles.value[index],
        ...articleForm.value
      }
    }
    showStatus(`Article "${articleForm.value.title}" updated!`)
  } else {
    // Create new article
    const newArticle = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      ...articleForm.value
    }
    articles.value.unshift(newArticle)
    showStatus(`Article "${articleForm.value.title}\" created!`)
  }
  showArticleEditor.value = false
}

// Scan and Import functions
async function scanArticles() {
  isScanning.value = true
  hasScanned.value = false
  try {
    const response = await fetch('/api/scan-articles')
    const data = await response.json()
    newArticles.value = data.articles || []
    hasScanned.value = true
    if (newArticles.value.length > 0) {
      showStatus(`Found ${newArticles.value.length} new article(s)`)
    } else {
      showStatus('No new articles found')
    }
  } catch (error) {
    console.error('Scan error:', error)
    showStatus('Failed to scan articles folder')
  } finally {
    isScanning.value = false
  }
}

async function importSingleArticle(article: any) {
  isImporting.value = true
  try {
    const response = await fetch('/api/import-article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    })
    const data = await response.json()
    
    if (response.ok) {
      // Add to local articles list
      articles.value.unshift(data.article)
      // Remove from new articles list
      newArticles.value = newArticles.value.filter(a => a.filename !== article.filename)
      showStatus(`Imported: ${article.title}`)
    } else {
      showStatus(data.statusMessage || 'Failed to import article')
    }
  } catch (error) {
    console.error('Import error:', error)
    showStatus('Failed to import article')
  } finally {
    isImporting.value = false
  }
}

async function importAllArticles() {
  isImporting.value = true
  let imported = 0
  const toImport = [...newArticles.value]
  
  for (const article of toImport) {
    try {
      const response = await fetch('/api/import-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      })
      const data = await response.json()
      
      if (response.ok) {
        articles.value.unshift(data.article)
        newArticles.value = newArticles.value.filter(a => a.filename !== article.filename)
        imported++
      }
    } catch (error) {
      console.error('Import error for', article.filename, error)
    }
  }
  
  isImporting.value = false
  showStatus(`Imported ${imported} article(s)`)
}

function confirmDelete(type: 'startup' | 'sponsor' | 'article', item: any) {
  openMenuId.value = null
  deleteConfirm.value = {
    show: true,
    type,
    item,
    itemName: type === 'article' ? item.title : item.startup_name
  }
  deleteConfirmInput.value = ''
}

function cancelDelete() {
  deleteConfirm.value.show = false
  deleteConfirmInput.value = ''
}

function executeDelete() {
  if (deleteConfirmInput.value !== 'DELETE') return
  
  const { type, item } = deleteConfirm.value
  
  if (type === 'startup') {
    const index = startups.value.findIndex(s => s.id === item.id)
    if (index !== -1) startups.value[index].status = 9
    showStatus(`${item.startup_name} has been deactivated (status: 9)`)
  } else if (type === 'sponsor') {
    const index = sponsors.value.findIndex(s => s.id === item.id)
    if (index !== -1) sponsors.value[index].status = 9
    showStatus(`${item.startup_name} has been deactivated (status: 9)`)
  } else if (type === 'article') {
    const index = articles.value.findIndex(a => a.id === item.id)
    if (index !== -1) articles.value[index].status = 9
    showStatus(`"${item.title}" has been deactivated (status: 9)`)
  }
  
  cancelDelete()
}

function approveSponsor(advert: any) {
  sponsors.value.push({ ...advert, status: 'approved' })
  pendingAdverts.value = pendingAdverts.value.filter(a => a.id !== advert.id)
  showStatus(`${advert.business_name} approved!`)
}

function rejectAdvert(id: number) {
  if (confirm('Are you sure you want to reject this submission?')) {
    pendingAdverts.value = pendingAdverts.value.filter(a => a.id !== id)
    showStatus('Submission rejected')
  }
}

useSeoMeta({
  title: 'Admin Dashboard - SaaSBizz',
  robots: 'noindex, nofollow'
})
</script>

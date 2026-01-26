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
        <!-- SOLDOUT TOGGLE SECTION -->
        <div class="glass-card rounded-xl p-4 border-2" :class="advertisingSoldout ? 'border-red-500/50 bg-red-500/5' : 'border-green-500/30 bg-green-500/5'">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ advertisingSoldout ? '🚫' : '✅' }}</span>
              <div>
                <div class="font-bold text-white">Advertising Status</div>
                <div class="text-xs text-slate-400">
                  {{ advertisingSoldout ? 'All spots are sold out. Visitors will be redirected to waitlist.' : 'Advertising spots are available for purchase.' }}
                </div>
              </div>
            </div>
            <button
              @click="toggleSoldout"
              :disabled="isSavingSettings"
              class="px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all"
              :class="advertisingSoldout 
                ? 'bg-green-600 hover:bg-green-500 text-white' 
                : 'bg-red-600 hover:bg-red-500 text-white'"
            >
              {{ isSavingSettings ? 'Saving...' : (advertisingSoldout ? 'Enable Sales' : 'Mark Sold Out') }}
            </button>
          </div>
        </div>

        <!-- Header with buttons (only show when not editing) -->
        <div v-if="!showAddSponsor" class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-white">Approved Sponsors</h2>
          <div class="flex items-center gap-2">
            <button 
              v-if="hasOrderChanged" 
              @click="saveSponsorsOrder" 
              :disabled="isSavingOrder"
              class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-widest disabled:opacity-50"
            >
              {{ isSavingOrder ? 'Saving...' : '💾 Save Order' }}
            </button>
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
        
        <!-- INLINE SPONSOR FORM (replaces list when editing) -->
        <div v-if="showAddSponsor" class="glass-card rounded-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-black text-white uppercase">{{ editingSponsorId ? 'Edit Sponsor' : 'Add New Sponsor' }}</h3>
            <button @click="closeAddSponsor" class="text-slate-400 hover:text-white text-sm uppercase tracking-widest font-bold">← Back to List</button>
          </div>
          
          <form @submit.prevent="submitNewSponsor" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Business Name -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Business Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="sponsorForm.business_name"
                type="text"
                required
                placeholder="e.g. Acme SaaS"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              >
            </div>

            <!-- Website URL -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Website URL <span class="text-red-500">*</span>
              </label>
              <input
                v-model="sponsorForm.website_url"
                type="url"
                required
                placeholder="https://yourwebsite.com"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              >
            </div>

            <!-- Logo URL -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Logo URL (Optional)
              </label>
              <input
                v-model="sponsorForm.logo_url"
                type="url"
                placeholder="https://yourwebsite.com/logo.png"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              >
            </div>

            <!-- Status -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Status
              </label>
              <select
                v-model="sponsorForm.status"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            <!-- Tagline (full width) -->
            <div class="space-y-2 md:col-span-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Tagline (Optional)
              </label>
              <input
                v-model="sponsorForm.tagline"
                type="text"
                maxlength="80"
                placeholder="Short catchy phrase (max 80 chars)"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              >
              <p class="text-xs text-slate-500">{{ sponsorForm.tagline.length }}/80 characters</p>
            </div>

            <!-- Description (full width) -->
            <div class="space-y-2 md:col-span-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Description (Optional)
              </label>
              <textarea
                v-model="sponsorForm.description"
                rows="3"
                maxlength="500"
                placeholder="Describe the business..."
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600 resize-none"
              ></textarea>
              <p class="text-xs text-slate-500">{{ sponsorForm.description.length }}/500 characters</p>
            </div>

            <!-- Keywords -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Keywords (Optional)
              </label>
              <input
                v-model="sponsorForm.keywords"
                type="text"
                placeholder="saas, productivity (comma separated)"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              >
            </div>

            <!-- Contact Email -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Contact Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="sponsorForm.contact_email"
                type="email"
                required
                placeholder="contact@company.com"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              >
            </div>

            <!-- Contact Name -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Contact Name (Optional)
              </label>
              <input
                v-model="sponsorForm.contact_name"
                type="text"
                placeholder="John Doe"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              >
            </div>

            <!-- Buttons (full width) -->
            <div class="flex gap-3 pt-4 md:col-span-2">
              <button type="button" @click="closeAddSponsor" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" :disabled="isSavingSponsor" class="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
                {{ isSavingSponsor ? 'Saving...' : (editingSponsorId ? 'Update Sponsor' : 'Add Sponsor') }}
              </button>
            </div>
          </form>
        </div>
        
        <!-- SPONSOR LIST (only show when not editing) -->
        <div v-else class="space-y-2">
          <div v-for="(sponsor, index) in activeSponsors" :key="sponsor.id" class="glass-card rounded-xl p-4 flex items-center justify-between">
            <!-- Left: Position + Up/Down buttons -->
            <div class="flex items-center gap-3">
              <div class="flex flex-col gap-1">
                <button 
                  @click="moveSponsorUp(index)" 
                  :disabled="index === 0"
                  class="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm px-1"
                  title="Move up"
                >↑</button>
                <button 
                  @click="moveSponsorDown(index)" 
                  :disabled="index === activeSponsors.length - 1"
                  class="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm px-1"
                  title="Move down"
                >↓</button>
              </div>
              <span class="text-slate-500 font-mono text-xs w-6">#{{ index + 1 }}</span>
              <div>
                <div class="font-bold text-white">{{ sponsor.business_name || sponsor.startup_name }}</div>
                <div class="text-xs text-slate-400">{{ sponsor.website_url }}</div>
                <div class="text-xs text-green-400">{{ sponsor.status }}</div>
              </div>
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

        <!-- Header (hide when editing) -->
        <div v-if="!showArticleEditor" class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-white">Manage Blog Articles</h2>
          <button @click="openArticleEditor(null)" class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest">
            + New Article
          </button>
        </div>
        
        <!-- INLINE ARTICLE FORM (replaces list when editing) -->
        <div v-if="showArticleEditor" class="glass-card rounded-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-black text-white uppercase">{{ editingArticle ? 'Edit Article' : 'New Article' }}</h3>
            <button @click="showArticleEditor = false" class="text-slate-400 hover:text-white text-sm uppercase tracking-widest font-bold">← Back to List</button>
          </div>
          
          <form @submit.prevent="saveArticle" class="space-y-4">
            <!-- Title & Slug Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Title <span class="text-red-500">*</span></label>
                <input v-model="articleForm.title" type="text" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Article title...">
              </div>
              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">URL Slug <span class="text-red-500">*</span></label>
                <input v-model="articleForm.slug" type="text" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="article-url-slug">
                <p class="text-xs text-slate-500">/news/{{ articleForm.slug || 'article-slug' }}</p>
              </div>
            </div>

            <!-- Category, Status & Author Row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div class="space-y-2">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Author</label>
                <input v-model="articleForm.author" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Author name...">
              </div>
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
        
        <!-- Article List (hide when editing) -->
        <div v-else class="space-y-2">
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
import allStartups from '~/content/startups.json' // Keep startups local for now until migrated
// deleted static imports for sponsors/articles

// Supabase Client
// Supabase Client
const supabase = useSupabaseClient()
// const user = useSupabaseUser() // Disable Supabase auth check for now, using SessionStorage

// Local State (initially empty, fetched from DB)
const sponsors = ref<any[]>([])
const articles = ref<any[]>([])

const isAuthenticated = ref(false)

onMounted(() => {
  if (typeof window !== 'undefined' && sessionStorage.getItem('saasbizz-admin-auth') === 'authenticated') {
    isAuthenticated.value = true
  }
})
// ... rest of state ...
const activeTab = ref('blog')
const startupSearch = ref('')
const statusMessage = ref('')
const showAddStartup = ref(false)
const showAddSponsor = ref(false)
const openMenuId = ref<string | null>(null)

// Advertising soldout state
const advertisingSoldout = ref(false)
const isSavingSettings = ref(false)

// Load Data from Supabase
async function loadSponsors() {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (data) {
    sponsors.value = data
  }
}

async function loadArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (data) {
    articles.value = data
  }
}

// Settings loading (from DB "settings" table)
async function loadSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'advertising_soldout')
    .single()
    
  if (data?.value) {
    advertisingSoldout.value = data.value.advertising_soldout
  }
}

// Initial Load
onMounted(() => {
  if (user.value) {
    loadSponsors()
    loadArticles()
    loadSettings()
  }
})

// Toggle Soldout (Save to DB)
async function toggleSoldout() {
  isSavingSettings.value = true
  const newValue = !advertisingSoldout.value
  
  try {
    const { error } = await supabase
      .from('settings')
      .upsert({ 
        key: 'advertising_soldout', 
        value: { advertising_soldout: newValue } 
      })
    
    if (!error) {
      advertisingSoldout.value = newValue
      statusMessage.value = newValue 
        ? 'Advertising marked as SOLD OUT.' 
        : 'Advertising is now AVAILABLE.'
      setTimeout(() => { statusMessage.value = '' }, 3000)
    } else {
      throw error
    }
  } catch (e) {
    console.error('Failed to toggle soldout:', e)
    statusMessage.value = 'Error updating settings.'
  } finally {
    isSavingSettings.value = false
  }
}

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

// Sponsor form state
const isSavingSponsor = ref(false)
const isSavingOrder = ref(false)
const originalSponsorOrder = ref<number[]>([])
const editingSponsorId = ref<number | null>(null)
const sponsorForm = ref({
  business_name: '',
  website_url: '',
  logo_url: '',
  tagline: '',
  description: '',
  keywords: '',
  contact_email: '',
  contact_name: '',
  status: 'active'
})

function resetSponsorForm() {
  sponsorForm.value = {
    business_name: '',
    website_url: '',
    logo_url: '',
    tagline: '',
    description: '',
    keywords: '',
    contact_email: '',
    contact_name: '',
    status: 'active'
  }
  editingSponsorId.value = null
}

function closeAddSponsor() {
  showAddSponsor.value = false
  resetSponsorForm()
  // Ensure we stay on sponsors tab
  activeTab.value = 'sponsors'
}

function editSponsor(sponsor: any) {
  // Load sponsor data into form
  editingSponsorId.value = sponsor.id
  sponsorForm.value = {
    business_name: sponsor.business_name || sponsor.startup_name || '',
    website_url: sponsor.website_url || '',
    logo_url: sponsor.logo_url || '',
    tagline: sponsor.tagline || '',
    description: sponsor.description || '',
    keywords: sponsor.keywords || sponsor.category || '',
    contact_email: sponsor.contact_email || '',
    contact_name: sponsor.contact_name || '',
    status: sponsor.status === 9 ? 'paused' : (sponsor.status || 'active')
  }
  showAddSponsor.value = true
}

async function submitNewSponsor() {
  isSavingSponsor.value = true
  
  try {
    if (editingSponsorId.value) {
      // Edit mode - update existing sponsor
      const index = sponsors.value.findIndex(s => s.id === editingSponsorId.value)
      if (index !== -1) {
        sponsors.value[index] = {
          ...sponsors.value[index],
          ...sponsorForm.value,
          business_name: sponsorForm.value.business_name
        }
      }
      statusMessage.value = `Sponsor "${sponsorForm.value.business_name}" updated successfully!`
    } else {
      // Add mode - create new sponsor
      const newSponsor = {
        id: Date.now(),
        created_at: new Date().toISOString(),
        ...sponsorForm.value,
        mrr: 'Pending'
      }
      sponsors.value.push(newSponsor)
      statusMessage.value = `Sponsor "${sponsorForm.value.business_name}" added successfully!`
    }
    
    // Save to JSON file via API
    const response = await fetch('/api/save-sponsors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sponsors.value)
    })
    
    if (!response.ok) throw new Error('Failed to save sponsor')
    
    setTimeout(() => { statusMessage.value = '' }, 3000)
    closeAddSponsor()
  } catch (error) {
    console.error('Error saving sponsor:', error)
    statusMessage.value = 'Error saving sponsor. Please try again.'
    setTimeout(() => { statusMessage.value = '' }, 3000)
  } finally {
    isSavingSponsor.value = false
  }
}

// Sponsor ordering functions
const hasOrderChanged = computed(() => {
  if (originalSponsorOrder.value.length === 0) return false
  const currentOrder = sponsors.value.filter(s => s.status !== 9).map(s => s.id)
  return JSON.stringify(currentOrder) !== JSON.stringify(originalSponsorOrder.value)
})

function moveSponsorUp(index: number) {
  const active = sponsors.value.filter(s => s.status !== 9)
  if (index <= 0 || index >= active.length) return
  
  // Find actual indices in the full sponsors array
  const currentSponsor = active[index]
  const prevSponsor = active[index - 1]
  const currentIdx = sponsors.value.findIndex(s => s.id === currentSponsor.id)
  const prevIdx = sponsors.value.findIndex(s => s.id === prevSponsor.id)
  
  // Swap
  const temp = sponsors.value[currentIdx]
  sponsors.value[currentIdx] = sponsors.value[prevIdx]
  sponsors.value[prevIdx] = temp
}

function moveSponsorDown(index: number) {
  const active = sponsors.value.filter(s => s.status !== 9)
  if (index < 0 || index >= active.length - 1) return
  
  // Find actual indices in the full sponsors array
  const currentSponsor = active[index]
  const nextSponsor = active[index + 1]
  const currentIdx = sponsors.value.findIndex(s => s.id === currentSponsor.id)
  const nextIdx = sponsors.value.findIndex(s => s.id === nextSponsor.id)
  
  // Swap
  const temp = sponsors.value[currentIdx]
  sponsors.value[currentIdx] = sponsors.value[nextIdx]
  sponsors.value[nextIdx] = temp
}

async function saveSponsorsOrder() {
  isSavingOrder.value = true
  try {
    const response = await fetch('/api/save-sponsors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sponsors.value)
    })
    
    if (!response.ok) throw new Error('Failed to save order')
    
    // Update original order to reflect saved state
    originalSponsorOrder.value = sponsors.value.filter(s => s.status !== 9).map(s => s.id)
    statusMessage.value = 'Sponsor order saved successfully!'
    setTimeout(() => { statusMessage.value = '' }, 3000)
  } catch (error) {
    console.error('Error saving sponsor order:', error)
    statusMessage.value = 'Error saving order. Please try again.'
    setTimeout(() => { statusMessage.value = '' }, 3000)
  } finally {
    isSavingOrder.value = false
  }
}

const startups = ref<any[]>([...allStartups])
// const sponsors and articles removed (already declared above)
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
  
  // Load settings (soldout status)
  await loadSettings()
  
  try {
    const adverts = await import('~/content/toreview_advert.json')
    pendingAdverts.value = adverts.default
  } catch (e) {
    pendingAdverts.value = []
  }
  
  // Store original sponsor order for change detection
  originalSponsorOrder.value = sponsors.value.filter(s => s.status !== 9).map(s => s.id)

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

// Sponsor Export/Import functions
const SPONSOR_FIELDS = ['id', 'created_at', 'business_name', 'website_url', 'logo_url', 'tagline', 'description', 'keywords', 'contact_email', 'contact_name', 'status']

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

async function importSponsors(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = async (e) => {
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
      
      // Add imported sponsors with new IDs (handle both business_name and startup_name)
      let addedCount = 0
      imported.forEach(s => {
        const name = s.business_name || s.startup_name
        if (name) {
          sponsors.value.push({
            ...s,
            id: s.id || (Date.now() + addedCount),
            business_name: name,
            created_at: s.created_at || new Date().toISOString(),
            status: s.status || 'active'
          })
          addedCount++
        }
      })
      
      // Save to sponsors.json via API
      try {
        const response = await fetch('/api/save-sponsors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sponsors.value)
        })
        
        if (!response.ok) throw new Error('Failed to save')
        showStatus(`Imported and saved ${addedCount} sponsors`)
      } catch (saveErr) {
        console.error('Error saving sponsors:', saveErr)
        showStatus(`Imported ${addedCount} sponsors (not saved to file - error)`)
      }
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

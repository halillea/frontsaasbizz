export interface Startup {
  id: number
  fetched_at: string | null
  category: string | null
  trustmrr_link: string | null
  startup_name: string | null
  tagline: string | null
  total_revenue: number | null
  mrr: number | null
  founded_date: string | null
  last_4_weeks_revenue: number | null
  total_revenue_precise: number | null
  mrr_precise: number | null
  last_30_days_revenue: number | null
  active_subscriptions: number | null
  mom_growth: number | null
  x_follower_count: number | null
  founder_total_revenue_agg: number | null
  founder_image_local_path: string | null
  logo_url: string | null
  founder_name: string | null
  location: string | null
  full_description: string | null
  funding_status: string | null
  founder_social: string | null
  status: number | null
  verification_source: number | null
  domain: string | null
  subscriptions: number | null
  is_published: boolean
  trustmrr_founder: string | null

  // Legacy/Computed fields (Not in DB schema)
  created_at?: string // Likely administrative
  trustmrr_profile_url?: string // Not in DB
  country?: string | null // Not in DB
  website_url?: string | null // Deprecated
}

export interface Ad {
  id: number
  name: string
  emoji: string
  copy: string
  bg: string
  href?: string
}

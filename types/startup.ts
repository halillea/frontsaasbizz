export interface Startup {
  id: number
  created_at: string
  category: string | null
  trustmrr_profile_url: string
  startup_name: string
  tagline: string | null
  total_revenue: string | null
  mrr: string | null
  founded_date: string | null
  last_4_weeks_revenue: string | null
  website_url: string | null
  total_revenue_precise: number | null
  mrr_precise: number | null
  last_30_days_revenue: number | null
  active_subscriptions: number | null
  mom_growth: string | null
  x_follower_count: number | null
  founder_total_revenue_agg: number | null
  founder_image_local_path: string | null
  logo_url: string | null
  founder_name: string | null
  location: string | null
  full_description: string | null
  funding_status: string | null
  founder_social: string | null
  status: number
  verification_source: number | null
  domain: string | null
  subscriptions: number | null
  country?: string | null
}

export interface Ad {
  id: number
  name: string
  emoji: string
  copy: string
  bg: string
  href?: string
}

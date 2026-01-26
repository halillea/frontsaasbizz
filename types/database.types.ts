export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            sponsors: {
                Row: {
                    id: number
                    created_at: string
                    business_name: string
                    website_url: string
                    logo_url: string | null
                    tagline: string | null
                    description: string | null
                    keywords: string | null
                    contact_email: string | null
                    contact_name: string | null
                    status: string | null
                    mrr: string | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    business_name: string
                    website_url: string
                    logo_url?: string | null
                    tagline?: string | null
                    description?: string | null
                    keywords?: string | null
                    contact_email?: string | null
                    contact_name?: string | null
                    status?: string | null
                    mrr?: string | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    business_name?: string
                    website_url?: string
                    logo_url?: string | null
                    tagline?: string | null
                    description?: string | null
                    keywords?: string | null
                    contact_email?: string | null
                    contact_name?: string | null
                    status?: string | null
                    mrr?: string | null
                }
            }
            settings: {
                Row: {
                    key: string
                    value: Json
                }
                Insert: {
                    key: string
                    value: Json
                }
                Update: {
                    key?: string
                    value?: Json
                }
            }
        }
    }
}

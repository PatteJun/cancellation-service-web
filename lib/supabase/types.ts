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
      providers: {
        Row: {
          id: string
          created_at: string
          name: string
          street: string
          address_line_2: string | null
          city: string
          state: string
          postal_code: string
          country: string
          cancellation_steps: string[] | null
          issues: string[] | null
          faqs: Json | null
          required_information: Json | null
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          icon_name: string | null
        }
      }
      provider_categories: {
        Row: {
          provider_id: string
          category_id: string
        }
      }
      missing_providers: {
        Row: {
          id: string
          search_query: string
          created_at: string
          count: number
          notify_emails: string[]
        }
      }
    }
  }
}
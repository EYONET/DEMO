export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      faq_nodes: {
        Row: {
          created_at: string
          id: string
          is_root: boolean
          prompt: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_root?: boolean
          prompt: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_root?: boolean
          prompt?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      faq_options: {
        Row: {
          action: Database["public"]["Enums"]["faq_action"] | null
          answer: string
          created_at: string
          id: string
          label: string
          next_node_id: string | null
          node_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          action?: Database["public"]["Enums"]["faq_action"] | null
          answer: string
          created_at?: string
          id?: string
          label: string
          next_node_id?: string | null
          node_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          action?: Database["public"]["Enums"]["faq_action"] | null
          answer?: string
          created_at?: string
          id?: string
          label?: string
          next_node_id?: string | null
          node_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "faq_options_next_node_id_fkey"
            columns: ["next_node_id"]
            isOneToOne: false
            referencedRelation: "faq_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faq_options_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "faq_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_before_after_pairs: {
        Row: {
          after_image_alt: string
          after_image_path: string
          before_image_alt: string
          before_image_path: string
          caption: string
          created_at: string
          id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          after_image_alt: string
          after_image_path: string
          before_image_alt: string
          before_image_path: string
          caption: string
          created_at?: string
          id?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          after_image_alt?: string
          after_image_path?: string
          before_image_alt?: string
          before_image_path?: string
          caption?: string
          created_at?: string
          id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      homepage_gallery_images: {
        Row: {
          caption: string
          created_at: string
          id: string
          image_alt: string
          image_path: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          caption: string
          created_at?: string
          id?: string
          image_alt: string
          image_path: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          caption?: string
          created_at?: string
          id?: string
          image_alt?: string
          image_path?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          city: string | null
          created_at: string
          customer_name: string
          email: string
          id: string
          message: string | null
          phone: string | null
          postal_code: string | null
          preferred_date: string | null
          privacy_notice_version: string
          property_type: string | null
          service_id: string | null
          service_slug_snapshot: string | null
          size_or_room_count: string | null
          staff_notes: string | null
          state: string | null
          status: Database["public"]["Enums"]["inquiry_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          customer_name: string
          email: string
          id?: string
          message?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_date?: string | null
          privacy_notice_version: string
          property_type?: string | null
          service_id?: string | null
          service_slug_snapshot?: string | null
          size_or_room_count?: string | null
          staff_notes?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          customer_name?: string
          email?: string
          id?: string
          message?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_date?: string | null
          privacy_notice_version?: string
          property_type?: string | null
          service_id?: string | null
          service_slug_snapshot?: string | null
          size_or_room_count?: string | null
          staff_notes?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiry_events: {
        Row: {
          actor_id: string | null
          created_at: string
          event_type: string
          id: string
          inquiry_id: string
          new_status: Database["public"]["Enums"]["inquiry_status"] | null
          old_status: Database["public"]["Enums"]["inquiry_status"] | null
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          inquiry_id: string
          new_status?: Database["public"]["Enums"]["inquiry_status"] | null
          old_status?: Database["public"]["Enums"]["inquiry_status"] | null
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          inquiry_id?: string
          new_status?: Database["public"]["Enums"]["inquiry_status"] | null
          old_status?: Database["public"]["Enums"]["inquiry_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_events_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      page_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          route: string
          section_key: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          route: string
          section_key: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          route?: string
          section_key?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      service_areas: {
        Row: {
          city: string
          created_at: string
          id: string
          is_active: boolean
          map_url: string | null
          postal_codes: string[]
          sort_order: number
          state: string
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          is_active?: boolean
          map_url?: string | null
          postal_codes?: string[]
          sort_order?: number
          state: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          is_active?: boolean
          map_url?: string | null
          postal_codes?: string[]
          sort_order?: number
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: Database["public"]["Enums"]["service_category"]
          created_at: string
          description: string
          exclusions: Json
          id: string
          image_alt: string | null
          image_path: string | null
          inclusions: Json
          pricing_display: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["service_category"]
          created_at?: string
          description: string
          exclusions?: Json
          id?: string
          image_alt?: string | null
          image_path?: string | null
          inclusions?: Json
          pricing_display?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["service_category"]
          created_at?: string
          description?: string
          exclusions?: Json
          id?: string
          image_alt?: string | null
          image_path?: string | null
          inclusions?: Json
          pricing_display?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          is_public: boolean
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          is_public?: boolean
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          is_public?: boolean
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      staff_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["staff_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          role: Database["public"]["Enums"]["staff_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["staff_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_status: "draft" | "published" | "archived"
      faq_action: "quote" | "contact" | "end"
      inquiry_status: "new" | "contacted" | "quoted" | "scheduled" | "closed"
      service_category:
        | "residential"
        | "commercial"
        | "deep"
        | "move_in"
        | "car_detailing"
        | "carpet_cleaning"
        | "upholstery_cleaning"
        | "move_in_move_out"
        | "residential_deep"
        | "post_construction"
        | "light_cleaning"
        | "deep_cleaning"
      staff_role: "admin" | "content_editor" | "inquiry_manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      content_status: ["draft", "published", "archived"],
      faq_action: ["quote", "contact", "end"],
      inquiry_status: ["new", "contacted", "quoted", "scheduled", "closed"],
      service_category: [
        "residential",
        "commercial",
        "deep",
        "move_in",
        "car_detailing",
        "carpet_cleaning",
        "upholstery_cleaning",
        "move_in_move_out",
        "residential_deep",
        "post_construction",
        "light_cleaning",
        "deep_cleaning",
      ],
      staff_role: ["admin", "content_editor", "inquiry_manager"],
    },
  },
} as const

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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      elanlar: {
        Row: {
          aktivdir: boolean
          baslq: string
          enlik: number | null
          ev_sahibi: string
          id: string
          imkanlar: string[]
          metr: number
          qiymet: number
          qonaq: number
          rayon: string
          region: string
          region_slug: string
          rey_sayi: number
          reyting: number
          sahib_id: string | null
          sekiller: string[]
          slug: string
          tesvir: string
          tip: string
          uzunluq: number | null
          xidmetler: string[]
          yaradilma_tarixi: string
          yatag: number
          yenilenme_tarixi: string
        }
        Insert: {
          aktivdir?: boolean
          baslq: string
          enlik?: number | null
          ev_sahibi?: string
          id?: string
          imkanlar?: string[]
          metr?: number
          qiymet?: number
          qonaq?: number
          rayon: string
          region: string
          region_slug: string
          rey_sayi?: number
          reyting?: number
          sahib_id?: string | null
          sekiller?: string[]
          slug: string
          tesvir?: string
          tip?: string
          uzunluq?: number | null
          xidmetler?: string[]
          yaradilma_tarixi?: string
          yatag?: number
          yenilenme_tarixi?: string
        }
        Update: {
          aktivdir?: boolean
          baslq?: string
          enlik?: number | null
          ev_sahibi?: string
          id?: string
          imkanlar?: string[]
          metr?: number
          qiymet?: number
          qonaq?: number
          rayon?: string
          region?: string
          region_slug?: string
          rey_sayi?: number
          reyting?: number
          sahib_id?: string | null
          sekiller?: string[]
          slug?: string
          tesvir?: string
          tip?: string
          uzunluq?: number | null
          xidmetler?: string[]
          yaradilma_tarixi?: string
          yatag?: number
          yenilenme_tarixi?: string
        }
        Relationships: []
      }
      ev_sahibi_muracietleri: {
        Row: {
          bolge: string
          elaqe_telefon: string
          ev_adi: string
          id: string
          istifadeci_id: string
          qiymet: number
          rayon: string
          status: string
          tesvir: string
          tip: string
          yaradilma_tarixi: string
        }
        Insert: {
          bolge: string
          elaqe_telefon?: string
          ev_adi: string
          id?: string
          istifadeci_id: string
          qiymet?: number
          rayon?: string
          status?: string
          tesvir?: string
          tip?: string
          yaradilma_tarixi?: string
        }
        Update: {
          bolge?: string
          elaqe_telefon?: string
          ev_adi?: string
          id?: string
          istifadeci_id?: string
          qiymet?: number
          rayon?: string
          status?: string
          tesvir?: string
          tip?: string
          yaradilma_tarixi?: string
        }
        Relationships: []
      }
      hekayeler: {
        Row: {
          ad_soyad: string
          dil: string
          id: string
          istifadeci_id: string | null
          metn: string
          seher: string
          yaradilma_tarixi: string
        }
        Insert: {
          ad_soyad?: string
          dil?: string
          id?: string
          istifadeci_id?: string | null
          metn?: string
          seher?: string
          yaradilma_tarixi?: string
        }
        Update: {
          ad_soyad?: string
          dil?: string
          id?: string
          istifadeci_id?: string | null
          metn?: string
          seher?: string
          yaradilma_tarixi?: string
        }
        Relationships: []
      }
      profiller: {
        Row: {
          ad_soyad: string
          email: string
          id: string
          istifadeci_id: string
          yaradilma_tarixi: string
          yenilenme_tarixi: string
        }
        Insert: {
          ad_soyad?: string
          email?: string
          id?: string
          istifadeci_id: string
          yaradilma_tarixi?: string
          yenilenme_tarixi?: string
        }
        Update: {
          ad_soyad?: string
          email?: string
          id?: string
          istifadeci_id?: string
          yaradilma_tarixi?: string
          yenilenme_tarixi?: string
        }
        Relationships: []
      }
      regionlar: {
        Row: {
          ad: string
          id: string
          merkez_x: number
          merkez_y: number
          qisa_tesvir: string
          sira: number
          slug: string
          svg_path: string
          yaradilma_tarixi: string
        }
        Insert: {
          ad: string
          id?: string
          merkez_x?: number
          merkez_y?: number
          qisa_tesvir?: string
          sira?: number
          slug: string
          svg_path?: string
          yaradilma_tarixi?: string
        }
        Update: {
          ad?: string
          id?: string
          merkez_x?: number
          merkez_y?: number
          qisa_tesvir?: string
          sira?: number
          slug?: string
          svg_path?: string
          yaradilma_tarixi?: string
        }
        Relationships: []
      }
      reyler: {
        Row: {
          ad_soyad: string
          elan_id: string
          id: string
          istifadeci_id: string | null
          metn: string
          ulduz: number
          yaradilma_tarixi: string
        }
        Insert: {
          ad_soyad?: string
          elan_id: string
          id?: string
          istifadeci_id?: string | null
          metn?: string
          ulduz?: number
          yaradilma_tarixi?: string
        }
        Update: {
          ad_soyad?: string
          elan_id?: string
          id?: string
          istifadeci_id?: string | null
          metn?: string
          ulduz?: number
          yaradilma_tarixi?: string
        }
        Relationships: [
          {
            foreignKeyName: "reyler_elan_id_fkey"
            columns: ["elan_id"]
            isOneToOne: false
            referencedRelation: "elanlar"
            referencedColumns: ["id"]
          },
        ]
      }
      sevimliler: {
        Row: {
          elan_id: string
          id: string
          istifadeci_id: string
          yaradilma_tarixi: string
        }
        Insert: {
          elan_id: string
          id?: string
          istifadeci_id: string
          yaradilma_tarixi?: string
        }
        Update: {
          elan_id?: string
          id?: string
          istifadeci_id?: string
          yaradilma_tarixi?: string
        }
        Relationships: [
          {
            foreignKeyName: "sevimliler_elan_id_fkey"
            columns: ["elan_id"]
            isOneToOne: false
            referencedRelation: "elanlar"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// Supabase client-in mərkəzi re-eksportu.
// Faktiki client `src/integrations/supabase/client.ts` fayldan gəlir
// (Lovable Cloud tərəfindən avtomatik yaradılır və redaktə edilməməlidir).
// Bütün frontend kodu bu modulu import etsin: @/backend/supabase
export { supabase } from "@/integrations/supabase/client";
export type { Database } from "@/integrations/supabase/types";

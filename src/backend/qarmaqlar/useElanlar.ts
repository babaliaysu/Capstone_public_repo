// Elanlar üçün Supabase qarmağı.
// Bütün elanları və ya region slug üzrə filtrlənmişləri gətirir.
// Şəkil sahəsi DB-də açar (məs: "home1") saxlanılır;
// frontend onu local asset URL-inə çevirir.

import { useEffect, useState } from "react";
import { supabase } from "@/backend/supabase";
import home1 from "@/frontend/medialar/evler/home1.jpg";
import home2 from "@/frontend/medialar/evler/home2.jpg";
import home3 from "@/frontend/medialar/evler/home3.jpg";
import home4 from "@/frontend/medialar/evler/home4.jpg";
import home5 from "@/frontend/medialar/evler/home5.jpg";
import home6 from "@/frontend/medialar/evler/home6.jpg";

const SEKIL_XERITESI: Record<string, string> = {
  home1, home2, home3, home4, home5, home6,
};

export function sekilHelli(acar: string): string {
  // Əgər DB-dəki dəyər tam URL-dirsə (storage-dan), olduğu kimi qaytar.
  if (acar.startsWith("http") || acar.startsWith("/")) return acar;
  return SEKIL_XERITESI[acar] ?? home1;
}

export type Elan = {
  id: string;
  slug: string;
  baslq: string;
  tesvir: string;
  region: string;
  rayon: string;
  region_slug: string;
  tip: string;
  qiymet: number;
  reyting: number;
  rey_sayi: number;
  qonaq: number;
  yatag: number;
  metr: number;
  xidmetler: string[];
  imkanlar: string[];
  sekiller: string[]; // həll edilmiş URL-lər
  enlik: number | null;
  uzunluq: number | null;
  ev_sahibi: string;
  yaradilma_tarixi: string;
};

function normallasdir(row: any): Elan {
  return {
    ...row,
    qiymet: Number(row.qiymet),
    reyting: Number(row.reyting),
    enlik: row.enlik ? Number(row.enlik) : null,
    uzunluq: row.uzunluq ? Number(row.uzunluq) : null,
    sekiller: (row.sekiller ?? []).map(sekilHelli),
  };
}

export function useElanlar(regionSlug?: string) {
  const [elanlar, setElanlar] = useState<Elan[]>([]);
  const [yuklenir, setYuklenir] = useState(true);
  const [xeta, setXeta] = useState<string | null>(null);

  useEffect(() => {
    let aktiv = true;
    setYuklenir(true);
    (async () => {
      let q = supabase.from("elanlar").select("*").eq("aktivdir", true);
      if (regionSlug) q = q.eq("region_slug", regionSlug);
      const { data, error } = await q.order("reyting", { ascending: false });
      if (!aktiv) return;
      if (error) setXeta(error.message);
      else setElanlar((data ?? []).map(normallasdir));
      setYuklenir(false);
    })();
    return () => { aktiv = false; };
  }, [regionSlug]);

  return { elanlar, yuklenir, xeta };
}

export function useElan(slug: string | undefined) {
  const [elan, setElan] = useState<Elan | null>(null);
  const [yuklenir, setYuklenir] = useState(true);

  useEffect(() => {
    if (!slug) { setYuklenir(false); return; }
    let aktiv = true;
    setYuklenir(true);
    (async () => {
      const { data } = await supabase
        .from("elanlar").select("*").eq("slug", slug).maybeSingle();
      if (!aktiv) return;
      setElan(data ? normallasdir(data) : null);
      setYuklenir(false);
    })();
    return () => { aktiv = false; };
  }, [slug]);

  return { elan, yuklenir };
}

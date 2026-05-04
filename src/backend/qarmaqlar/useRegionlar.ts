// Regionlar üçün Supabase qarmağı.
import { useEffect, useState } from "react";
import { supabase } from "@/backend/supabase";

export type RegionXerite = {
  id: string;
  slug: string;
  ad: string;
  qisa_tesvir: string;
  svg_path: string;
  merkez_x: number;
  merkez_y: number;
};

export function useRegionlar() {
  const [regionlar, setRegionlar] = useState<RegionXerite[]>([]);
  const [yuklenir, setYuklenir] = useState(true);

  useEffect(() => {
    let aktiv = true;
    (async () => {
      const { data } = await supabase
        .from("regionlar").select("*").order("sira");
      if (aktiv) {
        setRegionlar((data ?? []) as RegionXerite[]);
        setYuklenir(false);
      }
    })();
    return () => { aktiv = false; };
  }, []);

  return { regionlar, yuklenir };
}

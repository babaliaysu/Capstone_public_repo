// Sevimlilər üçün Supabase qarmağı.
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/backend/supabase";
import { useSessiya } from "./useSessiya";

export function useSevimliler() {
  const { istifadeci } = useSessiya();
  const [idler, setIdler] = useState<Set<string>>(new Set());
  const [yuklenir, setYuklenir] = useState(true);

  const yenile = useCallback(async () => {
    if (!istifadeci) { setIdler(new Set()); setYuklenir(false); return; }
    const { data } = await supabase
      .from("sevimliler").select("elan_id").eq("istifadeci_id", istifadeci.id);
    setIdler(new Set((data ?? []).map((d: any) => d.elan_id)));
    setYuklenir(false);
  }, [istifadeci?.id]);

  useEffect(() => { yenile(); }, [yenile]);

  const elaveEt = async (elanId: string) => {
    if (!istifadeci) return false;
    await supabase.from("sevimliler")
      .insert({ istifadeci_id: istifadeci.id, elan_id: elanId });
    setIdler((s) => new Set(s).add(elanId));
    return true;
  };

  const cixar = async (elanId: string) => {
    if (!istifadeci) return false;
    await supabase.from("sevimliler").delete()
      .eq("istifadeci_id", istifadeci.id).eq("elan_id", elanId);
    setIdler((s) => { const n = new Set(s); n.delete(elanId); return n; });
    return true;
  };

  const dey = async (elanId: string) => {
    if (idler.has(elanId)) return cixar(elanId);
    return elaveEt(elanId);
  };

  return { idler, yuklenir, elaveEt, cixar, dey, yenile };
}

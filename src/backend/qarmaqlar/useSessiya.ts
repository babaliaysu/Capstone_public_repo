// Sessiya və profil üçün React qarmağı.
// Auth state-ini izləyir, profil cədvəlindən ad-soyadı çəkir.

import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/backend/supabase";

export type Profil = {
  id: string;
  istifadeci_id: string;
  ad_soyad: string;
  email: string;
};

export function useSessiya() {
  const [sessiya, setSessiya] = useState<Session | null>(null);
  const [istifadeci, setIstifadeci] = useState<User | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [yuklenir, setYuklenir] = useState(true);

  useEffect(() => {
    // Vacib qayda: əvvəlcə listener qoyulur, sonra mövcud sessiya yoxlanılır.
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSessiya(s);
      setIstifadeci(s?.user ?? null);
      if (!s?.user) setProfil(null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessiya(session);
      setIstifadeci(session?.user ?? null);
      setYuklenir(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // İstifadəçi dəyişdikdə profili yenidən çək.
  useEffect(() => {
    if (!istifadeci) return;
    let aktiv = true;
    (async () => {
      const { data } = await supabase
        .from("profiller")
        .select("id, istifadeci_id, ad_soyad, email")
        .eq("istifadeci_id", istifadeci.id)
        .maybeSingle();
      if (aktiv) setProfil(data as Profil | null);
    })();
    return () => {
      aktiv = false;
    };
  }, [istifadeci?.id]);

  return { sessiya, istifadeci, profil, yuklenir, setProfil };
}

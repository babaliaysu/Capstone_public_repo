// Hekayələr — Supabase hekayeler cədvəlindən oxuyur.

import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { supabase } from "@/backend/supabase";
import home1 from "@/frontend/medialar/evler/home1.jpg";
import home4 from "@/frontend/medialar/evler/home4.jpg";
import home6 from "@/frontend/medialar/evler/home6.jpg";

const FON_SEKILLERI = [home1, home4, home6];

type Hekaye = {
  id: string;
  ad_soyad: string;
  seher: string;
  metn: string;
  dil: string;
};

const Hekayeler = () => {
  const [hekayeler, setHekayeler] = useState<Hekaye[]>([]);

  useEffect(() => {
    supabase
      .from("hekayeler")
      .select("*")
      .order("yaradilma_tarixi", { ascending: false })
      .then(({ data }) => setHekayeler((data ?? []) as Hekaye[]));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
              Hekayələr
            </h1>
            <p className="text-muted-foreground mt-2">
              Kəndim qonaqlarının paylaşdığı təcrübələr
            </p>
          </div>
          {hekayeler.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">Hələlik hekayə yoxdur.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hekayeler.map((h, i) => (
                <article key={h.id} className="bg-card rounded-2xl overflow-hidden ring-1 ring-border shadow-soft hover:shadow-elegant transition-all duration-500 group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={FON_SEKILLERI[i % FON_SEKILLERI.length]}
                      alt={h.ad_soyad}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {h.ad_soyad}
                    </h2>
                    <p className="text-xs text-muted-foreground">{h.seher}</p>
                    <p className="text-sm text-foreground/80 mt-3 line-clamp-4 italic">"{h.metn}"</p>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/" className="text-primary underline text-sm">
              Ana səhifəyə qayıt
            </Link>
          </div>
        </div>
      </main>
      <AltPanel />
    </div>
  );
};

export default Hekayeler;

// Sevimlilər səhifəsi — istifadəçinin əlavə etdiyi elanlar.

import { Link } from "react-router-dom";
import { Heart, MapPin, Star, X } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";
import { useElanlar } from "@/backend/qarmaqlar/useElanlar";
import { useSevimliler } from "@/backend/qarmaqlar/useSevimliler";
import { useSessiya } from "@/backend/qarmaqlar/useSessiya";

const Sevimliler = () => {
  const { istifadeci } = useSessiya();
  const { elanlar } = useElanlar();
  const { idler, cixar } = useSevimliler();

  const sevimli = elanlar.filter((e) => idler.has(e.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Heart className="h-8 w-8 text-destructive mx-auto mb-3 fill-destructive/20" />
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
              Sevimlilər
            </h1>
            <p className="text-muted-foreground mt-2">
              Saxladığın evlərə bir kliklə qayıt
            </p>
          </div>

          {!istifadeci ? (
            <div className="text-center py-20 bg-secondary/40 rounded-2xl">
              <p className="text-muted-foreground mb-4">
                Sevimliləri görmək üçün daxil ol.
              </p>
              <Link to="/giris"><Button>Daxil ol</Button></Link>
            </div>
          ) : sevimli.length === 0 ? (
            <div className="text-center py-20 bg-secondary/40 rounded-2xl">
              <p className="text-muted-foreground mb-4">Hələ heç bir ev seçməmisən.</p>
              <Link to="/regionlar"><Button>Regionlara bax</Button></Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sevimli.map((e) => (
                <div key={e.id} className="relative group bg-card rounded-2xl overflow-hidden ring-1 ring-border shadow-soft hover:shadow-elegant transition-all duration-500">
                  <button
                    onClick={() => cixar(e.id)}
                    className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    aria-label="Sevimlilərdən sil"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <Link to={`/elan/${e.slug}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={e.sekiller[0]} alt={e.baslq} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <h2 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                        {e.baslq}
                      </h2>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.rayon}</span>
                        <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" />{e.reyting}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <AltPanel />
    </div>
  );
};

export default Sevimliler;

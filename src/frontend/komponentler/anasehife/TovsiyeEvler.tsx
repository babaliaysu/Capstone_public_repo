// Tövsiyə olunan evlər — Supabase elanlar bazasından oxunur.
// Yeni: hər kartın üzərində sevimliyə əlavə etmək üçün ürək ikonu var.
// Yeni: son 7 gün ərzində yaradılmış elanlar "Yeni" etiketi ilə qeyd olunur.
// Kartlar daha kompakt — mobile 1, sm 2, lg 3, xl 4 sütun.

import { useTranslation } from "react-i18next";
import { Star, Bed, ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useElanlar } from "@/backend/qarmaqlar/useElanlar";
import { useSevimliler } from "@/backend/qarmaqlar/useSevimliler";
import { useSessiya } from "@/backend/qarmaqlar/useSessiya";
import { toast } from "sonner";

export const TovsiyeEvler = () => {
  const { t } = useTranslation();
  const { elanlar } = useElanlar();
  const { idler, dey } = useSevimliler();
  const { istifadeci } = useSessiya();
  const navigate = useNavigate();

  // Tövsiyə olunan ilk 8 ev
  const evler = elanlar.slice(0, 8);

  // Sevimliyə əlavə et / sil
  const sevimliKlik = async (e: React.MouseEvent, elanId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!istifadeci) {
      toast.error("Sevimliyə əlavə etmək üçün daxil ol.");
      navigate("/giris");
      return;
    }
    await dey(elanId);
  };

  // Yeni elanları aşkarla — son 7 gün
  const indi = Date.now();
  const yeniMi = (tarix: string) => indi - new Date(tarix).getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground max-w-xl">
              {t("homes.title")}
            </h2>
            <p className="mt-2 text-muted-foreground text-sm">{t("homes.subtitle")}</p>
          </div>
          <Link to="/elanlar">
            <Button variant="ghost" className="rounded-full group">
              {t("homes.viewAll")}
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </Link>
        </div>

        {/* Daha kiçik kartlar — 4 sütunlu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {evler.map((h) => {
            const yekunQiymet = Math.round(h.qiymet * 1.03);
            const sevimlidir = idler.has(h.id);
            const yenidir = yeniMi(h.yaradilma_tarixi);

            return (
              <Link to={`/elan/${h.slug}`} key={h.id} className="group cursor-pointer block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 shadow-soft group-hover:shadow-elegant transition-shadow duration-500">
                  <img
                    src={h.sekiller[0]}
                    alt={`${h.baslq} — ${h.rayon}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Yeni etiketi (sol yuxarı) */}
                  {yenidir && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md" style={{ background: 'hsl(38 82% 42%)', color: 'hsl(42 60% 96%)' }}>
                      <Sparkles className="h-2.5 w-2.5" />
                      Yeni
                    </div>
                  )}

                  {/* Sevimli ürək ikonu (sağ yuxarı) */}
                  <button
                    onClick={(e) => sevimliKlik(e, h.id)}
                    aria-label={sevimlidir ? "Sevimlidən çıxar" : "Sevimliyə əlavə et"}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur hover:bg-background flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${
                        sevimlidir ? "fill-red-500 text-red-500" : "text-foreground"
                      }`}
                    />
                  </button>

                  {/* Reyting (alt sağ) */}
                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full glass-dark text-background text-[11px] font-semibold">
                    <Star className="h-2.5 w-2.5 fill-gold text-gold" />
                    {h.reyting}
                  </div>
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/90 text-foreground text-[11px] font-medium">
                    <Bed className="h-2.5 w-2.5" />
                    {h.yatag} otaq
                  </div>
                </div>

                <div className="px-1">
                  <h3 className="font-serif text-base font-medium text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {h.baslq}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {h.rayon} · {h.rey_sayi} rəy
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {yekunQiymet}₼
                    </span>
                    <span className="text-xs text-muted-foreground">{t("homes.perNight")}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Tövsiyə olunan evlər (nömrələmə silindi).
import { useTranslation } from "react-i18next";
import { Star, Bed, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import home1 from "@/frontend/medialar/evler/home1.jpg";
import home2 from "@/frontend/medialar/evler/home2.jpg";
import home3 from "@/frontend/medialar/evler/home3.jpg";
import home4 from "@/frontend/medialar/evler/home4.jpg";
import home5 from "@/frontend/medialar/evler/home5.jpg";
import home6 from "@/frontend/medialar/evler/home6.jpg";

const evler = [
  { id: 1, sekil: home1, baslq: "Dağ mənzərəli daxma",     kend: "Xınalıq, Quba",     qiymet: 85,  reyting: 4.97, rey: 142, otaq: 3 },
  { id: 2, sekil: home2, baslq: "Daş ev, gül balkon",      kend: "Lahıc, İsmayıllı",  qiymet: 65,  reyting: 4.92, rey: 98,  otaq: 2 },
  { id: 3, sekil: home3, baslq: "Rahat yataq, dağ baxışı", kend: "Şəki",              qiymet: 55,  reyting: 4.88, rey: 76,  otaq: 1 },
  { id: 4, sekil: home4, baslq: "Bağda samovar süfrəsi",   kend: "Qəbələ",            qiymet: 95,  reyting: 4.99, rey: 211, otaq: 4 },
  { id: 5, sekil: home5, baslq: "Nar bağçalı həyət evi",   kend: "Şəki",              qiymet: 70,  reyting: 4.85, rey: 67,  otaq: 3 },
  { id: 6, sekil: home6, baslq: "Meşə içi log-cabin",      kend: "Qəbələ",            qiymet: 120, reyting: 5.0,  rey: 54,  otaq: 5 },
];

export const TovsiyeEvler = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground max-w-xl">
              {t("homes.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("homes.subtitle")}</p>
          </div>
          <Link to="/elanlar">
            <Button variant="ghost" className="rounded-full group">
              {t("homes.viewAll")}
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {evler.map((h) => {
            // 3% komissiya alıcıya göstərilən qiymətə əlavə olunur
            const yekunQiymet = Math.round(h.qiymet * 1.03);
            return (
              <article key={h.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-soft group-hover:shadow-elegant transition-shadow duration-500">
                  <img
                    src={h.sekil}
                    alt={`${h.baslq} — ${h.kend}`}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass-dark text-background text-xs font-semibold">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    {h.reyting}
                  </div>
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/90 text-foreground text-xs font-medium backdrop-blur">
                    <Bed className="h-3 w-3" />
                    {t("homes.rooms", { count: h.otaq })}
                  </div>
                </div>
                <div className="px-1">
                  <h3 className="font-serif text-xl font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
                    {h.baslq}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {h.kend} · {h.rey} rəy
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl font-semibold text-foreground">{yekunQiymet}₼</span>
                    <span className="text-sm text-muted-foreground">{t("homes.perNight")}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

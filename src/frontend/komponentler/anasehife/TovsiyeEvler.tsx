// Tövsiyə olunan evlər — mock elanlar bazasından oxuyur, kart kliki /elan/:id açır.
import { useTranslation } from "react-i18next";
import { Star, Bed, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ELANLAR } from "@/backend/melumat/elanlar";

const evler = ELANLAR.slice(0, 6).map((e) => ({
  id: e.id,
  sekil: e.sekiller[0],
  baslq: e.baslq,
  kend: e.rayon,
  qiymet: e.qiymet,
  reyting: e.reyting,
  rey: e.reyler,
  otaq: e.yatag,
}));

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
          <Link to="/regionlar">
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
              <Link to={`/elan/${h.id}`} key={h.id} className="group cursor-pointer block">
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

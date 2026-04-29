import { useTranslation } from "react-i18next";
import { Star, Bed, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import home1 from "@/assets/homes/home1.jpg";
import home2 from "@/assets/homes/home2.jpg";
import home3 from "@/assets/homes/home3.jpg";
import home4 from "@/assets/homes/home4.jpg";
import home5 from "@/assets/homes/home5.jpg";
import home6 from "@/assets/homes/home6.jpg";

const homes = [
  { id: 1, img: home1, title: "Dağ mənzərəli daxma", village: "Xınalıq, Quba", price: 85, rating: 4.97, reviews: 142, rooms: 3 },
  { id: 2, img: home2, title: "Daş ev, gül balkon", village: "Lahıc, İsmayıllı", price: 65, rating: 4.92, reviews: 98, rooms: 2 },
  { id: 3, img: home3, title: "Rahat yataq, dağ baxışı", village: "Şəki", price: 55, rating: 4.88, reviews: 76, rooms: 1 },
  { id: 4, img: home4, title: "Bağda samovar süfrəsi", village: "Qəbələ", price: 95, rating: 4.99, reviews: 211, rooms: 4 },
  { id: 5, img: home5, title: "Nar bağçalı həyət evi", village: "Şəki", price: 70, rating: 4.85, reviews: 67, rooms: 3 },
  { id: 6, img: home6, title: "Meşə içi log-cabin", village: "Qəbələ", price: 120, rating: 5.0, reviews: 54, rooms: 5 },
];

export const RecommendedHomes = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
              03 — {t("homes.subtitle")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground max-w-xl">
              {t("homes.title")}
            </h2>
          </div>
          <Link to="/listings">
            <Button variant="ghost" className="rounded-full group">
              {t("homes.viewAll")}
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homes.map((h, i) => {
            const finalPrice = Math.round(h.price * 1.03); // 3% commission shown to buyer
            return (
              <article
                key={h.id}
                className="group cursor-pointer"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-soft group-hover:shadow-elegant transition-shadow duration-500">
                  <img
                    src={h.img}
                    alt={`${h.title} — ${h.village}`}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass-dark text-background text-xs font-semibold">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    {h.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/90 text-foreground text-xs font-medium backdrop-blur">
                    <Bed className="h-3 w-3" />
                    {t("homes.rooms", { count: h.rooms })}
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-serif text-xl font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
                      {h.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{h.village} · {h.reviews} rəy</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl font-semibold text-foreground">{finalPrice}₼</span>
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

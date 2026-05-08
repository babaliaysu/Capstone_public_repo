// Populyar kəndlər — sola hizalı başlıq, kiçik kartlar, "Hamısını göstər".
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import khinalig from "@/frontend/medialar/kendler/khinalig.jpg";
import lahij from "@/frontend/medialar/kendler/lahij.jpg";
import sheki from "@/frontend/medialar/kendler/sheki.jpg";
import gabala from "@/frontend/medialar/kendler/gabala.jpg";
import quba from "@/frontend/medialar/kendler/quba.jpg";
import ismayilli from "@/frontend/medialar/kendler/ismayilli.jpg";

const kendler = [
  { ad: "Xınalıq",   rayon: "Quba",       slug: "quba-xacmaz",      sekil: khinalig,  evler: 24, tesvir: "Dünyanın ən hündür yaşayış məntəqələrindən biri." },
  { ad: "Lahıc",     rayon: "İsmayıllı",  slug: "samaxi-ismayilli", sekil: lahij,     evler: 38, tesvir: "Misgərlik və əl işləri kəndi, daş döşəmə küçələr." },
  { ad: "Şəki",      rayon: "Şəki",       slug: "seki-zaqatala",    sekil: sheki,     evler: 56, tesvir: "Tarixi Xan sarayı və qırmızı kirəmid damlar." },
  { ad: "Qəbələ",    rayon: "Qəbələ",     slug: "seki-zaqatala",    sekil: gabala,    evler: 47, tesvir: "Dağ meşələri, çay vadiləri və ekoturizm." },
  { ad: "Quba",      rayon: "Quba",       slug: "quba-xacmaz",      sekil: quba,      evler: 33, tesvir: "Alma bağları və qarlı zirvələr." },
  { ad: "İsmayıllı", rayon: "İsmayıllı",  slug: "samaxi-ismayilli", sekil: ismayilli, evler: 29, tesvir: "Üzüm bağları və yumşaq təpələr." },
];

export const PopulyarKendler = () => {
  const { t } = useTranslation();
  const [hamisi, setHamisi] = useState(false);
  const gosterilen = hamisi ? kendler : kendler.slice(0, 6);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Sola hizalanmış başlıq + sağda "Hamısını göstər" */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              {t("villages.title")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("villages.subtitle")}
            </p>
          </div>
          <button
            onClick={() => setHamisi((v) => !v)}
            className="text-sm font-semibold text-primary hover:text-accent transition-colors whitespace-nowrap"
          >
            {hamisi ? "Daha az göstər" : "Hamısını göstər →"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {gosterilen.map((v, i) => (
            <Link
              to={`/regionlar/${v.slug}`}
              key={v.ad + i}
              className="group relative overflow-hidden rounded-xl bg-card shadow-soft hover:shadow-elegant transition-all duration-700 cursor-pointer block"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={v.sekil}
                  alt={`${v.ad} kəndi, ${v.rayon}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-overlay opacity-90" />

              <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full glass-dark text-background text-[10px] font-medium">
                <MapPin className="h-2.5 w-2.5" />
                {v.rayon}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 text-background">
                <h3 className="font-serif text-lg font-medium leading-tight">{v.ad}</h3>
                <p className="text-[11px] text-background/75 mb-1.5 line-clamp-1">{v.tesvir}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                    {t("villages.homes", { count: v.evler })}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-gold/90 text-foreground flex items-center justify-center text-xs transition-all duration-500 group-hover:bg-gold group-hover:scale-110">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

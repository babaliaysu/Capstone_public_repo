// Populyar kəndlər bölməsi (nömrələmə silindi).
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import khinalig from "@/frontend/medialar/kendler/khinalig.jpg";
import lahij from "@/frontend/medialar/kendler/lahij.jpg";
import sheki from "@/frontend/medialar/kendler/sheki.jpg";
import gabala from "@/frontend/medialar/kendler/gabala.jpg";
import quba from "@/frontend/medialar/kendler/quba.jpg";
import ismayilli from "@/frontend/medialar/kendler/ismayilli.jpg";

const kendler = [
  { ad: "Xınalıq",   rayon: "Quba",       sekil: khinalig,  evler: 24, tesvir: "Dünyanın ən hündür yaşayış məntəqələrindən biri." },
  { ad: "Lahıc",     rayon: "İsmayıllı",  sekil: lahij,     evler: 38, tesvir: "Misgərlik və əl işləri kəndi, daş döşəmə küçələr." },
  { ad: "Şəki",      rayon: "Şəki",       sekil: sheki,     evler: 56, tesvir: "Tarixi Xan sarayı və qırmızı kirəmid damlar." },
  { ad: "Qəbələ",    rayon: "Qəbələ",     sekil: gabala,    evler: 47, tesvir: "Dağ meşələri, çay vadiləri və ekoturizm." },
  { ad: "Quba",      rayon: "Quba",       sekil: quba,      evler: 33, tesvir: "Alma bağları və qarlı zirvələr." },
  { ad: "İsmayıllı", rayon: "İsmayıllı",  sekil: ismayilli, evler: 29, tesvir: "Üzüm bağları və yumşaq təpələr." },
];

export const PopulyarKendler = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            {t("villages.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kendler.map((v, i) => (
            <article
              key={v.ad}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elegant transition-all duration-700 cursor-pointer"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={v.sekil}
                  alt={`${v.ad} kəndi, ${v.rayon}`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-overlay opacity-90" />

              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-background text-xs font-medium">
                <MapPin className="h-3 w-3" />
                {v.rayon}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <h3 className="font-serif text-3xl font-medium mb-1">{v.ad}</h3>
                <p className="text-sm text-background/80 mb-3 line-clamp-2 max-w-xs">{v.tesvir}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-gold font-semibold">
                    {t("villages.homes", { count: v.evler })}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-gold/90 text-foreground flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-45">
                    →
                  </span>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] border-t-gold border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

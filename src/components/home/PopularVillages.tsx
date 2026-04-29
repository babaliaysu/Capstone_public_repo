import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import khinalig from "@/assets/villages/khinalig.jpg";
import lahij from "@/assets/villages/lahij.jpg";
import sheki from "@/assets/villages/sheki.jpg";
import gabala from "@/assets/villages/gabala.jpg";
import quba from "@/assets/villages/quba.jpg";
import ismayilli from "@/assets/villages/ismayilli.jpg";

const villages = [
  { name: "Xınalıq", region: "Quba", img: khinalig, homes: 24, desc: "Dünyanın ən hündür yaşayış məntəqələrindən biri." },
  { name: "Lahıc", region: "İsmayıllı", img: lahij, homes: 38, desc: "Misgərlik və əl işləri kəndi, daş döşəmə küçələr." },
  { name: "Şəki", region: "Şəki", img: sheki, homes: 56, desc: "Tarixi Xan sarayı və qırmızı kirəmid damlar." },
  { name: "Qəbələ", region: "Qəbələ", img: gabala, homes: 47, desc: "Dağ meşələri, çay vadiləri və ekoturizm." },
  { name: "Quba", region: "Quba", img: quba, homes: 33, desc: "Alma bağları və qarlı zirvələr." },
  { name: "İsmayıllı", region: "İsmayıllı", img: ismayilli, homes: 29, desc: "Üzüm bağları və yumşaq təpələr." },
];

export const PopularVillages = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
              01 — {t("villages.subtitle")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground max-w-2xl">
              {t("villages.title")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {villages.map((v, i) => (
            <article
              key={v.name}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elegant transition-all duration-700 cursor-pointer"
              style={{
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={v.img}
                  alt={`${v.name} kəndi, ${v.region}`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-overlay opacity-90" />

              {/* Top label */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-background text-xs font-medium">
                <MapPin className="h-3 w-3" />
                {v.region}
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <h3 className="font-serif text-3xl font-medium mb-1">{v.name}</h3>
                <p className="text-sm text-background/80 mb-3 line-clamp-2 max-w-xs">{v.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-gold font-semibold">
                    {t("villages.homes", { count: v.homes })}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-gold/90 text-foreground flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-45">
                    →
                  </span>
                </div>
              </div>

              {/* Gold corner accent on hover */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] border-t-gold border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

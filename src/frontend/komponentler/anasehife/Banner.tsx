// Ana səhifənin 2-ci ekranı — başlıq və axtarış paneli.
// Edit: arxa fon video animasiyası SİLİNDİ. Sakit qradiyent fon istifadə edilir.
import { useTranslation } from "react-i18next";
import { ChevronDown, MapPin, Star, Sparkles } from "lucide-react";
import { AxtarisPaneli } from "./AxtarisPaneli";

export const Banner = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-forest">
      {/* Sakit dekorativ aksent — animasiya yoxdur */}
      <div className="pointer-events-none absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl" />


      <div className="container mx-auto px-6 relative z-10 min-h-screen flex flex-col justify-center pt-28 pb-20">
        <div className="max-w-3xl space-y-7">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/15 backdrop-blur-md border border-background/30 animate-fade-in"
            style={{ opacity: 0 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-background">
              {t("hero.tagline")}
            </span>
          </div>

          {/* Sağdan-sola sürüşərək gələn başlıq və alt başlıq.
              Hər sətir kiçik gecikmə ilə kənardan içəri sürüşür. */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-background drop-shadow-2xl overflow-hidden">
            <span
              className="block animate-saga-sola"
              style={{ animationDelay: "0.15s", opacity: 0 }}
            >
              {t("hero.title")}
            </span>
            <span
              className="block italic font-light text-gold animate-saga-sola"
              style={{ animationDelay: "0.4s", opacity: 0 }}
            >
              {t("hero.titleAccent")}
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-background/90 max-w-2xl leading-relaxed drop-shadow-lg animate-saga-sola"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            {t("hero.subtitle")}
          </p>

          {/* Lokal animasiya: kənardan sağdan içəri sürüşmə */}
          <style>{`
            @keyframes saga-sola {
              0%   { opacity: 0; transform: translateX(120px); }
              100% { opacity: 1; transform: translateX(0);     }
            }
            .animate-saga-sola {
              animation: saga-sola 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }
          `}</style>

          <div className="pt-4">
            <AxtarisPaneli />
          </div>

          {/* Etibarlılıq göstəriciləri */}
          <div
            className="flex flex-wrap items-center gap-5 pt-6 animate-fade-in"
            style={{ animationDelay: "0.9s", opacity: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background/15 backdrop-blur-md border border-background/30">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-medium text-background">120+ kənd · 26 region</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background/15 backdrop-blur-md border border-background/30">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="text-xs font-bold text-background">4.9</span>
              <span className="text-[11px] text-background/80">· 2,400+ qonaq</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/80 animate-bounce z-10">
        <span className="text-[11px] uppercase tracking-widest">{t("hero.scrollHint")}</span>
        <ChevronDown className="h-4 w-4" />
      </div>
    </section>
  );
};

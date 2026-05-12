// Banner — Ana səhifənin 2-ci ekranı
// Design: "Azərbaycan Torpağı" — dərin zümrüd + mis-qızılı
// ─────────────────────────────────────────────────────────────
// Dəyişikliklər:
//  • bg-gradient-forest → dərin zümrüd gradient (150 52% 12% → 148 46% 20%)
//  • Başlıq: ağ + qızılı italic accent (daha yüksək kontrast)
//  • Tagline badge: mis-qızılı border + amber text
//  • Etibarlılıq göstəriciləri: daha parlaq badge
//  • Arxa plan blur dairələri: copper-gold tonları
// ─────────────────────────────────────────────────────────────
import { useTranslation } from "react-i18next";
import { MapPin, Star, Sparkles } from "lucide-react";
import { AxtarisPaneli } from "./AxtarisPaneli";

export const Banner = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(150 52% 12%) 0%, hsl(148 46% 20%) 60%, hsl(92 36% 22%) 100%)",
      }}
    >
      {/* Dekorativ blur dairələri — mis-qızılı */}
      <div
        className="pointer-events-none absolute top-1/3 right-10 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: "hsl(38 82% 42% / 0.12)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: "hsl(92 36% 36% / 0.18)" }}
      />
      <div
        className="pointer-events-none absolute top-10 left-1/3 w-[300px] h-[300px] rounded-full blur-3xl"
        style={{ background: "hsl(38 82% 42% / 0.07)" }}
      />

      <div className="container mx-auto px-6 relative z-10 min-h-screen flex flex-col justify-center pt-28 pb-20">
        <div className="max-w-3xl space-y-7">

          {/* Tagline badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border animate-fade-in"
            style={{
              background: "hsl(38 82% 42% / 0.15)",
              borderColor: "hsl(38 82% 42% / 0.45)",
              opacity: 0,
            }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: "hsl(42 90% 62%)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "hsl(42 90% 72%)" }}
            >
              {t("hero.tagline")}
            </span>
          </div>

          {/* Hero başlıq */}
          <h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] drop-shadow-2xl overflow-hidden"
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
            <span
              className="block animate-saga-sola text-white"
              style={{ animationDelay: "0.15s", opacity: 0 }}
            >
              {t("hero.title")}
            </span>
            <span
              className="block italic font-light animate-saga-sola"
              style={{
                animationDelay: "0.4s",
                opacity: 0,
                color: "hsl(42 90% 62%)",
              }}
            >
              {t("hero.titleAccent")}
            </span>
          </h1>

          {/* Alt başlıq */}
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-lg animate-saga-sola"
            style={{
              animationDelay: "0.7s",
              opacity: 0,
              color: "hsl(42 28% 88%)",
            }}
          >
            {t("hero.subtitle")}
          </p>

          {/* Animasiya keyframe */}
          <style>{`
            @keyframes saga-sola {
              0%   { opacity: 0; transform: translateX(120px); }
              100% { opacity: 1; transform: translateX(0);     }
            }
            .animate-saga-sola {
              animation: saga-sola 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }
          `}</style>

          {/* Axtarış paneli */}
          <div className="pt-4">
            <AxtarisPaneli />
          </div>

          {/* Etibarlılıq göstəriciləri */}
          <div
            className="flex flex-wrap items-center gap-5 pt-6 animate-fade-in"
            style={{ animationDelay: "0.9s", opacity: 0 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border"
              style={{
                background: "hsl(150 47% 8% / 0.45)",
                borderColor: "hsl(42 60% 96% / 0.25)",
              }}
            >
              <MapPin className="h-3.5 w-3.5" style={{ color: "hsl(42 90% 62%)" }} />
              <span className="text-xs font-medium text-white">120+ kənd · 26 region</span>
            </div>
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur-md border"
              style={{
                background: "hsl(150 47% 8% / 0.45)",
                borderColor: "hsl(42 60% 96% / 0.25)",
              }}
            >
              <Star className="h-3.5 w-3.5" style={{ fill: "hsl(42 90% 62%)", color: "hsl(42 90% 62%)" }} />
              <span className="text-xs font-bold text-white">4.9</span>
              <span className="text-[11px]" style={{ color: "hsl(42 28% 78%)" }}>· 2,400+ qonaq</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

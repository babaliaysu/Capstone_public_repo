import { useTranslation } from "react-i18next";
import { ChevronDown, MapPin, Star, Sparkles } from "lucide-react";
import { SearchPanel } from "./SearchPanel";
import heroVideo from "@/assets/hero/caucasus-village.mp4.asset.json";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed background video */}
      <video
        src={heroVideo.url}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Forest gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-background/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />

      {/* Subtle gold glow accents */}
      <div className="pointer-events-none absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 min-h-screen flex flex-col justify-center pt-28 pb-20">
        <div className="max-w-3xl space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/15 backdrop-blur-md border border-background/30 animate-fade-in" style={{ opacity: 0 }}>
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-background">
              {t("hero.tagline")}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-background drop-shadow-2xl animate-fade-in" style={{ animationDelay: "0.15s", opacity: 0 }}>
            {t("hero.title")}{" "}
            <span className="italic font-light text-gold">
              {t("hero.titleAccent")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-background/90 max-w-2xl leading-relaxed animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.3s", opacity: 0 }}>
            {t("hero.subtitle")}
          </p>

          <div className="pt-4">
            <SearchPanel />
          </div>

          {/* Floating credibility row */}
          <div className="flex flex-wrap items-center gap-5 pt-6 animate-fade-in" style={{ animationDelay: "0.9s", opacity: 0 }}>
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

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/80 animate-bounce z-10">
        <span className="text-[11px] uppercase tracking-widest">{t("hero.scrollHint")}</span>
        <ChevronDown className="h-4 w-4" />
      </div>
    </section>
  );
};

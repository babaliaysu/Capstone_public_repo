import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { HeroScene3D } from "./HeroScene3D";
import { SearchPanel } from "./SearchPanel";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-hero pt-24 pb-12">
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-12rem)]">
          {/* Text */}
          <div className="space-y-6 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/40 animate-fade-in" style={{ opacity: 0 }}>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                {t("hero.tagline")}
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-foreground animate-fade-in" style={{ animationDelay: "0.15s", opacity: 0 }}>
              {t("hero.title")}{" "}
              <span className="text-gradient-warm italic font-light">
                {t("hero.titleAccent")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
              {t("hero.subtitle")}
            </p>

            <div className="pt-4">
              <SearchPanel />
            </div>
          </div>

          {/* 3D Scene */}
          <div className="relative h-[500px] lg:h-[600px] order-first lg:order-last animate-fade-in-slow" style={{ opacity: 0 }}>
            <HeroScene3D />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 italic">
              ↻ siçanı tərpət
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 animate-bounce">
          <span className="text-[11px] uppercase tracking-widest">{t("hero.scrollHint")}</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
};

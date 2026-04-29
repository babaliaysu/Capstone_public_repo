import { useTranslation } from "react-i18next";
import { ChevronDown, MapPin, Star } from "lucide-react";
import { SearchPanel } from "./SearchPanel";
import heroImg from "@/assets/hero/khinalig-hero.jpg";

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

          {/* Real photo card */}
          <div className="relative h-[460px] lg:h-[600px] order-first lg:order-last animate-fade-in-slow" style={{ opacity: 0 }}>
            {/* Glow */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/30 via-gold/20 to-accent/20 rounded-[2.5rem] blur-3xl opacity-70" />

            {/* Main image */}
            <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-elegant ring-1 ring-white/40 group">
              <img
                src={heroImg}
                alt="Xınalıq kəndinin Qafqaz dağları arasındakı panoramik görünüşü"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                loading="eager"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />

              {/* Floating location pill */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/50 shadow-soft animate-float">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">Xınalıq, Quba</span>
              </div>

              {/* Floating rating pill */}
              <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur shadow-soft animate-float" style={{ animationDelay: "0.6s" }}>
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                <span className="text-xs font-bold text-foreground">4.9</span>
                <span className="text-[10px] text-muted-foreground">· 320+</span>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <p className="text-[11px] uppercase tracking-[0.2em] text-background/70 mb-1">
                  Qafqazın ən qədim kəndi · 2200 m
                </p>
                <p className="font-serif text-2xl lg:text-3xl leading-tight">
                  Buludların üzərində bir gecə
                </p>
              </div>
            </div>

            {/* Floating mini-card */}
            <div className="hidden lg:flex absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-elegant p-4 items-center gap-3 ring-1 ring-border animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold ring-2 ring-card" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary ring-2 ring-card" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-accent ring-2 ring-card" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">2,400+ qonaq</p>
                <p className="text-[10px] text-muted-foreground">bu ay rezervasiya etdi</p>
              </div>
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

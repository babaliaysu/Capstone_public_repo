import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import bg from "@/assets/villages/ismayilli.jpg";

export const HostCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl">
          {/* bg image */}
          <img
            src={bg}
            alt=""
            loading="lazy"
            width={1280}
            height={896}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/40" />
          {/* decorative */}
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-gold/30 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-10 md:p-16 lg:p-20 items-center">
            <div className="text-background space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 backdrop-blur border border-gold/30">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {t("hostCta.tagline")}
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                {t("hostCta.title")}
              </h2>
              <p className="text-lg text-background/80 leading-relaxed max-w-lg">
                {t("hostCta.subtitle")}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/host">
                  <Button
                    size="lg"
                    className="rounded-full bg-gold text-foreground hover:bg-gold/90 hover:shadow-gold transition-all duration-300 px-7 py-6 text-base font-semibold group"
                  >
                    {t("hostCta.button")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <span className="text-sm text-background/60">✓ {t("hostCta.note")}</span>
              </div>
            </div>

            {/* Stat card */}
            <div className="hidden lg:block">
              <div className="relative ml-auto max-w-sm">
                <div className="glass-dark rounded-2xl p-6 backdrop-blur-xl border border-gold/20 animate-float-slow">
                  <div className="text-background/60 text-xs uppercase tracking-widest mb-2">
                    Bu ay qazanc
                  </div>
                  <div className="font-serif text-5xl font-semibold text-gold mb-1">2,840₼</div>
                  <div className="text-background/70 text-sm">↗ 18 rezervasiya</div>
                  <div className="mt-4 pt-4 border-t border-background/10 text-background/60 text-xs">
                    Yalnız 3% komissiya · Aylıq ödəniş
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 glass-dark rounded-xl p-3 backdrop-blur-xl border border-gold/20 animate-float">
                  <div className="text-2xl">⭐ 4.9</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

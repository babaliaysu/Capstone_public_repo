import { useTranslation } from "react-i18next";
import { Search, MousePointerClick, Heart } from "lucide-react";

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { num: "01", icon: Search, title: t("how.step1Title"), desc: t("how.step1Desc"), color: "from-primary to-gold" },
    { num: "02", icon: MousePointerClick, title: t("how.step2Title"), desc: t("how.step2Desc"), color: "from-accent to-primary" },
    { num: "03", icon: Heart, title: t("how.step3Title"), desc: t("how.step3Desc"), color: "from-gold to-accent" },
  ];

  return (
    <section className="py-24 bg-secondary/40 relative overflow-hidden">
      {/* decorative */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            02 — {t("how.subtitle")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            {t("how.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-soft animate-float`} style={{ animationDelay: `${i * 0.5}s` }}>
                  <s.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="font-serif text-5xl font-light text-muted-foreground/30">
                  {s.num}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-medium mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>

              {/* connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-4 w-8 h-px bg-gradient-to-r from-border to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// "Necə işləyir" bölməsi (nömrələmə silindi).
import { useTranslation } from "react-i18next";
import { Search, MousePointerClick, Heart } from "lucide-react";

export const NeceIsleyir = () => {
  const { t } = useTranslation();

  const addimlar = [
    { ikon: Search, baslq: t("how.step1Title"), tesvir: t("how.step1Desc"), reng: "from-emerald-800 to-emerald-600" },
    { ikon: MousePointerClick, baslq: t("how.step2Title"), tesvir: t("how.step2Desc"), reng: "from-emerald-700 to-lime-700" },
    { ikon: Heart, baslq: t("how.step3Title"), tesvir: t("how.step3Desc"), reng: "from-amber-600 to-amber-400" },
  ];

  return (
    <section className="py-24 bg-secondary/40 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            {t("how.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("how.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {addimlar.map((s, i) => (
            <div
              key={s.baslq}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.reng} flex items-center justify-center shadow-soft animate-float mb-6`}
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <s.ikon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-medium mb-3 text-foreground">{s.baslq}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.tesvir}</p>

              {i < addimlar.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-4 w-8 h-px bg-gradient-to-r from-border to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Qonaq rəyləri bölməsi (nömrələmə silindi).
import { useTranslation } from "react-i18next";
import { Star, Quote } from "lucide-react";

const reyler = [
  {
    sitat: "Xınalıqdakı 3 gün ömürlük xatirə oldu. Ev sahibəsi Səkinə xala bizi ailə kimi qarşıladı, yerli yeməklər inanılmaz idi.",
    ad: "Aysel Məmmədova",
    yer: "Bakıdan",
    reyting: 5,
  },
  {
    sitat: "Coming from Germany, this was the most authentic experience of my life. The mountains, the food, the people — everything felt real.",
    ad: "Markus Weber",
    yer: "Berlin",
    reyting: 5,
  },
  {
    sitat: "Лагич превзошёл все ожидания. Мастер-класс по медной посуде у местного ремесленника — отдельное удовольствие.",
    ad: "Анна Соколова",
    yer: "Москва",
    reyting: 5,
  },
];

export const Reyler = () => {
  const { t } = useTranslation();

  return (
    <section id="qonaq-reyleri" className="py-24 bg-background scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reyler.map((it, i) => (
            <div
              key={i}
              className="relative bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-gold/20" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: it.reyting }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif text-lg leading-relaxed text-foreground/90 mb-6 italic">
                "{it.sitat}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center text-background font-semibold">
                  {it.ad[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{it.ad}</div>
                  <div className="text-xs text-muted-foreground">{it.yer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

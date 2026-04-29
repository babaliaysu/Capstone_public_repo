import { useTranslation } from "react-i18next";
import { Star, Quote } from "lucide-react";

const items = [
  {
    quote: "Xınalıqdakı 3 gün ömürlük xatirə oldu. Ev sahibəsi Səkinə xala bizi ailə kimi qarşıladı, yerli yeməklər inanılmaz idi.",
    name: "Aysel Məmmədova",
    place: "Bakıdan",
    rating: 5,
  },
  {
    quote: "Coming from Germany, this was the most authentic experience of my life. The mountains, the food, the people — everything felt real.",
    name: "Markus Weber",
    place: "Berlin",
    rating: 5,
  },
  {
    quote: "Лагич превзошёл все ожидания. Мастер-класс по медной посуде у местного ремесленника — отдельное удовольствие.",
    name: "Анна Соколова",
    place: "Москва",
    rating: 5,
  },
];

export const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            05
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((it, i) => (
            <div
              key={i}
              className="relative bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-gold/20" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: it.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif text-lg leading-relaxed text-foreground/90 mb-6 italic">
                "{it.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center text-background font-semibold">
                  {it.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{it.name}</div>
                  <div className="text-xs text-muted-foreground">{it.place}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

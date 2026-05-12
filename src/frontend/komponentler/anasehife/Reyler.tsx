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
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            {t("reviews.title", "Qonaq Rəyləri")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("reviews.subtitle", "Minlərlə qonaqımızdan gələn rəylər")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reyler.map((rey, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-elegant border border-border hover:shadow-gold transition-all duration-300"
            >
              <Quote className="h-8 w-8 text-gold mb-4" />
              <p className="text-foreground mb-4 italic leading-relaxed">
                "{rey.sitat}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{rey.ad}</p>
                  <p className="text-sm text-muted-foreground">{rey.yer}</p>
                </div>
                <div className="flex">
                  {[...Array(rey.reyting)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

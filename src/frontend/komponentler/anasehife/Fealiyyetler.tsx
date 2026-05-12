// Fəaliyyətlər bölməsi — xidmətlər siyahısından çiplər (nömrələmə silindi).
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { XIDMETLER } from "@/backend/melumat/xidmetler";

export const Fealiyyetler = () => {
  const { t } = useTranslation();
  const [aktiv, setAktiv] = useState(0);

  return (
    <section className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            {t("activities.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("activities.subtitle")}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {XIDMETLER.map((it, i) => {
            const seciliMi = aktiv === i;
            const I = it.ikon;
            return (
              <button
                key={it.acar}
                onClick={() => setAktiv(i)}
                className={`group inline-flex items-center gap-2.5 px-5 py-3 rounded-full border transition-all duration-300 ${
                  seciliMi
                    ? "shadow-elegant scale-105 border-transparent"
                    : "bg-card text-foreground border-border hover:shadow-soft hover:-translate-y-0.5"
                }`}
                style={seciliMi ? {
                  background: 'linear-gradient(135deg, hsl(150 47% 22%) 0%, hsl(92 36% 36%) 55%, hsl(38 82% 42%) 100%)',
                  color: 'hsl(42 60% 96%)'
                } : {}}
              >
                <I className={`h-4 w-4 transition-transform duration-300 ${seciliMi ? "text-gold" : "text-primary"} group-hover:rotate-12`} />
                <span className="font-medium text-sm">{it.ad}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

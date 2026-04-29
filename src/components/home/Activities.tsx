import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mountain, ChefHat, Hammer, Fish, Sprout, Coffee, Music, Anvil } from "lucide-react";

export const Activities = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const items = [
    { key: "horse", icon: Anvil, label: t("activities.horse") },
    { key: "hike", icon: Mountain, label: t("activities.hike") },
    { key: "cuisine", icon: ChefHat, label: t("activities.cuisine") },
    { key: "crafts", icon: Hammer, label: t("activities.crafts") },
    { key: "fishing", icon: Fish, label: t("activities.fishing") },
    { key: "garden", icon: Sprout, label: t("activities.garden") },
    { key: "tea", icon: Coffee, label: t("activities.tea") },
    { key: "music", icon: Music, label: t("activities.music") },
  ];

  return (
    <section className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            04 — {t("activities.subtitle")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            {t("activities.title")}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {items.map((it, i) => {
            const isActive = active === i;
            return (
              <button
                key={it.key}
                onClick={() => setActive(i)}
                className={`group inline-flex items-center gap-2.5 px-5 py-3 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-foreground text-background border-foreground shadow-elegant scale-105"
                    : "bg-card text-foreground border-border hover:border-primary hover:shadow-soft hover:-translate-y-0.5"
                }`}
              >
                <it.icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? "text-gold" : "text-primary"} group-hover:rotate-12`} />
                <span className="font-medium text-sm">{it.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

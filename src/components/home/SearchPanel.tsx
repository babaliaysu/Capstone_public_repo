import { useTranslation } from "react-i18next";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SearchPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="glass rounded-2xl p-2 md:p-3 shadow-elegant border border-white/40 max-w-3xl mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-1">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 transition-colors cursor-pointer">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              {t("hero.where")}
            </div>
            <div className="text-sm font-medium text-foreground truncate">Xınalıq, Quba</div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 transition-colors cursor-pointer border-l border-border/40">
          <Calendar className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              {t("hero.when")}
            </div>
            <div className="text-sm font-medium text-foreground">15 — 20 may</div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 transition-colors cursor-pointer border-l border-border/40">
          <Users className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              {t("hero.guests")}
            </div>
            <div className="text-sm font-medium text-foreground">{t("hero.guestsCount", { count: 2 })}</div>
          </div>
        </div>

        <Button
          size="lg"
          className="rounded-xl bg-gradient-warm text-primary-foreground hover:shadow-gold transition-all duration-300 px-6 h-auto md:h-full"
        >
          <Search className="h-5 w-5 md:mr-2" />
          <span className="md:inline">{t("hero.search")}</span>
        </Button>
      </div>
    </div>
  );
};

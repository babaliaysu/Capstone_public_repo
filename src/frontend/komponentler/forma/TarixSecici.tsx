// Tarix aralığı seçici — başlama → bitmə.
// Mərhələlər: əvvəlcə başlama tarixi seçilir (label "Başlama tarixi"),
// seçildikdən sonra label "Bitmə tarixi"-ə dəyişir, bitmə seçildikdən sonra
// aralıq vurğulanır və popover bağlanır.

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { az as azLocale } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type Props = {
  deyer: DateRange | undefined;
  deyisdi: (r: DateRange | undefined) => void;
};

export const TarixSecici = ({ deyer, deyisdi }: Props) => {
  const { t } = useTranslation();
  const [acik, setAcik] = useState(false);

  const baslamaSecilib = !!deyer?.from;
  const bitmeSecilib = !!deyer?.to;

  // Başlığın altındakı dinamik mətn
  const yazi = (() => {
    if (deyer?.from && deyer?.to) {
      return `${format(deyer.from, "d MMM", { locale: azLocale })} — ${format(
        deyer.to,
        "d MMM",
        { locale: azLocale },
      )}`;
    }
    if (deyer?.from) {
      return `${format(deyer.from, "d MMM", { locale: azLocale })} → ${t("hero.endDate")}`;
    }
    return t("hero.startDate");
  })();

  // Etiket: hələ başlama seçilməyibsə "Başlama tarixi", əks halda "Bitmə tarixi"
  const etiket = !baslamaSecilib
    ? t("hero.startDate")
    : !bitmeSecilib
    ? t("hero.endDate")
    : t("hero.when");

  return (
    <Popover
      open={acik}
      onOpenChange={(o) => {
        setAcik(o);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 transition-colors w-full text-left border-l border-border/40"
        >
          <CalendarIcon className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              {etiket}
            </div>
            <div
              className={cn(
                "text-sm font-medium truncate",
                deyer?.from ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {yazi}
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0 bg-popover z-50">
        <Calendar
          mode="range"
          numberOfMonths={1}
          selected={deyer}
          onSelect={(r) => {
            deyisdi(r);
            // Hər iki tarix seçildikdə avtomatik bağlanır
            if (r?.from && r?.to) {
              setTimeout(() => setAcik(false), 150);
            }
          }}
          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
          initialFocus
          locale={azLocale}
          className={cn("p-3 pointer-events-auto")}
        />
        {deyer?.from && (
          <div className="border-t border-border px-3 py-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {!bitmeSecilib ? t("hero.endDate") : t("hero.when")}
            </span>
            <button
              type="button"
              onClick={() => deyisdi(undefined)}
              className="text-primary font-medium hover:underline"
            >
              Sıfırla
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

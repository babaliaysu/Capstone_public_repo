// Xidmət növü seçici (qonaqlar bölməsinin əvəzi).
// Yuxarıda sürətli axtarış inputu, aşağıda kateqoriya çipləri (çoxlu seçim).

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, Search, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  XIDMETLER,
  xidmetleriSuz,
  type Xidmet,
} from "@/backend/melumat/xidmetler";
import { cn } from "@/lib/utils";

type Props = {
  secilmisler: string[];
  deyisdi: (acarlar: string[]) => void;
};

export const XidmetSecici = ({ secilmisler, deyisdi }: Props) => {
  const { t } = useTranslation();
  const [acik, setAcik] = useState(false);
  const [soz, setSoz] = useState("");

  const suzulmus = useMemo(() => xidmetleriSuz(soz), [soz]);

  const tikla = (x: Xidmet) => {
    const var_mi = secilmisler.includes(x.acar);
    const yeni = var_mi
      ? secilmisler.filter((a) => a !== x.acar)
      : [...secilmisler, x.acar];
    deyisdi(yeni);
  };

  // Düymədə görünəcək başlıq
  const yazi = (() => {
    if (secilmisler.length === 0) return t("hero.serviceAny");
    if (secilmisler.length === 1) {
      return XIDMETLER.find((x) => x.acar === secilmisler[0])?.ad ?? "";
    }
    return t("service.selected", { count: secilmisler.length });
  })();

  return (
    <Popover open={acik} onOpenChange={setAcik}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 transition-colors w-full text-left border-l border-border/40"
        >
          <Sparkles className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              {t("hero.service")}
            </div>
            <div className="text-sm font-medium text-foreground truncate">{yazi}</div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[340px] p-0 bg-popover z-50 pointer-events-auto"
      >
        {/* Yuxarıda axtarış sahəsi */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              value={soz}
              onChange={(e) => setSoz(e.target.value)}
              placeholder={t("service.searchPlaceholder")}
              className="pl-9"
            />
          </div>
        </div>

        {/* Kateqoriya çipləri */}
        <div className="max-h-[300px] overflow-y-auto p-3">
          {suzulmus.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {t("service.noResults")}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {suzulmus.map((x) => {
                const seciliMi = secilmisler.includes(x.acar);
                const I = x.ikon;
                return (
                  <button
                    key={x.acar}
                    type="button"
                    onClick={() => tikla(x)}
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                      seciliMi
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-secondary text-secondary-foreground border-transparent hover:border-primary",
                    )}
                  >
                    <I className="h-3.5 w-3.5" />
                    {x.ad}
                    {seciliMi && <X className="h-3 w-3 opacity-70" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Alt panel */}
        <div className="px-3 py-2 border-t border-border flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => deyisdi([])}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            disabled={secilmisler.length === 0}
          >
            {t("service.clear")}
          </button>
          <Button size="sm" onClick={() => setAcik(false)} className="rounded-full h-8">
            {t("service.apply")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

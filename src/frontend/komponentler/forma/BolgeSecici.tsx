// Bölgə seçici — autocomplete + boş input zamanı kateqoriya görünüşü.
// Klik → popover açılır. Yazmağa başlayanda dropdown süzgəcdən keçir.

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  BOLGELER,
  bolgeleriQruplasdir,
  bolgeleriSuz,
  type Bolge,
  type BolgeQrupu,
} from "@/backend/melumat/bolgeler";

type Props = {
  deyer: Bolge | null;
  deyisdi: (b: Bolge | null) => void;
};

const QRUP_SIRASI: BolgeQrupu[] = [
  "Şimal",
  "Qərb",
  "Mərkəz",
  "Cənub",
  "Naxçıvan",
  "Qarabağ",
];

export const BolgeSecici = ({ deyer, deyisdi }: Props) => {
  const { t } = useTranslation();
  const [acik, setAcik] = useState(false);
  const [soz, setSoz] = useState("");

  // Yazılan mətnə görə süzülmüş bölgələr.
  const suzulmus = useMemo(() => bolgeleriSuz(soz), [soz]);
  const qruplar = useMemo(() => bolgeleriQruplasdir(suzulmus), [suzulmus]);
  const yazirMi = soz.trim().length > 0;

  const sec = (b: Bolge) => {
    deyisdi(b);
    setSoz("");
    setAcik(false);
  };

  return (
    <Popover open={acik} onOpenChange={setAcik}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/40 transition-colors w-full text-left"
        >
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              {t("hero.where")}
            </div>
            <div className="text-sm font-medium text-foreground truncate">
              {deyer ? `${deyer.ad}, ${deyer.rayon}` : t("hero.selectRegion")}
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[340px] p-0 bg-popover z-50 pointer-events-auto"
      >
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              value={soz}
              onChange={(e) => setSoz(e.target.value)}
              placeholder={t("hero.selectRegion")}
              className="pl-9"
            />
          </div>
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2">
          {/* Yazırsa düz siyahı, yazmırsa kateqoriya görünüşü */}
          {yazirMi ? (
            suzulmus.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                {t("regions.noResults")}
              </div>
            ) : (
              <ul className="space-y-1">
                {suzulmus.map((b) => (
                  <li key={`${b.ad}-${b.rayon}`}>
                    <button
                      type="button"
                      onClick={() => sec(b)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-foreground">{b.ad}</span>
                      <span className="text-xs text-muted-foreground">{b.rayon}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="space-y-3">
              {QRUP_SIRASI.map((qrup) => (
                <div key={qrup}>
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold text-primary">
                    {t(`regions.${qrup}`)}
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {qruplar[qrup].map((b) => (
                      <button
                        key={`${b.ad}-${b.rayon}`}
                        type="button"
                        onClick={() => sec(b)}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {b.ad}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-3 py-2 border-t border-border text-[11px] text-muted-foreground">
          Cəmi {BOLGELER.length} bölgə
        </div>
      </PopoverContent>
    </Popover>
  );
};

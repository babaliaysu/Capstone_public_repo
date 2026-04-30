// Hero altındakı axtarış paneli — Hara · Vaxt · Xidmət növü · Axtar.
// State-i daxili saxlayır, "Axtar" düyməsi /elanlar səhifəsinə URL parametrləri ilə yönəldir.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { BolgeSecici } from "@/frontend/komponentler/forma/BolgeSecici";
import { TarixSecici } from "@/frontend/komponentler/forma/TarixSecici";
import { XidmetSecici } from "@/frontend/komponentler/forma/XidmetSecici";
import type { Bolge } from "@/backend/melumat/bolgeler";

export const AxtarisPaneli = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Üç müstəqil state: bölgə, tarix aralığı, xidmət açarları
  const [bolge, setBolge] = useState<Bolge | null>(null);
  const [tarix, setTarix] = useState<DateRange | undefined>(undefined);
  const [xidmetler, setXidmetler] = useState<string[]>([]);

  // Axtar düyməsinə basıldıqda parametrlər URL-ə yazılır
  const axtar = () => {
    const p = new URLSearchParams();
    if (bolge) p.set("bolge", bolge.ad);
    if (tarix?.from) p.set("baslama", format(tarix.from, "yyyy-MM-dd"));
    if (tarix?.to) p.set("bitme", format(tarix.to, "yyyy-MM-dd"));
    if (xidmetler.length > 0) p.set("xidmet", xidmetler.join(","));
    navigate(`/elanlar?${p.toString()}`);
  };

  return (
    <div
      className="glass rounded-2xl p-2 md:p-3 shadow-elegant border border-white/40 max-w-3xl mx-auto md:mx-0 animate-fade-in"
      style={{ animationDelay: "0.6s", opacity: 0 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.1fr_auto] gap-1">
        <BolgeSecici deyer={bolge} deyisdi={setBolge} />
        <TarixSecici deyer={tarix} deyisdi={setTarix} />
        <XidmetSecici secilmisler={xidmetler} deyisdi={setXidmetler} />

        <Button
          size="lg"
          onClick={axtar}
          className="rounded-xl bg-gradient-warm text-primary-foreground hover:shadow-gold transition-all duration-300 px-6 h-auto md:h-full"
        >
          <Search className="h-5 w-5 md:mr-2" />
          <span className="md:inline">{t("hero.search")}</span>
        </Button>
      </div>
    </div>
  );
};

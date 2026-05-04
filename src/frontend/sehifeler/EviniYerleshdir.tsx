// Evini yerləşdir səhifəsi — kəndlinin evinin məlumatlarını daxil etdiyi sadə form.
// UI-only — submit zamanı toast göstərir (real DB əlavəsi sonradan).

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, ImagePlus, Sparkles, ArrowRight } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BolgeSecici } from "@/frontend/komponentler/forma/BolgeSecici";
import { XidmetSecici } from "@/frontend/komponentler/forma/XidmetSecici";
import { toast } from "sonner";
import type { Bolge } from "@/backend/melumat/bolgeler";
import { supabase } from "@/backend/supabase";
import { useSessiya } from "@/backend/qarmaqlar/useSessiya";

const EviniYerleshdir = () => {
  const navigate = useNavigate();
  const { istifadeci } = useSessiya();
  const [bolge, setBolge] = useState<Bolge | null>(null);
  const [xidmetler, setXidmetler] = useState<string[]>([]);
  const [ad, setAd] = useState("");
  const [tip, setTip] = useState("butov_ev");
  const [qiymet, setQiymet] = useState("");
  const [tesvir, setTesvir] = useState("");
  const [telefon, setTelefon] = useState("");
  const [yuklenir, setYuklenir] = useState(false);

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!istifadeci) {
      toast.error("Elan göndərmək üçün daxil ol.");
      navigate("/giris");
      return;
    }
    if (!ad || !bolge || !qiymet) {
      toast.error("Ad, bölgə və qiymət mütləqdir.");
      return;
    }
    setYuklenir(true);
    const { error } = await supabase.from("ev_sahibi_muracietleri").insert({
      istifadeci_id: istifadeci.id,
      ev_adi: ad,
      bolge: bolge.ad,
      rayon: bolge.rayon,
      tip,
      qiymet: Number(qiymet),
      tesvir,
      elaqe_telefon: telefon,
    });
    setYuklenir(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Elanın komandamız tərəfindən yoxlanılır. Email ilə bildiriş alacaqsan.");
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl font-medium text-foreground">
              Evini yerləşdir
            </h1>
            <p className="text-muted-foreground mt-2">
              Yalnız 3% komissiya. Hər rezervasiyaya sən təsdiq verirsən.
            </p>
          </div>

          <form
            onSubmit={gonder}
            className="bg-card rounded-2xl p-8 ring-1 ring-border shadow-soft space-y-6"
          >
            {/* Addım 1: əsas məlumatlar */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Əsas məlumatlar
              </h2>
              <div>
                <Label>Evin adı</Label>
                <Input
                  value={ad}
                  onChange={(e) => setAd(e.target.value)}
                  placeholder="məs. Xınalıq Daş Evi"
                />
              </div>
              <div>
                <Label>Yerləşmə növü</Label>
                <select
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="butov_ev">Bütöv ev</option>
                  <option value="xususi_otaq">Xüsusi otaq</option>
                  <option value="daxma">Daxma</option>
                  <option value="daw_ev">Daş ev</option>
                </select>
              </div>
              <div>
                <Label>Bölgə</Label>
                <div className="rounded-xl ring-1 ring-input">
                  <BolgeSecici deyer={bolge} deyisdi={setBolge} />
                </div>
              </div>
            </section>

            {/* Addım 2: media + xidmətlər */}
            <section className="space-y-4 border-t border-border pt-6">
              <h2 className="font-serif text-xl flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-primary" />
                Şəkillər və xidmətlər
              </h2>
              <button
                type="button"
                className="w-full h-32 rounded-xl border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ImagePlus className="h-6 w-6" />
                <span className="text-sm">Şəkilləri yüklə (tezliklə)</span>
              </button>
              <div>
                <Label>Təklif etdiyin fəaliyyətlər</Label>
                <div className="rounded-xl ring-1 ring-input">
                  <XidmetSecici secilmisler={xidmetler} deyisdi={setXidmetler} />
                </div>
              </div>
            </section>

            {/* Addım 3: qiymət + təsvir */}
            <section className="space-y-4 border-t border-border pt-6">
              <h2 className="font-serif text-xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Qiymət və təsvir
              </h2>
              <div>
                <Label>Gecəlik qiymət (AZN)</Label>
                <Input
                  type="number"
                  value={qiymet}
                  onChange={(e) => setQiymet(e.target.value)}
                  placeholder="məs. 65"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Komissiya (3%) qonağa göstərilən qiymətə əlavə olunur.
                </p>
              </div>
              <div>
                <Label>Təsvir</Label>
                <Textarea
                  rows={4}
                  value={tesvir}
                  onChange={(e) => setTesvir(e.target.value)}
                  placeholder="Evini, mühitini və qonağa təklif etdiklərini yaz..."
                />
              </div>
              <div>
                <Label>Əlaqə telefonu</Label>
                <Input
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  placeholder="+994 ..."
                />
              </div>
            </section>

            <Button
              type="submit"
              disabled={yuklenir}
              className="w-full bg-gradient-warm text-primary-foreground hover:shadow-gold"
            >
              {yuklenir ? "Göndərilir..." : "Elanı göndər"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>

      <AltPanel />
    </div>
  );
};

export default EviniYerleshdir;

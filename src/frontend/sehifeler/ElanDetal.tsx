// Elan detal səhifəsi — şəkillər qrid, sticky sifariş kartı, xidmətlər, Google Maps iframe.

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Bed,
  Home as HomeIcon,
  Wifi,
  Coffee,
  Car,
  Tv,
  Flame,
  Trees,
  Phone,
  MessageCircle,
} from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useElan } from "@/backend/qarmaqlar/useElanlar";
import { XIDMETLER } from "@/backend/melumat/xidmetler";
import { toast } from "sonner";

// İmkan adı → ikon uyğunlaşdırması
const IKONLAR: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Parkinq": Car,
  "Mətbəx": Coffee,
  "Televizor": Tv,
  "İstilik": Flame,
  "Bağça": Trees,
  "Səhər yeməyi": Coffee,
  "Hovuz": Trees,
};

const ElanDetal = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { elan, yuklenir } = useElan(id);

  const [giris, setGiris] = useState("");
  const [cixis, setCixis] = useState("");
  const [qonaq, setQonaq] = useState(2);

  if (yuklenir) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <YuxariPanel />
        <main className="flex-1 flex items-center justify-center pt-32 pb-20">
          <p className="text-muted-foreground">Yüklənir...</p>
        </main>
        <AltPanel />
      </div>
    );
  }

  if (!elan) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <YuxariPanel />
        <main className="flex-1 flex items-center justify-center pt-32 pb-20">
          <div className="text-center">
            <h1 className="font-serif text-3xl">Elan tapılmadı</h1>
            <Link to="/elanlar" className="text-primary underline mt-3 inline-block">
              Bütün elanlara qayıt
            </Link>
          </div>
        </main>
        <AltPanel />
      </div>
    );
  }

  const yekunQiymet = Math.round(elan.qiymet * 1.03);
  const gece = giris && cixis
    ? Math.max(1, Math.round((+new Date(cixis) - +new Date(giris)) / 86400000))
    : 0;

  const sifaris = () => {
    if (!giris || !cixis) {
      toast.error("Tarixləri seç.");
      return;
    }
    toast.success(`Sorğu göndərildi! ${gece} gecə üçün ev sahibinin təsdiqini gözlə.`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Axtarışa davam et
          </button>

          {/* Şəkillər qriddi */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden mb-8 aspect-[16/8]">
            <img
              src={elan.sekiller[0]}
              alt={elan.baslq}
              className="col-span-2 row-span-2 w-full h-full object-cover"
            />
            {elan.sekiller.slice(1, 5).map((s, i) => (
              <img
                key={i}
                src={s}
                alt={`${elan.baslq} ${i + 2}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            {/* SOL: Detallar */}
            <div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
                  {elan.baslq}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {elan.rayon}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    {elan.reyting} ({elan.rey_sayi} rəy)
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {elan.metr} m² · {elan.qonaq} qonaq · {elan.yatag} yataq otağı
                </p>
              </div>

              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-serif text-2xl mb-3">Bu məkan haqqında</h2>
                <p className="text-foreground/80 leading-relaxed">{elan.tesvir}</p>
              </div>

              {/* Mövcud xidmətlər (imkanlar) */}
              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-serif text-2xl mb-4">Mövcud xidmətlər</h2>
                <div className="grid grid-cols-2 gap-3">
                  {elan.imkanlar.map((im) => {
                    const I = IKONLAR[im] || HomeIcon;
                    return (
                      <div
                        key={im}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/60"
                      >
                        <I className="h-4 w-4 text-primary" />
                        <span className="text-sm">{im}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fəaliyyətlər */}
              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-serif text-2xl mb-4">Təklif olunan fəaliyyətlər</h2>
                <div className="flex flex-wrap gap-2">
                  {elan.xidmetler.map((acar) => {
                    const x = XIDMETLER.find((y) => y.acar === acar);
                    if (!x) return null;
                    const I = x.ikon;
                    return (
                      <span
                        key={acar}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium"
                      >
                        <I className="h-3 w-3" />
                        {x.ad}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Otaqlar */}
              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-serif text-2xl mb-4">Otaqlar</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl ring-1 ring-border">
                    <Bed className="h-5 w-5 text-primary" />
                    <p className="font-medium mt-2">Yataq otağı</p>
                    <p className="text-sm text-muted-foreground">
                      {elan.yatag} yataq
                    </p>
                  </div>
                  <div className="p-4 rounded-xl ring-1 ring-border">
                    <HomeIcon className="h-5 w-5 text-primary" />
                    <p className="font-medium mt-2">Vanna otağı</p>
                    <p className="text-sm text-muted-foreground">1 vanna</p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-serif text-2xl mb-4">Yerləşmə xəritədə</h2>
                <div className="rounded-2xl overflow-hidden ring-1 ring-border shadow-soft aspect-video">
                  <iframe
                    title={`${elan.baslq} xəritə`}
                    src={`https://www.google.com/maps?q=${elan.enlik ?? 40.4},${elan.uzunluq ?? 49.85}&z=12&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  📍 {elan.rayon} · Dəqiq ünvan rezervasiya təsdiqindən sonra paylaşılır
                </p>
              </div>

              {/* Ev sahibi əlaqəsi */}
              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-serif text-2xl mb-4">Ev sahibi ilə əlaqə</h2>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40">
                  <div className="h-14 w-14 rounded-full bg-gradient-warm text-background flex items-center justify-center text-xl font-semibold">
                    {elan.ev_sahibi[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{elan.ev_sahibi}</p>
                    <p className="text-xs text-muted-foreground">Ev sahibi</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Phone className="h-3 w-3 mr-1" />
                    Zəng
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Mesaj
                  </Button>
                </div>
              </div>
            </div>

            {/* SAĞ: Sticky sifariş kartı */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="bg-card rounded-2xl p-5 ring-1 ring-border shadow-elegant">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-3xl font-semibold text-foreground">
                    {yekunQiymet}₼
                  </span>
                  <span className="text-sm text-muted-foreground">/ gecə</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <Label className="text-[10px] uppercase">Giriş</Label>
                    <Input
                      type="date"
                      value={giris}
                      onChange={(e) => setGiris(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] uppercase">Çıxış</Label>
                    <Input
                      type="date"
                      value={cixis}
                      onChange={(e) => setCixis(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="text-[10px] uppercase">Qonaqlar</Label>
                  <Input
                    type="number"
                    min={1}
                    max={elan.qonaq}
                    value={qonaq}
                    onChange={(e) => setQonaq(+e.target.value)}
                  />
                </div>

                <Button
                  onClick={sifaris}
                  className="w-full bg-gradient-warm text-primary-foreground hover:shadow-gold"
                >
                  Sifariş et
                </Button>

                <p className="text-[11px] text-muted-foreground text-center mt-2">
                  Bu mərhələdə ödəniş alınmır
                </p>

                {gece > 0 && (
                  <div className="border-t border-border mt-4 pt-3 text-sm">
                    <div className="flex justify-between">
                      <span>
                        {yekunQiymet}₼ × {gece} gecə
                      </span>
                      <span>{yekunQiymet * gece}₼</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2">
                      <span>Cəmi</span>
                      <span>{yekunQiymet * gece}₼</span>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <AltPanel />
    </div>
  );
};

export default ElanDetal;
// Region detal səhifəsi — filter bar (5 dropdown), breadcrumbs, listing kartlar.

import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, MapPin, Star, Bed, ArrowRight, Home } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useElanlar } from "@/backend/qarmaqlar/useElanlar";
import { useRegionlar } from "@/backend/qarmaqlar/useRegionlar";
import { XIDMETLER } from "@/backend/melumat/xidmetler";

const TIP_ETIKETLERI: Record<string, string> = {
  butov_ev: "Bütöv ev",
  xususi_otaq: "Xüsusi otaq",
  daxma: "Daxma",
  daw_ev: "Daş ev",
};

const QIYMET_ARALIQI = [
  { ad: "Hamısı", min: 0, max: Infinity },
  { ad: "0–50 ₼", min: 0, max: 50 },
  { ad: "50–100 ₼", min: 50, max: 100 },
  { ad: "100+ ₼", min: 100, max: Infinity },
];

const REYTING_ARALIQI = [
  { ad: "Hamısı", min: 0 },
  { ad: "4.5+", min: 4.5 },
  { ad: "4.8+", min: 4.8 },
  { ad: "4.9+", min: 4.9 },
];

const RegionDetal = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const { regionlar } = useRegionlar();
  const region = regionlar.find((r) => r.slug === slug);
  const { elanlar: butunElanlar } = useElanlar(slug);

  const [xidmet, setXidmet] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [fealiyyet, setFealiyyet] = useState<string | null>(null);
  const [qiymet, setQiymet] = useState(QIYMET_ARALIQI[0]);
  const [reyting, setReyting] = useState(REYTING_ARALIQI[0]);

  // Filterləri tətbiq et
  const elanlar = useMemo(() => {
    return butunElanlar.filter((e) => {
      if (xidmet && !e.xidmetler.includes(xidmet)) return false;
      if (tip && e.tip !== tip) return false;
      if (fealiyyet && !e.xidmetler.includes(fealiyyet)) return false;
      if (e.qiymet < qiymet.min || e.qiymet > qiymet.max) return false;
      if (e.reyting < reyting.min) return false;
      return true;
    });
  }, [butunElanlar, xidmet, tip, fealiyyet, qiymet, reyting]);

  if (!region) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <YuxariPanel />
        <main className="flex-1 flex items-center justify-center pt-32 pb-20">
          <div className="text-center">
            <h1 className="font-serif text-3xl">Region tapılmadı</h1>
            <Link to="/regionlar" className="text-primary underline mt-3 inline-block">
              Regionlara qayıt
            </Link>
          </div>
        </main>
        <AltPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* FILTER BAR */}
          <div className="bg-card rounded-2xl p-3 ring-1 ring-border shadow-soft flex flex-wrap gap-2 mb-5">
            {/* Xidmətlər */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  Xidmətlər: {xidmet ? XIDMETLER.find((x) => x.acar === xidmet)?.ad : "Hamısı"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover z-50 max-h-72 overflow-y-auto">
                <DropdownMenuLabel>Xidmət növü</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setXidmet(null)}>Hamısı</DropdownMenuItem>
                {XIDMETLER.map((x) => (
                  <DropdownMenuItem key={x.acar} onClick={() => setXidmet(x.acar)}>
                    {x.ad}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Yerləşmə növü */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  Yerləşmə növü: {tip ? TIP_ETIKETLERI[tip] : "Hamısı"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover z-50">
                <DropdownMenuItem onClick={() => setTip(null)}>Hamısı</DropdownMenuItem>
                {Object.entries(TIP_ETIKETLERI).map(([k, v]) => (
                  <DropdownMenuItem key={k} onClick={() => setTip(k)}>
                    {v}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Fəaliyyətlər */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  Fəaliyyətlər:{" "}
                  {fealiyyet
                    ? XIDMETLER.find((x) => x.acar === fealiyyet)?.ad
                    : "Hamısı"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover z-50 max-h-72 overflow-y-auto">
                <DropdownMenuItem onClick={() => setFealiyyet(null)}>Hamısı</DropdownMenuItem>
                {XIDMETLER.map((x) => (
                  <DropdownMenuItem key={x.acar} onClick={() => setFealiyyet(x.acar)}>
                    {x.ad}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Gecəlik qiymət */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  Gecəlik qiymət: {qiymet.ad}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover z-50">
                {QIYMET_ARALIQI.map((q) => (
                  <DropdownMenuItem key={q.ad} onClick={() => setQiymet(q)}>
                    {q.ad}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reytinq */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  Reytinq: {reyting.ad}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover z-50">
                {REYTING_ARALIQI.map((r) => (
                  <DropdownMenuItem key={r.ad} onClick={() => setReyting(r)}>
                    {r.ad}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* BREADCRUMBS */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary inline-flex items-center gap-1">
              <Home className="h-3 w-3" />
              Ana səhifə
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/regionlar" className="hover:text-primary">Regionlar</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{region.ad}</span>
          </nav>

          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              {region.ad}
            </h1>
            <p className="text-muted-foreground mt-1">
              {elanlar.length} elan tapıldı · {region.qisa_tesvir}
            </p>
          </div>

          {/* LISTING CARDS */}
          {elanlar.length === 0 ? (
            <div className="text-center py-20 bg-secondary/40 rounded-2xl">
              <p className="text-muted-foreground">
                Bu filterlər üzrə elan tapılmadı. Filterləri sıfırla.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {elanlar.map((e) => {
                const yekunQiymet = Math.round(e.qiymet * 1.03);
                return (
                  <article
                    key={e.id}
                    className="group bg-card rounded-2xl overflow-hidden ring-1 ring-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={e.sekiller[0]}
                        alt={e.baslq}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Sol kuncdə xəritə ikonu + kənd adı */}
                      <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-dark text-background text-[11px] font-semibold backdrop-blur-md">
                        <MapPin className="h-3 w-3 text-gold" />
                        {e.rayon}
                      </div>
                      <div className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full glass-dark text-background text-[11px] font-semibold">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        {e.reyting}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {e.baslq}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-1">
                        <span className="inline-flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          {e.yatag}
                        </span>
                        <span>· {e.metr}m²</span>
                        <span>· {TIP_ETIKETLERI[e.tip]}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2 min-h-[20px]">
                        {e.xidmetler.slice(0, 3).map((acar) => {
                          const x = XIDMETLER.find((y) => y.acar === acar);
                          if (!x) return null;
                          return (
                            <span
                              key={acar}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                            >
                              {x.ad}
                            </span>
                          );
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <div>
                          <span className="font-serif text-lg font-semibold text-foreground">
                            {yekunQiymet}₼
                          </span>
                          <span className="text-[11px] text-muted-foreground"> / gecə</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/elan/${e.slug}`)}
                          className="rounded-full bg-gradient-warm text-primary-foreground hover:shadow-gold h-8 text-xs"
                        >
                          Təklifə bax
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <AltPanel />
    </div>
  );
};

export default RegionDetal;

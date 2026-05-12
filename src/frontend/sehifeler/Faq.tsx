// FAQ — Premium dizayn: kateqoriyalar, axtarış, top suallar, scroll-reveal, CTA bloku.

import { useMemo, useState } from "react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Search,
  Sparkles,
  Users,
  Home,
  CreditCard,
  Phone,
  MessageCircle,
} from "lucide-react";

// Kateqoriya tipi və sual strukturu
type Kateqoriya = "hamisi" | "qonaq" | "evsahibi" | "odenis";

interface Sual {
  s: string;
  c: string;
  k: Exclude<Kateqoriya, "hamisi">;
  top?: boolean;
}

const SUALLAR: Sual[] = [
  {
    s: "Rezervasiya necə edilir?",
    c: "Bəyəndiyin elanı seç, tarix və qonaq sayını göstər, 'Sifariş et' düyməsinə bas. Ev sahibi 24 saat ərzində təsdiq edir, bundan sonra ödəniş səhifəsinə yönləndirilirsən.",
    k: "qonaq",
    top: true,
  },
  {
    s: "Ödəniş təhlükəsizdirmi? Pul birbaşa ev sahibinə çatır?",
    c: "Bütün ödənişlər platforma vasitəsilə təhlükəsiz şəkildə aparılır. Qonaq evdən razı qaldıqdan sonra ev sahibinə pul köçürülür — bu həm sənin, həm də ev sahibinin mənafeyini qoruyur.",
    k: "odenis",
    top: true,
  },
  {
    s: "Ləğv etmə qaydaları necədir?",
    c: "Hər elanın öz lağv siyasəti var (Esnek / Orta / Sərt). Sifariş etməzdən əvvəl elanın səhifəsində 'Ləğv siyasəti' bölməsini oxu. Esnek siyasətdə 48 saat öncə tam geri qaytarma mümkündür.",
    k: "qonaq",
    top: true,
  },
  {
    s: "Komissiya nə qədərdir?",
    c: "Yalnız 3% xidmət haqqı tutulur. Bu, Azərbaycan bazarında ən aşağı komissiyalardan biridir — məqsədimiz kənd icmalarına maksimum gəlir qazandırmaqdır.",
    k: "evsahibi",
    top: true,
  },
  {
    s: "Şəkillərlə real vəziyyət fərqli olsa, nə etməliyəm?",
    c: "Dərhal dəstək komandamızla əlaqə saxla. Şəkilləri çək və bizə göndər. Uyğunsuzluq təsdiqlənərsə tam geri qaytarma və ya alternativ ev təklif edirik.",
    k: "qonaq",
  },
  {
    s: "Evimi necə qeyd edə bilərəm?",
    c: "'Elan yerləşdir' düyməsinə bas, 3 sadə addımda evinin məlumatlarını və şəkillərini yüklə. Komandamız 48 saat ərzində yoxlayıb təsdiq edir.",
    k: "evsahibi",
  },
  {
    s: "Ev sahibi olaraq nə qədər qazana bilərəm?",
    c: "Bu, evin yerindən, ölçüsündən və mövsümdən asılıdır. Orta hesabla aktiv ev sahiblərimiz ayda 800-3000 AZN qazanırlar. Tamamilə sənin nəzarətindədir.",
    k: "evsahibi",
  },
  {
    s: "Hansı kart və ödəniş üsulları qəbul olunur?",
    c: "Visa, Mastercard, AzeriCard və digər yerli bank kartları. Yaxın gələcəkdə Apple Pay və Google Pay də əlavə ediləcək.",
    k: "odenis",
  },
  {
    s: "Faktura ala bilərəmmi?",
    c: "Bəli, hər ödənişdən sonra emailə avtomatik faktura göndərilir. Korporativ müştərilər üçün ayrıca rəsmi sənədlər də verilir.",
    k: "odenis",
  },
];

const KATEQORIYALAR: { id: Kateqoriya; ad: string; ikon: typeof Users }[] = [
  { id: "hamisi", ad: "Hamısı", ikon: Sparkles },
  { id: "qonaq", ad: "Qonaqlar", ikon: Users },
  { id: "evsahibi", ad: "Ev sahibləri", ikon: Home },
  { id: "odenis", ad: "Ödəniş", ikon: CreditCard },
];

const Faq = () => {
  const [aktivKat, setAktivKat] = useState<Kateqoriya>("hamisi");
  const [axtaris, setAxtaris] = useState("");

  const topSuallar = useMemo(() => SUALLAR.filter((s) => s.top), []);

  const filtirlenmis = useMemo(() => {
    return SUALLAR.filter((s) => {
      const katUygun = aktivKat === "hamisi" || s.k === aktivKat;
      const ax = axtaris.trim().toLowerCase();
      const axUygun =
        !ax || s.s.toLowerCase().includes(ax) || s.c.toLowerCase().includes(ax);
      return katUygun && axUygun;
    });
  }, [aktivKat, axtaris]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />

      {/* Hero — tünd yaşıl + qızıl aksent */}
      <section id="faq-hero" className="relative pt-32 pb-20 bg-gradient-forest overflow-hidden">
        <div className="pointer-events-none absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-accent/15 blur-3xl" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 backdrop-blur-md border border-background/20">
              <HelpCircle className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider text-background">
                Yardım Mərkəzi
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-medium text-background drop-shadow-2xl">
              Tez-tez verilən <span className="italic text-gold">suallar</span>
            </h1>
            <p className="text-background/80 max-w-xl mx-auto text-lg">
              Kəndim platforması haqqında bilmək istədiklərinə cavablar — və daha çoxu.
            </p>

            {/* Axtarış paneli — glassmorphic */}
            <div className="max-w-xl mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-background/60" />
                <Input
                  value={axtaris}
                  onChange={(e) => setAxtaris(e.target.value)}
                  placeholder="Sualını yaz..."
                  className="pl-11 h-12 bg-background/10 backdrop-blur-md border-background/30 text-background placeholder:text-background/50 focus-visible:ring-gold"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 -mt-10 pb-20 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Top Suallar — bento qızıl kartlar */}
          {!axtaris && aktivKat === "hamisi" && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="h-4 w-4 text-gold" />
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Ən populyar suallar
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {topSuallar.map((q, i) => (
                  <a
                    key={i}
                    href={`#sual-${SUALLAR.indexOf(q)}`}
                    className="group p-5 rounded-2xl bg-card ring-1 ring-border hover:ring-gold hover:shadow-gold transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold font-bold text-sm">
                        {i + 1}
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {q.s}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Kateqoriya filtrleri */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {KATEQORIYALAR.map((k) => {
              const Ikon = k.ikon;
              const aktiv = aktivKat === k.id;
              return (
                <button
                  key={k.id}
                  onClick={() => setAktivKat(k.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    aktiv
                      ? "bg-primary text-primary-foreground shadow-elegant scale-105"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  <Ikon className="h-3.5 w-3.5" />
                  {k.ad}
                </button>
              );
            })}
          </div>

          {/* Suallar accordion — reveal-on-scroll fade-in */}
          {filtirlenmis.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              Sualına uyğun nəticə tapılmadı.
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="bg-card rounded-2xl p-2 ring-1 ring-border shadow-soft"
            >
              {filtirlenmis.map((q) => {
                const idx = SUALLAR.indexOf(q);
                return (
                  <AccordionItem
                    key={idx}
                    id={`sual-${idx}`}
                    value={`item-${idx}`}
                    className="border-b last:border-0 animate-fade-in"
                  >
                    <AccordionTrigger className="px-4 text-left font-medium hover:no-underline hover:text-primary">
                      {q.s}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                      {q.c}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}

          {/* CTA bloku — "Daha çox kömək lazımdır?" */}
          <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-forest p-8 md:p-12 text-center ring-1 ring-gold/30">
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative z-10 space-y-5 max-w-xl mx-auto">
              <div className="inline-flex w-12 h-12 rounded-full bg-gold/20 items-center justify-center mx-auto">
                <MessageCircle className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-medium text-background">
                Cavabını <span className="italic text-gold">tapmadın?</span>
              </h3>
              <p className="text-background/80">
                Komandamız hər gün səhər 9-dan axşam 9-a qədər səninlə əlaqədədir.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-gold-foreground hover:bg-gold/90 hover:shadow-gold font-semibold rounded-full px-6 transition-all hover:scale-105"
                >
                  <a
                    href="https://wa.me/994500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp-da yaz
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 border-background/40 bg-background/5 text-background hover:bg-background/15 hover:text-background backdrop-blur-md transition-all hover:scale-105"
                >
                  <a href="tel:+994500000000">
                    <Phone className="h-4 w-4 mr-2" />
                    Zəng et
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AltPanel />
    </div>
  );
};

export default Faq;

// Haqqımızda — Kəndim layihəsinin missiya və hekayəsi.
// Tünd yaşıl + qızılı palitra. Bento-style bloklar, white-space dolu.

import { Link } from "react-router-dom";
import { Leaf, HeartHandshake, MountainSnow, Sprout, ArrowRight } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";
import xinaliq from "@/frontend/medialar/banner/xinaliq-mountains.jpg";

const Haqqimizda = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
          <img
            src={xinaliq}
            alt="Azərbaycan kənd mənzərəsi"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background" />
          <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-end pb-16">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">
              Haqqımızda
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium text-background max-w-3xl leading-tight drop-shadow-2xl">
              Biz Azərbaycan kəndlərinin
              <span className="block italic text-gold font-light">ruhuna inanırıq</span>
            </h1>
          </div>
        </section>

        {/* Hekayəmiz */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Hekayəmiz
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
              <p>
                Bir tərəfdə Xınalıqda evi olan Səkinə xala vardı —
                qonaq qəbul etmək istəyirdi, amma necə tapacağını bilmirdi.
                Digər tərəfdə Bakıdan gələn ailə vardı — əsl kənd həyatını
                axtarırdı, otel deyil, ailə.
              </p>
              <p>
                <span className="font-semibold text-primary">Kəndim</span> bu iki ehtiyacın
                arasında körpü olaraq doğuldu. Biz nə otel platformasıyıq, nə də turizm agentliyi.
                Biz Azərbaycan kəndlərinin qapısıyıq.
              </p>
            </div>
          </div>
        </section>

        {/* Missiya — tünd yaşıl bento blok */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="container mx-auto px-6 relative">
            <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">
              Missiyamız
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Sprout,
                  ad: "Sosial-iqtisadi inkişaf",
                  metn: "Kənd sakinlərinə əlavə gəlir mənbəyi yaratmaq və yerli iqtisadiyyatı gücləndirmək.",
                },
                {
                  icon: MountainSnow,
                  ad: "Kənd turizminin inkişafı",
                  metn: "Azərbaycanın gizli kənd qiymətlilərini ölkə və dünya üçün açmaq.",
                },
                {
                  icon: HeartHandshake,
                  ad: "Səmimi qonaqpərvərlik",
                  metn: "Otel sterilliyi yox, ailə hərarəti — qonaq evin bir hissəsi olur.",
                },
                {
                  icon: Leaf,
                  ad: "Təbiətin qorunması",
                  metn: "Mövcud evlərdə qonaqpərvərlik — yeni tikinti yox, davamlı turizm.",
                },
              ].map(({ icon: Icon, ad, metn }, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-7 bg-background/5 ring-1 ring-gold/20 backdrop-blur-sm hover:bg-background/10 transition-all duration-500 hover:-translate-y-1"
                >
                  <Icon className="h-8 w-8 text-gold mb-4" strokeWidth={1.4} />
                  <h3 className="font-serif text-xl mb-2">{ad}</h3>
                  <p className="text-sm text-primary-foreground/75 leading-relaxed">{metn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rəqəmlərlə biz */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12">
              Rəqəmlərlə biz
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { reqem: "120+", ad: "Qoşulan kənd" },
                { reqem: "240+", ad: "Xoşbəxt ev sahibi" },
                { reqem: "2 400+", ad: "Uğurlu rezervasiya" },
                { reqem: "26", ad: "Region" },
              ].map((r, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-secondary/40 ring-1 ring-border"
                >
                  <div className="font-serif text-4xl md:text-5xl text-primary font-medium">
                    {r.reqem}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
                    {r.ad}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dəyərlərimiz */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10">
              Dəyərlərimiz
            </h2>
            <div className="space-y-5">
              {[
                ["Şəffaflıq", "Yalnız 3% komissiya — heç bir gizli ödəniş yoxdur."],
                ["Yerli icmaya dəstək", "Hər rezervasiyanın 97%-i birbaşa ev sahibinə gedir."],
                ["Təbiətin qorunması", "Mövcud evlər, yerli ərzaq, davamlı turizm."],
                ["Səmimiyyət", "Stok şəkillər yox — real evlər, real insanlar."],
              ].map(([ad, metn], i) => (
                <div key={i} className="flex gap-4 items-baseline">
                  <span className="font-serif text-2xl text-gold w-10 shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-foreground">{ad}</h3>
                    <p className="text-muted-foreground">{metn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
          <div className="container mx-auto px-6 relative text-center max-w-2xl">
            <h2 className="font-serif text-3xl md:text-5xl mb-4">
              Sən də bizə qoşul
            </h2>
            <p className="text-background/70 mb-8">
              İstər qonaq, istər ev sahibi ol — Kəndim sənin də hekayənə yer açır.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/regionlar">
                <Button className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90 px-7 h-12">
                  Ev tap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/evini-yerlesdir">
                <Button
                  variant="outline"
                  className="rounded-full border-background/40 text-background bg-transparent hover:bg-background/10 px-7 h-12"
                >
                  Elan yerləşdir
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <AltPanel />
    </div>
  );
};

export default Haqqimizda;

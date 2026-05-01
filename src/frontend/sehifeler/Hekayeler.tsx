// Hekayələr — kənd qonaqlarının paylaşdığı qısa hekayələr.

import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import home1 from "@/frontend/medialar/evler/home1.jpg";
import home4 from "@/frontend/medialar/evler/home4.jpg";
import home6 from "@/frontend/medialar/evler/home6.jpg";

const HEKAYELER = [
  {
    sekil: home1,
    baslq: "Xınalıqda 5 gün — bir ömrə bərabər",
    muellif: "Aysel M.",
    parca: "Səkinə xala bizi ailəsi kimi qarşıladı. Kəcdiyimiz hər gün, axşam tonqalı və ulduzlar...",
  },
  {
    sekil: home4,
    baslq: "Lahıcda misgər ustanın yanında",
    muellif: "Tural H.",
    parca: "Aydın usta əlimə çəkici verəndə, illərin ənənəsinə toxundum. Daş döşəmə küçələrdə...",
  },
  {
    sekil: home6,
    baslq: "Balakən meşəsində səhər",
    muellif: "Markus W.",
    parca: "Çay səsi ilə oyandım. Pəncərədən baxanda meşənin sıxlığını gördüm — heç bir otelin verə bilməyəcəyi bir hiss.",
  },
];

const Hekayeler = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <YuxariPanel />
    <main className="flex-1 pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            Hekayələr
          </h1>
          <p className="text-muted-foreground mt-2">
            Kəndim qonaqlarının paylaşdığı təcrübələr
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEKAYELER.map((h, i) => (
            <article
              key={i}
              className="bg-card rounded-2xl overflow-hidden ring-1 ring-border shadow-soft hover:shadow-elegant transition-all duration-500 group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={h.sekil}
                  alt={h.baslq}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {h.baslq}
                </h2>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{h.parca}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">— {h.muellif}</span>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                    Oxu <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/" className="text-primary underline text-sm">
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    </main>
    <AltPanel />
  </div>
);

export default Hekayeler;

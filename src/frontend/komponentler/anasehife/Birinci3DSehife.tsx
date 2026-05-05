// Birinci 3D Səhifə — açılışdakı immersive Hero ekran.
// Editlər:
//  - "Kəndim" yazısı bir az yuxarıda
//  - Alt ağ yazı silindi
//  - Karusel kartları daha kiçik və mausla saga-sola sürüklənə bilir (drag-scroll)
//  - Arxa fon mausla dəyişmir (Sehne3D-də ləğv edildi)

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin, Star } from "lucide-react";
import { Sehne3D } from "./Sehne3D";
import { useElanlar } from "@/backend/qarmaqlar/useElanlar";

const HERFLER = ["K", "ə", "n", "d", "i", "m"];

export const Birinci3DSehife = () => {
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHazir(true), 150);
    return () => clearTimeout(t);
  }, []);

  const { elanlar } = useElanlar();
  const karuselElanlari = elanlar.slice(0, 8);

  // Sürükləmə (drag-to-scroll) məntiqi
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ aktiv: false, startX: 0, scrollX: 0 });

  const dragBasla = (clientX: number) => {
    if (!trackRef.current) return;
    drag.current = {
      aktiv: true,
      startX: clientX,
      scrollX: trackRef.current.scrollLeft,
    };
  };
  const dragHerek = (clientX: number) => {
    if (!drag.current.aktiv || !trackRef.current) return;
    trackRef.current.scrollLeft =
      drag.current.scrollX - (clientX - drag.current.startX);
  };
  const dragBitir = () => {
    drag.current.aktiv = false;
  };

  const ikinciyeKes = () => {
    document.getElementById("ikinci-sehife")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100">
      {/* 3D arxa plan */}
      <div className="absolute inset-0">
        <Sehne3D />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/30 to-transparent" />

      {/* "Kəndim" yazısı — bir az yuxarıda */}
      <div className="relative z-10 h-full flex flex-col items-center px-6 pt-[18vh]">
        <h1
          className="font-serif font-semibold text-foreground select-none"
          style={{ perspective: "800px", transformStyle: "preserve-3d" }}
        >
          <span className="flex items-end gap-1 md:gap-2 text-7xl md:text-9xl drop-shadow-2xl">
            {HERFLER.map((h, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-700 ease-out"
                style={{
                  transform: hazir
                    ? "translateY(0) translateZ(0) scale(1)"
                    : "translateY(80px) translateZ(-200px) scale(0.4)",
                  opacity: hazir ? 1 : 0,
                  transitionDelay: `${i * 130}ms`,
                  textShadow:
                    "0 6px 24px hsl(145 45% 22% / 0.45), 0 2px 0 hsl(42 70% 50% / 0.3)",
                  background:
                    "linear-gradient(180deg, hsl(145 45% 22%) 0%, hsl(90 35% 38%) 60%, hsl(42 70% 50%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {h}
              </span>
            ))}
          </span>
        </h1>

        {/* Karusel — daha kiçik kartlar, mausla sürüklənir */}
        <div
          className="absolute bottom-24 left-0 right-0"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={trackRef}
            onMouseDown={(e) => dragBasla(e.clientX)}
            onMouseMove={(e) => dragHerek(e.clientX)}
            onMouseUp={dragBitir}
            onMouseLeave={dragBitir}
            onTouchStart={(e) => dragBasla(e.touches[0].clientX)}
            onTouchMove={(e) => dragHerek(e.touches[0].clientX)}
            onTouchEnd={dragBitir}
            className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-8 pb-4 mask-fade scroll-smooth select-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {karuselElanlari.map((e, i) => (
              <Link
                key={`${e.id}-${i}`}
                to={`/elan/${e.slug}`}
                draggable={false}
                onClick={(ev) => {
                  // əgər sürükləmə baş veribsə klik baş vermir
                  if (Math.abs(ev.clientX - drag.current.startX) > 5) ev.preventDefault();
                }}
                className="block w-52 shrink-0 rounded-xl overflow-hidden bg-card shadow-elegant ring-1 ring-border hover:ring-gold transition-all duration-500"
                style={{
                  transform: `rotateY(${i % 2 === 0 ? -8 : -4}deg)`,
                  transformOrigin: "center",
                }}
              >
                <div className="relative h-32">
                  <img
                    src={e.sekiller[0]}
                    alt={e.baslq}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-background">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5 text-gold" />
                        {e.rayon}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-2.5 w-2.5 fill-gold text-gold" />
                        {e.reyting}
                      </span>
                    </div>
                    <h3 className="font-serif text-xs font-semibold mt-0.5 truncate">
                      {e.baslq}
                    </h3>
                    <div className="text-[11px] text-gold font-semibold">
                      {Math.round(e.qiymet * 1.03)}₼/gecə
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={ikinciyeKes}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/80 hover:text-foreground transition-colors animate-bounce"
        >
          <span className="text-[11px] uppercase tracking-widest font-semibold">
            Aşağı kəş et
          </span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      <style>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%);
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

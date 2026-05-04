// Birinci 3D Səhifə — açılışdakı immersive Hero ekran.
// İçərisində: 3D arxa plan (dağ + buludlar + kamera dolly),
// mərkəzdə hərf-hərf gələn "Kəndim" yazısı, altda sağdan-sola
// 3D perspektiv ilə hərəkət edən elan kartları karuselı.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin, Star } from "lucide-react";
import { Sehne3D } from "./Sehne3D";
import { useElanlar } from "@/backend/qarmaqlar/useElanlar";

// "Kəndim" hərflər massivi (boş sətir bölmür, AZ hərfləri ilə)
const HERFLER = ["K", "ə", "n", "d", "i", "m"];

export const Birinci3DSehife = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [hazir, setHazir] = useState(false);

  // Hərflərin animasiyası üçün kiçik gecikmə
  useEffect(() => {
    const t = setTimeout(() => setHazir(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Mausu izlə (paralaks üçün)
  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);
    mouse.current = { x, y };
  };

  // Karusel üçün ikiqat siyahı (sonsuz dövr effekti üçün)
  const { elanlar } = useElanlar();
  const karuselElanlari = [...elanlar.slice(0, 5), ...elanlar.slice(0, 5)];

  // İkinci sehifeye yumusaq scroll
  const ikinciyeKes = () => {
    const ikinci = document.getElementById("ikinci-sehife");
    ikinci?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      onMouseMove={mouseMove}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100"
    >
      {/* 3D arxa plan (full-bleed) */}
      <div className="absolute inset-0">
        <Sehne3D mouse={mouse} />
      </div>

      {/* Üst yumşaq qradiyent örtük — mətnin oxunaqlığı üçün */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/30 to-transparent" />

      {/* Mərkəzi içərik */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Hərf-hərf "Kəndim" — interaktiv mausla yüngül 3D dönüş */}
        <h1
          className="font-serif font-semibold text-foreground select-none"
          style={{
            perspective: "800px",
            transformStyle: "preserve-3d",
          }}
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

        <p
          className="mt-5 max-w-xl text-center text-foreground/80 text-base md:text-lg font-medium px-6 py-2 rounded-full bg-background/40 backdrop-blur-md border border-background/40 transition-all duration-700"
          style={{
            opacity: hazir ? 1 : 0,
            transform: hazir ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1000ms",
          }}
        >
          Azərbaycan kəndlərinin nəfəsini yaşa
        </p>

        {/* 3D perspektiv karusel */}
        <div
          className="absolute bottom-28 left-0 right-0"
          style={{
            perspective: "1200px",
          }}
        >
          <div className="relative h-44 overflow-hidden mask-fade">
            <div
              className="flex gap-6 animate-karusel-sol"
              style={{
                width: "fit-content",
                transformStyle: "preserve-3d",
              }}
            >
              {karuselElanlari.map((e, i) => (
                <Link
                  key={`${e.id}-${i}`}
                  to={`/elan/${e.slug}`}
                  className="block w-72 shrink-0 rounded-2xl overflow-hidden bg-card shadow-elegant ring-1 ring-border hover:ring-gold transition-all duration-500"
                  style={{
                    transform: "rotateY(-12deg) rotateX(2deg)",
                    transformOrigin: "center",
                  }}
                >
                  <div className="relative h-44">
                    <img
                      src={e.sekiller[0]}
                      alt={e.baslq}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-background">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gold" />
                          {e.rayon}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3 fill-gold text-gold" />
                          {e.reyting}
                        </span>
                      </div>
                      <h3 className="font-serif text-sm font-semibold mt-1 truncate">
                        {e.baslq}
                      </h3>
                      <div className="text-xs text-gold font-semibold">
                        {Math.round(e.qiymet * 1.03)}₼ / gecə
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Aşağı sürüşdür oxu */}
        <button
          onClick={ikinciyeKes}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/80 hover:text-foreground transition-colors animate-bounce"
        >
          <span className="text-[11px] uppercase tracking-widest font-semibold">
            Aşağı kəş et
          </span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      {/* Karusel üçün lokal CSS */}
      <style>{`
        @keyframes karusel-sol {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-karusel-sol {
          animation: karusel-sol 35s linear infinite;
        }
        .mask-fade {
          mask-image: linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%);
        }
      `}</style>
    </section>
  );
};

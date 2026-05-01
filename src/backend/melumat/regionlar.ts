// Azərbaycan turizm regionları — interaktiv xəritə üçün.
// Hər regionun stilizə edilmiş SVG path-ı var (1000x600 viewBox).

export type RegionXerite = {
  slug: string;
  ad: string;
  qisaTesvir: string;
  d: string; // SVG path
  merkez: [number, number]; // tooltip mövqeyi
};

// Sadələşdirilmiş, lakin Azərbaycan formasını xatırladan path-lar.
// (Coğrafi dəqiqlik yox — interaktiv ərazi paylaşımı məqsədli.)
export const REGIONLAR: RegionXerite[] = [
  {
    slug: "quba-xacmaz",
    ad: "Quba-Xaçmaz",
    qisaTesvir: "Şahdağ ətəkləri, Xınalıq, alma bağları",
    d: "M 720,80 L 880,90 L 920,150 L 880,210 L 800,220 L 730,180 Z",
    merkez: [800, 150],
  },
  {
    slug: "seki-zaqatala",
    ad: "Şəki-Zaqatala",
    qisaTesvir: "Xan sarayı, Qəbələ dağları, Balakən meşələri",
    d: "M 380,150 L 600,140 L 720,180 L 700,250 L 530,260 L 400,230 Z",
    merkez: [540, 200],
  },
  {
    slug: "samaxi-ismayilli",
    ad: "Şamaxı-İsmayıllı",
    qisaTesvir: "Lahıc misgərliyi, üzüm bağları",
    d: "M 530,260 L 700,250 L 740,310 L 700,360 L 580,360 L 530,310 Z",
    merkez: [630, 310],
  },
  {
    slug: "abseron",
    ad: "Abşeron",
    qisaTesvir: "Bakı yaxınlığı, Xəzər sahili kəndlər",
    d: "M 740,310 L 920,290 L 960,360 L 880,400 L 760,380 Z",
    merkez: [840, 350],
  },
  {
    slug: "aran",
    ad: "Aran",
    qisaTesvir: "Kür-Araz vadisi, pambıq və üzüm",
    d: "M 380,260 L 580,260 L 580,360 L 700,360 L 720,420 L 530,440 L 380,400 Z",
    merkez: [520, 360],
  },
  {
    slug: "ganca-qazax",
    ad: "Gəncə-Qazax",
    qisaTesvir: "Göygöl, Tovuz dağları, Naftalan",
    d: "M 200,170 L 380,150 L 400,230 L 380,260 L 380,330 L 220,310 L 180,240 Z",
    merkez: [290, 240],
  },
  {
    slug: "lenkeran-astara",
    ad: "Lənkəran-Astara",
    qisaTesvir: "Talış dağları, çay tarlaları, Hirkan meşəsi",
    d: "M 720,420 L 850,440 L 870,500 L 800,540 L 730,510 Z",
    merkez: [790, 480],
  },
  {
    slug: "naxcivan",
    ad: "Naxçıvan",
    qisaTesvir: "Batabat, Əshabi-Kəhf, dağlıq landşaft",
    d: "M 60,330 L 220,310 L 220,400 L 100,410 L 50,380 Z",
    merkez: [140, 365],
  },
  {
    slug: "qarabag",
    ad: "Qarabağ",
    qisaTesvir: "Şuşa, Cıdır düzü, dağlıq meşələr",
    d: "M 220,310 L 380,330 L 380,400 L 380,440 L 220,420 L 220,400 Z",
    merkez: [300, 380],
  },
];

export const regionTap = (slug: string) =>
  REGIONLAR.find((r) => r.slug === slug);

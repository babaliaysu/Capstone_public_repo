// Mock elan məlumat bazası — sonradan Supabase cədvəli ilə əvəzlənəcək.
// Hər elanın region slug-u var ki, /regionlar/:slug səhifəsində süzgəcdən keçsin.

import home1 from "@/frontend/medialar/evler/home1.jpg";
import home2 from "@/frontend/medialar/evler/home2.jpg";
import home3 from "@/frontend/medialar/evler/home3.jpg";
import home4 from "@/frontend/medialar/evler/home4.jpg";
import home5 from "@/frontend/medialar/evler/home5.jpg";
import home6 from "@/frontend/medialar/evler/home6.jpg";

export type ElanTipi = "butov_ev" | "xususi_otaq" | "daxma" | "daw_ev";

export type Elan = {
  id: string;
  baslq: string;
  tesvir: string;
  region: string;          // bölgə adı (Quba, Şəki, Qəbələ, ...)
  rayon: string;           // detallı yer
  regionSlug: string;      // /regionlar/:slug üçün
  tip: ElanTipi;
  qiymet: number;          // gecəlik AZN (ev sahibinin verdiyi)
  reyting: number;
  reyler: number;
  qonaq: number;
  yatag: number;
  metr: number;
  xidmetler: string[];     // xidmət açarları (xidmetler.ts ilə uyğun)
  imkanlar: string[];      // wi-fi, parkinq, mətbəx, ...
  sekiller: string[];
  koordinat: [number, number]; // [enlik, uzunluq]
  evSahibi: string;
};

export const ELANLAR: Elan[] = [
  {
    id: "xinaliq-kend-evi",
    baslq: "Xınalıq Kənd Evi",
    tesvir:
      "Tarixi kənd evi olan bu məkan, Quba regionunun təbii mühitində istirahət etmək üçün idealdır. Rahat, kənd tipli yaşayış yerləri, ferma məhsullarından hazırlanmış yeməklər, xalçaçılıq, hiking və fotoqrafiya təklif edirik.",
    region: "Quba-Xaçmaz",
    rayon: "Xınalıq, Quba",
    regionSlug: "quba-xacmaz",
    tip: "xususi_otaq",
    qiymet: 41,
    reyting: 4.9,
    reyler: 156,
    qonaq: 2,
    yatag: 1,
    metr: 30,
    xidmetler: ["yuruyus", "yerli_metbex", "el_isleri"],
    imkanlar: ["Wi-Fi", "Parkinq", "Mətbəx", "İstilik", "Səhər yeməyi", "Bağça"],
    sekiller: [home1, home4, home2, home6, home3],
    koordinat: [41.1827, 48.0584],
    evSahibi: "Səkinə xala",
  },
  {
    id: "seki-xan-evi",
    baslq: "Şəki Xan Evi",
    tesvir:
      "Şəkinin qədim mərkəzində, qırmızı kirəmid damlı bütöv ev. Xan sarayına 10 dəqiqəlik məsafə. Səhər yeməyində yerli halva və qaymaq.",
    region: "Şəki-Zaqatala",
    rayon: "Kiçik kəndi, Şəki",
    regionSlug: "seki-zaqatala",
    tip: "butov_ev",
    qiymet: 82,
    reyting: 4.9,
    reyler: 127,
    qonaq: 6,
    yatag: 3,
    metr: 120,
    xidmetler: ["yerli_metbex", "beledci", "el_isleri"],
    imkanlar: ["Wi-Fi", "Parkinq", "Mətbəx", "Televizor", "Bağça", "Səhər yeməyi"],
    sekiller: [home2, home5, home1, home3],
    koordinat: [41.1919, 47.1706],
    evSahibi: "Elxan müəllim",
  },
  {
    id: "qebele-panorama",
    baslq: "Qəbələ Panorama",
    tesvir:
      "Tufandağa baxan panoramik bütöv ev. Hovuz, böyük bağça və mangal alanı. Ailəlik istirahət üçün ideal.",
    region: "Şəki-Zaqatala",
    rayon: "Qəbələ",
    regionSlug: "seki-zaqatala",
    tip: "butov_ev",
    qiymet: 134,
    reyting: 4.7,
    reyler: 112,
    qonaq: 8,
    yatag: 4,
    metr: 160,
    xidmetler: ["yuruyus", "atciliq", "yerli_metbex"],
    imkanlar: ["Wi-Fi", "Hovuz", "Parkinq", "Mətbəx", "Televizor", "Bağça"],
    sekiller: [home4, home6, home1, home2],
    koordinat: [40.9929, 47.8456],
    evSahibi: "Səbinə xanım",
  },
  {
    id: "balakan-cenneti",
    baslq: "Balakən Cənnəti",
    tesvir:
      "Meşə içində log-cabin, çay kənarında. Balıq tutmaq və kənd həyatını yaşamaq üçün əla yer.",
    region: "Şəki-Zaqatala",
    rayon: "Balakən",
    regionSlug: "seki-zaqatala",
    tip: "daxma",
    qiymet: 57,
    reyting: 4.9,
    reyler: 98,
    qonaq: 4,
    yatag: 2,
    metr: 85,
    xidmetler: ["baliq_tutmaq", "yuruyus", "ariciliq"],
    imkanlar: ["Wi-Fi", "Parkinq", "Mətbəx", "İstilik", "Bağça"],
    sekiller: [home6, home3, home4, home5],
    koordinat: [41.7039, 46.4044],
    evSahibi: "Rəşad bəy",
  },
  {
    id: "lahic-mis-evi",
    baslq: "Lahıc Mis Ustası Evi",
    tesvir:
      "Daş döşəmə küçələrin ortasında ənənəvi daş ev. Misgərlik master-class ev sahibindən.",
    region: "Şamaxı-İsmayıllı",
    rayon: "Lahıc, İsmayıllı",
    regionSlug: "samaxi-ismayilli",
    tip: "daw_ev",
    qiymet: 65,
    reyting: 4.92,
    reyler: 88,
    qonaq: 3,
    yatag: 2,
    metr: 70,
    xidmetler: ["dulusculuq", "el_isleri", "yerli_metbex"],
    imkanlar: ["Wi-Fi", "Mətbəx", "İstilik", "Bağça"],
    sekiller: [home2, home1, home5],
    koordinat: [40.8569, 48.3859],
    evSahibi: "Aydın usta",
  },
  {
    id: "qusar-laza-daxmasi",
    baslq: "Laza Şəlalə Daxması",
    tesvir:
      "Şahdağ ətəyində kiçik daxma. Səhərlər atçılıq, axşamlar tonqal başında çay.",
    region: "Quba-Xaçmaz",
    rayon: "Laza, Qusar",
    regionSlug: "quba-xacmaz",
    tip: "daxma",
    qiymet: 70,
    reyting: 4.85,
    reyler: 67,
    qonaq: 4,
    yatag: 2,
    metr: 60,
    xidmetler: ["atciliq", "yuruyus", "cay_merasimi"],
    imkanlar: ["Parkinq", "Mətbəx", "İstilik"],
    sekiller: [home5, home4, home6],
    koordinat: [41.418, 47.875],
    evSahibi: "Mübariz əmi",
  },
  {
    id: "lenkeran-cay-evi",
    baslq: "Lənkəran Çay Bağı Evi",
    tesvir:
      "Çay tarlalarının arasında, dənizə yaxın. Səhər yeməyində yerli ləvəngi.",
    region: "Lənkəran-Astara",
    rayon: "Lənkəran",
    regionSlug: "lenkeran-astara",
    tip: "butov_ev",
    qiymet: 75,
    reyting: 4.8,
    reyler: 54,
    qonaq: 5,
    yatag: 3,
    metr: 100,
    xidmetler: ["yerli_metbex", "cay_merasimi", "bag_isleri"],
    imkanlar: ["Wi-Fi", "Parkinq", "Mətbəx", "Televizor", "Bağça"],
    sekiller: [home3, home1, home2],
    koordinat: [38.7529, 48.8475],
    evSahibi: "Telman əmi",
  },
  {
    id: "naxcivan-batabat",
    baslq: "Batabat Yaylaq Evi",
    tesvir:
      "Naxçıvanın yaylaq zonasında, üzən ada gölünə baxan ev. Çobanla bir gün təcrübəsi.",
    region: "Naxçıvan",
    rayon: "Şahbuz, Naxçıvan",
    regionSlug: "naxcivan",
    tip: "daxma",
    qiymet: 60,
    reyting: 4.95,
    reyler: 41,
    qonaq: 3,
    yatag: 1,
    metr: 45,
    xidmetler: ["coban", "yuruyus", "atciliq"],
    imkanlar: ["Parkinq", "Mətbəx", "İstilik"],
    sekiller: [home6, home5, home3],
    koordinat: [39.5586, 45.8736],
    evSahibi: "Xəliq usta",
  },
];

// Köməkçi: bütün elanlar
export const elanlariAl = (): Elan[] => ELANLAR;

// Köməkçi: region slug üzrə süz
export const regionUzreElanlar = (slug: string): Elan[] =>
  ELANLAR.filter((e) => e.regionSlug === slug);

// Köməkçi: id ilə tap
export const elaniTap = (id: string): Elan | undefined =>
  ELANLAR.find((e) => e.id === id);

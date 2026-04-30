// Azərbaycan bölgələrinin sabit siyahısı.
// İstifadə yeri: AxtarisPaneli → BolgeSecici autocomplete.
// Sonradan admin paneldən idarə olunan dinamik mənbəyə keçirilə bilər.

export type Bolge = {
  ad: string;
  rayon: string;
  qrup: BolgeQrupu;
};

export type BolgeQrupu =
  | "Şimal"
  | "Qərb"
  | "Cənub"
  | "Mərkəz"
  | "Naxçıvan"
  | "Qarabağ";

export const BOLGELER: Bolge[] = [
  // Şimal
  { ad: "Quba", rayon: "Quba", qrup: "Şimal" },
  { ad: "Xınalıq", rayon: "Quba", qrup: "Şimal" },
  { ad: "Qusar", rayon: "Qusar", qrup: "Şimal" },
  { ad: "Laza", rayon: "Qusar", qrup: "Şimal" },
  { ad: "Xaçmaz", rayon: "Xaçmaz", qrup: "Şimal" },
  { ad: "Şabran", rayon: "Şabran", qrup: "Şimal" },

  // Qərb
  { ad: "Şəki", rayon: "Şəki", qrup: "Qərb" },
  { ad: "Kiş", rayon: "Şəki", qrup: "Qərb" },
  { ad: "Qax", rayon: "Qax", qrup: "Qərb" },
  { ad: "İlisu", rayon: "Qax", qrup: "Qərb" },
  { ad: "Zaqatala", rayon: "Zaqatala", qrup: "Qərb" },
  { ad: "Balakən", rayon: "Balakən", qrup: "Qərb" },
  { ad: "Qəbələ", rayon: "Qəbələ", qrup: "Qərb" },
  { ad: "Tovuz", rayon: "Tovuz", qrup: "Qərb" },
  { ad: "Gədəbəy", rayon: "Gədəbəy", qrup: "Qərb" },
  { ad: "Daşkəsən", rayon: "Daşkəsən", qrup: "Qərb" },
  { ad: "Göygöl", rayon: "Göygöl", qrup: "Qərb" },
  { ad: "Naftalan", rayon: "Naftalan", qrup: "Qərb" },

  // Mərkəz
  { ad: "İsmayıllı", rayon: "İsmayıllı", qrup: "Mərkəz" },
  { ad: "Lahıc", rayon: "İsmayıllı", qrup: "Mərkəz" },
  { ad: "Şamaxı", rayon: "Şamaxı", qrup: "Mərkəz" },
  { ad: "Qobustan", rayon: "Qobustan", qrup: "Mərkəz" },

  // Cənub
  { ad: "Lənkəran", rayon: "Lənkəran", qrup: "Cənub" },
  { ad: "Lerik", rayon: "Lerik", qrup: "Cənub" },
  { ad: "Astara", rayon: "Astara", qrup: "Cənub" },
  { ad: "Masallı", rayon: "Masallı", qrup: "Cənub" },
  { ad: "Yardımlı", rayon: "Yardımlı", qrup: "Cənub" },

  // Naxçıvan
  { ad: "Naxçıvan", rayon: "Naxçıvan", qrup: "Naxçıvan" },
  { ad: "Ordubad", rayon: "Ordubad", qrup: "Naxçıvan" },
  { ad: "Şahbuz", rayon: "Şahbuz", qrup: "Naxçıvan" },

  // Qarabağ
  { ad: "Şuşa", rayon: "Şuşa", qrup: "Qarabağ" },
  { ad: "Laçın", rayon: "Laçın", qrup: "Qarabağ" },
  { ad: "Kəlbəcər", rayon: "Kəlbəcər", qrup: "Qarabağ" },
];

// Yazılan mətnə görə bölgələri süzür (kiçik/böyük hərf, AZ hərfləri nəzərə alınır).
export function bolgeleriSuz(soz: string): Bolge[] {
  const t = soz.trim().toLocaleLowerCase("az-AZ");
  if (!t) return BOLGELER;
  return BOLGELER.filter(
    (b) =>
      b.ad.toLocaleLowerCase("az-AZ").includes(t) ||
      b.rayon.toLocaleLowerCase("az-AZ").includes(t),
  );
}

// Bölgələri qrupa görə qruplaşdırır (boş input zamanı kateqoriya görünüşü üçün).
export function bolgeleriQruplasdir(siyahi: Bolge[]): Record<BolgeQrupu, Bolge[]> {
  const netice = {
    "Şimal": [],
    "Qərb": [],
    "Cənub": [],
    "Mərkəz": [],
    "Naxçıvan": [],
    "Qarabağ": [],
  } as Record<BolgeQrupu, Bolge[]>;
  for (const b of siyahi) netice[b.qrup].push(b);
  return netice;
}

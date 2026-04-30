// Kəndlilərin təklif etdiyi xidmət növlərinin sabit siyahısı.
// İstifadə yeri: AxtarisPaneli → XidmetSecici (qonaqlar bölməsinin əvəzi).
// TODO: gələcəkdə elanlar cədvəlindən dinamik gəlsin (yalnız mövcud
// elanlarda olan aktivlər göstərilməlidir).

import {
  Anvil,
  ChefHat,
  Coffee,
  Compass,
  Drumstick,
  Fish,
  Flower2,
  Hammer,
  Music,
  Mountain,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";

export type Xidmet = {
  acar: string;
  ad: string;
  ikon: LucideIcon;
};

export const XIDMETLER: Xidmet[] = [
  { acar: "atciliq",       ad: "Atçılıq",          ikon: Anvil },
  { acar: "beledci",       ad: "Bələdçi xidməti",  ikon: Compass },
  { acar: "dulusculuq",    ad: "Dulusçuluq",       ikon: Hammer },
  { acar: "yuruyus",       ad: "Yürüyüş (trekking)", ikon: Mountain },
  { acar: "yerli_metbex",  ad: "Yerli mətbəx",     ikon: ChefHat },
  { acar: "baliq_tutmaq",  ad: "Balıq tutmaq",     ikon: Fish },
  { acar: "bag_isleri",    ad: "Bağ işləri",       ikon: Sprout },
  { acar: "cay_merasimi",  ad: "Çay mərasimi",     ikon: Coffee },
  { acar: "asiq_musiqisi", ad: "Aşıq musiqisi",    ikon: Music },
  { acar: "el_isleri",     ad: "Əl işləri",        ikon: Flower2 },
  { acar: "ariciliq",      ad: "Arıçılıq",         ikon: Wheat },
  { acar: "coban",         ad: "Çoban təcrübəsi",  ikon: Drumstick },
];

export function xidmetleriSuz(soz: string): Xidmet[] {
  const t = soz.trim().toLocaleLowerCase("az-AZ");
  if (!t) return XIDMETLER;
  return XIDMETLER.filter((x) => x.ad.toLocaleLowerCase("az-AZ").includes(t));
}

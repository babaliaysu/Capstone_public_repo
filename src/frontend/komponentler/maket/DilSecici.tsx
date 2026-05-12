// Dil seçici (AZ / EN / RU) — yuxarı paneldə.
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const dilSiyahisi = [
  { kod: "az", ad: "Azərbaycan", qisa: "AZ", bayraq: "AZ" },
  { kod: "en", ad: "English",    qisa: "EN", bayraq: "EN" },
  { kod: "ru", ad: "Русский",    qisa: "RU", bayraq: "RU" },
];

export const DilSecici = ({ variant = "default" }: { variant?: "default" | "ghost" }) => {
  const { i18n } = useTranslation();
  const cari = dilSiyahisi.find((l) => l.kod === i18n.language) ?? dilSiyahisi[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
          variant === "ghost"
            ? "text-foreground hover:bg-muted"
            : "glass hover:shadow-soft"
        }`}
      >
        <Globe className="h-4 w-4" />
        <span>{cari.qisa}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 bg-popover z-50">
        {dilSiyahisi.map((l) => (
          <DropdownMenuItem
            key={l.kod}
            onClick={() => i18n.changeLanguage(l.kod)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{l.bayraq}</span>
              <span>{l.ad}</span>
            </span>
            {i18n.language === l.kod && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

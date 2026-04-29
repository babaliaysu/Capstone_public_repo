import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const langs = [
  { code: "az", label: "Azərbaycan", short: "AZ", flag: "🇦🇿" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "ru", label: "Русский", short: "RU", flag: "🇷🇺" },
];

export const LanguageSwitcher = ({ variant = "default" }: { variant?: "default" | "ghost" }) => {
  const { i18n } = useTranslation();
  const current = langs.find((l) => l.code === i18n.language) ?? langs[0];

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
        <span>{current.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {langs.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </span>
            {i18n.language === l.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

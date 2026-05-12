// YuxariPanel — Premium Navbar
// Design: "Azərbaycan Torpağı"
// ─────────────────────────────────────────────────────────────
// Readability fix:
//   • scroll=false → navbar-transparent (dark semi-opaque bg + white text)
//   • scroll=true  → navbar-solid (deep emerald + white text)
//   Both states guarantee white/cream text on dark bg → always readable.
// Premium touches:
//   • Gold animated underline on hover (nav-link-underline)
//   • Copper-gold "Elan yerləşdir" accent link
//   • "Daxil ol" button: solid cream bg + dark text (high contrast)
//   • Logo: white text + amber mountain icon glow
// ─────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { Link, NavLink as RNavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mountain, Menu, X, LogOut } from "lucide-react";
import { DilSecici } from "./DilSecici";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSessiya } from "@/backend/qarmaqlar/useSessiya";

export const YuxariPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { istifadeci, profil } = useSessiya();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fokuslan = (id: string, route?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);

    if (route && window.location.pathname !== route) {
      navigate(`${route}#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = `#${id}`;
    }
  };

  const navItems: { label: string; to?: string; onClick?: (e: React.MouseEvent) => void }[] = [
    { label: "Kəşf et", onClick: fokuslan("ikinci-sehife", "/") },
    { label: "Hekayələr", onClick: fokuslan("qonaq-reyleri", "/") },
    { label: "Haqqımızda", onClick: fokuslan("haqqimizda-hero", "/haqqimizda") },
    { label: "Yardım", onClick: fokuslan("faq-hero", "/faq") },
  ];

  const basHerfleri = (() => {
    const ad = profil?.ad_soyad?.trim() || istifadeci?.email || "";
    const sozler = ad.split(/\s+/).filter(Boolean);
    if (sozler.length === 0) return "?";
    if (sozler.length === 1) return sozler[0].charAt(0).toLocaleUpperCase("az-AZ");
    return (sozler[0].charAt(0) + sozler[1].charAt(0)).toLocaleUpperCase("az-AZ");
  })();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "navbar-solid py-3" : "navbar-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Mountain
              className="h-7 w-7 transition-transform duration-500 group-hover:rotate-6 drop-shadow-md"
              style={{ color: "hsl(42 90% 62%)" }}
            />
            <div
              className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "hsl(38 82% 42% / 0.4)" }}
            />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
            Kəndim
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) =>
            item.to ? (
              <RNavLink
                key={i}
                to={item.to}
                className="nav-link-underline px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </RNavLink>
            ) : (
              <a
                key={i}
                href="#"
                onClick={item.onClick}
                className="nav-link-underline px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </a>
            )
          )}

          {/* Elan yerləşdir — copper-gold accent */}
          <button
            onClick={fokuslan("kendli-cagirisi", "/")}
            className="ml-3 px-4 py-2 text-sm font-bold transition-colors duration-200 border-l border-white/20 pl-5"
            style={{ color: "hsl(42 90% 62%)" }}
          >
            {t("nav.host")}
          </button>
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="[&_button]:text-white [&_button]:border-white/30 [&_button:hover]:bg-white/10">
            <DilSecici />
          </div>

          {istifadeci ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Profil"
                  className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, hsl(150 47% 22%) 0%, hsl(92 36% 36%) 55%, hsl(38 82% 42%) 100%)",
                    color: "hsl(42 60% 96%)",
                    boxShadow: "0 0 0 2px hsl(38 82% 42% / 0.6)",
                  }}
                >
                  {basHerfleri}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-semibold text-foreground">{profil?.ad_soyad}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/elanlarim" className="cursor-pointer">
                    Elanlarım
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/sevimliler" className="cursor-pointer">
                    Sevimlilər
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/rezervasiyalar" className="cursor-pointer">
                    Rezervasiyalarım
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profil" className="cursor-pointer">
                    Profil
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/giris" className="hidden sm:block">
              <Button
                className="rounded-full px-5 font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 border-0"
                style={{
                  background: "hsl(42 60% 96%)",
                  color: "hsl(150 47% 14%)",
                  boxShadow: "0 2px 12px hsl(38 82% 42% / 0.28)",
                }}
              >
                {t("nav.login")}
              </Button>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div
          className="md:hidden border-t mt-3"
          style={{
            background: "hsl(150 47% 13%)",
            borderColor: "hsl(150 40% 22%)",
          }}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {navItems.map((item, i) =>
              item.to ? (
                <Link
                  key={i}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-white/85 hover:text-white transition-colors text-sm font-medium"
                  style={{ borderBottom: "1px solid hsl(150 40% 22%)" }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={i}
                  href="#"
                  onClick={item.onClick}
                  className="py-2.5 text-white/85 hover:text-white transition-colors text-sm font-medium cursor-pointer"
                  style={{ borderBottom: "1px solid hsl(150 40% 22%)" }}
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="#"
              onClick={(e) => {
                setOpen(false);
                fokuslan("kendli-cagirisi", "/")(e);
              }}
              className="py-2.5 font-bold mt-2 pt-3 text-sm"
              style={{
                color: "hsl(42 90% 62%)",
                borderTop: "1px solid hsl(150 40% 22%)",
              }}
            >
              {t("nav.host")}
            </a>
            {istifadeci ? (
              <Link to="/profil" onClick={() => setOpen(false)}>
                <Button
                  className="w-full rounded-full mt-2 font-semibold border-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(150 47% 22%) 0%, hsl(38 82% 42%) 100%)",
                    color: "hsl(42 60% 96%)",
                  }}
                >
                  {t("profile.title")}
                </Button>
              </Link>
            ) : (
              <Link to="/giris" onClick={() => setOpen(false)}>
                <Button
                  className="w-full rounded-full mt-2 font-semibold border-0"
                  style={{
                    background: "hsl(42 60% 96%)",
                    color: "hsl(150 47% 14%)",
                  }}
                >
                  {t("nav.login")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

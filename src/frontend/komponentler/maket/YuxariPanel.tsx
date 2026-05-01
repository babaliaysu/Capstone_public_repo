// Yuxarı panel — yeni naviqasiya: Regionlar · Hekayələr · Sevimlilər · FAQ · Elan yerləşdir.
// Şəffaf görünüş 3D Hero üzərində daha dolğun olsun deyə həmişə şüşə effektli qalır.

import { useEffect, useState } from "react";
import { Link, NavLink as RNavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mountain, Menu, X } from "lucide-react";
import { DilSecici } from "./DilSecici";
import { Button } from "@/components/ui/button";
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

  // Yeni naviqasiya bölmələri
  const navItems = [
    { to: "/regionlar", label: t("nav.regions") },
    { to: "/hekayeler", label: t("nav.stories") },
    { to: "/sevimliler", label: t("nav.favorites") },
    { to: "/faq", label: "FAQ" },
  ];

  // İstifadəçinin baş hərflərini hesablayır (avatar üçün).
  const basHerfleri = (() => {
    const ad = profil?.ad_soyad?.trim() || istifadeci?.email || "";
    const sozler = ad.split(/\s+/).filter(Boolean);
    if (sozler.length === 0) return "?";
    if (sozler.length === 1) return sozler[0].charAt(0).toLocaleUpperCase("az-AZ");
    return (sozler[0].charAt(0) + sozler[1].charAt(0)).toLocaleUpperCase("az-AZ");
  })();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-soft py-3" : "bg-background/10 backdrop-blur-md py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Mountain className="h-7 w-7 text-primary transition-transform duration-500 group-hover:rotate-6" />
            <div className="absolute inset-0 bg-gold/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Kəndim
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <RNavLink
              key={i}
              to={item.to}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-2/3 transition-all duration-300" />
            </RNavLink>
          ))}
          <Link
            to="/evini-yerlesdir"
            className="ml-2 px-4 py-2 text-sm font-semibold text-accent hover:text-primary transition-colors duration-300 border-l border-border"
          >
            {t("nav.host")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <DilSecici />

          {istifadeci ? (
            <button
              onClick={() => navigate("/profil")}
              aria-label="Profil"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-gradient-warm text-background font-semibold text-sm ring-2 ring-gold/60 hover:ring-gold transition-all duration-300 hover:shadow-gold"
            >
              {basHerfleri}
            </button>
          ) : (
            <Link to="/giris" className="hidden sm:block">
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-5">
                {t("nav.login")}
              </Button>
            </Link>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/50 mt-3">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/evini-yerlesdir"
              onClick={() => setOpen(false)}
              className="py-2 text-accent font-semibold border-t border-border/50 mt-2 pt-3"
            >
              {t("nav.host")}
            </Link>
            {istifadeci ? (
              <Link to="/profil" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full mt-2">{t("profile.title")}</Button>
              </Link>
            ) : (
              <Link to="/giris" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full mt-2">{t("nav.login")}</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

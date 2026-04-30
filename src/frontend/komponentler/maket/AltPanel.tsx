// Səhifənin alt paneli (footer).
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mountain, Instagram, Facebook, Twitter, Mail } from "lucide-react";

export const AltPanel = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Mountain className="h-7 w-7 text-gold" />
              <span className="font-serif text-2xl font-semibold">Kəndim</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-gold">{t("footer.about")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-gold transition-colors">Misiya</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Komanda</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Karyera</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-gold">{t("footer.discover")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/elanlar" className="hover:text-gold transition-colors">{t("nav.find")}</Link></li>
              <li><Link to="/elanlar" className="hover:text-gold transition-colors">{t("nav.villages")}</Link></li>
              <li><Link to="/elanlar" className="hover:text-gold transition-colors">{t("nav.activities")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-gold">{t("footer.forHosts")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/evini-yerlesdir" className="hover:text-gold transition-colors">{t("nav.host")}</Link></li>
              <li><Link to="/evini-yerlesdir" className="hover:text-gold transition-colors">Kəndli olmaq</Link></li>
              <li><Link to="/evini-yerlesdir" className="hover:text-gold transition-colors">Komissiya</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Kəndim. {t("footer.rights")}.
          </p>
          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-background/5 hover:bg-gold hover:text-foreground flex items-center justify-center transition-all duration-300"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

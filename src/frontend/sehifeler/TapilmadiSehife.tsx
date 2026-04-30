// 404 — tapılmayan səhifə.
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const TapilmadiSehife = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: mövcud olmayan ünvan ziyarət edildi:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Səhifə tapılmadı</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Ana səhifəyə qayıt
        </a>
      </div>
    </div>
  );
};

export default TapilmadiSehife;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnaSehife from "@/frontend/sehifeler/AnaSehife";
import TapilmadiSehife from "@/frontend/sehifeler/TapilmadiSehife";
import TezlikleGelir from "@/frontend/sehifeler/TezlikleGelir";
import Giris from "@/frontend/sehifeler/Giris";
import Qeydiyyat from "@/frontend/sehifeler/Qeydiyyat";
import Profil from "@/frontend/sehifeler/Profil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnaSehife />} />
          <Route path="/elanlar" element={<TezlikleGelir pageTitle="Elanlar" />} />
          <Route path="/evini-yerlesdir" element={<TezlikleGelir pageTitle="Evini yerləşdir" />} />
          <Route path="/giris" element={<Giris />} />
          <Route path="/qeydiyyat" element={<Qeydiyyat />} />
          <Route path="/profil" element={<Profil />} />
          {/* Köhnə yollar üçün uyğunluq */}
          <Route path="/auth" element={<Giris />} />
          <Route path="/dashboard" element={<Profil />} />
          <Route path="/listings" element={<TezlikleGelir pageTitle="Elanlar" />} />
          <Route path="/host" element={<TezlikleGelir pageTitle="Evini yerləşdir" />} />
          {/* CATCH-ALL HƏMİŞƏ SONUNCU */}
          <Route path="*" element={<TapilmadiSehife />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

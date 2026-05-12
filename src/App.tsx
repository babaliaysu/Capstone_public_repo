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
import { Navigate } from "react-router-dom";
import Regionlar from "@/frontend/sehifeler/Regionlar";
import RegionDetal from "@/frontend/sehifeler/RegionDetal";
import ElanDetal from "@/frontend/sehifeler/ElanDetal";
import EviniYerleshdir from "@/frontend/sehifeler/EviniYerleshdir";
import Hekayeler from "@/frontend/sehifeler/Hekayeler";
import Sevimliler from "@/frontend/sehifeler/Sevimliler";
import Faq from "@/frontend/sehifeler/Faq";
import Haqqimizda from "@/frontend/sehifeler/Haqqimizda";
import Elanlarim from "@/frontend/sehifeler/Elanlarim";
import Rezervasiyalar from "@/frontend/sehifeler/Rezervasiyalar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnaSehife />} />
          {/* /regionlar səhifəsi ləğv edilib, elanlar siyahısına yönləndirilir */}
          <Route path="/regionlar" element={<Navigate to="/elanlar" replace />} />
          <Route path="/regionlar/:slug" element={<RegionDetal />} />
          <Route path="/elan/:id" element={<ElanDetal />} />
          <Route path="/hekayeler" element={<Hekayeler />} />
          <Route path="/sevimliler" element={<Sevimliler />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/haqqimizda" element={<Haqqimizda />} />
          <Route path="/evini-yerlesdir" element={<EviniYerleshdir />} />
          <Route path="/elanlar" element={<Regionlar />} />
          <Route path="/giris" element={<Giris />} />
          <Route path="/qeydiyyat" element={<Qeydiyyat />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/elanlarim" element={<Elanlarim />} />
          <Route path="/rezervasiyalar" element={<Rezervasiyalar />} />
          {/* Köhnə yollar üçün uyğunluq */}
          <Route path="/auth" element={<Giris />} />
          <Route path="/dashboard" element={<Profil />} />
          <Route path="/listings" element={<Regionlar />} />
          <Route path="/host" element={<EviniYerleshdir />} />
          <Route path="*" element={<TapilmadiSehife />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
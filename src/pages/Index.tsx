import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { PopularVillages } from "@/components/home/PopularVillages";
import { HowItWorks } from "@/components/home/HowItWorks";
import { RecommendedHomes } from "@/components/home/RecommendedHomes";
import { Activities } from "@/components/home/Activities";
import { HostCTA } from "@/components/home/HostCTA";
import { Testimonials } from "@/components/home/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <PopularVillages />
        <HowItWorks />
        <RecommendedHomes />
        <Activities />
        <HostCTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

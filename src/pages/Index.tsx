import { Header } from "@/components/festival/Header";
import { Hero } from "@/components/festival/Hero";
import { About } from "@/components/festival/About";
import { Zones } from "@/components/festival/Zones";
import { Timeline } from "@/components/festival/Timeline";
import { Activities } from "@/components/festival/Activities";
import { LineUp } from "@/components/festival/LineUp";
import { FoodTrucks } from "@/components/festival/FoodTrucks";
import { Registration } from "@/components/festival/Registration";
import { FAQ } from "@/components/festival/FAQ";
import { Footer } from "@/components/festival/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Zones />
      <Timeline />
      <Activities />
      <LineUp />
      <FoodTrucks />
      <Registration />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;

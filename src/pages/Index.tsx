import { Header } from "@/components/festival/Header";
import { Hero } from "@/components/festival/Hero";
import { Timeline } from "@/components/festival/Timeline";
import { Activities } from "@/components/festival/Activities";
import { LineUp } from "@/components/festival/LineUp";
import { PhotoUploader } from "@/components/PhotoUploader";
import { Footer } from "@/components/festival/Footer";
import { FoodTrucks } from "@/components/festival/FoodTrucks";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="lineup">
        <LineUp />
      </div>
      <div id="timeline">
        <Timeline />
      </div>
      <div id="activities">
        <Activities />
      </div>
      <div id="foodtrucks">
        <FoodTrucks />
      </div>
      <div id="photos">
        <PhotoUploader />
      </div>
      <Footer />
    </div>
  );
};

export default Index;

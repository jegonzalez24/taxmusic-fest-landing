import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-festival-neon.jpg";

export function Hero() {
  return (
    <section className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="space-y-8">
          {/* 
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/20">
  <Sparkles className="h-4 w-4 text-festival-cyan" />
  <span className="text-sm font-medium text-foreground/80">Nueva edición — 2025</span>
</div>
*/}

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight">
                Brilla tu potencial
                <br />
                en{" "}
                <span className="bg-gradient-to-r from-festival-cyan via-festival-magenta to-festival-purple bg-clip-text text-transparent">
                  TAX
                </span>{" "}
                <span className="bg-gradient-to-r from-festival-magenta to-festival-purple bg-clip-text text-transparent">
                  Music Fest
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed">
                Un festival corporativo al aire libre donde celebramos logros, talento y energía 
                colectiva. Beats, luz neón y experiencias inmersivas para cerrar el año con 
                actitud headliner.
              </p>
            </div>

            {/* Event Info */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-festival-cyan" />
                <span className="text-foreground font-medium">24 de Octubre, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-festival-magenta" />
                <span className="text-foreground font-medium">8:00 p.m. – 1:00 a.m.</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-festival-purple" />
                <span className="text-foreground font-medium">Hacienda San Rafael • Bogotá</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="lg" className="text-base font-semibold">
                Ver agenda
              </Button>
            </div>

            {/* Dress Code */}
            <p className="text-sm text-foreground/60">
              *Dress code sugerido: festival/urbano con acentos neón. Lleva chaqueta ligera para la noche.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative lg:block hidden">
            <div className="relative rounded-3xl overflow-hidden">
              <img 
                src={heroImage} 
                alt="TAX Music Fest - Festival scene with neon lights"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Floating Labels */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <div className="bg-background/80 backdrop-blur-md rounded-xl px-4 py-2 border border-border/20">
                  <span className="text-xs font-medium text-foreground">Experiencias</span>
                </div>
                <div className="bg-background/80 backdrop-blur-md rounded-xl px-4 py-2 border border-border/20">
                  <span className="text-xs font-medium text-foreground">Zona Chill</span>
                </div>
                <div className="bg-background/80 backdrop-blur-md rounded-xl px-4 py-2 border border-border/20">
                  <span className="text-xs font-medium text-foreground">Live DJ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
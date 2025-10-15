import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import heroImage from "@/assets/taxday.webp";

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
                <br />
                {" "}
                <span className="bg-gradient-to-r from-festival-cyan via-festival-magenta to-festival-purple bg-clip-text text-transparent">
                  TAX
                </span>{" "}
                <span className="bg-gradient-to-r from-festival-magenta to-festival-purple bg-clip-text text-transparent">
                  Music Fest
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed">
                Creamos un festival diseñado para romper el molde: un espacio donde el networking tiene beat,
                 las ideas se celebran como hits y el escenario está hecho para que todos brillemos.
                 Porque somos energía en estado puro y talento que no se queda quieto.
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
                <span className="text-foreground font-medium">11:00 a.m. – 8:00 p.m.</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-festival-purple" />
                <span className="text-foreground font-medium">Hacienda San Rafael • Bogotá</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#timeline">
                <Button variant="gradient" size="lg" className="text-base font-semibold">
                  Ver agenda
                </Button>
              </a>
            </div>

            {/* Dress Code */}
            <p className="text-sm text-foreground/60">
              *Dress code sugerido: Lleva tu mejor outfit de festival (ropa cómoda, una buena chaqueta,
              bloqueador y toda la actitud)
            </p>
          </div>

          {/* Right Image */}
          <div className="relative lg:block hidden">
            <div className="relative rounded-3xl overflow-hidden">
              <img 
                src={heroImage} 
                alt="TAX Music Fest - Festival scene with neon lights"
                className="w-[640px] h-[640px] object-contain object-center mx-auto rounded-3xl"
              />
              {/* Neon Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <a href="#activities">
                  <Button size="lg" className="bg-gradient-to-r from-festival-cyan via-festival-green to-festival-magenta text-white font-bold shadow-lg border-2 border-festival-cyan hover:brightness-125">
                    Experiencias
                  </Button>
                </a>
                <a href="#foodtrucks">
                  <Button size="lg" className="bg-gradient-to-r from-festival-pink via-festival-cream to-festival-purple text-black font-bold shadow-lg border-2 border-festival-pink hover:brightness-125">
                    Foodtrucks
                  </Button>
                </a>
                <a href="#lineup">
                  <Button size="lg" className="bg-gradient-to-r from-festival-purple via-festival-magenta to-festival-cyan text-white font-bold shadow-lg border-2 border-festival-purple hover:brightness-125">
                    Line-up
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
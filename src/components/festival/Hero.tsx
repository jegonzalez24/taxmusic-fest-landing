import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import heroBackground from "@/assets/hero-festival-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-festival-dark/80 via-festival-dark/60 to-festival-dark/90" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto animate-festival-fade-up">
          {/* Título Principal */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight">
            TAX MUSIC
            <br />
            <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent">
              FEST
            </span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl lg:text-3xl text-festival-cream mb-4 font-medium max-w-3xl mx-auto leading-relaxed">
            Un festival diseñado para romper el molde: networking con beat, 
            experiencias y la energía del equipo EY.
          </p>
          
          {/* Let's Party */}
          <div className="text-festival-pink text-2xl md:text-4xl font-bold mb-12 animate-festival-bounce">
            — Let's Party —
          </div>
          
          {/* Información del Evento */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="festival-card p-4 text-white">
              <Calendar className="h-8 w-8 text-festival-pink mb-2 mx-auto" />
              <div className="font-bold text-lg">Octubre 2025</div>
              <div className="text-festival-cream text-sm">Save the Date</div>
            </div>
            
            <div className="festival-card p-4 text-white">
              <Clock className="h-8 w-8 text-festival-pink mb-2 mx-auto" />
              <div className="font-bold text-lg">8:00 AM - 1:00 PM</div>
              <div className="text-festival-cream text-sm">5 horas de energía</div>
            </div>
            
            <div className="festival-card p-4 text-white">
              <MapPin className="h-8 w-8 text-festival-pink mb-2 mx-auto" />
              <div className="font-bold text-lg">Hacienda San Rafael</div>
              <div className="text-festival-cream text-sm">Cra 57 #133-00</div>
            </div>
            
            <div className="festival-card p-4 text-white">
              <Users className="h-8 w-8 text-festival-pink mb-2 mx-auto" />
              <div className="font-bold text-lg">470 Asistentes</div>
              <div className="text-festival-cream text-sm">Capacidad máxima</div>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="cta" 
              size="xl"
              className="text-xl px-12 py-6"
            >
              Confirmar Asistencia
            </Button>
            
            <Button 
              variant="festival-outline" 
              size="xl"
              className="text-xl px-12 py-6"
            >
              Ver Programa
            </Button>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <div className="text-sm mb-2">Scroll para explorar</div>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-festival-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Event Info */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-black mb-4">
                TAX MUSIC
                <span className="text-festival-pink"> FEST</span>
              </h3>
              <p className="text-festival-cream/80 mb-6 leading-relaxed">
                Un festival diseñado para romper el molde: networking con beat, 
                experiencias y la energía del equipo EY. Octubre 2025 en Hacienda San Rafael.
              </p>
              
              {/* Quick Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-festival-cream/80">
                  <MapPin className="h-5 w-5 text-festival-pink" />
                  <span>Hacienda San Rafael - Cra 57 #133-00</span>
                </div>
                <div className="flex items-center gap-3 text-festival-cream/80">
                  <Mail className="h-5 w-5 text-festival-pink" />
                  <span>taxmusicfest@ey.com</span>
                </div>
                <div className="flex items-center gap-3 text-festival-cream/80">
                  <Phone className="h-5 w-5 text-festival-pink" />
                  <span>+57 1 234 5678</span>
                </div>
              </div>
            </div>

            {/* Social & Legal */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-festival-cream">
                Síguenos
              </h4>
              <div className="flex gap-4 mb-8">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-festival-pink/20 rounded-full flex items-center justify-center hover:bg-festival-pink transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-festival-pink/20 rounded-full flex items-center justify-center hover:bg-festival-pink transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-festival-pink/20 rounded-full flex items-center justify-center hover:bg-festival-pink transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              
              <div className="space-y-3">
                <a href="#" className="block text-festival-cream/60 hover:text-festival-cream transition-colors text-sm">
                  Política de Privacidad
                </a>
                <a href="#" className="block text-festival-cream/60 hover:text-festival-cream transition-colors text-sm">
                  Términos y Condiciones
                </a>
                <a href="#" className="block text-festival-cream/60 hover:text-festival-cream transition-colors text-sm">
                  Código de Conducta
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-festival-cream/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Logos */}
              <div className="flex items-center gap-8">
                <div className="text-2xl font-black">
                  <span className="text-festival-green">EY</span>
                  <span className="text-festival-cream"> TAX</span>
                </div>
                <div className="text-sm text-festival-cream/60">
                  Building a better working world
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right text-festival-cream/60 text-sm">
                <p>&copy; 2024 EY Tax Team. Todos los derechos reservados.</p>
                <p className="mt-1">TAX MUSIC FEST - Octubre 2025</p>
              </div>
            </div>
          </div>

          {/* Embedded Map Placeholder */}
          <div className="mt-12 pt-8 border-t border-festival-cream/20">
            <h4 className="text-xl font-bold mb-4 text-festival-cream text-center">
              Ubicación del Evento
            </h4>
            <div className="bg-festival-cream/10 rounded-lg p-8 text-center">
              <MapPin className="h-12 w-12 text-festival-pink mx-auto mb-4" />
              <div className="text-festival-cream font-semibold text-lg mb-2">
                Hacienda San Rafael
              </div>
              <div className="text-festival-cream/80">
                Carrera 57 #133-00, Bogotá, Colombia
              </div>
              <Button 
                variant="festival-outline" 
                size="sm" 
                className="mt-4"
              >
                Ver en Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
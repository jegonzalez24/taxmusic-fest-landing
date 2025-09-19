import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-festival-dark/95 backdrop-blur-md border-b border-festival-green/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-black text-festival-green">
              TAX MUSIC
              <span className="text-festival-pink ml-2">FEST</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-festival-cream hover:text-festival-green transition-colors"
            >
              Sobre el Evento
            </button>
            <button 
              onClick={() => scrollToSection('zones')}
              className="text-festival-cream hover:text-festival-green transition-colors"
            >
              Zonas
            </button>
            <button 
              onClick={() => scrollToSection('timeline')}
              className="text-festival-cream hover:text-festival-green transition-colors"
            >
              Programa
            </button>
            <button 
              onClick={() => scrollToSection('lineup')}
              className="text-festival-cream hover:text-festival-green transition-colors"
            >
              Line-up
            </button>
            <button 
              onClick={() => scrollToSection('registration')}
              className="text-festival-cream hover:text-festival-green transition-colors"
            >
              Registro
            </button>
            <Button 
              variant="cta" 
              size="sm"
              onClick={() => scrollToSection('registration')}
            >
              Confirmar Asistencia
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-festival-cream"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-festival-green/30">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-festival-cream hover:text-festival-green transition-colors text-left"
              >
                Sobre el Evento
              </button>
              <button 
                onClick={() => scrollToSection('zones')}
                className="text-festival-cream hover:text-festival-green transition-colors text-left"
              >
                Zonas
              </button>
              <button 
                onClick={() => scrollToSection('timeline')}
                className="text-festival-cream hover:text-festival-green transition-colors text-left"
              >
                Programa
              </button>
              <button 
                onClick={() => scrollToSection('lineup')}
                className="text-festival-cream hover:text-festival-green transition-colors text-left"
              >
                Line-up
              </button>
              <button 
                onClick={() => scrollToSection('registration')}
                className="text-festival-cream hover:text-festival-green transition-colors text-left"
              >
                Registro
              </button>
              <Button 
                variant="cta" 
                size="sm"
                onClick={() => scrollToSection('registration')}
                className="w-fit"
              >
                Confirmar Asistencia
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
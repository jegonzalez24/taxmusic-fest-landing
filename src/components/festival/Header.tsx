import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-festival-cyan to-festival-magenta">
              <Music className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              TAX MUSIC FEST
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#lineup" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
              Line-up
            </a>
            <a href="#timeline" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
              Agenda
            </a>
            <a href="#activities" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
              Experiencias
            </a>
            <a href="#foodtrucks" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
              Foodtrucks
            </a>
            <a href="#photos" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
              Fotos
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-festival-cyan transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/10">
            <nav className="flex flex-col space-y-4">
              <a href="#lineup" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
                Line-up
              </a>
              <a href="#timeline" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
                Agenda
              </a>
              <a href="#activities" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
                Experiencias
              </a>
              <a href="#photos" className="text-foreground/80 hover:text-festival-cyan transition-colors font-medium">
                Fotos
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
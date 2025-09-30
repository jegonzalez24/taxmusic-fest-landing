import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mic, Music, Star } from "lucide-react";

export const KaraokeSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("karaoke_emails")
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        if (error.code === "23505") { // Unique constraint violation
          toast({
            title: "Email ya registrado",
            description: "Este email ya está inscrito para el karaoke",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "¡Registrado exitosamente!",
          description: "Te contactaremos pronto con más detalles del karaoke",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al registrar tu email. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-festival-dark via-festival-section to-card">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icons decoration */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <Mic className="h-16 w-16 text-festival-green animate-bounce" />
            <Music className="h-20 w-20 text-festival-cyan animate-pulse" />
            <Star className="h-16 w-16 text-festival-magenta animate-bounce" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Main heading */}
          <h2 className="text-6xl md:text-8xl font-black mb-6 text-festival-gradient animate-pulse">
            KARAOKE
          </h2>

          {/* Catchphrase */}
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight">
            ¿Alguna vez has soñado con cantar frente a 
            <span className="text-festival-green animate-pulse"> 500 personas</span>?
          </p>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-medium">
            🎤 ¡Sí! Entonces deja tu correo y te contactamos con todos los detalles
          </p>

          {/* Email signup form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="tu-email@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-lg px-6 bg-card/80 border-2 border-border hover:border-festival-green focus:border-festival-green focus:ring-festival-green text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
                  disabled={isSubmitting}
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-festival-green to-festival-cyan hover:from-festival-green/80 hover:to-festival-cyan/80 text-festival-dark border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 festival-glow"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-festival-dark"></div>
                    <span>Registrando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mic className="h-5 w-5" />
                    <span>¡QUIERO CANTAR!</span>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Additional text */}
          <p className="text-sm text-muted-foreground mt-6 opacity-80">
            * Espacios limitados • Solo mayores de 18 años • Evento gratuito
          </p>
        </div>
      </div>
    </section>
  );
};
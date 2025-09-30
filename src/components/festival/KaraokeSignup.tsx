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
    <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icons decoration */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <Mic className="h-16 w-16 text-yellow-400 animate-bounce" />
            <Music className="h-20 w-20 text-pink-400 animate-pulse" />
            <Star className="h-16 w-16 text-cyan-400 animate-bounce" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Main heading */}
          <h2 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            KARAOKE
          </h2>

          {/* Catchphrase */}
          <p className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
            ¿Alguna vez has soñado con cantar frente a 
            <span className="text-yellow-400 animate-pulse"> 500 personas</span>?
          </p>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-medium">
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
                  className="h-14 text-lg px-6 bg-white/90 border-2 border-white/50 focus:border-yellow-400 focus:ring-yellow-400 text-gray-900 placeholder-gray-600"
                  disabled={isSubmitting}
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
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
          <p className="text-sm text-gray-300 mt-6 opacity-80">
            * Espacios limitados • Solo mayores de 18 años • Evento gratuito
          </p>
        </div>
      </div>
    </section>
  );
};
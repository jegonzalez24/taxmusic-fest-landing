import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Mic } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const KaraokeSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu correo electrónico",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('karaoke_emails')
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "¡Ya estás registrado!",
            description: "Este correo ya está en nuestra lista de karaoke",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "¡Registrado exitosamente!",
          description: "Te contactaremos pronto para tu momento de estrella",
          variant: "default",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Error saving email:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al registrar tu correo. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary-variant to-secondary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
      <div className="absolute top-10 left-10 text-accent/20">
        <Music size={80} />
      </div>
      <div className="absolute bottom-10 right-10 text-accent/20">
        <Mic size={100} />
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <Mic className="text-accent" size={48} />
            <h2 className="text-6xl font-bold text-white festival-glow">
              KARAOKE
            </h2>
            <Music className="text-accent" size={48} />
          </div>
          
          <p className="text-2xl text-white/90 font-medium leading-relaxed max-w-3xl mx-auto">
            ¿Alguna vez has soñado con cantar frente a 
            <span className="text-accent font-bold"> 500 personas</span>? 
            <br />
            Si la respuesta es <span className="text-accent font-bold">SÍ</span>, 
            deja tu correo y cumple tu sueño en el TAX Music Fest
          </p>
        </div>

        <div className="festival-card p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="tu-email@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 text-lg bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-accent focus:ring-accent"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              variant="cta"
              className="h-14 px-8 text-lg font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "¡Quiero Cantar!"}
            </Button>
          </form>
          
          <p className="text-white/70 text-sm mt-4 text-center">
            Tu correo será usado únicamente para contactarte sobre el karaoke del festival
          </p>
        </div>
      </div>
    </section>
  );
};
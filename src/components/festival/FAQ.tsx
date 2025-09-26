import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MapPin, Car, Shield, Clock, Shirt } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      id: "transporte",
      icon: Car,
      question: "¿Cómo llego a la Hacienda San Rafael?",
      answer: "La Hacienda San Rafael está ubicada en la Cra 57 #133-00. EY proporcionará transporte desde puntos de encuentro específicos en la ciudad. Los detalles de transporte se enviarán por email una semana antes del evento. También puedes llegar en vehículo particular - hay parqueadero disponible.",
    },
    {
      id: "horarios",
      icon: Clock,
      question: "¿Cuáles son los horarios exactos del evento?",
      answer: "El evento inicia a las 8:00 AM con el registro y bienvenida, y termina a la 1:00 PM con el DJ set de cierre. Recomendamos llegar entre 7:45 y 8:00 AM para evitar congestión en el registro. El evento es de 5 horas continuas de experiencias.",
    },
    {
      id: "manillas",
      icon: Shirt,
      question: "¿Cómo funcionan las manillas del evento?",
      answer: "Al registrarte recibirás una manilla oficial que debes usar durante todo el evento. Esta manilla te identifica como participante autorizado y te da acceso a todas las zonas y experiencias. No la pierdas - es tu pase para todo el festival.",
    },
    {
      id: "seguridad",
      icon: Shield,
      question: "¿Qué medidas de seguridad hay en el evento?",
      answer: "Contamos con personal de seguridad, primeros auxilios, y todas las medidas de bioseguridad necesarias. El lugar es completamente seguro con accesos controlados. Habrá personal médico disponible durante todo el evento.",
    },
    {
      id: "que-llevar",
      icon: HelpCircle,
      question: "¿Qué debo llevar al evento?",
      answer: "Solo necesitas traer tu QR de registro, documento de identidad, ropa cómoda para actividades al aire libre, protector solar y muchas ganas de disfrutar. El kit de bienvenida, comida, bebidas y todas las experiencias están incluidas.",
    },
    {
      id: "clima",
      icon: MapPin,
      question: "¿Qué pasa si llueve?",
      answer: "El evento se realiza principalmente al aire libre, pero contamos con carpas y espacios cubiertos en caso de lluvia. Las actividades están diseñadas para adaptarse a cualquier condición climática. ¡El festival continúa sin importar el clima!",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-festival-dark mb-6">
              Preguntas
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                Frecuentes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas saber para disfrutar al máximo 
              tu experiencia en el TAX MUSIC FEST.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-none">
                <div className="festival-card overflow-hidden bg-gray-100">
                  <AccordionTrigger className="hover:no-underline p-6">
                    <div className="flex items-center gap-4 w-full text-left">
                      <div className="w-12 h-12 bg-festival-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <faq.icon className="h-6 w-6 text-festival-green" />
                      </div>
                      <h3 className="text-xl font-bold text-black">
                        {faq.question}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent>
                    <div className="px-6 pb-6 ml-16">
                      <p className="text-black leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact Info */}
          <div className="mt-16 text-center">
            <div className="festival-card p-8 bg-festival-green/5 border-festival-green/20">
              <h3 className="text-2xl font-bold text-festival-dark mb-4">
                ¿Tienes más preguntas?
              </h3>
              <p className="text-muted-foreground mb-6">
                Nuestro equipo organizador está disponible para resolver cualquier duda 
                adicional que puedas tener sobre el evento.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-festival-green font-bold text-lg mb-1">
                    Email de Contacto
                  </div>
                  <div className="text-muted-foreground">
                    taxmusicfest@ey.com
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-festival-green font-bold text-lg mb-1">
                    Soporte Telefónico
                  </div>
                  <div className="text-muted-foreground">
                    +57 1 234 5678
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
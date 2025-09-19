import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Users, Target, Bomb, Music } from "lucide-react";

export function Activities() {
  const activities = [
    {
      id: "luz-verde",
      icon: Target,
      title: "Luz Verde / Luz Roja",
      duration: "15 min por ronda",
      participants: "Hasta 50 personas",
      description: "El clásico juego coreano donde los participantes deben moverse solo cuando escuchen 'Luz Verde' y quedarse completamente inmóviles con 'Luz Roja'. Una muñeca gigante vigilará cada movimiento. La tensión y la diversión están garantizadas.",
      rules: "Los participantes que se muevan durante 'Luz Roja' quedan eliminados. El objetivo es llegar a la meta en el menor tiempo posible.",
      color: "from-festival-magenta to-festival-pink",
    },
    {
      id: "ddakji",
      icon: Target,
      title: "Ddakji",
      duration: "5 min por partida",
      participants: "1 vs 1",
      description: "Juego tradicional coreano con origami de papel. Los participantes deben voltear el ddakji del oponente golpeándolo con el suyo propio. Requiere técnica, precisión y un poco de suerte.",
      rules: "Cada jugador tiene 3 intentos para voltear el ddakji del oponente. El primero en lograrlo gana la partida.",
      color: "from-festival-cyan to-festival-purple",
    },
    {
      id: "buscaminas",
      icon: Bomb,
      title: "Buscaminas",
      duration: "20 min por ronda",
      participants: "Individual - hasta 30 personas",
      description: "Versión física del clásico juego donde los participantes deben cruzar un campo evitando las 'minas' ocultas. Memoria, estrategia y nerve son clave para el éxito.",
      rules: "Los participantes deben memorizar el patrón seguro. Un paso en falso significa regresar al inicio.",
      color: "from-festival-purple to-festival-magenta",
    },
    {
      id: "nota-final",
      icon: Music,
      title: "La Nota Final",
      duration: "25 min",
      participants: "Todos los asistentes",
      description: "Gran competencia musical donde los equipos deben demostrar sus habilidades rítmicas y de coordinación. El challenge que cerrará las experiencias antes del show principal.",
      rules: "Competencia por equipos con desafíos musicales progresivos. El equipo ganador recibe reconocimiento especial.",
      color: "from-festival-cyan to-festival-pink",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Experiencias
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                Únicas
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Juegos inspirados en El Juego del Calamar adaptados para crear momentos 
              inolvidables de teambuilding y diversión sana.
            </p>
          </div>

          {/* Activities Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {activities.map((activity, index) => (
              <AccordionItem key={activity.id} value={activity.id} className="border-none">
                <div className="festival-card overflow-hidden">
                  <AccordionTrigger className="hover:no-underline p-6">
                    <div className="flex items-center gap-6 w-full">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${activity.color} p-4 flex-shrink-0`}>
                        <activity.icon className="w-full h-full text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 text-left">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {activity.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {activity.duration}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {activity.participants}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent>
                    <div className="px-6 pb-6 space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {activity.description}
                      </p>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">
                          Reglas del Juego:
                        </h4>
                        <p className="text-muted-foreground">
                          {activity.rules}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="festival-card p-8 bg-festival-accent/5 border-festival-pink/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ¿Listo para el Challenge?
              </h3>
              <p className="text-muted-foreground mb-6">
                Todas las experiencias están diseñadas para ser inclusivas, seguras y tremendamente divertidas. 
                ¡Prepárate para descubrir un lado competitivo que no sabías que tenías!
              </p>
              <div className="text-festival-pink font-semibold">
                Premios especiales para los equipos ganadores
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
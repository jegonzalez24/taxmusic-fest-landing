import { Clock, Users, Music, Gamepad2, Star, Disc, Beer, Utensils, PartyPopper, RefreshCw } from "lucide-react";

export function Timeline() {
  const events = [
    {
      time: "11:00 AM",
      title: "Registro disponibilidad todo el día",
      description: "Bienvenida y registro: Recepción y activación de asistencia con QR",
      icon: Users, // Registro de personas
      color: "bg-festival-cyan",
    },
    {
      time: "11:30 AM- 3:00 PM",
      title: "Juegos de feria",
      description: "Apertura de los juegos de feria",
      icon: Gamepad2, // Juegos
      color: "bg-festival-purple",
    },
    {
      time: "11:30 AM",
      title: "Apertura de bebidas ",
      description: "Abiertas hasta agotar existencias",
      icon: Beer, // Bebidas
      color: "bg-festival-magenta",
    },
    {
      time: "12:30 AM- 2:00 PM",
      title: "Food Trucks",
      description: "Apertura de todas las estaciones gastronómicas (hasta agotar existencias)",
      icon: Utensils, // Comida
      color: "bg-festival-purple",
    },
    {
      time: "3:30 PM- 5:00 PM",
      title: "Team Building",
      description: " ",
      icon: PartyPopper, // Trabajo en equipo/diversión
      color: "bg-festival-cyan",
    },
    {
      time: "5:00 PM",
      title: "Re-Apertura de experiencias",
      description: "Se vuelven a abrir las experiencias para seguir disfrutando",
      icon: RefreshCw, // Reapertura/renovación
      color: "bg-festival-magenta",
    },
    {
      time: "5:00 PM - 6:00 PM",
      title: "Grupo Andalucía",
      description: "Primer gran show con el Grupo Andalucía",
      icon: Music, // Música en vivo
      color: "bg-festival-purple",
    },
    {
      time: "6:00 PM - 7:00 PM",
      title: "DJ Podri",
      description: "Segundo gran show con DJ Podri",
      icon: Disc, // DJ/música electrónica
      color: "bg-festival-magenta",
    },
    {
      time: "7:00 PM - 8:00 PM",
      title: "Gran cierre con Grupo Andalucía",
      description: "Gran show de cierre con el Grupo Andalucía",
      icon: Star, // Evento especial/cierre
      color: "bg-festival-cyan",
    },
  ];

  return (
    <section className="py-20 bg-festival-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Programa del
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                Festival
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experiencias continuas diseñadas para maximizar la diversión 
              y el networking entre el equipo.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="festival-card p-6 bg-white">
                {/* Time Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white ${event.color} mb-4`}>
                  {event.time}
                </div>
                
                {/* Content */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${event.color}/10 flex-shrink-0`}>
                    <event.icon className={`h-6 w-6 ${event.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-500">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duration Summary */}
          <div className="mt-16 text-center">
            <div className="festival-card p-8 bg-festival-accent/10 border-festival-pink/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Duración Total del Evento
              </h3>
              <div className="text-4xl font-black text-festival-pink mb-2">
                9 Horas
              </div>
              <p className="text-muted-foreground">
                De experiencias continuas, música en vivo y networking energético
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
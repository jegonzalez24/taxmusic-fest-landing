import { Clock, Users, Music, Gamepad2, Star, Disc } from "lucide-react";

export function Timeline() {
  const events = [
    {
      time: "8:00 AM",
      title: "Bienvenida & Registro",
      description: "Bienvenida y registro: Recepción y activación de asistencia con QR",
      icon: Users,
      color: "bg-festival-cyan",
    },
    {
      time: "8:30 A M",
      title: "Welcome Show",
      description: "Apertura oficial con presentación del evento",
      icon: Star,
      color: "bg-festival-purple",
    },
    {
      time: "9:00 AM",
      title: "Apertura de Experiencias",
      description: " ",
      icon: Gamepad2,
      color: "bg-festival-magenta",
    },
    {
      time: "9:30 AM",
      title: "Food Trucks",
      description: "Apertura de todas las estaciones gastronómicas y zonas chill",
      icon: Clock,
      color: "bg-festival-purple",
    },
      {
        time: "10:30 AM",
        title: "Show Fest Principal",
        description: "Presentación en vivo del Grupo Andalucia en tarima principal",
        icon: Star,
        color: "bg-festival-cyan",
      },
    {
        time: "12:30 PM",
        title: "Cierre con DJ Set",
        description: "Gran final con DJ Podri y música electrónica para cerrar con energía",
        icon: Clock,
        color: "bg-festival-magenta",
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
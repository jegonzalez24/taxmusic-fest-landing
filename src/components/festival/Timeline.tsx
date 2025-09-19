import { Clock, Users, Music, Gamepad2, Star, Disc } from "lucide-react";

export function Timeline() {
  const events = [
    {
      time: "8:00 AM",
      title: "Bienvenida & Registro",
      description: "Recepción con kit de bienvenida, acreditación y activación con QR",
      icon: Users,
      color: "bg-festival-cyan",
    },
    {
      time: "8:30 AM",
      title: "Welcome Show",
      description: "Apertura oficial con presentación del evento y activación energética",
      icon: Star,
      color: "bg-festival-purple",
    },
    {
      time: "9:00 AM",
      title: "Apertura de Experiencias",
      description: "Inicio de juegos Luz Verde/Luz Roja, Ddakji, Guerra de la Cuerda",
      icon: Gamepad2,
      color: "bg-festival-magenta",
    },
    {
      time: "9:30 AM",
      title: "Activación Food Trucks",
      description: "Apertura de todas las estaciones gastronómicas y zonas chill",
      icon: Clock,
      color: "bg-festival-purple",
    },
    {
      time: "10:30 AM",
      title: "Show Fest Principal",
      description: "Presentación en vivo del Grupo Andalucía en tarima principal",
      icon: Music,
      color: "bg-festival-green",
    },
    {
      time: "12:30 PM",
      title: "Cierre con DJ Set",
      description: "Gran finale con DJ Podri y música electrónica para cerrar con energía",
      icon: Disc,
      color: "bg-festival-pink",
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
              5 horas de experiencias continuas diseñadas para maximizar la diversión 
              y el networking entre el equipo.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-festival-green via-festival-pink to-festival-green"></div>

            {/* Events */}
            <div className="space-y-12">
              {events.map((event, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Time Indicator */}
                  <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 ${event.color} w-4 h-4 rounded-full border-4 border-white shadow-lg z-10`}></div>
                  
                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'} md:w-5/12`}>
                    <div className="festival-card p-6">
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
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Duration Summary */}
          <div className="mt-16 text-center">
            <div className="festival-card p-8 bg-festival-accent/10 border-festival-pink/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Duración Total del Evento
              </h3>
              <div className="text-4xl font-black text-festival-pink mb-2">
                5 Horas
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
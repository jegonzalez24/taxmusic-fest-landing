import { Clock, Users, Music, Gamepad2, Star, Disc } from "lucide-react";

export function Timeline() {
  const events = [
    {
      time: "11:00 AM",
      title: "Bienvenida & Registro",
      description: "Recepción con kit de bienvenida, acreditación y activación con QR",
      icon: Users,
      color: "bg-cyan-500",
      borderColor: "border-cyan-500",
      textColor: "text-cyan-500"
    },
    {
      time: "12:00 PM",
      title: "Welcome Show",
      description: "Apertura oficial con presentación del evento y activación energética",
      icon: Star,
      color: "bg-purple-500",
      borderColor: "border-purple-500",
      textColor: "text-purple-500"
    },
    {
      time: "12:00 PM",
      title: "Food Trucks",
      description: "Apertura de todas las estaciones gastronómicas y zonas chill",
      icon: Clock,
      color: "bg-green-500",
      borderColor: "border-green-500",
      textColor: "text-green-500"
    },
    {
      time: "12:30 PM",
      title: "Apertura de Experiencias",
      description: "Inicio de juegos Luz Verde/Luz Roja, Ddakji, Guerra de la Cuerda (sin más)",
      icon: Gamepad2,
      color: "bg-pink-500",
      borderColor: "border-pink-500",
      textColor: "text-pink-500"
    },
    {
      time: "10:30 AM",
      title: "Show Fest Principal",
      description: "Presentación en vivo del Grupo Andalucía en tarima principal",
      icon: Music,
      color: "bg-emerald-500",
      borderColor: "border-emerald-500",
      textColor: "text-emerald-500"
    },
    {
      time: "12:30 PM",
      title: "Cierre con DJ Set",
      description: "Gran finale con DJ Podri y música electrónica para cerrar con energía",
      icon: Disc,
      color: "bg-rose-500",
      borderColor: "border-rose-500",
      textColor: "text-rose-500"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Programa del
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Festival
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experiencias continuas diseñadas para maximizar la diversión 
              y el networking entre el equipo.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {events.map((event, index) => (
              <div 
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/20 pointer-events-none"></div>
                
                {/* Card content */}
                <div className="relative p-8">
                  {/* Time Badge */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${event.color} mb-6 shadow-lg`}>
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl ${event.color}/10 ${event.borderColor}/20 border-2 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <event.icon className={`h-8 w-8 ${event.textColor}`} />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {event.description}
                    </p>
                  </div>

                  {/* Decorative gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${event.color}/60 via-transparent to-transparent`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Duration Summary */}
          <div className="text-center">
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-12 max-w-md mx-auto overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Duración Total del Evento
                </h3>
                <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  5 Horas
                </div>
                <p className="text-gray-400">
                  De experiencias continuas, música en vivo y networking energético
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
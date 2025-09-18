import { Trees, Utensils, Music, Gamepad2, Coffee, Disc } from "lucide-react";

export function Zones() {
  const zones = [
    {
      icon: Trees,
      name: "Zonas Verdes",
      description: "Espacios naturales para networking relajado y conversaciones al aire libre",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Utensils,
      name: "Zona de Comidas",
      description: "5 food trucks con especialidades: mexicano, alitas, veggie, lechona y café gourmet",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Music,
      name: "Tarima Principal",
      description: "Escenario profesional con shows en vivo del Grupo Andalucía y DJ sets exclusivos",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Gamepad2,
      name: "Zona de Experiencias",
      description: "Juegos inspirados en El Juego del Calamar: Luz Verde/Roja, Ddakji y más",
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Coffee,
      name: "Zonas Chill",
      description: "Espacios de relajación con lounge music y áreas de descanso cómodas",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Disc,
      name: "Cierre DJ Set",
      description: "Gran finale con DJ Podri y música electrónica para cerrar con energía",
      color: "from-indigo-400 to-purple-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-festival-dark mb-6">
              Explora las
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                Zonas del Festival
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cada espacio está diseñado para ofrecerte una experiencia única. 
              Desde música en vivo hasta juegos interactivos y gastronomía de calidad.
            </p>
          </div>

          {/* Zones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zones.map((zone, index) => (
              <div 
                key={index}
                className="festival-card p-8 group cursor-pointer"
              >
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${zone.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <zone.icon className="w-full h-full text-white" />
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 rounded-full ${zone.bgColor} opacity-20 -z-10 group-hover:scale-125 transition-transform duration-300`}></div>
                </div>

                {/* Zone Name */}
                <h3 className="text-2xl font-bold text-festival-dark mb-4 group-hover:text-festival-green transition-colors">
                  {zone.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {zone.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 flex items-center text-festival-pink opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Explorar zona</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { Music, Users, Utensils, GamepadIcon } from "lucide-react";

export function About() {
  const highlights = [
    { icon: Users, number: "470", text: "Asistentes confirmados" },
    { icon: Music, number: "6", text: "Horas de música en vivo" },
    { icon: Utensils, number: "5", text: "Food trucks gourmet" },
    { icon: GamepadIcon, number: "8", text: "Experiencias únicas" },
  ];

  return (
    <section className="py-20 bg-festival-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-festival-dark mb-6">
              Porque lo corporativo no es 
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                gris, es energía
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Más que un evento corporativo, es una experiencia diseñada para integrar equipos, 
              celebrar logros y disfrutar de música, juegos y experiencias inolvidables.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="festival-card p-8 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-festival-accent/10 rounded-full flex items-center justify-center group-hover:bg-festival-accent/20 transition-colors">
                  <item.icon className="h-8 w-8 text-festival-pink" />
                </div>
                <div className="text-4xl font-black text-festival-dark mb-2">
                  {item.number}
                </div>
                <div className="text-lg font-medium text-muted-foreground">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-festival-dark mb-6">
                  Una experiencia diseñada para conectar
                </h3>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    TAX MUSIC FEST nace de la idea de reimaginar los eventos corporativos. 
                    Queremos crear un espacio donde el networking se combine con la diversión, 
                    donde cada experiencia fortalezca los vínculos del equipo.
                  </p>
                  <p>
                    Durante 9 horas intensas, vivirás música en vivo, participarás en juegos 
                    únicos, disfrutarás de food trucks 
                    gourmet y crearás recuerdos que durarán mucho más que cualquier reunión tradicional.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-festival-green/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-festival-green">🎵</div>
                    <div className="font-semibold text-festival-dark">Música en Vivo</div>
                    <div className="text-sm text-muted-foreground">Shows profesionales</div>
                  </div>
                  <div className="bg-festival-pink/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-festival-pink">🎮</div>
                    <div className="font-semibold text-festival-dark">Experiencias</div>
                    <div className="text-sm text-muted-foreground">Juegos únicos</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">🍔</div>
                    <div className="font-semibold text-festival-dark">Food Trucks</div>
                    <div className="text-sm text-muted-foreground">Gastronomía variada</div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">🌿</div>
                    <div className="font-semibold text-festival-dark">Espacios Chill</div>
                    <div className="text-sm text-muted-foreground">Zonas de relajación</div>
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
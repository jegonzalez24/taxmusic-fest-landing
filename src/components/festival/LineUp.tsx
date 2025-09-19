import { Music, Disc, Guitar, Volume2 } from "lucide-react";

export function LineUp() {
  const artists = [
    {
      name: "Grupo Andalucía",
      type: "Banda Principal",
      genre: "Rock en Español / Pop Latino",
      description: "Agrupación musical con más de 15 años de experiencia en eventos corporativos y festivales. Su repertorio incluye covers de grandes éxitos y música original que hará bailar a todos los asistentes.",
      time: "10:30 AM - 12:00 PM",
      icon: Guitar,
      color: "from-festival-purple to-festival-pink",
      avatar: "🎸",
    },
    {
      name: "DJ Podri",
      type: "DJ Residente",
      genre: "Electronic / House / Festival",
      description: "DJ oficial del reconocido Bar El Pepino, especialista en crear ambientes únicos que combinan beats electrónicos con energía festival. Cerrará el evento con un set explosivo.",
      time: "12:30 PM - 1:00 PM",
      icon: Disc,
      color: "from-festival-cyan to-festival-purple",
      avatar: "🎧",
    },
  ];

  const musicZones = [
    {
      zone: "Tarima Principal",
      description: "Escenario profesional con sonido de alta calidad para los shows en vivo",
      icon: Music,
    },
    {
      zone: "Zona DJ",
      description: "Setup especializado para sets electrónicos y música ambiental",
      icon: Volume2,
    },
  ];

  return (
    <section className="py-20 bg-festival-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Line-Up
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                Musical
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Música en vivo de calidad profesional para mantener la energía 
              festival durante todo el evento.
            </p>
          </div>

          {/* Artists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {artists.map((artist, index) => (
              <div 
                key={index}
                className="festival-card p-8 group"
              >
                {/* Artist Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${artist.color} flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {artist.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-festival-pink uppercase tracking-wide mb-1">
                      {artist.type}
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {artist.name}
                    </h3>
                    <div className="text-lg text-muted-foreground">
                      {artist.genre}
                    </div>
                  </div>
                </div>

                {/* Time Slot */}
                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 text-festival-green font-bold">
                    <artist.icon className="h-5 w-5" />
                    <span>{artist.time}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {artist.description}
                </p>
              </div>
            ))}
          </div>

          {/* Music Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {musicZones.map((zone, index) => (
              <div 
                key={index}
                className="festival-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-festival-green/10 rounded-full flex items-center justify-center">
                  <zone.icon className="h-8 w-8 text-festival-green" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {zone.zone}
                </h3>
                <p className="text-muted-foreground">
                  {zone.description}
                </p>
              </div>
            ))}
          </div>

          {/* Music Experience */}
          <div className="festival-card p-8 bg-gradient-to-r from-festival-green/5 to-festival-pink/5 border-festival-accent/20">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Experiencia Musical Completa
              </h3>
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                Desde rock en español hasta beats electrónicos, nuestro line-up está diseñado 
                para crear la banda sonora perfecta de una experiencia corporativa inolvidable.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-festival-green mb-2">1.5h</div>
                  <div className="text-muted-foreground">Música en Vivo</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-festival-pink mb-2">30min</div>
                  <div className="text-muted-foreground">DJ Set Cierre</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-festival-cyan mb-2">100%</div>
                  <div className="text-muted-foreground">Energía Festival</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
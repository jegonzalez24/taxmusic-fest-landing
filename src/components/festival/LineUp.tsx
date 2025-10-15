import { Music, Disc, Guitar, Volume2 } from "lucide-react";

export function LineUp() {
  const artists = [
    {
      name: "Grupo Andalucía",
      type: "Banda Principal",
      genre: "Rock en Español / Pop Latino",
      description: "Agrupación musical con más de 15 años de experiencia en eventos corporativos y festivales. Su repertorio incluye covers de grandes éxitos y música original que hará bailar a todos los asistentes.",
      time: "5:00 PM - 6:00 PM y 7:00 PM - 8:00 PM",
      icon: Guitar,
      // Se mantiene el gradiente, pero vamos a usar unos colores más cálidos como acento
      color: "from-orange-500 to-red-400",
      avatar: "🎸",
    },
    {
      name: "DJ Podri",
      type: "DJ Residente",
      genre: "Electronic / House / Festival",
      description: "DJ oficial del reconocido Bar El Pepino, especialista en crear ambientes únicos que combinan beats electrónicos con energía festival. Cerrará el evento con un set explosivo.",
      time: "6:00 PM - 7:00 PM",
      icon: Disc,
      // Se mantiene el gradiente, pero vamos a usar unos colores más cálidos como acento
      color: "from-amber-400 to-orange-500",
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
    // FONDO DE SECCIÓN SIN CAMBIO (MANTENEMOS bg-festival-section)
    <section className="py-20 bg-festival-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header (El texto debe ser claro para el fondo oscuro) */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Line-Up
              {/* Ajuste de acento de texto para que resalte en el fondo oscuro */}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent block">
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
                // CAMBIO: Fondo de tarjeta a un color claro que resalte
                className="bg-gray-100 rounded-xl shadow-2xl p-8 group" 
              >
                {/* Artist Header */}
                <div className="flex items-start gap-6 mb-6">
                  {/* Avatar con gradiente cálido */}
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${artist.color} flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {artist.avatar}
                  </div>
                  <div className="flex-1">
                    {/* CAMBIO: Texto de tipo de artista a un naranja cálido */}
                    <div className="text-sm font-medium text-orange-500 uppercase tracking-wide mb-1">
                      {artist.type}
                    </div>
                    {/* CAMBIO: Texto principal oscuro para fondo claro de tarjeta */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {artist.name}
                    </h3>
                    {/* CAMBIO: Texto secundario gris oscuro para fondo claro */}
                    <div className="text-lg text-gray-600">
                      {artist.genre}
                    </div>
                  </div>
                </div>

                {/* Time Slot */}
                {/* CAMBIO: Fondo de time slot a un gris más claro */}
                <div className="bg-gray-200 p-4 rounded-lg mb-6">
                  {/* CAMBIO: Color de hora a un naranja oscuro */}
                  <div className="flex items-center gap-2 text-orange-600 font-bold">
                    <artist.icon className="h-5 w-5" />
                    <span>{artist.time}</span>
                  </div>
                </div>

                {/* Description */}
                {/* CAMBIO: Texto de descripción gris oscuro */}
                <p className="text-gray-700 leading-relaxed">
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
                // CAMBIO: Fondo de tarjeta a un color claro
                className="bg-gray-100 rounded-xl shadow p-6 text-center" 
              >
                {/* CAMBIO: Fondo de ícono y color de ícono a naranja/ámbar */}
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <zone.icon className="h-8 w-8 text-amber-600" />
                </div>
                {/* CAMBIO: Texto principal oscuro */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {zone.zone}
                </h3>
                {/* CAMBIO: Texto secundario gris oscuro */}
                <p className="text-gray-700">
                  {zone.description}
                </p>
              </div>
            ))}
          </div>

          {/* Music Experience */}
          {/* CAMBIO: Gradiente de la experiencia a naranja y ámbar claro, con fondo claro */}
          <div className="bg-gradient-to-r from-orange-100/30 to-amber-100/30 border border-amber-300/50 rounded-xl p-8 bg-gray-100">
            <div className="text-center">
              {/* CAMBIO: Texto principal oscuro */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Experiencia Musical Completa
              </h3>
              {/* CAMBIO: Texto secundario gris oscuro */}
              <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
                Desde rock en español hasta beats electrónicos, nuestro line-up está diseñado 
                para crear la banda sonora perfecta de una experiencia corporativa inolvidable.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center justify-center col-span-1 md:col-span-3">
                  {/* CAMBIO: Color del porcentaje a un naranja oscuro */}
                  <div className="text-4xl font-bold text-orange-600 mb-2 text-center">100%</div>
                  {/* CAMBIO: Texto de descripción gris oscuro */}
                  <div className="text-gray-700 text-center">Energía Festival</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import dresscode1 from "@/assets/dresscode-1.png";
import dresscode2 from "@/assets/dresscode-2.png";
import dresscode3 from "@/assets/dresscode-3.png";
import dresscode4 from "@/assets/dresscode-4.png";
import dresscode5 from "@/assets/dresscode-5.png";
import dresscode6 from "@/assets/dresscode-6.png";

export const DressCode = () => {
  const images = [
    { src: dresscode1, alt: "Festival outfit with sequin top and denim" },
    { src: dresscode2, alt: "Festival bohemian style group" },
    { src: dresscode3, alt: "Festival edgy style with black mesh" },
    { src: dresscode4, alt: "Festival diverse group outfits" },
    { src: dresscode5, alt: "Festival casual rock style" },
    { src: dresscode6, alt: "Festival minimalist style" },
  ];

  return (
    <section className="py-20 px-4 bg-festival-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-festival-gradient">Dress Code</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¡Vístete para brillar! Aquí tienes algunas referencias de estilos para el festival
          </p>
        </div>

        {/* Collage Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-lg festival-card
                ${index === 0 ? 'md:row-span-2' : ''}
                ${index === 3 ? 'md:col-span-2' : ''}
                hover:scale-105 transition-transform duration-300
              `}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{
                  minHeight: index === 0 ? '400px' : '200px',
                  maxHeight: index === 0 ? '600px' : '400px',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-festival-dark/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import dresscode1 from "@/assets/dresscode-1.png";
import dresscode2 from "@/assets/dresscode-2.png";
import dresscode3 from "@/assets/dresscode-3.png";
import dresscode4 from "@/assets/dresscode-4.png";
import dresscode5 from "@/assets/dresscode-5.png";
import dresscode6 from "@/assets/dresscode-6.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="relative overflow-hidden rounded-lg festival-card group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-festival-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 md:-left-12" />
          <CarouselNext className="right-0 md:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

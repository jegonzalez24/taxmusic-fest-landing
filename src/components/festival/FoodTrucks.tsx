import { Button } from "@/components/ui/button";
import { Utensils, Coffee, Leaf, ChefHat, MapPin } from "lucide-react";

export function FoodTrucks() {
  const foodTrucks = [
    {
      name: "Sabores de México",
      specialty: "Cocina Mexicana Auténtica",
      menu: ["Tacos al Pastor", "Quesadillas Gourmet", "Burritos Especiales", "Nachos Supreme"],
      icon: "🌮",
      color: "from-red-500 to-orange-500",
      description: "Auténticos sabores mexicanos preparados con ingredientes frescos y recetas tradicionales.",
    },
    {
      name: "Wing Station",
      specialty: "Alitas & Appetizers",
      menu: ["Alitas BBQ", "Alitas Picantes", "Dedos de Pollo", "Papas Cargadas"],
      icon: "🍗",
      color: "from-orange-500 to-yellow-500",
      description: "Las mejores alitas de la ciudad con salsas exclusivas y acompañamientos deliciosos.",
    },
    {
      name: "Green Garden",
      specialty: "Opciones Vegetarianas",
      menu: ["Buddha Bowls", "Wraps Veganos", "Ensaladas Gourmet", "Smoothies Naturales"],
      icon: "🥗",
      color: "from-green-500 to-emerald-500",
      description: "Opciones saludables y deliciosas para quienes prefieren alimentación consciente.",
    },
    {
      name: "Lechona Tolimense",
      specialty: "Comida Típica Colombiana",
      menu: ["Lechona Tradicional", "Arepas Rellenas", "Empanadas", "Chicharrón"],
      icon: "🇨🇴",
      color: "from-blue-500 to-purple-500",
      description: "La lechona más auténtica preparada con la receta tradicional tolimense.",
    },
    {
      name: "Coffee Culture",
      specialty: "Café & Bebidas Especiales",
      menu: ["Café Colombiano", "Frappés", "Tés Especiales", "Postres Artesanales"],
      icon: "☕",
      color: "from-amber-600 to-orange-600",
      description: "El mejor café colombiano y bebidas especiales para mantener la energía del festival.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-festival-dark mb-6">
              Food
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                Trucks
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gastronomía variada y de calidad para satisfacer todos los gustos. 
              Desde sabores tradicionales hasta opciones gourmet y saludables.
            </p>
          </div>

          {/* Food Trucks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {foodTrucks.slice(0, 3).map((truck, index) => (
              <div 
                key={index}
                className="festival-card p-6 group h-full"
              >
                {/* Truck Header */}
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${truck.color} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
                    {truck.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-festival-white mb-2">
                    {truck.name}
                  </h3>
                  <div className="text-festival-pink font-semibold">
                    {truck.specialty}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-center mb-6">
                  {truck.description}
                </p>

                {/* Menu */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-festival-white text-center mb-3">
                    Especialidades:
                  </h4>
                  <div className="space-y-1">
                    {truck.menu.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="text-sm text-muted-foreground text-center py-1 px-3 bg-muted/30 rounded-full"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {foodTrucks.slice(3, 5).map((truck, index) => (
              <div 
                key={index + 3}
                className="festival-card p-6 group h-full"
              >
                {/* Truck Header */}
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${truck.color} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
                    {truck.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-festival-white mb-2">
                    {truck.name}
                  </h3>
                  <div className="text-festival-pink font-semibold">
                    {truck.specialty}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-center mb-6">
                  {truck.description}
                </p>

                {/* Menu */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-festival-white text-center mb-3">
                    Especialidades:
                  </h4>
                  <div className="space-y-1">
                    {truck.menu.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="text-sm text-muted-foreground text-center py-1 px-3 bg-muted/30 rounded-full"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4">
              <Utensils className="h-12 w-12 text-festival-green mx-auto mb-3" />
              <div className="font-semibold text-festival-dark">Variedad</div>
              <div className="text-sm text-muted-foreground">5 opciones gastronómicas</div>
            </div>
            <div className="text-center p-4">
              <Leaf className="h-12 w-12 text-festival-green mx-auto mb-3" />
              <div className="font-semibold text-festival-dark">Opciones Veggie</div>
              <div className="text-sm text-muted-foreground">Alimentación consciente</div>
            </div>
            <div className="text-center p-4">
              <ChefHat className="h-12 w-12 text-festival-green mx-auto mb-3" />
              <div className="font-semibold text-festival-dark">Calidad</div>
              <div className="text-sm text-muted-foreground">Preparación artesanal</div>
            </div>
            <div className="text-center p-4">
              <Coffee className="h-12 w-12 text-festival-green mx-auto mb-3" />
              <div className="font-semibold text-festival-dark">Café Premium</div>
              <div className="text-sm text-muted-foreground">100% colombiano</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="festival-card p-8 bg-gradient-to-r from-festival-green/5 to-festival-pink/5 border-festival-accent/20">
              <h3 className="text-2xl font-bold text-festival-white mb-4">
                ¿Tienes alguna preferencia alimentaria?
              </h3>
              <p className="text-muted-foreground mb-6">
                Indícanos en el registro si tienes alguna alergia o preferencia especial. 
                Queremos que disfrutes al máximo la experiencia gastronómica.
              </p>
              <Button variant="festival-outline" size="lg">
                Ver Menús Completos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { QrCode, Calendar, Mail, Phone, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    area: "",
    attendance: "",
    phone: "",
    dietary: "",
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const { toast } = useToast();

  const areas = [
    "Tax Advisory",
    "Tax Compliance", 
    "Transfer Pricing",
    "International Tax",
    "Indirect Tax",
    "Business Tax Services",
    "Tax Technology",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.area || !formData.attendance || !formData.consent) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Simulate QR generation
    const uniqueId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setQrCode(uniqueId);
    setIsSubmitted(true);

    toast({
      title: "¡Registro exitoso!",
      description: "Tu QR ha sido generado. Recibirás más instrucciones por email.",
    });
  };

  const addToCalendar = () => {
    const event = {
      title: "TAX MUSIC FEST - EY Music Fest",
      start: "20251015T080000Z", // Placeholder date
      end: "20251015T130000Z",
      description: "Festival corporativo EY con música, experiencias y networking",
      location: "Hacienda San Rafael - Cra 57 #133-00",
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-festival-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="festival-card p-12">
              {/* Success Icon */}
              <div className="w-24 h-24 mx-auto mb-8 bg-festival-green rounded-full flex items-center justify-center">
                <QrCode className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-4xl font-bold text-festival-dark mb-6">
                ¡Registro Exitoso!
              </h2>

              <p className="text-xl text-muted-foreground mb-8">
                Tu código QR único ha sido generado:
              </p>

              {/* QR Code Display */}
              <div className="bg-white p-8 rounded-lg border-2 border-festival-green mb-8 inline-block">
                <div className="text-6xl font-mono font-bold text-festival-dark">
                  {qrCode}
                </div>
              </div>

              <div className="space-y-4 mb-8 text-left bg-muted/30 p-6 rounded-lg">
                <h3 className="font-bold text-festival-dark text-center mb-4">
                  Instrucciones Importantes:
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Presenta este código QR en el registro del evento</p>
                  <p>• Recibirás tu manilla oficial al ingresar</p>
                  <p>• Llegada recomendada: 7:45 AM para evitar congestión</p>
                  <p>• Confirmación enviada a tu email corporativo</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={addToCalendar}
                  variant="festival" 
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-5 w-5" />
                  Agregar a Calendario
                </Button>
                
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="festival-outline" 
                  size="lg"
                >
                  Nuevo Registro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-festival-section" id="registro">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-festival-dark mb-6">
              Confirma tu
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                Asistencia
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Regístrate para recibir tu QR único y toda la información del evento
            </p>
          </div>

          {/* Registration Form */}
          <div className="festival-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-festival-dark font-semibold">
                  Nombre Completo *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-festival-dark font-semibold">
                  Email Corporativo *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10"
                    placeholder="tu.email@ey.com"
                  />
                </div>
              </div>

              {/* Area */}
              <div className="space-y-2">
                <Label htmlFor="area" className="text-festival-dark font-semibold">
                  Área de Trabajo *
                </Label>
                <Select value={formData.area} onValueChange={(value) => setFormData({...formData, area: value})}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <SelectValue placeholder="Selecciona tu área" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Attendance */}
              <div className="space-y-2">
                <Label htmlFor="attendance" className="text-festival-dark font-semibold">
                  ¿Confirmas tu asistencia? *
                </Label>
                <Select value={formData.attendance} onValueChange={(value) => setFormData({...formData, attendance: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="si">Sí, estaré presente</SelectItem>
                    <SelectItem value="no">No podré asistir</SelectItem>
                    <SelectItem value="pendiente">Aún no estoy seguro/a</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Phone (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-festival-dark font-semibold">
                  Teléfono (Opcional)
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10"
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>

              {/* Dietary Preferences */}
              <div className="space-y-2">
                <Label htmlFor="dietary" className="text-festival-dark font-semibold">
                  Preferencias Alimentarias o Alergias (Opcional)
                </Label>
                <Textarea
                  id="dietary"
                  value={formData.dietary}
                  onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                  placeholder="Ej: Vegetariano, alérgico a frutos secos, etc."
                  className="resize-none"
                />
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
                />
                <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                  Autorizo el uso de mi imagen en fotografías y videos tomados durante el evento 
                  para fines corporativos y de comunicación interna de EY. *
                </Label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="cta" 
                size="xl" 
                className="w-full text-xl py-6"
              >
                Confirmar Asistencia y Generar QR
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                Al registrarte recibirás tu manilla oficial y más instrucciones en el ingreso. 
                ¡Prepárate para una experiencia inolvidable!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
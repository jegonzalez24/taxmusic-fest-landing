import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, Download, Eye, Cloud, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface UploadedPhoto {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
}

export const PhotoUploader: React.FC = () => {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedPhoto | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const { toast } = useToast();

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const uploadToCloud = async (photos: UploadedPhoto[]) => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Por favor configura tu URL de Google Apps Script primero",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      for (const photo of photos) {
        const base64Data = await convertToBase64(photo.file);
        
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: photo.name,
            fileSize: photo.size,
            fileData: base64Data,
            uploadedAt: new Date().toISOString(),
            event: "tax_music_fest_photo_upload"
          }),
        });

        if (!response.ok) {
          throw new Error(`Error al subir ${photo.name}: ${response.status}`);
        }
      }

      toast({
        title: "¡Fotos subidas a Google Drive!",
        description: `${photos.length} foto(s) subida(s) correctamente.`,
      });
    } catch (error) {
      console.error("Error uploading to Google Drive:", error);
      toast({
        title: "Error",
        description: "Error al subir las fotos. Revisa tu configuración de Google Apps Script.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    toast({
      title: "Fotos preparadas",
      description: `${acceptedFiles.length} foto(s) lista(s) para subir a la nube`,
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
  });

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const photo = prev.find(p => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.url);
      }
      return prev.filter(p => p.id !== id);
    });
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section className="py-20 bg-festival-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Galería de
              <span className="text-festival-gradient bg-festival-accent bg-clip-text text-transparent block">
                Fotos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comparte tus mejores momentos del TAX MUSIC FEST. Sube tus fotos para guardarlas en Google Drive.
            </p>
          </div>

          {/*
          Cloud Configuration
          <div className="festival-card p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Cloud className="h-8 w-8 text-festival-green" />
                <h3 className="text-2xl font-bold text-foreground">Configuración de Nube</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfig(!showConfig)}
                className="border-festival-purple text-festival-purple hover:bg-festival-purple hover:text-festival-dark"
              >
                <Settings className="h-4 w-4 mr-2" />
                {showConfig ? 'Ocultar' : 'Configurar'}
              </Button>
            </div>

            {showConfig && (
              <div className="space-y-4 p-6 bg-muted/20 rounded-lg border border-festival-purple/30">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    URL de Google Apps Script
                  </label>
                  <Input
                    type="url"
                    placeholder="https://script.google.com/macros/s/[ID]/exec"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="mb-3"
                  />
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Cómo configurar Google Apps Script:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Ve a <span className="text-festival-cyan">script.google.com</span></li>
                      <li>Crea un <span className="text-festival-green">nuevo proyecto</span></li>
                      <li>Pega el código que te proporcionaré</li>
                      <li>Haz <span className="text-festival-magenta">"Deploy"</span> como Web App</li>
                      <li>Copia la URL que te da y pégala aquí</li>
                      <li>Las fotos se guardarán en <span className="text-festival-pink">Google Drive</span></li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
          */}

          {/* Upload Area */}
          <div className="festival-card p-8 mb-12">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 bg-gray-100 grayscale
                ${isDragActive 
                  ? 'border-gray-400 bg-gray-200 shadow-lg' 
                  : 'border-gray-300 hover:border-gray-500 hover:bg-gray-200 hover:shadow-lg'
                }
              `}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-4 h-16 w-16 text-gray-600" />
              <h3 className="text-2xl font-bold mb-2 text-black">
                {isDragActive ? 'Suelta las fotos aquí' : 'Arrastra fotos aquí o haz clic para seleccionar'}
              </h3>
              <p className="mb-6 text-lg text-gray-700">
                Soporta <span className="font-semibold">JPG, PNG, GIF, WebP</span> hasta <span className="font-semibold">10MB</span> por archivo
              </p>
              <Button 
                variant="outline" 
                className="mt-4 border-gray-500 text-gray-700 hover:bg-gray-300 hover:text-black font-semibold"
              >
                Seleccionar Archivos
              </Button>
            </div>
          </div>

          {/* Photos Grid */}
          {photos.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold flex items-center gap-3 text-foreground">
                  <ImageIcon className="h-8 w-8 text-festival-pink" />
                  Fotos Preparadas ({photos.length})
                </h3>
                <Button
                  onClick={() => uploadToCloud(photos)}
                  disabled={isUploading || photos.length === 0 || !webhookUrl}
                  className="bg-gradient-to-r from-festival-green to-festival-cyan text-festival-dark font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-[0_0_20px_hsl(var(--festival-green)/0.5)] transition-all duration-300 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Upload className="h-5 w-5 mr-2 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Cloud className="h-5 w-5 mr-2" />
                      Subir a la Nube
                    </>
                  )}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo) => (
                  <div key={photo.id} className="festival-card overflow-hidden group">
                    <div className="relative">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          className="bg-festival-cyan/20 text-festival-cyan border-festival-cyan hover:bg-festival-cyan hover:text-festival-dark"
                          variant="outline"
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-festival-green/20 text-festival-green border-festival-green hover:bg-festival-green hover:text-festival-dark"
                          variant="outline"
                          asChild
                        >
                          <a href={photo.url} download={photo.name}>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removePhoto(photo.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold truncate mb-1 text-foreground">{photo.name}</h4>
                      <p className="text-sm text-muted-foreground">{formatFileSize(photo.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                className="absolute -top-12 right-0 text-festival-cyan hover:text-foreground border-festival-cyan"
                variant="outline"
                size="sm"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_0_40px_hsl(var(--festival-cyan)/0.3)]"
              />
            </div>
          </div>
        )}

          {photos.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto h-24 w-24 text-festival-purple mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">No hay fotos aún</h3>
              <p className="text-muted-foreground text-lg">
                Comienza subiendo tus primeras fotos del festival usando el área de arriba
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
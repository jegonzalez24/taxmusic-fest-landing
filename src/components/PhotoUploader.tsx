import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  const { toast } = useToast();

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
      title: "Fotos subidas",
      description: `${acceptedFiles.length} foto(s) subida(s) correctamente`,
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
              Comparte tus mejores momentos del TAX MUSIC FEST. Sube tus fotos para guardarlas en OneDrive.
            </p>
          </div>

          {/* Upload Area */}
          <div className="festival-card p-8 mb-12">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300
                ${isDragActive 
                  ? 'border-festival-cyan bg-festival-cyan/5 shadow-[0_0_30px_hsl(var(--festival-cyan)/0.3)]' 
                  : 'border-border hover:border-festival-magenta hover:bg-festival-magenta/5 hover:shadow-[0_0_20px_hsl(var(--festival-magenta)/0.2)]'
                }
              `}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-4 h-16 w-16 text-festival-cyan" />
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                {isDragActive ? 'Suelta las fotos aquí' : 'Arrastra fotos aquí o haz clic para seleccionar'}
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Soporta JPG, PNG, GIF, WebP hasta 10MB por archivo
              </p>
              <Button 
                variant="outline" 
                className="mt-4 border-festival-cyan text-festival-cyan hover:bg-festival-cyan hover:text-festival-dark font-semibold"
              >
                Seleccionar Archivos
              </Button>
            </div>
          </div>

          {/* Photos Grid */}
          {photos.length > 0 && (
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-foreground">
                <ImageIcon className="h-8 w-8 text-festival-pink" />
                Fotos Subidas ({photos.length})
              </h3>
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
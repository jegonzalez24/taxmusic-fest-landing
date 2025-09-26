import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, Download, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UploadedPhoto {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  created_at: string;
  url?: string;
}

export const PhotoUploader: React.FC = () => {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedPhoto | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        loadUserPhotos();
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        loadUserPhotos();
      } else {
        setPhotos([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Generate signed URLs for the photos
      const photosWithUrls = await Promise.all(
        data.map(async (photo: UploadedPhoto) => {
          const { data: signedUrl } = await supabase.storage
            .from('photos')
            .createSignedUrl(photo.file_path, 3600); // 1 hour expiry

          return {
            ...photo,
            url: signedUrl?.signedUrl
          };
        })
      );

      setPhotos(photosWithUrls);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast({
        title: "Error",
        description: "Error al cargar las fotos",
        variant: "destructive",
      });
    }
  };

  const uploadPhotoToSupabase = async (file: File) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Necesitas estar autenticado para subir fotos",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create unique file path with user ID
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save metadata to database
      const { data: photoData, error: dbError } = await supabase
        .from('photos')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Generate signed URL
      const { data: signedUrl } = await supabase.storage
        .from('photos')
        .createSignedUrl(filePath, 3600);

      return {
        ...photoData,
        url: signedUrl?.signedUrl
      };
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Necesitas estar autenticado para subir fotos",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = acceptedFiles.map(file => uploadPhotoToSupabase(file));
      const uploadedPhotos = await Promise.all(uploadPromises);
      
      setPhotos(prev => [...uploadedPhotos.filter(Boolean), ...prev]);
      
      toast({
        title: "¡Fotos subidas!",
        description: `${acceptedFiles.length} foto(s) subida(s) correctamente`,
      });
    } catch (error) {
      console.error('Error uploading photos:', error);
      toast({
        title: "Error",
        description: "Error al subir las fotos",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [user, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
  });

  const deletePhoto = async (photoId: string) => {
    try {
      const photo = photos.find(p => p.id === photoId);
      if (!photo) return;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([photo.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('photos')
        .delete()
        .eq('id', photoId);

      if (dbError) throw dbError;

      setPhotos(prev => prev.filter(p => p.id !== photoId));
      
      if (selectedPhoto?.id === photoId) {
        setSelectedPhoto(null);
      }

      toast({
        title: "Foto eliminada",
        description: "La foto ha sido eliminada correctamente",
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Error",
        description: "Error al eliminar la foto",
        variant: "destructive",
      });
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
              Comparte tus mejores momentos del TAX MUSIC FEST. Tus fotos se guardan automáticamente en la nube.
            </p>
          </div>

          {!user && (
            <div className="festival-card p-8 mb-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Autenticación requerida</h3>
              <p className="text-muted-foreground mb-6">
                Necesitas estar autenticado para subir y ver tus fotos.
              </p>
              <div className="space-x-4">
                <Button 
                  onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                  className="bg-festival-green hover:bg-festival-green/80"
                >
                  Iniciar sesión con Google
                </Button>
              </div>
            </div>
          )}

          {user && (
            <div className="festival-card p-8 mb-12">
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300
                  ${isDragActive 
                    ? 'border-festival-cyan bg-festival-cyan/10 shadow-lg' 
                    : 'border-festival-purple/50 hover:border-festival-cyan hover:bg-festival-cyan/5 hover:shadow-lg'
                  }
                  ${isUploading ? 'pointer-events-none opacity-50' : ''}
                `}
              >
                <input {...getInputProps()} />
                <Upload className={`mx-auto mb-4 h-16 w-16 ${isUploading ? 'animate-spin text-festival-cyan' : 'text-festival-purple'}`} />
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {isUploading ? 'Subiendo fotos...' : (isDragActive ? 'Suelta las fotos aquí' : 'Arrastra fotos aquí o haz clic para seleccionar')}
                </h3>
                <p className="mb-6 text-lg text-muted-foreground">
                  Soporta <span className="font-semibold text-festival-cyan">JPG, PNG, GIF, WebP</span> hasta <span className="font-semibold text-festival-green">10MB</span> por archivo
                </p>
                {!isUploading && (
                  <Button 
                    variant="outline" 
                    className="mt-4 border-festival-purple text-festival-purple hover:bg-festival-purple hover:text-festival-dark font-semibold"
                  >
                    Seleccionar Archivos
                  </Button>
                )}
              </div>
            </div>
          )}

          {photos.length > 0 && user && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold flex items-center gap-3 text-foreground">
                  <ImageIcon className="h-8 w-8 text-festival-pink" />
                  Mis Fotos ({photos.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo) => (
                    <div key={photo.id} className="festival-card overflow-hidden group">
                      <div className="relative">
                        <img
                          src={photo.url}
                          alt={photo.file_name}
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
                          <a href={photo.url} download={photo.file_name}>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePhoto(photo.id)}
                          className="bg-red-500/20 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                      <div className="p-4">
                        <h4 className="font-semibold truncate mb-1 text-foreground">{photo.file_name}</h4>
                        <p className="text-sm text-muted-foreground">{formatFileSize(photo.file_size)}</p>
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
                alt={selectedPhoto.file_name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_0_40px_hsl(var(--festival-cyan)/0.3)]"
              />
            </div>
          </div>
        )}

          {photos.length === 0 && user && (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto h-24 w-24 text-festival-purple mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">No tienes fotos aún</h3>
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
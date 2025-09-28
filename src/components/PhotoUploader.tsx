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
  const [sessionId, setSessionId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    // Generate or get session ID for anonymous usage
    let currentSessionId = localStorage.getItem('photo_session_id');
    if (!currentSessionId) {
      currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      localStorage.setItem('photo_session_id', currentSessionId);
    }
    setSessionId(currentSessionId);
    
    // Test Supabase connection
    testSupabaseConnection();
    
    // Load photos for this session
    loadPhotos();
  }, []);

  const testSupabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      
      // Test storage bucket access
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error accessing buckets:', bucketsError);
      } else {
        console.log('Available buckets:', buckets);
        const photosBucket = buckets?.find(bucket => bucket.id === 'photos');
        if (photosBucket) {
          console.log('Photos bucket found:', photosBucket);
        } else {
          console.warn('Photos bucket not found!');
        }
      }
      
      // Test listing files in photos bucket
      const { data: files, error: filesError } = await supabase.storage
        .from('photos')
        .list('', { limit: 1 });
        
      if (filesError) {
        console.error('Error listing files in photos bucket:', filesError);
      } else {
        console.log('Photos bucket is accessible, sample files:', files);
      }
      
    } catch (error) {
      console.error('Supabase connection test failed:', error);
    }
  };

  const loadPhotos = async () => {
    try {
      // Load all photos with public access
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading photos:', error);
        setPhotos([]);
        return;
      }

      // Construct public URLs for all photos
      const photosWithUrls = data.map((photo: UploadedPhoto) => {
        const { data: publicUrl } = supabase.storage
          .from('photos')
          .getPublicUrl(photo.file_path);

        return {
          ...photo,
          url: publicUrl?.publicUrl
        };
      });

      setPhotos(photosWithUrls);
    } catch (error) {
      console.error('Error loading photos:', error);
      setPhotos([]);
    }
  };

  const uploadPhotoToSupabase = async (file: File) => {
    try {
      // Create unique file path using session ID
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${sessionId}/${fileName}`;

      console.log('Attempting to upload to path:', filePath);

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Save to database with public access
      const { data: dbData, error: dbError } = await supabase
        .from('photos')
        .insert({
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          user_id: null // No authentication required
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        // If database fails, still return the uploaded file info
      }

      // Get public URL
      const { data } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      return {
        id: dbData?.id || `local_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        created_at: dbData?.created_at || new Date().toISOString(),
        url: data?.publicUrl
      };
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log('Files dropped:', acceptedFiles);
    console.log('Session ID:', sessionId);
    
    if (!sessionId) {
      toast({
        title: "Error",
        description: "Session ID no disponible. Recarga la página.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = acceptedFiles.map(async (file, index) => {
        console.log(`Uploading file ${index + 1}:`, file.name, file.size);
        try {
          return await uploadPhotoToSupabase(file);
        } catch (fileError) {
          console.error(`Error uploading file ${file.name}:`, fileError);
          toast({
            title: "Error en archivo",
            description: `Error subiendo ${file.name}: ${fileError.message}`,
            variant: "destructive",
          });
          return null;
        }
      });
      
      const uploadedPhotos = await Promise.all(uploadPromises);
      const successfulUploads = uploadedPhotos.filter(Boolean);
      
      if (successfulUploads.length > 0) {
        setPhotos(prev => [...successfulUploads, ...prev]);
        
        toast({
          title: "¡Fotos subidas!",
          description: `${successfulUploads.length} de ${acceptedFiles.length} foto(s) subida(s) correctamente`,
        });
      }
      
      if (successfulUploads.length < acceptedFiles.length) {
        const failedCount = acceptedFiles.length - successfulUploads.length;
        toast({
          title: "Algunas fotos fallaron",
          description: `${failedCount} foto(s) no se pudieron subir`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('General upload error:', error);
      toast({
        title: "Error",
        description: `Error general: ${error.message || 'Error desconocido'}`,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast, sessionId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB max
    onDropRejected: (rejectedFiles) => {
      console.log('Files rejected:', rejectedFiles);
      rejectedFiles.forEach(rejection => {
        const { file, errors } = rejection;
        const errorMessages = errors.map(e => {
          switch(e.code) {
            case 'file-too-large': return `${file.name} es demasiado grande (máx 10MB)`;
            case 'file-invalid-type': return `${file.name} no es un tipo de imagen válido`;
            default: return `Error en ${file.name}: ${e.message}`;
          }
        });
        
        toast({
          title: "Archivo rechazado",
          description: errorMessages.join(', '),
          variant: "destructive",
        });
      });
    },
    onError: (error) => {
      console.error('Dropzone error:', error);
      toast({
        title: "Error del selector",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const deletePhoto = async (photoId: string) => {
    try {
      const photo = photos.find(p => p.id === photoId);
      if (!photo) return;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([photo.file_path]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('photos')
        .delete()
        .eq('id', photoId);

      if (dbError) {
        console.error('Database deletion error:', dbError);
      }

      // Remove from local state regardless of backend errors
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

          <div className="bg-gray-200 p-8 mb-12 rounded-lg border border-gray-300">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 bg-gray-100
                ${isDragActive 
                  ? 'border-gray-700 bg-gray-200 shadow-lg' 
                  : 'border-gray-500 hover:border-gray-700 hover:bg-gray-200 hover:shadow-lg'
                }
                ${isUploading ? 'pointer-events-none opacity-50' : ''}
              `}
            >
              <input {...getInputProps()} />
              <Upload className={`mx-auto mb-4 h-16 w-16 ${isUploading ? 'animate-spin text-gray-700' : 'text-gray-600'}`} />
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {isUploading ? 'Subiendo fotos...' : (isDragActive ? 'Suelta las fotos aquí' : 'Arrastra fotos aquí o haz clic para seleccionar')}
              </h3>
              <p className="mb-6 text-lg text-gray-700">
                Soporta <span className="font-semibold text-gray-900">JPG, PNG, GIF, WebP</span> hasta <span className="font-semibold text-gray-900">10MB</span> por archivo
              </p>
              {!isUploading && (
                <Button 
                  variant="outline" 
                  className="mt-4 border-gray-600 text-gray-800 hover:bg-gray-600 hover:text-white font-semibold bg-white"
                >
                  Seleccionar Archivos
                </Button>
              )}
            </div>
          </div>

          {photos.length > 0 && (
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

          {photos.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto h-24 w-24 text-festival-purple mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">No hay fotos aún</h3>
              <p className="text-muted-foreground text-lg">
                Comienza subiendo las primeras fotos del festival usando el área de arriba
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
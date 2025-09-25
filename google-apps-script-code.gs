/**
 * Google Apps Script para subir fotos del TAX MUSIC FEST a Google Drive
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Ve a script.google.com
 * 2. Crea un nuevo proyecto
 * 3. Pega este código completo
 * 4. Guarda el proyecto (Ctrl+S)
 * 5. Ve a "Deploy" > "New deployment"
 * 6. Selecciona tipo: "Web app"
 * 7. Ejecutar como: "Me"
 * 8. Acceso: "Anyone" (para que funcione desde tu web)
 * 9. Haz clic en "Deploy"
 * 10. Copia la URL que te da y úsala en tu aplicación
 */

function doPost(e) {
  try {
    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);
    
    // Crear carpeta para el festival si no existe
    const folderName = "TAX MUSIC FEST - Fotos";
    let folder = getOrCreateFolder(folderName);
    
    // Crear subcarpeta con fecha de hoy
    const today = new Date().toLocaleDateString('es-ES');
    const dateFolder = getOrCreateFolder(`Fotos ${today}`, folder);
    
    // Procesar la foto
    const fileName = data.fileName;
    const fileData = data.fileData;
    const uploadedAt = data.uploadedAt;
    
    // Extraer los datos base64 (remover el prefijo data:image/...)
    const base64Data = fileData.split(',')[1];
    
    // Detectar el tipo de archivo desde el data URL
    const mimeType = fileData.split(';')[0].split(':')[1];
    
    // Crear el archivo en Google Drive
    const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, fileName);
    const file = dateFolder.createFile(blob);
    
    // Opcional: Añadir descripción con información del evento
    file.setDescription(`Foto subida desde TAX MUSIC FEST el ${uploadedAt}`);
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: `Foto ${fileName} subida exitosamente`,
        fileId: file.getId(),
        fileUrl: file.getUrl(),
        folder: folderName
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Manejo de errores
    console.error('Error al procesar la foto:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Error al subir la foto'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función para obtener o crear una carpeta
 */
function getOrCreateFolder(folderName, parentFolder = null) {
  let folders;
  
  if (parentFolder) {
    folders = parentFolder.getFoldersByName(folderName);
  } else {
    folders = DriveApp.getFoldersByName(folderName);
  }
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    if (parentFolder) {
      return parentFolder.createFolder(folderName);
    } else {
      return DriveApp.createFolder(folderName);
    }
  }
}

/**
 * Función de prueba (opcional)
 * Puedes ejecutar esta función para probar que todo funciona
 */
function testFunction() {
  const testData = {
    fileName: "test-photo.jpg",
    fileData: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
    uploadedAt: new Date().toISOString(),
    event: "tax_music_fest_photo_upload"
  };
  
  const mockRequest = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockRequest);
  console.log('Resultado de prueba:', result.getContent());
}
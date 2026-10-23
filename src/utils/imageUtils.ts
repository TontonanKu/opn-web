/**
 * Image helper utility to validate and compress uploaded photos/screenshots
 * down to lightweight Base64 strings for fast client-side chat & sync.
 */
export const compressImageFile = (
  file: File, 
  maxWidth = 1000, 
  maxHeight = 1000, 
  quality = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('File tidak ditemukan.'));
      return;
    }

    // 1. Enforce strict max file size (5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('Ukuran foto terlalu besar. Maksimal 5MB.'));
      return;
    }

    // 2. Reject SVG files to prevent stored SVG-based XSS payloads
    if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
      reject(new Error('Format file SVG tidak didukung demi keamanan. Gunakan format JPG, PNG, atau WEBP.'));
      return;
    }

    // 3. Ensure valid raster image MIME type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validMimes.includes(file.type)) {
      reject(new Error('Format gambar tidak didukung. Harap upload gambar JPG, PNG, atau WEBP.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        reject(new Error('Gagal membaca file gambar.'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          reject(new Error('Gagal memproses canvas gambar.'));
        }
      };

      img.onerror = () => {
        reject(new Error('File gambar rusak atau tidak dapat didekode.'));
      };

      img.src = dataUrl;
    };

    reader.onerror = () => reject(new Error('Gagal membaca file gambar dari perangkat Anda.'));
    reader.readAsDataURL(file);
  });
};

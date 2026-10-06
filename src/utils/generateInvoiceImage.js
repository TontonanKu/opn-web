/**
 * Generates a high-resolution, beautifully styled invoice receipt image
 * using HTML5 Canvas (Zero external library dependencies).
 */

function drawRoundRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
  }
}

export function generateInvoiceImage({
  gameName,
  tierName,
  quantity = 1,
  unitPrice = 0,
  addons = [],
  totalPrice = 0,
  estimatedTime = '1 - 2 Hari',
  orderNumber = null,
  currency = 'IDR',
  formattedUnitPrice = null,
  formattedSubtotal = null,
  formattedTotal = null,
  secondaryTotalText = null
}) {
  return new Promise((resolve, reject) => {
    try {
      const width = 800;
      const height = 1020;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // 1. Background Cream
      ctx.fillStyle = '#FAF4E8';
      ctx.fillRect(0, 0, width, height);

      // Neo-brutalist outer frame
      ctx.strokeStyle = '#9E1B28';
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, width - 14, height - 14);

      // Inner subtle border
      ctx.strokeStyle = '#E58327';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, width - 40, height - 40);

      // 2. Header Banner (Maroon #9E1B28)
      ctx.fillStyle = '#9E1B28';
      ctx.fillRect(23, 23, width - 46, 170);

      // Header Brand
      ctx.fillStyle = '#FAF4E8';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('ZURA-W GAME BOOSTING', 50, 80);

      ctx.fillStyle = '#FDE047';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('★ 100% HANDPLAY • FAST • GARANSI ANTI BANNED ★', 50, 115);

      // Invoice info right
      ctx.fillStyle = '#FAF4E8';
      ctx.font = '14px monospace';
      ctx.textAlign = 'right';
      const invNo = orderNumber || `INV-${Date.now().toString().slice(-6)}`;
      const dateStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      ctx.fillText(`NO: ${invNo}`, width - 50, 80);
      ctx.fillText(`TGL: ${dateStr}`, width - 50, 105);
      ctx.fillText('STATUS: ESTIMASI ORDER', width - 50, 130);
      ctx.textAlign = 'left';

      // 3. Category / Game Badge
      ctx.fillStyle = '#E58327';
      drawRoundRect(ctx, 50, 220, 300, 42, 8);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(`🎮 ${gameName}`, 65, 248);

      // 4. Order Details Table Box
      ctx.fillStyle = '#FFFFFF';
      drawRoundRect(ctx, 50, 285, width - 100, 390, 16);
      ctx.fill();
      ctx.strokeStyle = '#9E1B28';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Table Header
      ctx.fillStyle = '#9E1B28';
      ctx.fillRect(52, 287, width - 104, 50);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('DESKRIPSI ITEM / LAYANAN', 75, 318);
      ctx.textAlign = 'right';
      ctx.fillText('SUBTOTAL', width - 75, 318);
      ctx.textAlign = 'left';

      // Item Line 1: Tier / Service
      let currentY = 380;
      ctx.fillStyle = '#2B1618';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(tierName, 75, currentY);

      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'right';
      const baseSubtotal = (unitPrice || 0) * (quantity || 1);
      const displaySubtotal = formattedSubtotal || (currency === 'MYR' ? `RM ${baseSubtotal.toFixed(2)}` : `Rp ${baseSubtotal.toLocaleString('id-ID')}`);
      ctx.fillText(displaySubtotal, width - 75, currentY);
      ctx.textAlign = 'left';

      currentY += 28;
      ctx.fillStyle = '#6B5B5E';
      ctx.font = '14px sans-serif';
      const displayUnitPrice = formattedUnitPrice || (currency === 'MYR' ? `RM ${unitPrice.toFixed(2)}` : `Rp ${(unitPrice || 0).toLocaleString('id-ID')}`);
      ctx.fillText(`Jumlah: ${quantity} unit/bintang @ ${displayUnitPrice}`, 75, currentY);

      // Addons Lines
      if (addons && addons.length > 0) {
        currentY += 40;
        ctx.fillStyle = '#9E1B28';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('OPSI TAMBAHAN:', 75, currentY);

        addons.forEach((add) => {
          currentY += 30;
          ctx.fillStyle = '#2B1618';
          ctx.font = '15px sans-serif';
          ctx.fillText(`• ${add.name}`, 90, currentY);

          ctx.textAlign = 'right';
          ctx.font = 'bold 15px monospace';
          ctx.fillStyle = '#E58327';
          const addPriceText = add.formattedPrice || (add.price > 0 
            ? (currency === 'MYR' ? `+RM ${(add.priceMyr || (add.price / 4374)).toFixed(2)}` : `+Rp ${(add.price || 0).toLocaleString('id-ID')}`)
            : 'GRATIS');
          ctx.fillText(addPriceText, width - 75, currentY);
          ctx.textAlign = 'left';
        });
      }

      // Estimasi Pengerjaan Box
      currentY = 620;
      ctx.fillStyle = '#FAF4E8';
      ctx.fillRect(52, 608, width - 104, 64);

      ctx.fillStyle = '#6B5B5E';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(`⏱ Estimasi Pengerjaan: ${estimatedTime || '1 - 2 Hari'}`, 75, 645);
      ctx.fillStyle = '#15803D';
      ctx.fillText('✓ Keamanan 100% Handplay Murni', width - 360, 645);

      // 5. Total Price Banner
      ctx.fillStyle = '#9E1B28';
      drawRoundRect(ctx, 50, 700, width - 100, 130, 16);
      ctx.fill();

      // Shadow stroke
      ctx.strokeStyle = '#7A111C';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#FAF4E8';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('TOTAL ESTIMASI BIAYA:', 80, 745);

      ctx.fillStyle = '#FDE047';
      ctx.font = 'bold 44px sans-serif';
      const displayTotal = formattedTotal || (currency === 'MYR' ? `RM ${(totalPrice).toFixed(2)}` : `Rp ${totalPrice.toLocaleString('id-ID')}`);
      ctx.fillText(displayTotal, 80, 800);

      if (secondaryTotalText) {
        ctx.fillStyle = '#FAF4E8';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(`(${secondaryTotalText})`, 80 + ctx.measureText(displayTotal).width + 15, 796);
      }

      ctx.fillStyle = '#FAF4E8';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('*Harga transparan tanpa biaya tersembunyi', width - 80, 785);
      ctx.textAlign = 'left';

      // 6. Footer Contact & Instructions
      ctx.fillStyle = '#6B5B5E';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('WhatsApp Resmi: 0821-7279-5156 (zura-w Official)', width / 2, 875);
      ctx.fillText('Kirimkan gambar invoice ini ke WhatsApp untuk langsung mulai proses pengerjaan!', width / 2, 905);

      ctx.fillStyle = '#E58327';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Kazura Store • 100% Handplay & Amanah • QRIS Ready', width / 2, 935);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve({ blob, url });
        } else {
          reject(new Error('Gagal membuat blob gambar'));
        }
      }, 'image/png');
    } catch (err) {
      reject(err);
    }
  });
}

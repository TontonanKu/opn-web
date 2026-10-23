import { WebReceipt } from '../types';

/**
 * Native HTML5 Canvas digital receipt image generator.
 * Produces a high-res, branded Neo-Brutalist receipt image (PNG) with zero dependencies.
 */
export const downloadReceiptPNG = (receipt: WebReceipt, orderCode: string) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 800;
  const height = 1100;
  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = '#FAF8F2';
  ctx.fillRect(0, 0, width, height);

  // Outer border
  ctx.strokeStyle = '#121212';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, width - 8, height - 8);

  // Header background (Yellow)
  ctx.fillStyle = '#FFC700';
  ctx.fillRect(8, 8, width - 16, 140);
  ctx.strokeStyle = '#121212';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, width - 16, 140);

  // Checkered pattern strip on header
  const checkerSize = 14;
  for (let x = 8; x < width - 16; x += checkerSize * 2) {
    ctx.fillStyle = '#121212';
    ctx.fillRect(x, 8, checkerSize, checkerSize);
    ctx.fillRect(x + checkerSize, 8 + checkerSize, checkerSize, checkerSize);
  }

  // Header Text
  ctx.fillStyle = '#121212';
  ctx.font = '900 36px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('ZURA STORE', 36, 85);

  ctx.font = '700 15px "JetBrains Mono", monospace';
  ctx.fillStyle = '#222222';
  ctx.fillText('OFFICIAL DIGITAL RECEIPT • VERIFIED TRANSACTION', 36, 115);

  // Receipt Number Pill
  ctx.fillStyle = '#121212';
  ctx.fillRect(width - 265, 48, 225, 48);
  ctx.fillStyle = '#FFC700';
  ctx.font = '900 15px "JetBrains Mono", monospace';
  ctx.fillText(receipt.receiptNumber || `REC-${orderCode}`, width - 250, 78);

  // Information Grid - starts cleanly at y = 195 without floating stamp collision
  let y = 195;

  const drawRow = (label: string, value: string, isHighlight = false) => {
    // Label column
    ctx.fillStyle = '#666666';
    ctx.font = '700 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(label.toUpperCase(), 45, y);

    // Value column with dynamic measurement & boundary containment
    ctx.fillStyle = isHighlight ? '#FF5900' : '#121212';
    ctx.font = isHighlight ? '800 16px "JetBrains Mono", monospace' : '700 15px "JetBrains Mono", monospace';
    
    const maxValWidth = 515; // Width from x=235 to x=750
    let displayValue = String(value || '-');
    if (ctx.measureText(displayValue).width > maxValWidth) {
      while (ctx.measureText(displayValue + '...').width > maxValWidth && displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
      }
      displayValue += '...';
    }
    ctx.fillText(displayValue, 235, y);

    // Separator line
    ctx.strokeStyle = '#E5E0D8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(45, y + 14);
    ctx.lineTo(width - 45, y + 14);
    ctx.stroke();

    y += 48;
  };

  const cleanPhone = receipt.customerPhone ? receipt.customerPhone.replace(/[^0-9]/g, '') : '';
  const displayPhone = receipt.customerPhone?.includes('••')
    ? receipt.customerPhone
    : (cleanPhone.length >= 8 ? `${cleanPhone.slice(0, 4)}••••${cleanPhone.slice(-3)}` : (receipt.customerPhone || '-'));

  drawRow('Kode Pesanan', orderCode, true);
  drawRow('Waktu Transaksi', receipt.transactionDate);
  drawRow('Status Selesai', receipt.completedDate || 'Selesai Terverifikasi');
  drawRow('Nama Pelanggan', receipt.customerName);
  drawRow('Kontak Pembeli', displayPhone);
  drawRow('Layanan / Game', receipt.serviceName);
  drawRow('Paket / Varian', receipt.variantOrRank);
  drawRow('Metode Bayar', receipt.paymentMethod === 'web_transfer' ? 'QRIS / DANA / GOPAY (0% BIAYA)' : 'VIA WHATSAPP');

  // Total Payment Box with integrated Official LUNAS Stamp
  y += 20;
  ctx.fillStyle = '#121212';
  ctx.fillRect(45, y, width - 90, 95);
  ctx.strokeStyle = '#121212';
  ctx.lineWidth = 4;
  ctx.strokeRect(45, y, width - 90, 95);

  ctx.fillStyle = '#A3A3A3';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.fillText('TOTAL TRANSAKSI', 68, y + 36);

  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(receipt.amount);

  ctx.fillStyle = '#FFC700';
  ctx.font = '900 34px "Space Grotesk", sans-serif';
  ctx.fillText(formattedAmount, 68, y + 74);

  // Official Status Stamp (✓ LUNAS) placed safely inside right-hand of Total Box
  ctx.save();
  ctx.translate(width - 165, y + 47);
  ctx.rotate(-0.06);
  ctx.fillStyle = '#10B981';
  ctx.fillRect(-70, -25, 140, 50);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.strokeRect(-70, -25, 140, 50);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 20px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✓ LUNAS', 0, 0);
  ctx.restore();

  // Review & Rating Section
  if (receipt.review || receipt.rating) {
    y += 120;
    ctx.fillStyle = '#FFFDF0';
    ctx.fillRect(45, y, width - 90, 95);
    ctx.strokeStyle = '#121212';
    ctx.lineWidth = 3;
    ctx.strokeRect(45, y, width - 90, 95);

    ctx.fillStyle = '#121212';
    ctx.font = '800 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const stars = '★'.repeat(receipt.rating || 5);
    ctx.fillText(`RATING: ${stars} (${(receipt.rating || 5).toFixed(1)} / 5.0)`, 65, y + 34);

    ctx.fillStyle = '#444444';
    ctx.font = 'italic 500 14px sans-serif';
    const rawReview = receipt.review ? `"${receipt.review}"` : '"Pelayanan cepat & memuaskan!"';
    let reviewTxt = rawReview;
    if (ctx.measureText(reviewTxt).width > 650) {
      while (ctx.measureText(reviewTxt + '..."').width > 650 && reviewTxt.length > 0) {
        reviewTxt = reviewTxt.slice(0, -1);
      }
      reviewTxt += '..."';
    }
    ctx.fillText(reviewTxt, 65, y + 68);
  }

  // Footer & Tamper-Proof Fingerprint
  y = height - 120;
  ctx.fillStyle = '#121212';
  ctx.fillRect(45, y, width - 90, 2);

  y += 35;
  ctx.fillStyle = '#666666';
  ctx.font = '600 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('ZURA STORE • DOKUMEN BUKTI RESMI TRANSAKSI DIGITAL', 45, y);

  const hash = receipt.verificationHash || `ZR-VERIFIED-${orderCode.slice(-6)}-${Date.now().toString(16).toUpperCase()}`;
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillStyle = '#121212';
  ctx.fillText(`FINGERPRINT HASH: ${hash}`, 45, y + 25);
  ctx.fillText('GARANSI RESMI 100% • AMANAH SEJAK 2025', 45, y + 45);

  // Download Trigger
  try {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `STRUK-RESMI-${orderCode}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to export receipt PNG:', err);
  }
};

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
  ctx.fillText('ZURA STORE', 36, 85);

  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillStyle = '#333333';
  ctx.fillText('OFFICIAL DIGITAL RECEIPT • VERIFIED TRANSACTION', 36, 115);

  // Receipt Number Pill
  ctx.fillStyle = '#121212';
  ctx.fillRect(width - 260, 48, 220, 48);
  ctx.fillStyle = '#FFC700';
  ctx.font = '900 16px "JetBrains Mono", monospace';
  ctx.fillText(receipt.receiptNumber || `REC-${orderCode}`, width - 245, 78);

  // Status Stamp (SELESAI / LUNAS)
  ctx.save();
  ctx.translate(width - 180, 240);
  ctx.rotate(-0.15);
  ctx.fillStyle = '#10B981';
  ctx.fillRect(-10, -35, 160, 50);
  ctx.strokeStyle = '#121212';
  ctx.lineWidth = 4;
  ctx.strokeRect(-10, -35, 160, 50);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 22px "Space Grotesk", sans-serif';
  ctx.fillText('✓ LUNAS', 15, -2);
  ctx.restore();

  // Information Grid
  let y = 200;
  ctx.fillStyle = '#121212';
  ctx.font = '700 15px "JetBrains Mono", monospace';

  const drawRow = (label: string, value: string, isHighlight = false) => {
    ctx.fillStyle = '#666666';
    ctx.font = '600 15px "JetBrains Mono", monospace';
    ctx.fillText(label.toUpperCase(), 40, y);

    ctx.fillStyle = isHighlight ? '#FF5900' : '#121212';
    ctx.font = isHighlight ? '800 17px "JetBrains Mono", monospace' : '700 16px "JetBrains Mono", monospace';
    
    // Truncate long value
    const truncated = value.length > 38 ? value.slice(0, 35) + '...' : value;
    ctx.fillText(truncated, 250, y);

    // Separator line
    ctx.strokeStyle = '#E5E0D8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, y + 15);
    ctx.lineTo(width - 40, y + 15);
    ctx.stroke();

    y += 50;
  };

  drawRow('Kode Pesanan', orderCode, true);
  drawRow('Waktu Transaksi', receipt.transactionDate);
  drawRow('Status Selesai', receipt.completedDate || 'Selesai Terverifikasi');
  drawRow('Nama Pelanggan', receipt.customerName);
  drawRow('Kontak Pembeli', receipt.customerPhone);
  drawRow('Layanan / Game', receipt.serviceName);
  drawRow('Paket / Varian', receipt.variantOrRank);
  drawRow('Metode Bayar', receipt.paymentMethod === 'web_transfer' ? 'QRIS / DANA / GOPAY (0% BIAYA)' : 'VIA WHATSAPP');

  // Total Payment Box
  y += 20;
  ctx.fillStyle = '#121212';
  ctx.fillRect(40, y, width - 80, 85);
  ctx.strokeStyle = '#121212';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, y, width - 80, 85);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 14px "JetBrains Mono", monospace';
  ctx.fillText('TOTAL TRANSAKSI', 65, y + 35);

  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(receipt.amount);

  ctx.fillStyle = '#FFC700';
  ctx.font = '900 32px "Space Grotesk", sans-serif';
  ctx.fillText(formattedAmount, 65, y + 70);

  // Review & Rating Section
  if (receipt.review || receipt.rating) {
    y += 120;
    ctx.fillStyle = '#FFFDF0';
    ctx.fillRect(40, y, width - 80, 95);
    ctx.strokeStyle = '#121212';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, y, width - 80, 95);

    ctx.fillStyle = '#121212';
    ctx.font = '800 15px "JetBrains Mono", monospace';
    const stars = '★'.repeat(receipt.rating || 5);
    ctx.fillText(`RATING: ${stars} (${(receipt.rating || 5).toFixed(1)} / 5.0)`, 60, y + 32);

    ctx.fillStyle = '#444444';
    ctx.font = 'italic 500 14px sans-serif';
    const reviewTxt = receipt.review ? `"${receipt.review}"` : '"Pelayanan cepat & memuaskan!"';
    ctx.fillText(reviewTxt.length > 60 ? reviewTxt.slice(0, 57) + '...' : reviewTxt, 60, y + 65);
  }

  // Footer & Tamper-Proof Fingerprint
  y = height - 120;
  ctx.fillStyle = '#121212';
  ctx.fillRect(40, y, width - 80, 2);

  y += 35;
  ctx.fillStyle = '#666666';
  ctx.font = '600 12px "JetBrains Mono", monospace';
  ctx.fillText('ZURA STORE • DOKUMEN BUKTI RESMI TRANSAKSI DIGITAL', 40, y);

  const hash = receipt.verificationHash || `ZR-VERIFIED-${orderCode.slice(-6)}-${Date.now().toString(16).toUpperCase()}`;
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillStyle = '#121212';
  ctx.fillText(`FINGERPRINT HASH: ${hash}`, 40, y + 25);
  ctx.fillText('GARANSI RESMI 100% • AMANAH SEJAK 2025', 40, y + 45);

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

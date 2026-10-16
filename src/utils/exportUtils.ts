import { Order } from '../types';

/**
 * Exports an array of Orders to a formatted CSV file compatible with Excel and Google Sheets.
 */
export const exportOrdersToCSV = (orders: Order[]) => {
  const headers = [
    'Kode Order',
    'Tanggal Order',
    'Nama Pelanggan',
    'Nomor WhatsApp',
    'Kategori Layanan',
    'Nama Produk / Game',
    'Paket / Detail',
    'Metode Pembayaran',
    'Total Pembayaran (Rp)',
    'Status Transaksi',
    'Rating (Bintang)',
    'Ulasan Pelanggan',
    'Nomor Struk'
  ];

  const escapeCSV = (str: string | number | undefined | null) => {
    if (str === undefined || str === null) return '""';
    const stringified = String(str).replace(/"/g, '""');
    return `"${stringified}"`;
  };

  const rows = orders.map((ord) => [
    escapeCSV(ord.orderCode),
    escapeCSV(new Date(ord.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })),
    escapeCSV(ord.customerName),
    escapeCSV(ord.customerPhone ? `'${ord.customerPhone}` : '-'),
    escapeCSV(ord.serviceType === 'joki_game' ? 'Joki Game' : ord.serviceType === 'app_premium' ? 'App Premium' : 'Desain / AI'),
    escapeCSV(ord.itemName),
    escapeCSV(ord.itemDetails),
    escapeCSV(ord.paymentMethod === 'web_transfer' ? 'QRIS / DANA / GoPay' : 'WhatsApp Direct'),
    escapeCSV(ord.totalAmount),
    escapeCSV(
      ord.status === 'completed'
        ? 'SELESAI'
        : ord.status === 'processing'
        ? 'DIPROSES'
        : ord.status === 'cancelled'
        ? 'DIBATALKAN'
        : 'MENUNGGU VERIFIKASI'
    ),
    escapeCSV(ord.rating || ord.receipt?.rating || '-'),
    escapeCSV(ord.reviewText || ord.receipt?.review || '-'),
    escapeCSV(ord.receipt?.receiptNumber || '-')
  ]);

  // Prepend UTF-8 BOM (\uFEFF) so Microsoft Excel opens special characters correctly
  const csvContent = '\uFEFF' + [
    headers.join(';'),
    ...rows.map(r => r.join(';'))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const today = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `Laporan_Transaksi_Zura_Store_${today}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

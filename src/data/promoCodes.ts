export interface PromoCode {
  code: string;
  type: 'fixed' | 'percent';
  value: number; // Rupiah amount or percentage (e.g. 10 for 10%)
  minPurchase: number;
  maxDiscount?: number;
  description: string;
}

export const ACTIVE_PROMO_CODES: PromoCode[] = [
  {
    code: 'ZURAGACOR',
    type: 'fixed',
    value: 5000,
    minPurchase: 20000,
    description: 'Potongan Rp 5.000 tanpa batas layanan'
  },
  {
    code: 'HEMAT10',
    type: 'percent',
    value: 10,
    minPurchase: 35000,
    maxDiscount: 15000,
    description: 'Diskon 10% (Maksimal Rp 15.000)'
  },
  {
    code: 'ZURA2026',
    type: 'fixed',
    value: 10000,
    minPurchase: 60000,
    description: 'Spesial Launching 2026! Potongan Rp 10.000'
  },
  {
    code: 'BOOSTKILAT',
    type: 'fixed',
    value: 7500,
    minPurchase: 40000,
    description: 'Potongan Rp 7.500 untuk Booster & Akun Premium'
  }
];

export const validatePromoCode = (
  code: string,
  totalAmount: number
): { isValid: boolean; discountAmount: number; message: string; promo?: PromoCode } => {
  const cleanCode = code.trim().toUpperCase();
  const promo = ACTIVE_PROMO_CODES.find(p => p.code === cleanCode);

  if (!promo) {
    return {
      isValid: false,
      discountAmount: 0,
      message: 'Kode voucher tidak valid atau telah kadaluarsa.'
    };
  }

  if (totalAmount < promo.minPurchase) {
    const minFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(promo.minPurchase);
    return {
      isValid: false,
      discountAmount: 0,
      message: `Voucher berlaku minimal transaksi ${minFormatted}.`
    };
  }

  let discount = 0;
  if (promo.type === 'fixed') {
    discount = promo.value;
  } else {
    discount = Math.round((totalAmount * promo.value) / 100);
    if (promo.maxDiscount && discount > promo.maxDiscount) {
      discount = promo.maxDiscount;
    }
  }

  // Ensure discount doesn't exceed total amount
  discount = Math.min(discount, totalAmount);

  return {
    isValid: true,
    discountAmount: discount,
    message: `Berhasil digunakan: ${promo.description}!`,
    promo
  };
};

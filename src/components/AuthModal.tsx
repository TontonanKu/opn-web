import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CREDENTIALS, ADMIN_CONFIG } from '../data/initialData';
import { 
  X, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  HelpCircle, 
  User, 
  ShieldCheck,
  Lock,
  Smartphone,
  Mail,
  Zap,
  Check
} from 'lucide-react';
import { validatePhoneNumber, sanitizeInput, hashPassword, isReservedAdminIdentifier } from '../utils/securityUtils';

interface RegisteredUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  passwordHash: string;
  createdAt: number;
}

const STORAGE_USERS_KEY = 'zura_registered_users';

export const AuthModal: React.FC = () => {
  const { activeModal, setActiveModal, login, setViewMode } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [identifier, setIdentifier] = useState(''); // WhatsApp or Email for Login
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper untuk reset seluruh form dan password state
  const resetForm = () => {
    setIdentifier('');
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    setIsRegister(false);
    setActiveModal(null);
  };

  const switchMode = (toRegister: boolean) => {
    resetForm();
    setIsRegister(toRegister);
  };

  // Bersihkan input password & form setiap kali modal dibuka atau ditutup
  React.useEffect(() => {
    resetForm();
    if (activeModal === 'login') {
      setIsRegister(false); // Default ke form Sign In
    }
  }, [activeModal]);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveModal]);

  if (activeModal !== 'login') return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = sanitizeInput(name);
    const cleanPhone = sanitizeInput(phone);
    const cleanEmail = sanitizeInput(email);

    if (!cleanName.trim()) {
      setErrorMessage('Harap masukkan nama lengkap atau nama panggilan Anda.');
      return;
    }

    if (
      isReservedAdminIdentifier(cleanName) ||
      isReservedAdminIdentifier(cleanPhone) ||
      isReservedAdminIdentifier(cleanEmail)
    ) {
      setErrorMessage('Nama, nomor WhatsApp, atau email tersebut dilindungi oleh sistem dan tidak dapat didaftarkan sebagai akun pelanggan.');
      return;
    }

    // 1. Validasi Nomor WhatsApp Aktif (Format Indonesia)
    const phoneCheck = validatePhoneNumber(cleanPhone);
    if (!phoneCheck.isValid) {
      setErrorMessage('Nomor WhatsApp tidak valid. Masukkan nomor aktif diawali 08... atau 628... (minimal 10 digit).');
      return;
    }

    // 2. Validasi Password
    if (password.length < 6) {
      setErrorMessage('Password minimal terdiri dari 6 karakter demi keamanan akun Anda.');
      return;
    }

    try {
      setIsSubmitting(true);
      const hashed = await hashPassword(password);

      // Simpan akun ke browser storage terenkripsi lokal
      let existingUsers: RegisteredUser[] = [];
      try {
        const stored = localStorage.getItem(STORAGE_USERS_KEY);
        if (stored) existingUsers = JSON.parse(stored);
      } catch (err) {}

      // Cek apakah nomor WA sudah terdaftar
      const alreadyExists = existingUsers.some(u => u.phone === phoneCheck.normalized);
      if (alreadyExists) {
        setErrorMessage('Nomor WhatsApp ini sudah terdaftar. Silakan langsung Sign In di bawah.');
        setIsSubmitting(false);
        return;
      }

      const newUser: RegisteredUser = {
        id: 'usr_' + Date.now(),
        name: cleanName,
        phone: phoneCheck.normalized,
        email: cleanEmail || undefined,
        passwordHash: hashed,
        createdAt: Date.now()
      };

      existingUsers.push(newUser);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(existingUsers));

      // Otomatis login & bersihkan form
      login(cleanName, phoneCheck.normalized, 'customer');
      setViewMode('store');
      resetForm();
      setIsRegister(false);
      setActiveModal(null);
      alert(`Selamat datang kak ${cleanName}! Akun Anda berhasil dibuat & otomatis terhubung.`);
    } catch (err: any) {
      setErrorMessage('Gagal memproses pendaftaran. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanId = sanitizeInput(identifier);
    if (!cleanId.trim() || !password) {
      setErrorMessage('Silakan masukkan nomor WhatsApp/email dan password Anda.');
      return;
    }

    // 1. Stealth check: jika kredensial admin, otomatis buka Admin Dashboard
    const cleanIdLower = cleanId.toLowerCase().trim();
    const cleanDigits = cleanId.replace(/[^0-9]/g, '');
    const hashedInput = await hashPassword(password);
    const isPassAdmin = hashedInput === ADMIN_CREDENTIALS.passwordHash;
    const isIdAdmin = 
      cleanIdLower === 'admin' ||
      cleanIdLower === 'superadmin' ||
      cleanIdLower === ADMIN_CREDENTIALS.email.toLowerCase() ||
      cleanIdLower === 'admin@zura-w.my.id' ||
      cleanIdLower === 'zuraw.official@gmail.com' ||
      cleanDigits === '082172795156' ||
      cleanDigits === '6282172795156' ||
      cleanDigits === ADMIN_CONFIG.whatsappNumber;

    if (isIdAdmin) {
      if (isPassAdmin) {
        login('Zura Super Admin', ADMIN_CONFIG.whatsappNumber, 'admin');
        setViewMode('admin-dashboard');
        resetForm();
        setIsRegister(false);
        setActiveModal(null);
        return;
      } else {
        setErrorMessage('Password admin salah! Silakan masukkan password admin yang benar.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const hashedInput = await hashPassword(password);

      // Cek ke daftar user yang tersimpan
      let existingUsers: RegisteredUser[] = [];
      try {
        const stored = localStorage.getItem(STORAGE_USERS_KEY);
        if (stored) existingUsers = JSON.parse(stored);
      } catch (err) {}

      const cleanDigits = cleanId.replace(/[^0-9]/g, '');
      const matchedUser = existingUsers.find(u => 
        (cleanDigits && u.phone === cleanDigits) || 
        (u.email && u.email.toLowerCase() === cleanId.toLowerCase())
      );

      if (matchedUser) {
        if (matchedUser.passwordHash === hashedInput) {
          login(matchedUser.name, matchedUser.phone, 'customer');
          setViewMode('store');
          resetForm();
          setIsRegister(false);
          setActiveModal(null);
          return;
        } else {
          setErrorMessage('Password yang Anda masukkan salah. Silakan periksa kembali.');
          setIsSubmitting(false);
          return;
        }
      }

      // Jika belum terdaftar sebelumnya, login cepat berbasis nomor WA
      const phoneCheck = validatePhoneNumber(cleanId);
      const displayName = cleanId.includes('@') ? cleanId.split('@')[0] : 'Pelanggan Zura';
      login(displayName, phoneCheck.isValid ? phoneCheck.normalized : cleanId, 'customer');
      setViewMode('store');
      resetForm();
      setIsRegister(false);
      setActiveModal(null);
    } catch (err: any) {
      setErrorMessage('Terjadi kendala saat login. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="brutal-card bg-[#FAF8F5] max-w-md w-full p-6 sm:p-7 relative shadow-brutal-lg">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-5">
          <button 
            type="button"
            onClick={handleClose}
            className="p-1.5 border-2 border-black bg-white hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_#000]"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
          
          <a
            href={`https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=Halo%20Admin%20Zura,%20saya%20butuh%20bantuan%20terkait%20akun`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-neutral-700 hover:text-black hover:underline"
          >
            <HelpCircle className="w-4 h-4 text-[#FF5900]" />
            <span>BANTUAN CS</span>
          </a>
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFC700] border border-black px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              <span>AKUN TERLINDUNGI & AMAN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#121212] leading-none uppercase">
              {isRegister ? 'BUAT AKUN BARU' : 'MASUK KE AKUN'}
            </h2>
            <p className="text-xs font-mono font-semibold text-neutral-600 mt-1">
              {isRegister 
                ? 'Daftar dengan Nomor WhatsApp asli untuk lacak orderan Anda' 
                : 'Masuk dengan Nomor WhatsApp atau Email Anda'}
            </p>
          </div>

          <div className="w-11 h-11 bg-[#FFC700] border-[2.5px] border-black flex items-center justify-center shadow-brutal-sm shrink-0">
            <User className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-600 text-xs font-mono text-red-900 font-bold leading-relaxed shadow-[2px_2px_0px_#000]">
            {errorMessage}
          </div>
        )}

        {/* REGISTER FORM */}
        {isRegister ? (
          <form key="register-form" onSubmit={handleRegister} className="space-y-3.5" autoComplete="off">
            <div>
              <label className="block text-xs font-mono font-black uppercase text-[#121212] mb-1">
                Nama Lengkap / Panggilan <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border-2 border-black bg-white">
                <span className="pl-3 text-neutral-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Contoh: Alex Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-[#121212] mb-1">
                Nomor WhatsApp Aktif <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border-2 border-black bg-white">
                <span className="pl-3 text-neutral-400">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                </span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="Contoh: 081234567890 atau 628..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 text-xs font-bold focus:outline-none"
                />
              </div>
              <span className="text-[10px] font-mono text-neutral-500 block mt-1">
                Wajib aktif untuk konfirmasi pengerjaan, login booster, dan update pesanan.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-[#121212] mb-1">
                Email Anda <span className="text-neutral-400 font-normal">(Opsional)</span>
              </label>
              <div className="flex items-center border-2 border-black bg-white">
                <span className="pl-3 text-neutral-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="nama@domain.com (bisa dikosongkan)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-[#121212] mb-1">
                Password Akun <span className="text-red-500">*</span>
              </label>
              <div className="relative border-2 border-black bg-white">
                <input
                  key="reg-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 pr-10 text-xs font-bold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full brutal-btn-orange py-3 px-5 flex items-center justify-between text-xs sm:text-sm uppercase tracking-wide group mt-3 disabled:opacity-50"
            >
              <span className="font-display font-black">
                {isSubmitting ? 'MEMPROSES...' : 'DAFTAR SEKARANG'}
              </span>
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-[#FFC700]" />
              </div>
            </button>
          </form>
        ) : (
          /* LOGIN FORM */
          <form key="login-form" onSubmit={handleLogin} className="space-y-3.5" autoComplete="off">
            <div>
              <label className="block text-xs font-mono font-black uppercase text-[#121212] mb-1">
                Nomor WhatsApp atau Email
              </label>
              <div className="flex items-center border-2 border-black bg-white">
                <span className="pl-3 text-neutral-400">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                </span>
                <input
                  type="text"
                  required
                  autoComplete="username tel"
                  placeholder="081234567890 atau email@domain.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full p-2.5 text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-mono font-black uppercase text-[#121212]">
                  Password
                </label>
                <a 
                  href={`https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=Halo%20Admin%20Zura,%20saya%20lupa%20password%20akun%20saya`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono font-bold uppercase underline text-neutral-500 hover:text-black"
                >
                  Lupa Password?
                </a>
              </div>
              <div className="relative border-2 border-black bg-white">
                <input
                  key="login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 pr-10 text-xs font-bold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full brutal-btn-orange py-3 px-5 flex items-center justify-between text-xs sm:text-sm uppercase tracking-wide group mt-3 disabled:opacity-50"
            >
              <span className="font-display font-black">
                {isSubmitting ? 'MEMERIKSA...' : 'SIGN IN / MASUK'}
              </span>
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-[#FFC700]" />
              </div>
            </button>
          </form>
        )}

        {/* Quick Guest Checkout Prompt (Zero Registration Required) */}
        <div className="mt-5 p-3 bg-[#FFF3B0] border-2 border-black flex items-center justify-between gap-3 text-xs font-mono shadow-[2px_2px_0px_#000]">
          <div>
            <span className="font-black text-black block leading-tight">Mau Beli Cepat Tanpa Akun?</span>
            <span className="text-[11px] text-neutral-700 block mt-0.5">Pilih produk & langsung checkout di katalog!</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="bg-black text-[#FFC700] px-3 py-1.5 text-[11px] font-black uppercase border border-black shrink-0 hover:bg-neutral-800 transition-colors"
          >
            Beli Kilat
          </button>
        </div>

        {/* Bottom Toggle Register / Login */}
        <div className="mt-5 text-center font-mono text-xs pt-3 border-t-2 border-dashed border-neutral-300">
          <span className="text-neutral-600">
            {isRegister ? 'Sudah memiliki akun? ' : 'Belum memiliki akun? '}
          </span>
          <button
            type="button"
            onClick={() => switchMode(!isRegister)}
            className="font-black text-[#FF5900] uppercase hover:underline ml-1"
          >
            {isRegister ? 'Sign In di sini' : 'Daftar Akun Baru'}
          </button>
        </div>

      </div>
    </div>
  );
};

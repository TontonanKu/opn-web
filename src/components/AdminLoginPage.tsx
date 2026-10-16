import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CREDENTIALS } from '../data/initialData';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  KeyRound, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin, setViewMode } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const success = adminLogin(email, password);
    if (!success) {
      setErrorMsg('Email atau password admin salah! Periksa kembali kredensial Anda.');
    }
  };

  const handleUseDefault = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-center items-center p-4 selection:bg-[#FFC700] selection:text-black">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Top Back to Store Button */}
        <button
          onClick={() => setViewMode('store')}
          className="mb-6 inline-flex items-center gap-2 text-neutral-400 hover:text-[#FFC700] font-mono text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Toko</span>
        </button>

        {/* Login Card */}
        <div className="bg-[#FAF8F2] border-[3px] border-black p-8 shadow-brutal relative">
          
          {/* Header Icon */}
          <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-[#FFC700] border-2 border-black flex items-center justify-center font-display font-black text-xl shadow-[2px_2px_0px_#000]">
                Z
              </div>
              <div>
                <span className="font-display font-black text-lg uppercase text-[#121212] block leading-none">
                  ADMIN GATEWAY
                </span>
                <span className="font-mono text-[10px] text-neutral-500 font-bold uppercase">
                  ZURA STORE CONTROL PORTAL
                </span>
              </div>
            </div>

            <div className="w-8 h-8 bg-black text-[#FFC700] border-2 border-black flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <h2 className="text-2xl font-display font-black text-[#121212] uppercase mb-1">
            Masuk Sebagai Administrator
          </h2>
          <p className="text-xs text-neutral-600 font-medium mb-6">
            Halaman ini dikhususkan untuk pengelola toko. Masukkan email dan password admin yang telah ditentukan.
          </p>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 bg-red-100 border-2 border-red-500 p-3 text-xs text-red-900 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-black uppercase text-[#121212] mb-1">
                EMAIL / USERNAME / WHATSAPP ADMIN
              </label>
              <div className="flex items-center border-2 border-black bg-white">
                <span className="px-3 text-neutral-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="admin atau admin@zurastore.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-[#121212] mb-1">
                PASSWORD ADMIN
              </label>
              <div className="flex items-center border-2 border-black bg-white">
                <span className="px-3 text-neutral-500">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full brutal-btn-yellow py-3.5 px-6 flex items-center justify-between text-xs uppercase font-display font-black group mt-2"
            >
              <span>BUKA DASHBOARD ADMIN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Quick Credential Hint for Evaluation */}
          <div className="mt-6 pt-4 border-t-2 border-dashed border-neutral-300 bg-amber-50 p-3 border border-amber-300">
            <div className="flex items-center justify-between mb-1 text-[11px] font-mono font-bold text-amber-900">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5900]" />
                Kredensial Default Admin:
              </span>
              <button
                type="button"
                onClick={handleUseDefault}
                className="underline text-[#FF5900] hover:text-black font-extrabold"
              >
                Isi Otomatis
              </button>
            </div>
            <div className="font-mono text-[10px] text-neutral-700 space-y-0.5">
              <div>Email: <strong>{ADMIN_CREDENTIALS.email}</strong></div>
              <div>Password: <strong>{ADMIN_CREDENTIALS.password}</strong></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

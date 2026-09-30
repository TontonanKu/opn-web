import React, { useState } from 'react';
import { X, Star, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TestimonialModal({ onClose, onAddTestimonial }) {
  const [name, setName] = useState('');
  const [service, setService] = useState('Joki MLBB');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newTesti = {
      id: `testi-${Date.now()}`,
      name: name.trim(),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      service: service,
      game: service.includes('AI') ? 'AI Project' : service.split(' ')[1] || 'Joki Game',
      rating: rating,
      date: 'Hari ini',
      comment: comment.trim(),
      verified: true
    };

    onAddTestimonial(newTesti);

    // Confetti blast celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti effect triggered');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF4E8] border-3 border-[#9E1B28] rounded-[28px] shadow-2xl p-6 sm:p-8 text-[#2B1618]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#9E1B28] text-white flex items-center justify-center font-black hover:rotate-90 transition-transform shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#9E1B28]">
          <Sparkles className="w-5 h-5 text-[#E58327]" />
          <span className="text-xs font-black uppercase tracking-wider font-['Outfit']">
            Bagikan Pengalamanmu
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#9E1B28] tracking-tight font-['Outfit'] mb-4">
          Tulis Testimoni
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-1 font-['Outfit']">
              Beri Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-hidden"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'text-[#E58327] fill-[#E58327]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-extrabold text-[#6B5B5E]">
                {rating} dari 5 Bintang
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-1 font-['Outfit']">
              Nama / Nickname (IGN)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Dimas (IGN: ShadowBlade)"
              className="w-full bg-white border-2 border-[#9E1B28]/30 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-[#2B1618] focus:outline-hidden focus:border-[#9E1B28]"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-1 font-['Outfit']">
              Layanan yang Digunakan
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-white border-2 border-[#9E1B28]/30 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-[#2B1618] focus:outline-hidden focus:border-[#9E1B28]"
            >
              <option value="Joki MLBB (Rank Push)">Joki Mobile Legends: Bang Bang</option>
              <option value="Joki Valorant (Rank Boost)">Joki Valorant</option>
              <option value="Joki Honor of Kings">Joki Honor of Kings</option>
              <option value="Joki Genshin Impact / HSR">Joki Genshin / Honkai Star Rail</option>
              <option value="Project AI & Generative Game Assets">Project AI & Generative Asset</option>
              <option value="Game Tech & Unity Consulting">Game Tech & Unity Consulting</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-1 font-['Outfit']">
              Ulasan / Kesan Pesan
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan kepuasanmu (kecepatan pengerjaan, keramahan, hasil rank, dsb.)..."
              className="w-full bg-white border-2 border-[#9E1B28]/30 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-[#2B1618] focus:outline-hidden focus:border-[#9E1B28]"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#9E1B28] hover:bg-[#80141F] text-white font-black text-sm py-3 rounded-xl shadow-md transition-colors active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Testimoni</span>
          </button>
        </form>
      </div>
    </div>
  );
}

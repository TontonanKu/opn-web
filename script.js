// script.js
window.addEventListener('load', () => {
    // Hide loader
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Wait for transition to finish
    }

    // Add subtle entrance animations
    const profileInfo = document.querySelector('.profile-info');
    const links = document.querySelectorAll('.link-btn');
    
    profileInfo.style.opacity = '0';
    profileInfo.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        profileInfo.style.transition = 'all 0.6s ease';
        profileInfo.style.opacity = '1';
        profileInfo.style.transform = 'translateY(0)';
    }, 100);

    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.4s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + (index * 80));
    });

    // ==========================================
    // DISCORD LIVE ACTIVITY (SPOTIFY / GAMES)
    // ==========================================
    const DISCORD_ID = '1056938442061271150'; 

    let activityInterval;

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateActivity(d) {
        const widget = document.getElementById('activity-widget');
        const icon = document.getElementById('activity-icon');
        const headerText = document.getElementById('activity-header-text');
        const art = document.getElementById('activity-art');
        const title = document.getElementById('activity-title');
        const details = document.getElementById('activity-details');
        const state = document.getElementById('activity-state');
        const progressContainer = document.getElementById('activity-progress-container');
        
        clearInterval(activityInterval);

        // Prioritas 1: Spotify
        if (d.spotify) {
            widget.style.display = 'block';
            widget.style.cursor = 'default'; // Reset kursor untuk spotify
            widget.onclick = null; // Reset click untuk spotify
            
            icon.className = 'fab fa-spotify';
            icon.style.color = '#1DB954';
            headerText.innerText = 'Listening to Spotify';
            
            art.src = d.spotify.album_art_url;
            art.style.display = 'block';
            title.innerText = d.spotify.song;
            details.innerText = d.spotify.artist;
            state.style.display = 'none';
            progressContainer.style.display = 'flex';
            
            const start = d.spotify.timestamps.start;
            const end = d.spotify.timestamps.end;
            const duration = end - start;
            
            document.getElementById('activity-time-end').innerText = formatTime(duration);
            
            activityInterval = setInterval(() => {
                const now = Date.now();
                const current = now - start;
                if (current > duration) return clearInterval(activityInterval);
                document.getElementById('activity-time-start').innerText = formatTime(current);
                document.getElementById('activity-progress').style.width = ((current / duration) * 100) + '%';
            }, 1000);
            return;
        }

        // Prioritas 2: Main Game (type 0)
        const game = d.activities.find(a => a.type === 0);
        if (game) {
            widget.style.display = 'block';
            widget.style.cursor = 'pointer'; // Kursor tangan saat hover
            widget.onclick = function() { openGameProfile(game.name); }; // Panggil fungsi modal
            
            icon.className = 'fas fa-gamepad';
            icon.style.color = '#ffffff';
            headerText.innerHTML = 'Playing a Game <span style="font-size: 0.75rem; color: #888; font-weight: normal; margin-left: auto;">(Klik untuk lihat Profil)</span>';
            
            // Coba ambil icon game kalau ada, kalau tidak pakai icon dari Discord CDN
            let imgSrc = '';
            if (game.assets && game.assets.large_image) {
                let imgId = game.assets.large_image;
                if (imgId.startsWith('mp:external/')) {
                    imgSrc = imgId.replace('mp:external/', 'https://media.discordapp.net/external/');
                } else {
                    imgSrc = `https://cdn.discordapp.com/app-assets/${game.application_id}/${imgId}.png`;
                }
            } else if (game.application_id) {
                // Sistem super canggih: otomatis ambil logo resmi game dari database Discord!
                imgSrc = `https://dcdn.dstn.to/app-icons/${game.application_id}.webp?size=256`;
            } else {
                imgSrc = 'https://cdn-icons-png.flaticon.com/512/808/808439.png'; // Logo Gamepad Universal
            }
            
            art.src = imgSrc;
            art.onerror = function() {
                // Jika game sangat baru dan Discord tidak punya logonya, ganti jadi ikon Gamepad agar tidak error/patah
                this.onerror = null; 
                this.src = 'https://cdn-icons-png.flaticon.com/512/808/808439.png';
            };
            art.style.display = 'block';
            art.style.backgroundColor = 'white'; // Memastikan logo SVG/Transparan terlihat bagus

            title.innerText = game.name; // Contoh: Roblox
            details.innerText = game.details || ''; // Info tambahan game
            
            if (game.state) {
                state.innerText = game.state;
                state.style.display = 'block';
            } else {
                state.style.display = 'none';
            }

            // Game Time (Waktu Bermain)
            if (game.timestamps && game.timestamps.start) {
                progressContainer.style.display = 'flex';
                document.getElementById('activity-time-end').innerText = 'elapsed';
                document.getElementById('activity-progress').style.width = '100%';
                
                const start = game.timestamps.start;
                activityInterval = setInterval(() => {
                    const current = Date.now() - start;
                    document.getElementById('activity-time-start').innerText = formatTime(current);
                }, 1000);
            } else {
                progressContainer.style.display = 'none';
            }
            return;
        }

        // Kalau tidak dengar Spotify dan tidak main game, sembunyikan
        widget.style.display = 'none';
    }

    function connectLanyard() {
        const ws = new WebSocket('wss://api.lanyard.rest/socket');
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.op === 1) {
                ws.send(JSON.stringify({
                    op: 2,
                    d: { subscribe_to_id: DISCORD_ID }
                }));
                setInterval(() => ws.send(JSON.stringify({ op: 3 })), data.d.heartbeat_interval);
            } else if (data.op === 0) {
                if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
                    updateActivity(data.d);
                }
            }
        };
        ws.onclose = () => setTimeout(connectLanyard, 5000);
    }

    // Fungsi untuk membuka profil game saat widget diklik
    window.openGameProfile = function(gameName) {
        let profileHTML = '';
        
        // Tampilan khusus jika game yang dimainkan dikenali
        if (gameName === 'Wuthering Waves') {
            profileHTML = `
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                    <img src="assets/logo-wuwa.jpeg" style="width:24px; height:24px; border-radius:4px;"> Profil Wuthering Waves
                </h3>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.9rem;">IGN / Username</span>
                        <strong style="color: white;">Kazura</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.9rem;">UID</span>
                        <strong style="color: white;">907705778</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-bottom: 5px; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.9rem;">Server</span>
                        <strong style="color: white;">SEA</strong>
                    </div>
                    <div style="width: 100%; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); margin-top: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                        <img src="assets/showcase-wuwa.jpeg" class="showcase-img" alt="Showcase WuWa" style="width: 100%; height: auto; display: block; object-fit: cover; cursor: zoom-in; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                    </div>
                </div>
            `;
        } else if (gameName === 'Honkai: Star Rail') {
            profileHTML = `
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                    <img src="assets/logo-hsr.jpeg" style="width:24px; height:24px; border-radius:4px;"> Profil Honkai: Star Rail
                </h3>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.9rem;">IGN / Username</span>
                        <strong style="color: white;">Kazura</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.9rem;">UID</span>
                        <strong style="color: white;">[Masukan UID HSR di sini]</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-bottom: 5px; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.9rem;">Server</span>
                        <strong style="color: white;">Asia</strong>
                    </div>
                    <div style="width: 100%; min-height: 120px; background: rgba(0,0,0,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.05); margin-top: 15px;">
                        [Tempat Screenshot Profil In-Game]
                    </div>
                </div>
            `;
        } else if (gameName === 'Roblox') {
            profileHTML = `
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                    <img src="assets/logo-roblox.jpeg" style="width:24px; height:24px; border-radius:4px;"> Profil Roblox
                </h3>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.9rem;">Username</span>
                        <strong style="color: white;">Kazura_Roblox</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-bottom: 5px; margin-bottom: 10px;">
                        <span style="color: #aaa; font-size: 0.9rem;">Status</span>
                        <strong style="color: #4db8ff;">Tukang Joki Handal</strong>
                    </div>
                    <div style="width: 100%; min-height: 120px; background: rgba(0,0,0,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.05); margin-top: 15px;">
                        [Tempat Screenshot Avatar Roblox]
                    </div>
                </div>
            `;
        } else {
            // Fallback untuk game lain
            profileHTML = `
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.1rem;">🎮 Profil Game</h3>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; text-align: center;">
                    <p style="color: #ccc; font-size: 0.95rem; line-height: 1.5;">Kazura saat ini sedang bermain <br><strong style="color: white; font-size: 1.1rem;">${gameName}</strong>.</p>
                </div>
            `;
        }
        
        const modal = document.getElementById('custom-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        // Inject HTML ke dalam modal dan beri animasi
        modalTitle.innerText = "Profil Akun";
        modalBody.innerHTML = profileHTML;
        modal.classList.add('active');
    };

    // Mulai koneksi
    connectLanyard();

    // ==========================================
    // STATUS WIDGET (Online/Offline)
    // ==========================================
    function updateStatusWidget() {
        const liveClock = document.getElementById('live-clock');
        const statusDot = document.getElementById('status-dot');
        const statusText = document.getElementById('status-text');
        
        if (!liveClock || !statusDot || !statusText) return;

        // Dapatkan waktu saat ini dalam WIB (UTC+7)
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const wibTime = new Date(utc + (3600000 * 7));

        const hours = wibTime.getHours();
        const minutes = wibTime.getMinutes().toString().padStart(2, '0');
        const seconds = wibTime.getSeconds().toString().padStart(2, '0');
        
        // Update jam
        liveClock.textContent = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;

        // Cek apakah jam kerja (08:00 - 22:00) (Lebih dari sama dengan 8, kurang dari 22)
        if (hours >= 8 && hours < 22) {
            statusDot.style.backgroundColor = '#00ff66';
            statusDot.style.borderColor = 'rgba(0,255,102,0.3)';
            statusDot.style.boxShadow = '0 0 10px rgba(0,255,102,0.3)';
            statusText.textContent = 'Admin Online';
        } else {
            statusDot.style.backgroundColor = '#ff4d4d';
            statusDot.style.borderColor = 'rgba(255,77,77,0.3)';
            statusDot.style.boxShadow = '0 0 10px rgba(255,77,77,0.3)';
            statusText.textContent = 'Admin Offline';
        }

        // ==========================================
        // DYNAMIC BANNER & AVATAR (Setiap 6 Jam)
        // ==========================================
        let charName = 'hiyuki'; // 00:00 - 06:00 (Tengah Malam - Pagi)
        if (hours >= 6 && hours < 12) charName = 'chisa'; // 06:00 - 12:00 (Pagi - Siang)
        else if (hours >= 12 && hours < 18) charName = 'lucila'; // 12:00 - 18:00 (Siang - Sore)
        else if (hours >= 18 && hours < 24) charName = 'shorekeeper'; // 18:00 - 24:00 (Malam)

        const dynBanner = document.getElementById('dynamic-banner');
        const dynAvatar = document.getElementById('dynamic-avatar');
        const dynVerified = document.getElementById('dynamic-verified');

        if (dynBanner && dynAvatar) {
            const targetBanner = `assets/banner-${charName}.mp4`;
            
            // Hanya ganti src jika belum sesuai (mencegah reload video setiap detik)
            if (dynBanner.getAttribute('src') !== targetBanner) {
                dynBanner.setAttribute('src', targetBanner);
                dynBanner.load(); // Wajib agar video baru dimainkan
                if (dynAvatar && dynAvatar.getAttribute('src') !== `assets/profil-${charName}.jpeg`) {
                    dynAvatar.setAttribute('src', `assets/profil-${charName}.jpeg`);
                }
                if (dynVerified) {
                    dynVerified.setAttribute('src', `assets/verified-${charName}.gif`);
                }
            }
        }
    }

    // Jalankan pertama kali, lalu update setiap 1 detik
    updateStatusWidget();
    setInterval(updateStatusWidget, 1000);

    // ==========================================
    // VIEW COUNTER (Anti-Owner Increment)
    // ==========================================
    const viewContainer = document.getElementById('view-counter-container');
    if (viewContainer) {
        // Cek apakah mode admin aktif di browser ini
        if (localStorage.getItem('isAdmin') !== 'true') {
            // Pengunjung biasa: Load gambar hit API (URL v2 untuk reset dari 0)
            viewContainer.innerHTML = `<img src="https://hits.sh/zura-w.my.id/v2.svg?style=flat-square&label=%F0%9F%91%81&color=00000000&labelColor=00000000" alt="Views" style="height: 16px; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.8));">`;
        } else {
            // Mode Admin: Tampilkan teks statis tanpa kotak background, gaya borderless
            viewContainer.innerHTML = `<span style="font-size: 0.85rem; color: #fff; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.8));"><i class="fas fa-eye"></i> Admin</span>`;
        }
    }

    // ==========================================
    // MODAL SYSTEM (Pricelist & Reputation)
    // ==========================================
    const modal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');

    // Disusun silang agar di layout masonry (2 kolom) bacanya dari kiri ke kanan
    const testimoniRobloxImages = [
        'image.webp', 'image (1).webp', 'image (2).webp', 
        'image (3).webp', 'image (4).webp', 'image (5).webp',
        'image (6).webp', 'image (7).webp', 'image (8).webp', 
        'image (9).webp', 'image (10).webp'
    ];
    let robloxTestimoniHTML = testimoniRobloxImages.map(img => 
        `<img src="testimoni-roblox/${img}" alt="Testimoni Roblox" class="testimoni-img" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 6px rgba(0,0,0,0.3);">`
    ).join('');

    const testimoniWuWaImages = [
        'Group 1.png', 'Group 2.png', 'Group 3.png'
    ];
    let wuwaTestimoniHTML = testimoniWuWaImages.map(img => 
        `<img src="testimoni-wuwa/${img}" alt="Testimoni WuWa" class="testimoni-img" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 6px rgba(0,0,0,0.3);">`
    ).join('');
    const wuwaEvents = [
        { name: "Tidal Defense Simulator", price: "Rp 25.000", image: "event1.jpg" },
        { name: "Nama Event 2", price: "Rp 20.000", image: "event2.jpg" },
        { name: "Nama Event 3", price: "Rp 25.000", image: "event3.jpg" },
        { name: "Nama Event 4", price: "Rp 20.000", image: "event4.jpg" }
    ];
    let wuwaEventHTML = wuwaEvents.map(ev => `
        <div style="background: rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
            <div style="width: 100%; aspect-ratio: 16/9; background: #222; overflow: hidden; position: relative;">
                <img src="assets/${ev.image}" alt="${ev.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.outerHTML='<div style=\\'width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#555; font-size:0.8rem;\\'>Upload image as ${ev.image}</div>';">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px;">
                <span style="font-weight: 700; color: #fff; font-size: 0.95rem; text-align: left;">${ev.name}</span>
                <span style="font-weight: 700; color: #fff; font-size: 0.95rem; white-space: nowrap;">${ev.price}</span>
            </div>
        </div>
    `).join('');

    // Data Konten Dinamis
    const pricelistMenuHTML = `
        <div style="text-align: center;">
            <p style="margin-bottom: 15px; color: #ccc;">Pilih Kategori Game:</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <button class="category-btn toggle-submenu">
                        <span class="blob-btn__inner">
                            <span class="blob-btn__blobs">
                                <span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span>
                            </span>
                        </span>
                        <img src="assets/logo-wuwa.jpeg" style="width:24px; height:24px; border-radius:4px; margin-right:12px; z-index: 1; position: relative;"> 
                        <span style="z-index: 1; position: relative;">Wuthering Waves (WuWa)</span>
                    </button>
                    <div class="submenu-container" style="display: none; flex-direction: column; gap: 8px; margin-left: 15px; border-left: 2px solid rgba(255,255,255,0.1); padding-left: 15px;">
                        <button class="category-btn" data-category="wuwa" style="padding: 12px 15px; font-size: 0.9rem;">
                            <span class="blob-btn__inner"><span class="blob-btn__blobs"><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span></span></span>
                            <span style="z-index: 1; position: relative;">Joki Umum</span>
                        </button>
                        <button class="category-btn" data-category="wuwa-event" style="padding: 12px 15px; font-size: 0.9rem;">
                            <span class="blob-btn__inner"><span class="blob-btn__blobs"><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span></span></span>
                            <span style="z-index: 1; position: relative;">Joki Event</span>
                        </button>
                    </div>
                </div>
                <button class="category-btn" data-category="hsr">
                    <span class="blob-btn__inner">
                        <span class="blob-btn__blobs">
                            <span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span>
                        </span>
                    </span>
                    <img src="assets/logo-hsr.jpeg" style="width:24px; height:24px; border-radius:4px; margin-right:12px; z-index: 1; position: relative;"> 
                    <span style="z-index: 1; position: relative;">Honkai: Star Rail (HSR)</span>
                </button>
                <button class="category-btn" data-category="roblox">
                    <span class="blob-btn__inner">
                        <span class="blob-btn__blobs">
                            <span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span>
                        </span>
                    </span>
                    <img src="assets/logo-roblox.jpeg" style="width:24px; height:24px; border-radius:4px; margin-right:12px; z-index: 1; position: relative;"> 
                    <span style="z-index: 1; position: relative;">Roblox</span>
                </button>
            </div>
        </div>
    `;

    const pricelistDetails = {
        'wuwa': `
            <button class="back-btn"><i class="fas fa-arrow-left"></i> Kembali ke Menu</button>
            <h3 style="color: white; margin-bottom: 5px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                <img src="assets/logo-wuwa.jpeg" style="width:24px; height:24px; border-radius:4px;"> Joki Wuthering Waves
            </h3>
            
            <div style="text-align: left; font-size: 0.9rem; padding-right: 5px;">
                
                <!-- Exploration -->
                <h4 style="color: #4db8ff; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">🌍 Exploration</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Huanglong</span><strong style="color: white;">Rp 170.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Rinascita</span><strong style="color: white;">Rp 160.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>LahaiRoi</span><strong style="color: white;">Rp 275.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Mengzhou</span><strong style="color: white;">Rp 115.000</strong>
                    </div>
                    <div style="font-size: 0.8rem; color: #ffb86c; font-style: italic;">
                        <i class="fas fa-info-circle"></i> Notes: Harus sudah menyelesaikan Main Story Quest dan Quest Eksplorasi.
                    </div>
                </div>

                <!-- Quest -->
                <h4 style="color: #4db8ff; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">📜 Quest</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Main Story Quest</span><strong style="color: white;">Rp 13.000 <span style="font-size:0.75rem; color:#888;">/Quest</span></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Exploration Quest</span><strong style="color: white;">Rp 8.000 <span style="font-size:0.75rem; color:#888;">/Quest</span></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Companion Story Quest</span><strong style="color: white;">Rp 8.000 <span style="font-size:0.75rem; color:#888;">/Quest</span></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Side Quests</span><strong style="color: white;">Rp 3.000 <span style="font-size:0.75rem; color:#888;">/Quest</span></strong>
                    </div>
                </div>

                <!-- Character Building -->
                <h4 style="color: #4db8ff; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">⚔️ Character Building</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>All in (Lvl, Weapon, Talent, Echo)</span><strong style="color: white;">Rp 75.000 <span style="font-size:0.75rem; color:#888;">/Char</span></strong>
                    </div>
                    <div style="font-size: 0.8rem; color: #ffb86c; font-style: italic;">
                        <i class="fas fa-info-circle"></i> Notes: Akun wajib memiliki Waveplates & stok Crystal Solvent mencukupi. Untuk karakter DPS, Echo diusahakan Double CRIT.
                    </div>
                </div>

                <!-- Account Caretaking -->
                <h4 style="color: #4db8ff; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">📅 Account Caretaking</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Daily</span><strong style="color: white;">Rp 4.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Weekly</span><strong style="color: white;">Rp 25.000</strong>
                    </div>
                </div>

                <!-- Farm Astrites -->
                <h4 style="color: #4db8ff; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">💎 Farm Astrites</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>1.600 Astrites</span><strong style="color: white;">Rp 20.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>3.200 Astrites</span><strong style="color: white;">Rp 39.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>4.800 Astrites</span><strong style="color: white;">Rp 58.000</strong>
                    </div>
                    <div style="font-size: 0.8rem; color: #ffb86c; font-style: italic;">
                        <i class="fas fa-info-circle"></i> Notes: Wajib punya ladang Astrites beserta event yang memadai.
                    </div>
                </div>

                <!-- Tombol Pesan -->
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed rgba(255,255,255,0.1); text-align: center;">
                    <p style="margin-bottom: 12px; font-weight: 600; font-size: 0.95rem; color: #fff;">Tertarik? Pesan Joki Sekarang:</p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <a href="https://wa.me/+6282172795156" target="_blank" class="order-btn" style="background: #25D366;"><i class="fab fa-whatsapp"></i> Chat via WhatsApp</a>
                        <a href="https://www.tiktok.com/@rez_4_?is_from_webapp=1&sender_device=pc" target="_blank" class="order-btn" style="background: #111; border: 1px solid rgba(255,255,255,0.2);"><i class="fab fa-tiktok"></i> Chat via TikTok</a>
                    </div>
                </div>
                
            </div>
        `,
        'hsr': `
            <button class="back-btn"><i class="fas fa-arrow-left"></i> Kembali ke Menu</button>
            <h3 style="color: white; margin-bottom: 5px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                <img src="assets/logo-hsr.jpeg" style="width:24px; height:24px; border-radius:4px;"> Joki Honkai: Star Rail
            </h3>
            
            <div style="text-align: left; font-size: 0.9rem; padding-right: 5px;">
                
                <!-- Exploration -->
                <h4 style="color: #ffd700; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">🌍 Exploration</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Herta Space Station</span><strong style="color: white;">Rp 12.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Belobog</span><strong style="color: white;">Rp 20.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Xianzhou</span><strong style="color: white;">Rp 30.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Penacony</span><strong style="color: white;">Rp 60.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Amphoreus</span><strong style="color: white;">Rp 75.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Planarcadia</span><strong style="color: white;">Rp 95.000</strong>
                    </div>
                    <div style="font-size: 0.8rem; color: #ffb86c; font-style: italic;">
                        <i class="fas fa-info-circle"></i> Notes: Harga untuk Planarcadia masih bisa berubah seiring berjalannya waktu.
                    </div>
                </div>

                <!-- Quest -->
                <h4 style="color: #ffd700; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">📜 Quest</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Trailblaze Mission</span><strong style="color: white;">Rp 18.000 <span style="font-size:0.75rem; color:#888;">/Act</span></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Trailblaze Continuance</span><strong style="color: white;">Rp 12.000 <span style="font-size:0.75rem; color:#888;">/Each</span></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Adventure Mission</span><strong style="color: white;">Rp 7.000 <span style="font-size:0.75rem; color:#888;">/Each</span></strong>
                    </div>
                    <div style="font-size: 0.8rem; color: #ffb86c; font-style: italic;">
                        <i class="fas fa-info-circle"></i> Notes: Harga quest berlaku ke semua planet.
                    </div>
                </div>

                <!-- Account Caretaking -->
                <h4 style="color: #ffd700; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">📅 Account Caretaking</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Daily</span><strong style="color: white;">Rp 5.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Weekly</span><strong style="color: white;">Rp 15.000</strong>
                    </div>
                </div>

                <!-- Farm Stellar Jades -->
                <h4 style="color: #ffd700; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">💎 Farm Stellar Jades</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>1.600 Jades</span><strong style="color: white;">Rp 20.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>3.200 Jades</span><strong style="color: white;">Rp 35.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>4.800 Jades</span><strong style="color: white;">Rp 50.000</strong>
                    </div>
                    <div style="font-size: 0.8rem; color: #ffb86c; font-style: italic;">
                        <i class="fas fa-info-circle"></i> Notes: Maksimal 4800 Jades. Wajib punya ladang Jades & event memadai.
                    </div>
                </div>

                <!-- Tombol Pesan -->
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed rgba(255,255,255,0.1); text-align: center;">
                    <p style="margin-bottom: 12px; font-weight: 600; font-size: 0.95rem; color: #fff;">Tertarik? Pesan Joki Sekarang:</p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <a href="https://wa.me/+6282172795156" target="_blank" class="order-btn" style="background: #25D366;"><i class="fab fa-whatsapp"></i> Chat via WhatsApp</a>
                        <a href="https://www.tiktok.com/@rez_4_?is_from_webapp=1&sender_device=pc" target="_blank" class="order-btn" style="background: #111; border: 1px solid rgba(255,255,255,0.2);"><i class="fab fa-tiktok"></i> Chat via TikTok</a>
                    </div>
                </div>
                
            </div>
        `,
        'roblox': `
            <button class="back-btn"><i class="fas fa-arrow-left"></i> Kembali ke Menu</button>
            <h3 style="color: white; margin-bottom: 5px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                <img src="assets/logo-roblox.jpeg" style="width:24px; height:24px; border-radius:4px;"> Joki Roblox
            </h3>
            
            <div style="text-align: left; font-size: 0.9rem; padding-right: 5px;">
                
                <!-- Anime Vanguard -->
                <h4 style="color: #ff4d4d; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">⚔️ Anime Vanguard</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Full Ichigo Vanguard</span><strong style="color: white;">Rp 150.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Aizen</span><strong style="color: white;">Rp 25.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Ulqiora</span><strong style="color: white;">Rp 30.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Rukia Vanguard</span><strong style="color: white;">Rp 75.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>200k Winter Present</span><strong style="color: white;">Rp 25.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Makima</span><strong style="color: white;">Rp 45.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Evo Denji</span><strong style="color: white;">Rp 95.000</strong>
                    </div>
                </div>

                <!-- Anime Expeditions -->
                <h4 style="color: #ff4d4d; margin-top: 15px; margin-bottom: 8px; font-size: 0.95rem;">🛡️ Anime Expeditions</h4>
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Gems</span><strong style="color: white;">Rp 9.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Mythic Unit</span><strong style="color: white;">Rp 8.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Ichigo</span><strong style="color: white;">Rp 8.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Kenpachi</span><strong style="color: white;">Rp 20.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Evo Unit (All)</span><strong style="color: white;">Rp 5.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Raid</span><strong style="color: white;">Rp 1.000 <span style="font-size:0.75rem; color:#888;">/Match</span></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Expeditions</span><strong style="color: white;">Rp 2.000 <span style="font-size:0.75rem; color:#888;">/Game</span></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 6px;">
                        <span>Get Limited Unit (Banner)</span><strong style="color: white;">Rp 12.000</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Get Itachi</span><strong style="color: white;">Rp 45.000</strong>
                    </div>
                </div>

                <!-- Tombol Pesan -->
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
                    <p style="margin-bottom: 12px; font-weight: 600; font-size: 0.95rem; color: #fff;">Tertarik? Pesan Joki Sekarang:</p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <a href="https://wa.me/+6282172795156" target="_blank" class="order-btn" style="background: #25D366;"><i class="fab fa-whatsapp"></i> Chat via WhatsApp</a>
                        <a href="https://www.tiktok.com/@rez_4_?is_from_webapp=1&sender_device=pc" target="_blank" class="order-btn" style="background: #111; border: 1px solid rgba(255,255,255,0.2);"><i class="fab fa-tiktok"></i> Chat via TikTok</a>
                    </div>
                </div>
                
            </div>
        `,
        'wuwa-event': `
            <button class="back-btn"><i class="fas fa-arrow-left"></i> Kembali ke Menu</button>
            <h3 style="color: white; margin-bottom: 5px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                <img src="assets/logo-wuwa.jpeg" style="width:24px; height:24px; border-radius:4px;"> Joki Event WuWa
            </h3>
            <div style="text-align: center; margin-top: 15px;">
                ${wuwaEventHTML}
            </div>
            <!-- Tombol Pesan -->
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
                <p style="margin-bottom: 12px; font-weight: 600; font-size: 0.95rem; color: #fff;">Tertarik? Pesan Joki Sekarang:</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <a href="https://wa.me/+6282172795156" target="_blank" class="order-btn" style="background: #25D366;"><i class="fab fa-whatsapp"></i> Chat via WhatsApp</a>
                    <a href="https://www.tiktok.com/@rez_4_?is_from_webapp=1&sender_device=pc" target="_blank" class="order-btn" style="background: #111; border: 1px solid rgba(255,255,255,0.2);"><i class="fab fa-tiktok"></i> Chat via TikTok</a>
                </div>
            </div>
        `
    };

    const reputationMenuHTML = `
        <div style="text-align: center;">
            <p style="margin-bottom: 15px; color: #ccc;">Pilih Kategori Game:</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button class="category-btn" data-reputation="wuwa">
                    <span class="blob-btn__inner">
                        <span class="blob-btn__blobs">
                            <span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span>
                        </span>
                    </span>
                    <img src="assets/logo-wuwa.jpeg" style="width:24px; height:24px; border-radius:4px; margin-right:12px; z-index: 1; position: relative;"> 
                    <span style="z-index: 1; position: relative;">Testimoni WuWa</span>
                </button>
                <button class="category-btn" data-reputation="hsr">
                    <span class="blob-btn__inner">
                        <span class="blob-btn__blobs">
                            <span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span>
                        </span>
                    </span>
                    <img src="assets/logo-hsr.jpeg" style="width:24px; height:24px; border-radius:4px; margin-right:12px; z-index: 1; position: relative;"> 
                    <span style="z-index: 1; position: relative;">Testimoni HSR</span>
                </button>
                <button class="category-btn" data-reputation="roblox">
                    <span class="blob-btn__inner">
                        <span class="blob-btn__blobs">
                            <span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span>
                        </span>
                    </span>
                    <img src="assets/logo-roblox.jpeg" style="width:24px; height:24px; border-radius:4px; margin-right:12px; z-index: 1; position: relative;"> 
                    <span style="z-index: 1; position: relative;">Testimoni Roblox</span>
                </button>
            </div>
        </div>
    `;

    const reputationDetails = {
        'roblox': `
            <button class="back-btn back-btn-rep"><i class="fas fa-arrow-left"></i> Kembali ke Menu</button>
            <div style="text-align: center; margin-top: 15px;">
                <p style="margin-bottom: 1rem; color: #fff;">Bukti Transaksi & Testimoni Terpercaya 💯</p>
                <p style="font-size: 0.8rem; color: #888; margin-bottom: 15px;">(Klik gambar untuk memperbesar)</p>
                <!-- Layout Grid (Kiri ke Kanan) -->
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; align-items: start;">
                    ${robloxTestimoniHTML}
                </div>
            </div>
        `,
        'wuwa': `
            <button class="back-btn back-btn-rep"><i class="fas fa-arrow-left"></i> Kembali ke Menu</button>
            <div style="text-align: center; margin-top: 15px;">
                <p style="margin-bottom: 1rem; color: #fff;">Bukti Transaksi & Testimoni Terpercaya 💯</p>
                <p style="font-size: 0.8rem; color: #888; margin-bottom: 15px;">(Klik gambar untuk memperbesar)</p>
                <!-- Layout Grid (Kiri ke Kanan) -->
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; align-items: start;">
                    ${wuwaTestimoniHTML}
                </div>
            </div>
        `,
        'hsr': `
            <button class="back-btn back-btn-rep"><i class="fas fa-arrow-left"></i> Kembali ke Menu</button>
            <div style="text-align: center; margin-top: 15px; padding: 30px 10px;">
                <p style="color: #aaa; font-style: italic;">Belum ada testimoni Honkai: Star Rail untuk saat ini.</p>
            </div>
        `
    };

    const modalContentData = {
        'Pricelist': pricelistMenuHTML,
        'Reputation': reputationMenuHTML,
        'Watchlist': `
            <div style="text-align: center;">
                <p style="margin-bottom: 0.5rem; color: #fff; font-size: 1.1rem; font-weight: 600;">📺 List Nonton</p>
                <p style="color: #ffeb3b; font-size: 0.8rem; margin-bottom: 1.5rem; font-style: italic; background: rgba(255,235,59,0.1); padding: 8px; border-radius: 8px; border: 1px solid rgba(255,235,59,0.3);">
                    ⚠️ <b>Peringatan:</b> Ini hanyalah daftar rekomendasi tontonan favorit saya, <b>BUKAN</b> platform atau link untuk menonton!
                </p>
                
                <p style="margin-bottom: 15px; color: #ccc;">Pilih Daftar Tontonan:</p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="https://my-horror-collection.vercel.app/" target="_blank" class="category-btn" style="text-decoration: none; display: flex; align-items: center; justify-content: flex-start; position: relative; overflow: hidden;">
                        <span class="blob-btn__inner" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.3;">
                            <span class="blob-btn__blobs">
                                <span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span>
                            </span>
                        </span>
                        <img src="assets/emoji-reputation.gif" style="width:24px; height:24px; border-radius:4px; margin-right:12px; z-index: 1; position: relative;" onerror="this.onerror=null; this.outerHTML='<span style=\\'font-size:24px; margin-right:12px; z-index:1; position:relative;\\'>👻</span>'"> 
                        <span style="z-index: 1; position: relative;">List Tontonan Horor</span>
                    </a>
                    
                    <a href="https://my-anime-collection-kappa.vercel.app/" target="_blank" class="category-btn" style="text-decoration: none; display: flex; align-items: center; justify-content: flex-start; position: relative; overflow: hidden;">
                        <span class="blob-btn__inner" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.3;">
                            <span class="blob-btn__blobs">
                                <span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span><span class="blob-btn__blob"></span>
                            </span>
                        </span>
                        <img src="assets/emoji-anime.gif" style="width:24px; height:24px; border-radius:4px; margin-right:12px; z-index: 1; position: relative;" onerror="this.onerror=null; this.outerHTML='<span style=\\'font-size:24px; margin-right:12px; z-index:1; position:relative;\\'>📺</span>'"> 
                        <span style="z-index: 1; position: relative;">Anime & Donghua</span>
                    </a>
                </div>
            </div>
        `
    };

    function openModal(title) {
        modalTitle.innerText = title;
        modalBody.innerHTML = modalContentData[title] || '<p>Konten belum tersedia.</p>';
        modal.classList.add('active');
    }

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Event Delegation di dalam Modal Body (Untuk Pricelist Category & Lightbox)
    modalBody.addEventListener('click', (e) => {
        // Logika untuk toggle submenu akordion (misalnya WuWa)
        const toggleSubBtn = e.target.closest('.toggle-submenu');
        if (toggleSubBtn) {
            const submenuContainer = toggleSubBtn.nextElementSibling;
            if (submenuContainer && submenuContainer.classList.contains('submenu-container')) {
                if (submenuContainer.style.display === 'none') {
                    submenuContainer.style.display = 'flex';
                } else {
                    submenuContainer.style.display = 'none';
                }
            }
            return; // Jangan lanjutkan logika kategori jika tombol ini adalah toggle
        }

        // 1. Logika untuk klik tombol kategori game (WuWa, HSR, Roblox)
        const categoryBtn = e.target.closest('.category-btn');
        if (categoryBtn && !categoryBtn.classList.contains('toggle-submenu')) {
            const priceCat = categoryBtn.getAttribute('data-category');
            if (priceCat && pricelistDetails[priceCat]) {
                modalBody.style.opacity = '0';
                setTimeout(() => {
                    modalBody.innerHTML = pricelistDetails[priceCat];
                    modalBody.style.opacity = '1';
                }, 200);
                return;
            }

            const repCat = categoryBtn.getAttribute('data-reputation');
            if (repCat && reputationDetails[repCat]) {
                modalBody.style.opacity = '0';
                setTimeout(() => {
                    modalBody.innerHTML = reputationDetails[repCat];
                    modalBody.style.opacity = '1';
                }, 200);
                return;
            }
        }

        // 2. Logika untuk klik tombol kembali (Back)
        const backBtn = e.target.closest('.back-btn');
        if (backBtn) {
            modalBody.style.opacity = '0';
            setTimeout(() => {
                // Cek apakah tombol back milik reputasi atau pricelist
                if (backBtn.classList.contains('back-btn-rep')) {
                    modalBody.innerHTML = reputationMenuHTML;
                } else {
                    modalBody.innerHTML = pricelistMenuHTML;
                }
                modalBody.style.opacity = '1';
            }, 200);
        }

        // 3. Logika untuk klik gambar testimoni (Lightbox) atau gambar showcase game
        if (e.target.classList.contains('testimoni-img') || e.target.classList.contains('showcase-img')) {
            lightboxImg.src = e.target.src;
            lightbox.classList.add('active');
        }
    });

    // CSS Inline khusus transisi opacity untuk animasi smooth di dalam modal
    modalBody.style.transition = 'opacity 0.2s ease';

    // ==========================================
    // LIGHTBOX SYSTEM (KLIK GAMBAR UNTUK FULLSCREEN)
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Pasangkan trigger ke tombol
    const btnPricelist = document.getElementById('btn-pricelist');
    const btnReputation = document.getElementById('btn-reputation');
    const btnWatchlist = document.getElementById('btn-watchlist');

    if(btnPricelist) {
        btnPricelist.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Pricelist');
        });
    }

    if(btnReputation) {
        btnReputation.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Reputation');
        });
    }

    if(btnWatchlist) {
        btnWatchlist.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Watchlist');
        });
    }

    // ==========================================
    // PROMO POPUP LOGIC
    // ==========================================
    const promoModal = document.getElementById('promo-modal');
    const promoClose = document.getElementById('promo-close');
    const openPromoBtn = document.getElementById('open-promo-btn');

    if (promoModal && promoClose) {
        // Tampilkan otomatis dimatikan karena promo sudah habis
        /*
        if (!sessionStorage.getItem('promoShown')) {
            setTimeout(() => {
                promoModal.style.display = 'flex';
                promoModal.style.opacity = '0';
                promoModal.style.transition = 'opacity 0.3s ease';
                setTimeout(() => { promoModal.style.opacity = '1'; }, 10);
                sessionStorage.setItem('promoShown', 'true');
            }, 1000);
        }
        */

        // Fungsi Buka Promo Manual
        if (openPromoBtn) {
            openPromoBtn.addEventListener('click', () => {
                promoModal.style.display = 'flex';
                promoModal.style.opacity = '0';
                promoModal.style.transition = 'opacity 0.3s ease';
                setTimeout(() => { promoModal.style.opacity = '1'; }, 10);
            });
        }

        // Fungsi tutup modal
        const closePromoModal = () => {
            promoModal.style.opacity = '0';
            setTimeout(() => {
                promoModal.style.display = 'none';
            }, 300);
        };

        promoClose.addEventListener('click', closePromoModal);

        promoModal.addEventListener('click', (e) => {
            if (e.target === promoModal) {
                closePromoModal();
            }
        });
    }

});

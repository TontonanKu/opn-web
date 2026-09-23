const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

const new_watchlist = `'Watchlist': \`
            <div style="text-align: center;">
                <p style="margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.1rem; font-weight: 600;">📺 List Nonton</p>
                <p style="color: #ffeb3b; font-size: 0.8rem; margin-bottom: 1.5rem; font-style: italic; background: rgba(255,235,59,0.1); padding: 8px; border-radius: 8px; border: 1px solid rgba(255,235,59,0.3);">
                    ⚠️ <b>Peringatan:</b> Ini hanyalah daftar rekomendasi tontonan favorit saya, <b>BUKAN</b> platform atau link untuk menonton!
                </p>
                
                <p style="margin-bottom: 15px; color: var(--text-secondary);">Pilih Daftar Tontonan:</p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="https://my-horror-collection.vercel.app/" target="_blank" class="bento-modal-btn" style="text-decoration: none;">
                        <span style="font-size:24px; margin-right:15px; position:relative;">👻</span>
                        <span>List Tontonan Horor</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                    
                    <a href="https://my-anime-collection-kappa.vercel.app/" target="_blank" class="bento-modal-btn" style="text-decoration: none;">
                        <img src="assets/emoji-anime.gif" style="width:24px; height:24px; border-radius:4px; margin-right:15px; position: relative;" onerror="this.onerror=null; this.outerHTML='<span style=\\'font-size:24px; margin-right:15px; position:relative;\\'>🎌</span>'"> 
                        <span>List Tontonan Anime</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        \``;

content = content.replace(/'Watchlist': `[\s\S]*?`/g, new_watchlist);

fs.writeFileSync('script.js', content, 'utf8');
console.log("Done Watchlist");

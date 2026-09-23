const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

const new_pricelist = `const pricelistMenuHTML = \`
        <div style="text-align: center;">
            <p style="margin-bottom: 20px; color: var(--text-secondary); font-weight: 600;">Pilih Kategori Game:</p>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="bento-modal-btn toggle-submenu">
                        <img src="assets/logo-wuwa.jpeg"> 
                        <span>Wuthering Waves (WuWa)</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="submenu-container" style="display: none; flex-direction: column; gap: 8px; margin-left: 20px; border-left: 2px solid var(--border-color); padding-left: 15px;">
                        <button class="bento-modal-btn" data-category="wuwa" style="padding: 10px 15px; font-size: 0.9rem;">
                            <span>Joki Umum</span>
                            <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                        </button>
                        <button class="bento-modal-btn" data-category="wuwa-event" style="padding: 10px 15px; font-size: 0.9rem;">
                            <span>Joki Event</span>
                            <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                        </button>
                    </div>
                </div>
                <button class="bento-modal-btn" data-category="hsr">
                    <img src="assets/logo-hsr.jpeg"> 
                    <span>Honkai: Star Rail (HSR)</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button class="bento-modal-btn" data-category="roblox">
                    <img src="assets/logo-roblox.jpeg"> 
                    <span>Roblox (Blox Fruits)</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    \`;`;

const new_reputation = `const reputationMenuHTML = \`
        <div style="text-align: center; margin-top: 5px;">
            <p style="margin-bottom: 1rem; color: var(--text-primary); font-weight: 600;">Semua Testimoni Terpercaya 💯</p>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 15px;">(Klik gambar untuk memperbesar)</p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; align-items: start;">
                \${wuwaTestimoniHTML}
                \${robloxTestimoniHTML}
            </div>
        </div>
    \`;`;

content = content.replace(/const pricelistMenuHTML = `[\s\S]*?`;/, new_pricelist);
content = content.replace(/const reputationMenuHTML = `[\s\S]*?`;/, new_reputation);

fs.writeFileSync('script.js', content, 'utf8');
console.log("Done");

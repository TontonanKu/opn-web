document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switcher Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

        // 2. Real-time Clock & Admin Status Logic
    const clockElement = document.getElementById('realtime-clock');
    const dateElement = document.getElementById('realtime-date');
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text-display');

    function updateClock() {
        const now = new Date();
        
        // Time formatter
        const timeStr = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Date formatter
        const dateStr = now.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        if (clockElement) clockElement.textContent = timeStr;
        if (dateElement) dateElement.textContent = dateStr;

        // Admin Online/Offline Logic (08:00 - 22:00 WIB)
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const wibTime = new Date(utc + (3600000 * 7));
        const hours = wibTime.getHours();

        if (statusDot && statusText) {
            if (hours >= 8 && hours < 22) {
                statusDot.style.backgroundColor = '#00ff66';
                statusDot.style.boxShadow = '0 0 10px rgba(0,255,102,0.5)';
                statusText.textContent = 'Admin Online';
            } else {
                statusDot.style.backgroundColor = '#ff4d4d';
                statusDot.style.boxShadow = '0 0 10px rgba(255,77,77,0.5)';
                statusText.textContent = 'Admin Offline';
            }
        }
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call

    // 3. Simple Wave Animation using Canvas (Optional enhancement for the status bar)
    const waveContainer = document.querySelector('.status-wave');
    if (waveContainer) {
        // Can be replaced with SVG, for now just a placeholder for the visual in the design
        waveContainer.innerHTML = `
            <svg width="200" height="20" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,10 Q25,20 50,10 T100,10 T150,10 T200,10" fill="none" stroke="var(--accent-orange)" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="100" cy="10" r="3" fill="var(--accent-orange)"/>
            </svg>
        `;
    }

    // 4. Hook Nav buttons to click existing buttons
    const btnPricelistNav = document.getElementById('btn-pricelist-nav');
    const btnReputationNav = document.getElementById('btn-reputation-nav');
    
    if (btnPricelistNav) {
        btnPricelistNav.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-pricelist');
            if (btn) btn.click();
        });
    }
    
    if (btnReputationNav) {
        btnReputationNav.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-reputation');
            if (btn) btn.click();
        });
    }
});

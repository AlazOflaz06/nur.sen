document.addEventListener('DOMContentLoaded', () => {

  // 1. MENÜ GEÇİŞ MOTORU
  const menuButtons = {
    'btn-home': 'tab-home',
    'btn-skills': 'tab-skills',
    'btn-gallery': 'tab-gallery',
    'btn-terminal': 'tab-terminal'
  };

  Object.keys(menuButtons).forEach(btnId => {
    const btnElement = document.getElementById(btnId);
    if (btnElement) {
      btnElement.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach(tab => {
          tab.classList.remove('active');
        });
        document.querySelectorAll('.menu-item').forEach(item => {
          item.classList.remove('active');
        });

        const targetTabId = menuButtons[btnId];
        const targetTab = document.getElementById(targetTabId);
        if (targetTab) {
          targetTab.classList.add('active');
        }
        btnElement.classList.add('active');
      });
    }
  });

  // 2. MP3 MÜZİK OYNATICI MOTORU
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');

  function toggleMusic() {
    if (!music) return;

    if (music.paused) {
      music.play().then(() => {
        if (musicBtn) musicBtn.innerText = "⏸️ Müziği Durdur";
      }).catch(err => {
        alert("sarki.mp3 dosyası okunurken hata oluştu. Lütfen dosyanın depona yüklendiğinden emin ol.");
      });
    } else {
      music.pause();
      if (musicBtn) musicBtn.innerText = "▶️ Müziği Başlat";
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  // Sayfaya yapılan ilk tıklamada müziği otomatik başlatır
  document.addEventListener('click', function autoPlayOnce() {
    if (music && music.paused) {
      music.play().then(() => {
        if (musicBtn) musicBtn.innerText = "⏸️ Müziği Durdur";
      }).catch(() => {});
    }
  }, { once: true });

  // 3. MATRIX ARKA PLAN
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'NUR01010101SYS01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }, () => 1);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(5, 3, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#c084fc';
      ctx.font = fontSize + 'px monospace';

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }
    setInterval(drawMatrix, 40);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // 4. METRİK VE UPTIME SİMÜLATÖRÜ
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const uptimeEl = document.getElementById('uptime-counter');
    const cpuEl = document.getElementById('cpu-val');
    
    if (uptimeEl) uptimeEl.innerText = seconds + 's';
    if (cpuEl) cpuEl.innerText = Math.floor(Math.random() * 15 + 8) + '%';
  }, 1000);

  // 5. LIVE CODE SANDBOX
  const runBtn = document.getElementById('btn-run-code');
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      const out = document.getElementById('sandbox-out');
      if (out) {
        out.style.display = 'block';
        out.innerHTML = `> Executing nur_core.py...<br><span style="color:#fff;">[SUCCESS] System running for Nur. Mood: Paşa Torunu 🎶</span>`;
      }
    });
  }

  // 6. INTERAKTİF TERMINAL LAB (HELP BÖLÜMÜ GERİ EKLENDİ)
  const termInput = document.getElementById('term-in');
  const termOutput = document.getElementById('term-out');

  if (termInput && termOutput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value.trim();
        const cmd = val.toLowerCase();

        termOutput.innerHTML += `<div style="color:#fff;">$ ${val}</div>`;

        if (cmd === 'help') {
          termOutput.innerHTML += `Kullanılabilir komutlar:<br>
          - <b style="color:#c084fc">nur</b> : Sistem sahibi bilgisi<br>
          - <b style="color:#c084fc">pasa</b> : Çalan müzik detayını göster<br>
          - <b style="color:#c084fc">sysinfo</b> : Neofetch sistem parametreleri<br>
          - <b style="color:#c084fc">hack</b> : Siber güvenlik tarama simülasyonu<br>
          - <b style="color:#c084fc">secret</b> : Gizli geliştirici nota eriş<br>
          - <b style="color:#c084fc">clear</b> : Konsolu temizle<br>`;
        }
        else if (cmd === 'nur') {
          termOutput.innerHTML += `<span style="color:#e0aaff;">[SYSTEM ADMIN] Nur: Bilişim evreninin ilham kaynağı ve en yetenekli ismi.</span><br>`;
        }
        else if (cmd === 'pasa') {
          termOutput.innerHTML += `<span style="color:#34d399;">🎵 Şu an çalan: Ayaşlı Rafet - Paşa Torunu</span><br>`;
        }
        else if (cmd === 'sysinfo') {
          termOutput.innerHTML += `<pre style="color:#c084fc; font-size:0.8rem; line-height:1.2;">
 .---.      OS: NurOS v4.3 x86_64
/     \\     Kernel: Pure-Elegance-6.1
|  NUR  |    Uptime: ${seconds}s
\\     /     CPU: Genius Mind @ 5.0GHz
 '---'      Status: Top Tier Admin
        </pre>`;
        }
        else if (cmd === 'hack') {
          termOutput.innerHTML += `<span style="color:#34d399;">
          [+] Target: Firewall Core...<br>
          [+] Bypassing Security Protocols... OK<br>
          [+] Hash Decrypted: SHA-256(NUR_AURA)<br>
          <b style="color:#c084fc">[ACCESS GRANTED] Root Authority: Nur</b>
          </span><br>`;
        }
        else if (cmd === 'secret') {
          termOutput.innerHTML += `<span style="color:#f43f5e;">
          💜 "Kod satırları biter, algoritmalar değişir ama bu sistemdeki yerin hep sabit kalır."
          </span><br>`;
        }
        else if (cmd === 'clear') {
          termOutput.innerHTML = '';
        }
        else if (cmd !== '') {
          termOutput.innerHTML += `<span style="color:#f43f5e;">Komut bulunamadı: '${cmd}'. 'help' yazarak komutlara bakabilirsin.</span><br>`;
        }

        termInput.value = '';
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }

});

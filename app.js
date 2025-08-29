// Typing + highlight + scroll reveal + mobile nav + contact form
(() => {
  // Typing & highlight (aynı)
  const el = document.querySelector(".typing-text");
  const keywords = ["Efsane", "Yarışma", "Macera"];
  if (el) {
    const original = (el.dataset.text || el.textContent || "").trim();
    el.textContent = "";
    let i = 0;
    const speed = 34;
    const type = () => {
      if (i <= original.length) {
        el.textContent = original.slice(0, i++);
        setTimeout(type, speed);
      }
    };
    if (original) {
      type();
      setInterval(() => {
        const base = original;
        const pattern = new RegExp("(" + keywords.join("|") + ")", "i");
        el.innerHTML = base.replace(pattern, (m) => `<span class="g">${m}</span>`);
      }, 2200);
    }
  }

  // Scroll reveal (aynı)
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".section-animate").forEach((n) => io.observe(n));

  // Mobile nav (aynı)
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    const closeMenu = () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); };
    const openMenu = () => { menu.classList.add("open"); toggle.setAttribute("aria-expanded","true"); };
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach((a)=>a.addEventListener("click", closeMenu));
    document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeMenu(); });
  }

  // Contact form (aynı)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();
      if (!name || !email || !message) { alert("Lütfen tüm alanları doldurun."); return; }
      const subject = encodeURIComponent(`İletişim: ${name}`);
      const body = encodeURIComponent(`İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}\n`);
      window.location.href = `mailto:viperadev@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();


/* ==== Proje Filtresi ==== */
const grid = document.querySelector('.project-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

if (grid && filterButtons.length) {
  const cards = [...grid.querySelectorAll('.project-card')];

  const applyFilter = (type) => {
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const show = (type === 'all') || (cat === type);
      card.style.display = show ? '' : 'none';
    });
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // aktif durum
      filterButtons.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-selected','true');
      // uygula
      applyFilter(btn.dataset.filter);
    });
  });
}

/* ==== Hover video kontrolü (varsa) ==== */
document.querySelectorAll('.project-card .preview video').forEach(v => {
  // Lazy: görünür olunca yükle
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        v.load(); // preload none ise gerçek yükleme
        io2.unobserve(v);
      }
    });
  }, { threshold: .25 });
  io2.observe(v);

  // Hover’da oynat/durdur
  const parent = v.closest('.project-card');
  parent.addEventListener('mouseenter', () => { v.play().catch(()=>{}); });
  parent.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
});


/* ====== Paylaş menüsü ====== */
// Tek menü, tıklanan karta taşınır:
const shareMenu = document.createElement('div');
shareMenu.className = 'share-menu';
shareMenu.innerHTML = `
  <button type="button" data-action="copy">🔗 Linki kopyala</button>
  <a href="#" target="_blank" rel="noopener" data-action="github">💻 GitHub’a git</a>
  <a href="#" target="_blank" rel="noopener" data-action="image">🖼️ Görseli aç</a>
`;
document.body.appendChild(shareMenu);

// Toast helper
const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);
const showToast = (msg) => {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1600);
};

let currentCard = null;
let currentBtn  = null;

function openShare(card, btn){
  currentCard = card; currentBtn = btn;
  // URL’leri doldur
  const url    = card.dataset.shareUrl || location.href;
  const gh     = card.dataset.githubUrl || '#';
  const imgUrl = card.dataset.imageUrl || '#';
  shareMenu.querySelector('[data-action="github"]').href = gh;
  shareMenu.querySelector('[data-action="image"]').href  = imgUrl;

  // Konum
  const r = btn.getBoundingClientRect();
  shareMenu.style.top  = `${Math.round(window.scrollY + r.bottom + 8)}px`;
  shareMenu.style.left = `${Math.round(window.scrollX + r.right - shareMenu.offsetWidth)}px`;
  shareMenu.classList.add('open');
  btn.setAttribute('aria-expanded','true');

  // Copy handler (her açıldığında güncel URL ile)
  const copyBtn = shareMenu.querySelector('[data-action="copy"]');
  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Bağlantı kopyalandı');
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = url; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); showToast('Bağlantı kopyalandı'); }
      finally { document.body.removeChild(ta); }
    }
    closeShare();
  };
}

function closeShare(){
  shareMenu.classList.remove('open');
  if (currentBtn) currentBtn.setAttribute('aria-expanded','false');
  currentCard = null; currentBtn = null;
}

// Dışarı tık/ESC ile kapat
document.addEventListener('click', (e)=>{
  const isBtn = e.target.closest('.share-btn');
  const isMenu = e.target.closest('.share-menu');
  if (isBtn){
    const card = e.target.closest('.project-card');
    if (!shareMenu.classList.contains('open') || currentCard !== card){
      // başka karttan geliyorsa önce kapat
      closeShare();
      openShare(card, e.target);
    } else {
      closeShare();
    }
  } else if (!isMenu){
    closeShare();
  }
});
document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeShare(); });

// Reflow: menü genişliği bilinmeden left hesaplanmasın diye ilk açılışta ölç
setTimeout(()=>{ shareMenu.style.visibility='hidden'; shareMenu.classList.add('open');
  const w = shareMenu.offsetWidth; shareMenu.classList.remove('open'); shareMenu.style.visibility='';
}, 0);


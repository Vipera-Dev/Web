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

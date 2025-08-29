// Typing, highlight cycle, scroll reveal, mobile nav, modals, contact form
(() => {
  // Typing + highlight
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
      } else afterType();
    };
    const afterType = () => {
      let kIndex = 0;
      const cycle = () => {
        const base = original;
        const pattern = new RegExp("(" + keywords.join("|") + ")", "i");
        const html = base.replace(pattern, (m) => `<span class="g">${m}</span>`);
        el.innerHTML = html;
        kIndex++;
      };
      cycle();
      setInterval(cycle, 2200);
    };
    if (original) type();
  }

  // Scroll reveal
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".section-animate").forEach((n) => io.observe(n));

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    const openMenu = () => {
      menu.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    };
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });
    // Close on link click (mobile)
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => closeMenu())
    );
    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Modals
  const trapFocus = (container) => {
    const foci = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = foci[0], last = foci[foci.length - 1];
    const handle = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    container.addEventListener("keydown", handle);
    return () => container.removeEventListener("keydown", handle);
  };

  const openers = document.querySelectorAll(".open-modal");
  let removeTrap = null;
  openers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(btn.dataset.target);
      if (!target) return;
      target.setAttribute("aria-hidden", "false");
      const dialog = target.querySelector(".modal-dialog");
      dialog.focus();
      removeTrap = trapFocus(dialog);
      const close = () => {
        target.setAttribute("aria-hidden", "true");
        if (removeTrap) removeTrap();
      };
      target.addEventListener("click", (ev) => {
        if (ev.target.dataset.close === "true") close();
      });
      document.addEventListener("keydown", function esc(ev){
        if (ev.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
      });
      target.querySelectorAll("[data-close]").forEach((c)=>c.addEventListener("click", close, { once:true }));
    });
  });

  // Contact form → mailto draft
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        alert("Lütfen tüm alanları doldurun.");
        return;
      }
      const subject = encodeURIComponent(`İletişim: ${name}`);
      const body = encodeURIComponent(
        `İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}\n`
      );
      window.location.href = `mailto:viperadev@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Existing (optional) project link wiring left intact
  const links = {
    "mission-budy": { github: "https://github.com/ViperaDev/MissionBudy", download: "#" },
    "vipodeck": { github: "https://github.com/ViperaDev/VipoDeck", download: "#" },
  };
  for (const [pid, urls] of Object.entries(links)) {
    const card = document.getElementById(pid);
    if (!card) continue;
    const gh = card.querySelector('a.btn.secondary.icon');
    const dl = card.querySelector('a.btn.icon:not(.secondary)');
    if (gh && urls.github) gh.href = urls.github;
    if (dl && urls.download) dl.href = urls.download;
  }
})();

// Contact form
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();
    if (!name || !email || !message) { alert("Lütfen tüm alanları doldurun."); return; }
    const subject = encodeURIComponent(`İletişim: ${name}`);
    const body = encodeURIComponent(`İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}\n`);
    window.location.href = `mailto:viperadev@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Newsletter form
function initNewsletter() {
  const nform = document.getElementById("newsletter-form");
  if (!nform) return;
  nform.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(nform);
    const email = data.get("email")?.toString().trim();
    const consent = data.get("consent") === "on";
    if (!email || !consent) { alert("Lütfen e-posta girin ve onay kutusunu işaretleyin."); return; }
    const subject = encodeURIComponent("Newsletter Kayıt");
    const body = encodeURIComponent(`E-posta: ${email}\nOnay: ${consent ? "Evet" : "Hayır"}`);
    window.location.href = `mailto:viperadev@gmail.com?subject=${subject}&body=${body}`;
  });
}

export function initForms() {
  initContactForm();
  initNewsletter();
}

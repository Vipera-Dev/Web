// Typing & highlight
export function initTyping() {
  const el = document.querySelector(".typing-text");
  const keywords = ["Efsane", "Yarışma", "Macera"];
  if (!el) return;

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
      const pattern = new RegExp("(" + keywords.join("|") + ")", "i");
      el.innerHTML = original.replace(pattern, (m) => `<span class="g">${m}</span>`);
    }, 2200);
  }
}

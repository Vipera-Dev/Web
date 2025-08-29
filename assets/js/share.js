// Share menu + Toast
export function initShare() {
  const shareMenu = document.createElement("div");
  shareMenu.className = "share-menu";
  shareMenu.innerHTML = `
    <button type="button" data-action="copy">🔗 Linki kopyala</button>
    <a href="#" target="_blank" rel="noopener" data-action="github">💻 GitHub’a git</a>
    <a href="#" target="_blank" rel="noopener" data-action="image">🖼️ Görseli aç</a>
  `;
  document.body.appendChild(shareMenu);

  const toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);

  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
  };

  let currentCard = null;
  let currentBtn  = null;

  function openShare(card, btn){
    currentCard = card; currentBtn = btn;
    const url    = card.dataset.shareUrl || location.href;
    const gh     = card.dataset.githubUrl || "#";
    const imgUrl = card.dataset.imageUrl || "#";
    shareMenu.querySelector("[data-action='github']").href = gh;
    shareMenu.querySelector("[data-action='image']").href  = imgUrl;

    const r = btn.getBoundingClientRect();
    shareMenu.style.top  = `${Math.round(window.scrollY + r.bottom + 8)}px`;
    shareMenu.style.left = `${Math.round(window.scrollX + r.right - shareMenu.offsetWidth)}px`;
    shareMenu.classList.add("open");
    btn.setAttribute("aria-expanded","true");

    const copyBtn = shareMenu.querySelector("[data-action='copy']");
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(url);
        showToast("Bağlantı kopyalandı");
      } catch {
        const ta = document.createElement("textarea");
        ta.value = url; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); showToast("Bağlantı kopyalandı"); }
        finally { document.body.removeChild(ta); }
      }
      closeShare();
    };
  }

  function closeShare(){
    shareMenu.classList.remove("open");
    if (currentBtn) currentBtn.setAttribute("aria-expanded","false");
    currentCard = null; currentBtn = null;
  }

  document.addEventListener("click", (e)=>{
    const isBtn = e.target.closest(".share-btn");
    const isMenu = e.target.closest(".share-menu");
    if (isBtn){
      const card = e.target.closest(".project-card");
      if (!shareMenu.classList.contains("open") || currentCard !== card){
        closeShare();
        openShare(card, e.target);
      } else {
        closeShare();
      }
    } else if (!isMenu){
      closeShare();
    }
  });
  document.addEventListener("keydown", (e)=>{ if (e.key === "Escape") closeShare(); });

  // İlk açılışta ölçüm için
  setTimeout(()=>{ shareMenu.style.visibility="hidden"; shareMenu.classList.add("open");
    const w = shareMenu.offsetWidth;
    shareMenu.classList.remove("open"); shareMenu.style.visibility="";
  }, 0);
}

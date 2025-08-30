// /assets/js/to-top.js
export function initToTop(threshold = 400){
  const btn = document.getElementById("toTop");
  if(!btn) return; // buton sayfada yoksa sessizce çık

  // Scroll konumunu güvenli oku (tarayıcı farkları)
  const getScrollY = () =>
    window.pageYOffset ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0;

  // Eşik kontrolü
  const update = () => {
    const y = getScrollY();
    if (y > threshold) btn.classList.add("show");
    else btn.classList.remove("show");
  };

  // Tıklama ile en üste dön
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Scroll dinleyicisi (passive)
  window.addEventListener("scroll", update, { passive: true });

  // Sayfa kısa ise: yine de aşağı kayınca görünsün, ilk ölçüm:
  // Eğer içerik gerçekten taşmıyorsa "show" eklemeyiz.
  update();
}

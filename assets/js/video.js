// Hover video control
export function initVideoHover() {
  document.querySelectorAll(".project-card .preview video").forEach(v => {
    // Lazy load
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { v.load(); io2.unobserve(v); }
      });
    }, { threshold: .25 });
    io2.observe(v);

    const parent = v.closest(".project-card");
    parent.addEventListener("mouseenter", () => v.play().catch(()=>{}));
    parent.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
  });
}

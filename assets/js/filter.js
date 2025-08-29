// Project filter
export function initFilter() {
  const grid = document.querySelector(".project-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!grid || !filterButtons.length) return;

  const cards = [...grid.querySelectorAll(".project-card")];
  const applyFilter = (type) => {
    cards.forEach(card => {
      const cat = card.getAttribute("data-category");
      const show = (type === "all") || (cat === type);
      card.style.display = show ? "" : "none";
    });
  };

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected","false"); });
      btn.classList.add("is-active"); btn.setAttribute("aria-selected","true");
      applyFilter(btn.dataset.filter);
    });
  });
}

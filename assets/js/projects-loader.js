// Projects JSON'dan kart üretici
const projectCardHTML = (p) => `
  <article class="card card-hover project-card" data-category="${p.category}" id="${p.id}"
    data-share-url="${p.url}" data-github-url="${p.github || '#'}" data-image-url="${p.shareImage || p.image}">
    <button class="share-btn" aria-label="Paylaş" aria-haspopup="menu" aria-expanded="false">⋯</button>
    <div class="preview">
      <img loading="lazy" src="${p.image}" alt="${p.title} önizleme" />
    </div>
    <div class="row">
      <h3>${p.title}</h3>
      <span class="ml-auto muted">${p.category === 'game' ? 'Oyun' : 'Araç'}</span>
    </div>
    <p>${p.description}</p>
    <div class="spacer"></div>
    <div>${(p.tags || []).map(t=>`<span class="tag">${t}</span>`).join(" ")}</div>
    <div class="spacer"></div>
    <div class="row">
      <a class="btn" href="${p.url}">Detaylar</a>
      ${p.github ? `<a class="btn secondary" href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
    </div>
    ${(() => {
      const chips = [];
      if (p.version) chips.push(`<span class="badge-chip success"><span class="badge-dot"></span> ${p.version}</span>`);
      (p.status || []).forEach(s=>{
        const cls = /beta/i.test(s) ? "info" : /yeni|new/i.test(s) ? "warn" : "info";
        chips.push(`<span class="badge-chip ${cls}"><span class="badge-dot"></span> ${s}</span>`);
      });
      return chips.length
        ? `<div class="card-badges">${chips.join("")}</div>`
        : "";
    })()}
  </article>
`;

async function fetchJSON(url){
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Fetch hata: ${url}`);
  return await r.json();
}

export async function renderProjects(){
  const grid = document.querySelector(".project-grid");
  if (!grid) return;

  try {
    const [games, apps] = await Promise.all([
      fetchJSON("/data/projects-games.json"),
      fetchJSON("/data/projects-apps.json")
    ]);

    const all = [...games, ...apps];
    grid.innerHTML = all.map(projectCardHTML).join("");

    // share menüsü position/handlers için share.js çalışsın diye:
    document.dispatchEvent(new CustomEvent("projects:rendered"));
  } catch (e){
    grid.innerHTML = `<div class="card"><p class="muted">Projeler yüklenemedi. Daha sonra tekrar deneyin.</p></div>`;
    console.error(e);
  }
}

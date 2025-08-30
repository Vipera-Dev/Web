// Blog kart üretici
const postCardHTML = (p) => `
  <article class="card card-hover post-card" data-type="${p.type}">
    <div class="post-cover">
      <img src="${p.cover}" alt="${p.title} kapak" loading="lazy">
    </div>
    <h3 class="post-title">${p.title}</h3>
    <p class="post-excerpt">${p.excerpt}</p>
    <div class="post-meta">
      <time datetime="${p.date}">${new Date(p.date).toLocaleDateString('tr-TR', { day:'2-digit', month:'short', year:'numeric' })}</time>
      • ${p.type === 'devlog' ? 'Devlog' : 'Yazı'}
    </div>
    <div class="row">
      <a class="btn" href="${p.readUrl}">Devamını Oku</a>
      ${p.external ? `<a class="btn secondary ml-auto" href="${p.external.url}" target="_blank" rel="noopener">${p.external.label}</a>` : ""}
    </div>
  </article>
`;

async function fetchJSON(url){
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Fetch hata: ${url}`);
  return await r.json();
}

export async function renderBlog(){
  const blogSection = document.querySelector("#blog");
  if (!blogSection) return;
  const grid = blogSection.querySelector(".grid");
  if (!grid) return;

  try {
    const [gamePosts, appPosts, generalPosts] = await Promise.all([
      fetch("/data/blog-games.json").then(r=>r.json()),
      fetch("/data/blog-apps.json").then(r=>r.json()),
      fetch("/data/blog-general.json").then(r=>r.json()) // ← yeni
    ]);

    const all = [...gamePosts, ...appPosts, ...generalPosts]
      .sort((a,b)=> (a.date < b.date ? 1 : -1));

    grid.innerHTML = all.map(postCardHTML).join("");
  } catch (e){
    grid.innerHTML = `<div class="card"><p class="muted">Blog yazıları yüklenemedi.</p></div>`;
    console.error(e);
  }
}

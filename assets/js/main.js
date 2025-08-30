import { initNav } from './nav.js';
import { initTyping } from './typing.js';
import { initForms } from './forms.js';
import { initFilter } from './filter.js';
import { initVideoHover } from './video.js';
import { initScrollReveal } from './scroll.js';
import { initShare } from './share.js';
import { renderProjects } from './projects-loader.js';
import { renderBlog } from './blog-loader.js';
import { initToTop } from "./to-top.js";


window.addEventListener('DOMContentLoaded', async () => {
  // 1) Veri kaynaklarını çiz
  await renderProjects();
  await renderBlog();

  // 2) Etkileşimleri bağla
  // (kartlar çizildikten sonra çağırmak önemli)
  initNav?.();
  initTyping?.();
  initForms?.();
  initShare?.();
  initFilter?.();       // .project-grid artık mevcut
  initVideoHover?.();
  initScrollReveal?.();

  // share menüsü konumlandırma fix'i (ilk ölçüm)
  document.addEventListener("projects:rendered", () => {
    // share.js ilk ölçüm setTimeout'uyla yapıyor; burada ekstra bir şey gerekmez.
  });


  initToTop(400); // 400px sonra görünsün
});
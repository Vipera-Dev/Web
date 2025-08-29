import { initTyping } from "./typing.js";
import { initScrollReveal } from "./scroll.js";
import { initNav } from "./nav.js";
import { initForms } from "./forms.js";
import { initFilter } from "./filter.js";
import { initVideoHover } from "./video.js";
import { initShare } from "./share.js";

document.addEventListener("DOMContentLoaded", () => {
  initTyping();
  initScrollReveal();
  initNav();
  initForms();
  initFilter();
  initVideoHover();
  initShare();
});

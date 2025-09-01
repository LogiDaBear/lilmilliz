import { Carousel } from "./carousel.js";
import { initNav, initInquiryForm, initGlitterClicks } from "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initInquiryForm();

  const carouselRoot = document.querySelector(".carousel");
  if (carouselRoot) {
    new Carousel(carouselRoot, { interval: 6000 });
  }

  // activate glitter pops on buttons
  initGlitterClicks();
});

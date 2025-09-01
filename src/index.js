import { Carousel } from "./carousel.js";
import { initNav, initInquiryForm } from "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initInquiryForm();

  const carouselRoot = document.querySelector(".carousel");
  if (carouselRoot) {
    // You can pass { interval: 7000 } to adjust autoplay speed
    new Carousel(carouselRoot, { interval: 6000 });
  }
});

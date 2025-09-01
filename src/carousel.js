// Simple accessible carousel with autoplay + controls
export class Carousel {
  constructor(root, { interval = 6000 } = {}) {
    this.root = root;
    this.track = root.querySelector(".carousel-track");
    this.slides = Array.from(this.track.children);
    this.prevBtn = root.querySelector(".carousel-btn.prev");
    this.nextBtn = root.querySelector(".carousel-btn.next");
    this.dotsWrap = root.querySelector(".carousel-dots");
    this.index = 0;
    this.interval = interval;
    this.timer = null;

    // Build dots
    this.slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.addEventListener("click", () => this.go(i, true));
      this.dotsWrap.appendChild(b);
    });

    // Lazy background via data-src (optional)
    this.slides.forEach(slide => {
      const src = slide.dataset.src;
      if (src) slide.style.setProperty("--bg-image", `url("${src}")`);
    });

    this.bind();
    this.update();
    this.start();
  }

  bind() {
    this.prevBtn.addEventListener("click", () => this.prev(true));
    this.nextBtn.addEventListener("click", () => this.next(true));

    // Pause on hover/focus
    this.root.addEventListener("mouseenter", () => this.stop());
    this.root.addEventListener("mouseleave", () => this.start());
    this.root.addEventListener("focusin", () => this.stop());
    this.root.addEventListener("focusout", () => this.start());

    // Keyboard support
    this.root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") this.next(true);
      if (e.key === "ArrowLeft") this.prev(true);
    });

    // Resize keeps slide aligned
    window.addEventListener("resize", () => this.update(true));
  }

  start() {
    this.stop();
    this.timer = setInterval(() => this.next(), this.interval);
  }
  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  prev(user = false) { this.go(this.index - 1, user); }
  next(user = false) { this.go(this.index + 1, user); }

  go(i, userTriggered = false) {
    const total = this.slides.length;
    this.index = (i + total) % total;
    this.update();
    if (userTriggered) {
      // restart timer after user interaction
      this.start();
    }
  }

  update(resized = false) {
    const offset = this.index * this.root.clientWidth;
    this.track.style.transform = `translateX(-${offset}px)`;

    // aria / dot states
    this.slides.forEach((s, i) => {
      const active = i === this.index;
      s.classList.toggle("is-active", active);
      s.setAttribute("aria-hidden", String(!active));
    });

    const dots = Array.from(this.dotsWrap.children);
    dots.forEach((d, i) => d.setAttribute("aria-selected", String(i === this.index)));

    // snap after resize
    if (resized) {
      this.track.style.transition = "none";
      requestAnimationFrame(() => {
        this.track.style.transform = `translateX(-${this.index * this.root.clientWidth}px)`;
        requestAnimationFrame(() => (this.track.style.transition = ""));
      });
    }
  }
}

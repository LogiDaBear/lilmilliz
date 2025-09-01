export function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      links.classList.toggle("show");
    });

    document.querySelectorAll("[data-nav]").forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href?.startsWith("#")) {
          e.preventDefault();
          links.classList.remove("show");
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

export function initInquiryForm() {
  const form = document.getElementById("inquiry-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";

    const data = Object.fromEntries(new FormData(form).entries());
    const errors = validate(data);

    if (errors.length) {
      status.textContent = errors.join(" • ");
      status.style.color = "#a33e74";
      return;
    }

    const subject = encodeURIComponent(`Lil Milliz Inquiry — ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nDate: ${data.date || "N/A"}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:hello@lilmilliz.com?subject=${subject}&body=${body}`;

    form.reset();
    status.textContent = "Thanks! We’ll get back to you shortly.";
    status.style.color = "#7a5b74";
  });
}

function validate(d) {
  const errs = [];
  if (!d.name?.trim()) errs.push("Name is required");
  if (!d.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.push("Valid email required");
  if (!d.message?.trim()) errs.push("Message is required");
  return errs;
}

/* ✨ Glitter clicks */
export function initGlitterClicks() {
  document.querySelectorAll(".btn, .carousel-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      // button-relative position
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // spawn a handful of sparkles
      const count = 10 + Math.floor(Math.random()*6);
      for (let i=0; i<count; i++){
        const s = document.createElement("span");
        s.className = "glitter";
        s.style.left = x + "px";
        s.style.top = y + "px";

        // random direction offsets
        const dx = (Math.random() - 0.5) * 40; // -20..20
        const dy = (Math.random() - 0.5) * 40;
        s.style.setProperty("--dx", dx + "px");
        s.style.setProperty("--dy", dy + "px");

        btn.appendChild(s);
        // cleanup after animation
        s.addEventListener("animationend", () => s.remove());
      }
    });
  });
}

export function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      links.classList.toggle("show");
    });

    // smooth scroll for in-page links
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

  // footer year
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
      status.style.color = "#ffd166";
      return;
    }

    // Option A: mailto (no backend). Keeps your “HTML/JS only” requirement.
    const subject = encodeURIComponent(`Lil Milliz Inquiry — ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nDate: ${data.date || "N/A"}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:hello@lilmilliz.com?subject=${subject}&body=${body}`;

    // Option B: POST to an API (when you add a backend):
    // fetch('/api/inquiry', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) })

    form.reset();
    status.textContent = "Thanks! We’ll get back to you shortly.";
    status.style.color = "#b9bcc6";
  });
}

function validate(d) {
  const errs = [];
  if (!d.name?.trim()) errs.push("Name is required");
  if (!d.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.push("Valid email required");
  if (!d.message?.trim()) errs.push("Message is required");
  return errs;
}

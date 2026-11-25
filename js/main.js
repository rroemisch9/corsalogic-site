// CorsaLogic site interactions

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Scroll reveal (IntersectionObserver; disabled under reduced motion via CSS)
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Gallery lightbox
const dialog = document.querySelector(".lightbox");
if (dialog) {
  const dimg = dialog.querySelector("img");
  const dcap = dialog.querySelector("figcaption");
  document.querySelectorAll(".gallery figure").forEach((fig) => {
    fig.addEventListener("click", () => {
      const img = fig.querySelector("img");
      dimg.src = img.dataset.full || img.src;
      dimg.alt = img.alt;
      dcap.textContent = fig.querySelector("figcaption")?.textContent || "";
      dialog.showModal();
    });
  });
  dialog.addEventListener("click", () => dialog.close());
}

// Car strip: previous / next controls (visible on phones; swipe still works)
const strip = document.querySelector(".strip");
const stripControls = document.querySelector(".strip-controls");
if (strip && stripControls) {
  const buttons = Array.from(stripControls.querySelectorAll(".strip-btn"));
  const offsetOf = (el) => el.offsetLeft - strip.offsetLeft;
  const maxScroll = () => strip.scrollWidth - strip.clientWidth;

  // Index of the car currently snapped at the left edge
  const currentIndex = () => {
    let best = 0;
    let dist = Infinity;
    Array.from(strip.children).forEach((el, i) => {
      const d = Math.abs(offsetOf(el) - strip.scrollLeft);
      if (d < dist) { dist = d; best = i; }
    });
    return best;
  };

  const update = () => {
    buttons.forEach((btn) => {
      const atEnd = btn.dataset.dir === "-1" ? strip.scrollLeft <= 1 : strip.scrollLeft >= maxScroll() - 1;
      btn.setAttribute("aria-disabled", atEnd ? "true" : "false");
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.getAttribute("aria-disabled") === "true") return;
      const items = strip.children;
      const i = Math.min(items.length - 1, Math.max(0, currentIndex() + Number(btn.dataset.dir)));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      strip.scrollTo({ left: offsetOf(items[i]), behavior: reduce ? "auto" : "smooth" });
    });
  });

  strip.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  stripControls.hidden = false;
  update();
}

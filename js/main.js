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

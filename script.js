const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const registerButtons = document.querySelectorAll("[data-register]");
const toast = document.querySelector("[data-toast]");
const navLinks = [...nav.querySelectorAll("a[href^='#']")];

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeNav = () => {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  header.classList.remove("is-open");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  header.classList.toggle("is-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});

let toastTimer;

registerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clearTimeout(toastTimer);
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 4200);
  });
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-42% 0px -50% 0px" }
  );

  document.querySelectorAll("main section[id], footer[id]").forEach((section) => sectionObserver.observe(section));
}

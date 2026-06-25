const year = document.querySelector("[data-year]");
if (year) {
  year.textContent = new Date().getFullYear();
}

const menuButton = document.querySelector(".menu-toggle");
const navList = document.querySelector("#site-nav");

if (menuButton && navList) {
  menuButton.setAttribute("aria-label", "Abrir menú");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");
    navList.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navList.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.classList.remove("is-open");
      navList.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    }
  });
}

const sections = [...document.querySelectorAll("main section[id], .hero[id]")];
const navLinks = [...document.querySelectorAll(".nav-list a")];

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActiveLink(visible.target.id);
      }
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

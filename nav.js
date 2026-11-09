/* nav.js — write the navigation once in nav.html, inject it into every page. */
(() => {
  "use strict";

  const mount = document.querySelector("[data-nav]");
  if (!mount) return;

  const currentPage = () => {
    const file = window.location.pathname.split("/").pop();
    return file === "" ? "index.html" : file;
  };

  fetch("nav.html")
    .then((response) => {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.text();
    })
    .then((html) => {
      mount.innerHTML = html;
      const here = currentPage();
      mount.querySelectorAll("a").forEach((link) => {
        if (link.getAttribute("href") === here) {
          link.setAttribute("aria-current", "page");
        }
      });
    })
    .catch(() => {
      mount.innerHTML =
        '<p class="nav-error">Menu could not load. <a href="index.html">Home</a></p>';
    });
})();

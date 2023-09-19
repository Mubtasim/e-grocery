import { getCategories } from "./service.js";

window.addEventListener("DOMContentLoaded", () => {
  /*=============== SHOW MENU ===============*/
  const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

  // MENU SHOW
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  //   MENU HIDDEN
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  /*=============== REMOVE MENU MOBILE ===============*/

  /*=============== SWIPER SHOE ===============*/

  /*=============== SHADOW HEADER ===============*/

  const navListEl = document.getElementById("nav-list");
  async function renderCategoriesNav() {
    const categories = await getCategories();
    let result = "";
    categories.forEach((category) => {
      result += `
            <li class="nav__item">
            <a href="#">${category.name}</a>
          </li>
            `;
    });
    navListEl.innerHTML = result;
  }
  renderCategoriesNav();
});

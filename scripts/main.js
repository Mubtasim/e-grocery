import { getCategories } from "./service.js";
import { getTargetSegment } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  /*=============== TOGGLE MENU ===============*/
  const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    mainEl = document.getElementById("main");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show-menu");
      navToggle.classList.toggle("rotate__toggle");
      mainEl.classList.toggle("reduced__main");
    });
  }

  /*=============== RENDER NAV CATEGORIES ===============*/
  const navListEl = document.getElementById("nav-list");
  async function renderCategoriesNav() {
    const categories = await getCategories();
    let result = "";
    categories.forEach((category) => {
      result += `
            <li class="nav__item">
            <a href="#" class="nav__link">${category.name}</a>
          </li>
            `;
    });
    navListEl.innerHTML = result;
  }
  renderCategoriesNav();

  /*=============== RENDER INNER NAVIGATIONS ===============*/
  const currentPathName = document.location.pathname;
  const currentSegments = currentPathName.split("/");
  const targetSegment = getTargetSegment(currentSegments);
  console.log(targetSegment);
});

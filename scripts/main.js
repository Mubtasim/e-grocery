import { CATEGORY_QUERY, PRODUCTS_URL_SEGMENT } from "./constants.js";
import { getCategories } from "./service.js";
import {
  getCart,
  getCategoryUrlByCategoryId,
  getQueryValueByParam,
  getTargetSegment,
  renderCartItems,
  setCartItemCountInNav,
  setCurrentInnerNavigations,
} from "./utils.js";

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
  const targetSegment = getTargetSegment();
  async function renderCategoriesNav() {
    const categories = await getCategories();
    let result = "";
    categories.forEach((category) => {
      const categoryUrl = getCategoryUrlByCategoryId(category.id);
      const urlCategoryId = getQueryValueByParam(CATEGORY_QUERY);
      let active = "";
      if (
        targetSegment === PRODUCTS_URL_SEGMENT &&
        urlCategoryId === category.id
      ) {
        active = "active";
      }
      result += `
            <li class="nav__item">
            <a href=${categoryUrl} class="nav__link ${active}">${category.name}</a>
          </li>
            `;
    });
    navListEl.innerHTML = result;
  }
  renderCategoriesNav();

  /*=============== RENDER INNER NAVIGATIONS ===============*/
  setCurrentInnerNavigations(targetSegment);

  /*=============== SET CART ITEM COUNT IN NAV ===============*/
  let cart = getCart();
  setCartItemCountInNav(cart);

  /*=============== RENDER CART ITEMS ===============*/
  renderCartItems(cart);

  /*=============== CART TOGGLE ===============*/
  const cartEl = document.getElementById("cart");

  const cartCloseButtonEl = document.getElementById("cart-close-button");
  cartCloseButtonEl.addEventListener("click", () => {
    cartEl.classList.remove("show__cart");
  });

  const cartIconEl = document.getElementById("cart-icon");
  cartIconEl.addEventListener("click", () => {
    cartEl.classList.toggle("show__cart");
  });
});

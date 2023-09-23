import { getCart, renderCheckoutCartItem } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  let cart = getCart();
  renderCheckoutCartItem(cart);

  const navRightEl = document.getElementById("nav-right");
  navRightEl.classList.add("nav__right-disable");
});

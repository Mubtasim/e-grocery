import {
  clearCartFromStorage,
  getCart,
  renderCheckoutCartItem,
} from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  let cart = getCart();
  renderCheckoutCartItem(cart);

  const navRightEl = document.getElementById("nav-right");
  navRightEl.classList.add("nav__right-disable");

  const checkoutPlaceOrderButtonEl = document.getElementById(
    "checkout-place-order-button"
  );
  checkoutPlaceOrderButtonEl.addEventListener("click", () => {
    const orderSuccessfulEl = document.getElementById("order-successfull");
    const mainEl = document.getElementById("main");
    mainEl.remove();
    orderSuccessfulEl.classList.add("order-successful-show");
    clearCartFromStorage();
  });
});

import { getCart, renderCheckoutCartItem } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  let cart = getCart();
  renderCheckoutCartItem(cart);
});

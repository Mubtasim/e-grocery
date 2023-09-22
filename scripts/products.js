import { CATEGORY_QUERY, PRODUCT_QUERY } from "./constants.js";
import { getProductsByCategoryId } from "./service.js";
import { addToCart, getQueryValueByParam } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  const categoryId = getQueryValueByParam(CATEGORY_QUERY);

  async function renderProducts() {
    const products = await getProductsByCategoryId(categoryId);
    let result = "";
    products.forEach((product) => {
      result += `
        <div class="product__item">
          <div class="product__showcase">
            <img
              src=${product.imageUrl}
              class="product__image"
            />
            <i class="ri-shopping-cart-fill product__card-icon" data-id=${product.id}></i>
          </div>
          <div class="product_subinfo">
            <div class="product__name">
              <a class="product__link" href="/pages/product-details/index.html?${PRODUCT_QUERY}=${product.id}">${product.name}</a>
            </div>
            <div class="product__price">${product.unitPrice}TK (${product.unit})</div>
          </div>
        </div>
      `;
    });
    const productListEl = document.getElementById("product-list");
    productListEl.innerHTML = result;
  }

  async function setCartButtonsAction() {
    const products = await getProductsByCategoryId(categoryId);
    const addToCartButtons = document.querySelectorAll("i[data-id]");

    addToCartButtons.forEach((addToCartButton) => {
      const productId = addToCartButton.dataset.id;
      const addToCartToButtonEl = document.querySelector(
        `[data-id="${productId}"]`
      );
      addToCartToButtonEl.addEventListener("click", () => {
        addToCart(products, productId);
      });
    });
  }

  renderProducts();
  setCartButtonsAction();
});

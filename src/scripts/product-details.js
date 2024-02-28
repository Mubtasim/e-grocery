import { PRODUCT_QUERY } from "./constants.js";
import { getProductById, getProducts } from "./service.js";
import { addToCart, getQueryValueByParam } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  const productDetailsEl = document.getElementById("product-details");

  async function renderProductDetails() {
    try {
      const productId = getQueryValueByParam(PRODUCT_QUERY);
      const product = await getProductById(productId);
      const result = `
        <img
            src=${product.imageUrl}
            class="product__image"
        />
        <div class="product__info">
            <div class="product__name">${product.name}</div>
            <div class="product__price">${product.unitPrice} TK (${product.unit})</div>
            <div class="product__description">${product.description}</div>
            <div class="product__cart-actions">
                <button class="button product__cart-button addToCartButton" id="add-to-cart-button">
                <i class="ri-shopping-cart-fill"></i
                ><span>Add to Cart</span>
                </button>
                <a class="button product__cart-button" href="/pages/checkout"
                >Buy Now</a
                >
            </div>
        </div>
      `;
      productDetailsEl.innerHTML = result;

      const allProducts = await getProducts();

      const addToCartButtonEl = document.getElementById("add-to-cart-button");
      addToCartButtonEl.addEventListener("click", () => {
        addToCart(allProducts, productId);
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderProductDetails();
});

import { CATEGORY_QUERY, PRODUCT_QUERY } from "./constants.js";
import { getProducts, getProductsByCategoryId } from "./service.js";
import { getQueryValueByParam } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  const productListEl = document.getElementById("product-list");
  const categoryId = getQueryValueByParam(CATEGORY_QUERY);

  async function renderProducts() {
    const products = await getProductsByCategoryId(categoryId);
    let result = "";
    products.forEach((product) => {
      result += `
        <a
          class="product__item"
          href="/pages/product/index.html?productId=${product.id}"
        >
          <div class="product__showcase">
            <img
              src=${product.imageUrl}
              class="product__image"
            />
            <i class="ri-shopping-cart-fill product__card-icon"></i>
          </div>
          <div class="product_subinfo">
            <div class="product__name">${product.name}</div>
            <div class="product__price">${product.unitPrice}TK (${product.unit})</div>
          </div>
        </a>
      `;
    });
    productListEl.innerHTML = result;
  }

  renderProducts();
});

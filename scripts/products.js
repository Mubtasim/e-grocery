import { CATEGORY_QUERY, PRODUCT_QUERY } from "./constants.js";
import { getProducts, getProductsByCategoryId } from "./service.js";
import { getQueryValueByParam } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  const productListEl = document.getElementById("product-list");
  const categoryId = getQueryValueByParam(CATEGORY_QUERY);

  async function renderProducts() {
    const products = await getProductsByCategoryId(categoryId);
    console.log(products);
    let result = "";
    products.forEach((product) => {
      console.log("product", product);
      result += `
      <a class="product__item" href="/pages/products/index.html?${PRODUCT_QUERY}=${product.id}">
        <img
          src="https://chaldn.com/_mpimage/kitchen-appliances?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D29089&q=best&v=1&m=400&webp=1"
          class="product__image"
        />
        <div class="product__name">${product.name}</div>
      </a>
      `;
    });
    console.log("previous:", productListEl.innerHTML);
    productListEl.innerHTML = result;
    console.log("after", productListEl.innerHTML);
  }

  renderProducts();
});

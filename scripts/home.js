import { getProducts } from "./service.js";

window.addEventListener("DOMContentLoaded", () => {
  const productListEl = document.getElementById("product-list");

  async function renderProducts() {
    const products = await getProducts();
    let result = "";
    products.forEach((product) => {
      result += `<li><a href="/pages/product/index.html?id=${product.id}">${product.name}</a></li>`;
    });
    productListEl.innerHTML = result;
  }

  renderProducts();
});

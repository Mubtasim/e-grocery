import { getProductById } from "./service.js";

window.addEventListener("DOMContentLoaded", () => {
  let params = new URL(document.location).searchParams;
  let productId = params.get("id");
  const productNameEl = document.getElementById("product-name");
  const productPriceEl = document.getElementById("product-price");

  async function renderProduct() {
    const product = await getProductById(productId);
    productNameEl.innerText = `Name: ${product.name}`;
    productPriceEl.innerText = `Price: ${product.unitPrice}`;
  }

  renderProduct();
});

import { getProducts } from "./service.js";

window.addEventListener("DOMContentLoaded", () => {
  let params = new URL(document.location).searchParams;
  let productId = params.get("id");
  const productNameEl = document.getElementById("product-name");
  const productPriceEl = document.getElementById("product-price");

  async function getProduct(id) {
    const products = await getProducts();
    const product = products.find((product) => product.id === id);
    return product;
  }

  async function renderProduct() {
    const product = await getProduct(productId);
    productNameEl.innerText = `Name: ${product.name}`;
    productPriceEl.innerText = `Price: ${product.price}`;
  }

  renderProduct();
});

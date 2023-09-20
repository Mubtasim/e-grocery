import { getCategoryById } from "./service.js";

window.addEventListener("DOMContentLoaded", () => {
  let params = new URL(document.location).searchParams;
  let categoryId = params.get("categoryId");

  async function renderProducts() {
    const currentCategory = await getCategoryById(categoryId);
  }

  renderProducts();
});

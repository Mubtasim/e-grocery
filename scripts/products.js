import { getCategoryById } from "./service.js";

window.addEventListener("DOMContentLoaded", () => {
  let params = new URL(document.location).searchParams;
  let categoryId = params.get("categoryId");

  const categoryTitleEl = document.getElementById("category-title");

  async function renderProducts() {
    const currentCategory = await getCategoryById(categoryId);
    categoryTitleEl.innerHTML = currentCategory.name;
  }

  renderProducts();
});

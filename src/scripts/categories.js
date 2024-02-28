import { getCategories } from "./service.js";

window.addEventListener("DOMContentLoaded", () => {
  const categoryListEl = document.getElementById("category-list");

  async function renderCategories() {
    const categories = await getCategories();
    let result = "";
    categories.forEach((category) => {
      result += `
      <a class="category__item" href="/pages/products/index.html?categoryId=${category.id}">
        <img
          src=${category.imageUrl}
          class="category__image"
        />
        <div class="category__name">${category.name}</div>
      </a>
      `;
    });
    categoryListEl.innerHTML = result;
  }

  renderCategories();
});

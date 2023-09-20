import { getCategories } from "./service.js";

window.addEventListener("DOMContentLoaded", () => {
  const categoryListEl = document.getElementById("category-list");

  async function renderCategories() {
    const categories = await getCategories();
    let result = "";
    categories.forEach((category) => {
      result += `
      <div class="category__item">
        <img
          src=${category.imageUrl}
          class="category__image"
        />
        <div class="category__name">${category.name}</div>
      </div>
      `;
    });
    categoryListEl.innerHTML = result;
  }

  // renderCategories();
});

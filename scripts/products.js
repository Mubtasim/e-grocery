window.addEventListener("DOMContentLoaded", () => {
  let params = new URL(document.location).searchParams;
  let categoryId = params.get("categoryId");

  const categoryTitleEl = document.getElementById("category-title");
  categoryTitleEl.innerHTML = "Dynamic category name";
});

const PRODUCT_URL = "../../data/products.json";
const CATEGORIES_URL = "../../data/categories.json";

async function getProducts() {
  try {
    const result = await fetch(PRODUCT_URL);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(id) {
  try {
    const products = await getProducts();
    const product = products.find((product) => product.id === id);
    return product;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsByCategoryId(categoryId) {
  try {
    const products = await getProducts();
    const productsOfCategory = products.filter(
      (product) => product.categoryId === categoryId
    );
    return productsOfCategory;
  } catch (error) {
    console.log(error);
  }
}

async function getCategories() {
  try {
    const result = await fetch(CATEGORIES_URL);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getCategoryById(id) {
  try {
    const categories = await getCategories();
    const category = categories.find((category) => category.id === id);
    return category;
  } catch (error) {
    console.log(error);
  }
}

export {
  getProducts,
  getProductById,
  getCategories,
  getCategoryById,
  getProductsByCategoryId,
};

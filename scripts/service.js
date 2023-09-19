async function getProducts() {
  try {
    const result = await fetch("../../data/products.json");
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

export { getProducts, getProductById };

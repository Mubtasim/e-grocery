import {
  CATEGORY_QUERY,
  CATEGORY_URL_SEGMENT,
  POSSIBLE_URL_SEGMENTS,
  PRODUCTS_URL_SEGMENT,
  PRODUCT_DETAILS_URL_SEGMENT,
  PRODUCT_QUERY,
} from "./constants.js";
import { getCategoryById, getProductById } from "./service.js";

function getTargetSegment() {
  const currentUrlProperties = new URL(document.location);
  const currentPathName = currentUrlProperties.pathname;
  const currentSegments = currentPathName.split("/");
  let targetSegment = "";
  currentSegments.forEach((segment) => {
    if (POSSIBLE_URL_SEGMENTS.includes(segment)) targetSegment = segment;
  });
  return targetSegment;
}

function getQueryValueByParam(param) {
  const currentUrlProperties = new URL(document.location);
  const currentQueryValue = currentUrlProperties.searchParams.get(param);
  return currentQueryValue;
}

function getNavigationHTML(innerNavigations) {
  //   let result = `<section class="section innerNavigation">Hello World</section>`;
  let result = "";
  innerNavigations.forEach((navigation, idx) => {
    const activeInnerNavigation =
      idx === innerNavigations.length - 1 ? "innerNavigation__item-last" : "";
    result += `
        <div class="innerNavigation__item">
            ${
              idx > 0
                ? '<i class="ri-arrow-right-s-line innerNavigation__arrow"></i>'
                : ""
            }
            <a href=${
              navigation.url
            } class="innerNavigation__link ${activeInnerNavigation}">${
      navigation.navName
    }</a>
        </div>
    `;
  });
  result = `<section class="section innerNavigation">${result}</section>`;
  return result;
}

function getCategoryUrlByCategoryId(categoryId) {
  const categoryUrl = `/pages/${PRODUCTS_URL_SEGMENT}/index.html?${CATEGORY_QUERY}=${categoryId}`;
  return categoryUrl;
}

function getProductUrlByProductId(productId) {
  const productUrl = `/pages/${PRODUCT_DETAILS_URL_SEGMENT}/index.html?${PRODUCT_QUERY}=${productId}`;
  return productUrl;
}

async function setCurrentInnerNavigations(targetSegment) {
  let innerNavigations = [];
  const categoriesUrl = `/pages/${CATEGORY_URL_SEGMENT}`;
  if (targetSegment === PRODUCTS_URL_SEGMENT) {
    const categoryId = getQueryValueByParam(CATEGORY_QUERY);
    const categoryUrl = getCategoryUrlByCategoryId(categoryId);
    const category = await getCategoryById(categoryId);
    const categoryName = category.name;
    innerNavigations = [
      {
        navName: CATEGORY_URL_SEGMENT,
        url: categoriesUrl,
      },
      {
        navName: categoryName,
        url: categoryUrl,
      },
    ];
  } else if (targetSegment === CATEGORY_URL_SEGMENT) {
    innerNavigations = [
      {
        navName: CATEGORY_URL_SEGMENT,
        url: categoriesUrl,
      },
    ];
  } else if (targetSegment === PRODUCT_DETAILS_URL_SEGMENT) {
    const productId = getQueryValueByParam(PRODUCT_QUERY);
    const productUrl = getProductUrlByProductId(productId);
    const product = await getProductById(productId);
    const productName = product.name;

    const categoryId = product.categoryId;
    const categoryUrl = getCategoryUrlByCategoryId(categoryId);
    const category = await getCategoryById(categoryId);
    const categoryName = category.name;
    innerNavigations = [
      {
        navName: CATEGORY_URL_SEGMENT,
        url: categoriesUrl,
      },
      {
        navName: categoryName,
        url: categoryUrl,
      },
      {
        navName: productName,
        url: productUrl,
      },
    ];
  }
  if (innerNavigations.length > 0) {
    const innerContainerEl = document.getElementById("inner-container");
    const result = getNavigationHTML(innerNavigations);
    innerContainerEl.innerHTML = result + innerContainerEl.innerHTML;
  }
}

function indexInCart(cart, productId) {
  let index = -1;
  cart.forEach((item, idx) => {
    if (item.id === productId) index = idx;
  });
  return index;
}

function setCartItemCountInNav(cart) {
  const cartItemCountEl = document.getElementById("cart-item-count");
  cartItemCountEl.innerHTML = cart.length;
}

function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) cart = [];
  return cart;
}

function addToCart(allproducts, productId) {
  let cart = getCart();

  const productIdxInCart = indexInCart(cart, productId);

  if (productIdxInCart >= 0) {
    const currentProduct = cart[productIdxInCart];
    const currentProductObj = {
      ...currentProduct,
      amount: currentProduct.amount + 1,
    };
    cart[productIdxInCart] = currentProductObj;
  } else {
    const currentProduct = allproducts.find(
      (product) => product.id === productId
    );
    const currentProductObj = { ...currentProduct, amount: 1 };
    cart.push(currentProductObj);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  setCartItemCountInNav(cart);

  console.log(cart);
}

export {
  getTargetSegment,
  setCurrentInnerNavigations,
  getQueryValueByParam,
  getCategoryUrlByCategoryId,
  addToCart,
  setCartItemCountInNav,
  getCart,
};

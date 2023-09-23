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

  setCartItemCountInNav(cart);
  renderCartItems(cart);

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log(cart);
}

function updateLocalStorageCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartAcross(cart) {
  updateLocalStorageCart(cart);
  setCartItemCountInNav(cart);
  renderCartItems(cart);
}

function deleteFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  updateCartAcross(cart);
}

function setCartDeleteButtonActions() {
  const cartDeleteButtonsEls = document.querySelectorAll("div[data-idCart]");
  cartDeleteButtonsEls.forEach((deleteBtnEl) => {
    const productId = deleteBtnEl.dataset.idcart;
    deleteBtnEl.addEventListener("click", () => {
      deleteFromCart(productId);
    });
  });
}

function renderCheckoutOrderSummary(cart) {
  const orderSummarySubtotalEl = document.getElementById(
    "order-summary-subtotal"
  );
  const orderSummaryTotalEl = document.getElementById("order-summary-total");
  let total = 0;
  cart.forEach((cartItem) => {
    total += cartItem.amount * cartItem.unitPrice;
  });
  orderSummarySubtotalEl.innerHTML = total;
  orderSummaryTotalEl.innerHTML = total;
}

function updateCartAcrossCheckout(cart) {
  updateLocalStorageCart(cart);
  renderCheckoutCartItem(cart);
  renderCheckoutOrderSummary(cart);
}

function deleteFromCheckoutCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  updateCartAcrossCheckout(cart);
}

function setCheckoutCartDeleteButtonActions() {
  const checkoutCartDeleteButtonsEls = document.querySelectorAll(
    "div[data-checkoutIdCart]"
  );
  checkoutCartDeleteButtonsEls.forEach((deleteBtnEl) => {
    const productId = deleteBtnEl.dataset.checkoutidcart;
    deleteBtnEl.addEventListener("click", () => {
      deleteFromCheckoutCart(productId);
    });
  });
}

function increaseCartItem(productId) {
  let cart = getCart();

  const index = indexInCart(cart, productId);
  if (index < 0) return;
  cart[index].amount += 1;
  updateCartAcross(cart);
}

function checkoutIncreaseCartItem(productId) {
  let cart = getCart();
  const index = indexInCart(cart, productId);
  if (index < 0) return;
  cart[index].amount += 1;
  updateCartAcrossCheckout(cart);
}

function decreaseCartItem(productId) {
  let cart = getCart();

  const index = indexInCart(cart, productId);
  if (index < 0) return;
  if (cart[index].amount > 1) {
    cart[index].amount -= 1;
    updateCartAcross(cart);
  }
}

function checkoutDecreaseCartItem(productId) {
  let cart = getCart();
  const index = indexInCart(cart, productId);
  if (index < 0) return;
  if (cart[index].amount > 1) {
    cart[index].amount -= 1;
    updateCartAcrossCheckout(cart);
  }
}

function setCartIncreaseButtonActions() {
  const cartIncreaseButtonEls = document.querySelectorAll(
    "div[data-cartIncrease]"
  );
  cartIncreaseButtonEls.forEach((increaseBtnEl) => {
    const productId = increaseBtnEl.dataset.cartincrease;
    increaseBtnEl.addEventListener("click", () => {
      increaseCartItem(productId);
    });
  });
}

function setCheckoutCartIncreaseButtonActions() {
  const checkoutCartIncreaseButtonEls = document.querySelectorAll(
    "div[data-checkoutCartIncrease]"
  );
  checkoutCartIncreaseButtonEls.forEach((increaseBtnEl) => {
    const productId = increaseBtnEl.dataset.checkoutcartincrease;
    increaseBtnEl.addEventListener("click", () => {
      checkoutIncreaseCartItem(productId);
    });
  });
}

function setCheckoutCartDecreaseButtonActions() {
  const checkoutCartDecreaseButtonEls = document.querySelectorAll(
    "div[data-checkoutCartDecrease]"
  );
  checkoutCartDecreaseButtonEls.forEach((decreaseBtnEl) => {
    const productId = decreaseBtnEl.dataset.checkoutcartdecrease;
    decreaseBtnEl.addEventListener("click", () => {
      checkoutDecreaseCartItem(productId);
    });
  });
}

function setCartDecreaseButtonActions() {
  const cartDecreaseButtonEls = document.querySelectorAll(
    "div[data-cartDecrease]"
  );
  cartDecreaseButtonEls.forEach((decreaseBtnEl) => {
    const productId = decreaseBtnEl.dataset.cartdecrease;
    decreaseBtnEl.addEventListener("click", () => {
      decreaseCartItem(productId);
    });
  });
}

function renderCheckoutCartItem(cart) {
  const checkoutCartContentEl = document.getElementById("checkout-cart-items");
  if (cart.length < 1) {
    checkoutCartContentEl.innerHTML = `
      <div>Cart is empty</div>
    `;
    return;
  }
  let result = "";
  cart.forEach((cartItem) => {
    const totalPrice = cartItem.amount * cartItem.unitPrice;
    result += `
      <div class="checkout__cart-item">
        <div class="checkout__cart-item-counter">
          <div
            class="checkout__cart-item-increase"
            data-checkoutCartIncrease=${cartItem.id}
          >
            <i class="ri-arrow-up-line"></i>
          </div>
          <div class="checkout__cart-item-currentcount">${cartItem.amount}</div>
          <div
            class="checkout__cart-item-decrease"
            data-checkoutCartDecrease=${cartItem.id}
          >
            <i class="ri-arrow-down-line"></i>
          </div>
        </div>
        <div class="checkout__cart-item-image">
          <img
            src=${cartItem.imageUrl}
          />
        </div>
        <div class="checkout__cart-item-info">
          <div class="checkout__cart-item-title">
            ${cartItem.name}
          </div>
          <div class="checkout__cart-item-subinfo">
            ৳${cartItem.unitPrice} / ${cartItem.unit}
          </div>
        </div>
        <div class="checkout__cart-item-cost">৳ ${totalPrice}</div>
        <div
          class="checkout__cart-item-delete"
          data-checkoutIdCart=${cartItem.id}
        >
          <i class="ri-delete-bin-6-line"></i>
        </div>
      </div>
    `;
  });
  checkoutCartContentEl.innerHTML = result;
  renderCheckoutOrderSummary(cart);
  setCheckoutCartDeleteButtonActions();
  setCheckoutCartIncreaseButtonActions();
  setCheckoutCartDecreaseButtonActions();
}

function renderCartItems(cart) {
  const cartContentEl = document.getElementById("cart-content");
  const itemTopCountEl = document.getElementById("item-top-count");
  itemTopCountEl.innerHTML = `${cart.length} item${cart.length > 1 ? "s" : ""}`;

  let result = "";
  cart.forEach((cartItem) => {
    const totalPrice = cartItem.amount * cartItem.unitPrice;
    result += `
      <div class="cart__item">
        <div class="cart__item-counter">
          <div class="cart__item-increase" data-cartIncrease=${cartItem.id}>
            <i class="ri-arrow-up-line"></i>
          </div>
          <div class="cart__item-currentcount">${cartItem.amount}</div>
          <div class="cart__item-decrease"  data-cartDecrease=${cartItem.id}>
            <i class="ri-arrow-down-line"></i>
          </div>
        </div>
        <div class="cart__item-image">
          <img
            src=${cartItem.imageUrl}
          />
        </div>
        <div class="cart__item-info">
          <div class="cart__item-title">${cartItem.name}</div>
          <div class="cart__item-subinfo">৳${cartItem.unitPrice} / ${cartItem.unit}</div>
        </div>
        <div class="cart__item-cost">৳ ${totalPrice}</div>
        <div class="cart__item-delete" data-idCart=${cartItem.id}>
          <i class="ri-delete-bin-6-line"></i>
        </div>
      </div>
    `;
  });
  cartContentEl.innerHTML = result;
  setCartDeleteButtonActions();
  setCartIncreaseButtonActions();
  setCartDecreaseButtonActions();
}

function clearCartFromStorage() {
  localStorage.setItem("cart", JSON.stringify([]));
}

export {
  getTargetSegment,
  setCurrentInnerNavigations,
  getQueryValueByParam,
  getCategoryUrlByCategoryId,
  addToCart,
  setCartItemCountInNav,
  getCart,
  renderCartItems,
  renderCheckoutCartItem,
  clearCartFromStorage,
};

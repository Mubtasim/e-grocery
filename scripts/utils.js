import {
  CATEGORY_QUERY,
  CATEGORY_URL_SEGMENT,
  POSSIBLE_URL_SEGMENTS,
  PRODUCTS_URL_SEGMENT,
  PRODUCT_DETAILS_URL_SEGMENT,
} from "./constants.js";
import { getCategoryById } from "./service.js";

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
    result += `
        <div class="innerNavigation__item">
            ${
              idx > 0
                ? '<i class="ri-arrow-right-s-line innerNavigation__arrow"></i>'
                : ""
            }
            <a href=${navigation.url} class="innerNavigation__link">${
      navigation.navName
    }</a>
        </div>
    `;
  });
  result = `<section class="section innerNavigation">${result}</section>`;
  return result;
}

async function setCurrentInnerNavigations(targetSegment) {
  let innerNavigations;
  const categoriesUrl = `/pages/${CATEGORY_URL_SEGMENT}`;
  if (targetSegment === PRODUCTS_URL_SEGMENT) {
    const categoryId = getQueryValueByParam(CATEGORY_QUERY);
    const categoryUrl = `/pages/${PRODUCTS_URL_SEGMENT}/index.html?${CATEGORY_QUERY}=${categoryId}`;
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
  }
  if (innerNavigations.length > 0) {
    const innerContainerEl = document.getElementById("inner-container");
    const result = getNavigationHTML(innerNavigations);
    innerContainerEl.innerHTML = result + innerContainerEl.innerHTML;
  }
}

export { getTargetSegment, setCurrentInnerNavigations, getQueryValueByParam };
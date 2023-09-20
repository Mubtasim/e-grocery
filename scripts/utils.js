import { POSSIBLE_URL_SEGMENTS } from "./constants.js";

function getTargetSegment(currentSegments) {
  let targetSegment = "";
  currentSegments.forEach((segment) => {
    if (POSSIBLE_URL_SEGMENTS.includes(segment)) targetSegment = segment;
  });
  return targetSegment;
}

export { getTargetSegment };

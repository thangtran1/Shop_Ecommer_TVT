import { useMemo } from "react";
import { generateRange } from "ultils/helper";
const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = process.env.REACT_APP_PRODUCT_PER_PAGE || 10;
    const paginationCount = Math.ceil(totalProductCount / pageSize);

    const totalPaginationItem = siblingCount + 5;
    if (totalPaginationItem >= paginationCount) {
      return generateRange(1, paginationCount);
    }
    const isShowLeftDots = currentPage - siblingCount > 2;
    const isShowRightDots = currentPage + siblingCount < paginationCount - 2;

    if (isShowLeftDots && !isShowRightDots) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, "...", ...rightRange, "...", paginationCount];
      //   return [1, "DOTS", ...rightRange];
    }

    if (!isShowLeftDots && isShowRightDots) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, "...", paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (siblingLeft && siblingRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [1, "...", ...middleRange, "...", paginationCount];
    }
  }, [totalProductCount, currentPage, siblingCount]);

  return paginationArray;
};

export default usePagination;

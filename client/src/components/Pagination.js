import React from "react";
import usePagination from "hooks/usePagination";
import PagiItem from "./PagiItem";
import { useSearchParams } from "react-router-dom";
const Pagination = ({
  totalCounts = 66,
  currentPage = 1,
  siblingCount = 1,
  category,
}) => {
  const paginationArray = usePagination(totalCounts, currentPage, siblingCount);
  const [params] = useSearchParams();
  const pageSize = +process.env.REACT_APP_PRODUCTS_PER_PAGE || 10;
  const currentPageFromURL = +params.get("page") || 1;
  return (
    <div className="flex items-center gap-2 w-main justify-between">
      <span className="text-sm text-gray-500 italic">
        {totalCounts > 0
          ? `Show products ${
              (currentPageFromURL - 1) * pageSize + 1
            } - ${Math.min(
              currentPageFromURL * pageSize,
              totalCounts
            )} of ${totalCounts}`
          : "No products available"}
      </span>

      <div className="flex items-center gap-2 ">
        {paginationArray?.map((pageNumber) => (
          <PagiItem
            category={category}
            key={pageNumber}
            pageNumber={pageNumber}
            currentPage={currentPageFromURL}
          >
            {pageNumber}
          </PagiItem>
        ))}
      </div>
    </div>
  );
};
export default Pagination;

import React from "react";
import { useSearchParams, createSearchParams } from "react-router-dom";
import withBase from "hocs/withBase";
const PagiItem = ({ pageNumber, navigate, location }) => {
  const [params] = useSearchParams();
  const handleClick = () => {
    const queries = Object.fromEntries([...params.entries()]);
    queries.page = pageNumber;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  const currentPageFromURL = +params.get("page") || 1;
  return (
    <button
      className={`w-12 h-12 flex items-center justify-center px-2 py-1 border hover:bg-gray-100 border-gray-200 rounded-md ${
        currentPageFromURL === +pageNumber ? "rounded-full bg-gray-300" : ""
      }`}
      onClick={handleClick}
      type="button"
      disabled={pageNumber === currentPageFromURL}
    >
      {pageNumber}
    </button>
  );
};
export default withBase(PagiItem);

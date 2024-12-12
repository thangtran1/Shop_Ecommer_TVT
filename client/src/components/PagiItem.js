import React from "react";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
const PagiItem = ({ pageNumber, currentPage, category }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const handleClick = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];

    queries.page = pageNumber;

    navigate({
      pathname: `/${category}`,
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

export default PagiItem;

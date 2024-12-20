import React, { memo, useState, useEffect } from "react";
import icons from "ultils/icons";
import { colors } from "ultils/constants";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "apis";
import { useDebounce } from "hooks";
import { toast } from "react-toastify";
const { FaChevronDown } = icons;

// Hàm helper để lấy queries từ params
const getQueriesFromParams = (params) => {
  const queries = {};
  for (let i of params.entries()) {
    queries[i[0]] = i[1];
  }
  return queries;
};

const SearchItem = ({
  name,
  activeClick,
  changeActiveClick,
  type = "checkbox",
}) => {
  const [selected, setSelected] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [params] = useSearchParams();
  const [fromPrice, setFromPrice] = useState({ from: "", to: "" });
  const navigate = useNavigate();
  const { category } = useParams();

  const debouncePriceFrom = useDebounce(fromPrice.from, 500);
  const debouncePriceTo = useDebounce(fromPrice.to, 500);

  // Xử lý color filter
  useEffect(() => {
    const queries = getQueriesFromParams(params);
    if (selected.length > 0) {
      queries.color = selected.join(",");
    } else {
      delete queries.color;
    }
    queries.page = 1;

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);

  // Xử lý price filter
  useEffect(() => {
    if (
      debouncePriceFrom ||
      debouncePriceTo ||
      (fromPrice.from === "" && fromPrice.to === "")
    ) {
      const queries = getQueriesFromParams(params);
      // Lọc bỏ các params price cũ
      Object.keys(queries).forEach((key) => {
        if (["from", "to", "price", "gte", "lte"].includes(key)) {
          delete queries[key];
        }
        queries.page = 1;
      });

      if (debouncePriceFrom) queries.from = debouncePriceFrom;
      if (debouncePriceTo) queries.to = debouncePriceTo;

      navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString(),
      });
    }
  }, [debouncePriceFrom, debouncePriceTo, fromPrice]);

  // Fetch max price
  useEffect(() => {
    if (type === "input") {
      apiGetProducts({ sort: "-price", limit: 1 }).then((response) => {
        if (response.success) setMaxPrice(response.products[0].price);
      });
    }
  }, [type]);

  // Validate price
  useEffect(() => {
    let updatedFromPrice = { ...fromPrice };

    // Kiểm tra 'from' lớn hơn 'to'
    if (fromPrice.from > fromPrice.to && fromPrice.to) {
      toast.error("'From' không được lớn hơn 'To'!");
      updatedFromPrice.from = fromPrice.to;
    }

    // Kiểm tra 'from' lớn hơn maxPrice
    if (fromPrice.from > maxPrice) {
      toast.error("Giá trị 'from' không được vượt quá giá trị tối đa!");
      updatedFromPrice.from = maxPrice;
    }

    // Kiểm tra 'to' lớn hơn maxPrice
    if (fromPrice.to > maxPrice) {
      toast.error("Giá trị 'to' không được vượt quá giá trị tối đa!");
      updatedFromPrice.to = maxPrice;
    }

    // Cập nhật giá trị mới nếu cần
    if (
      updatedFromPrice.from !== fromPrice.from ||
      updatedFromPrice.to !== fromPrice.to
    ) {
      setFromPrice(updatedFromPrice);
    }
  }, [fromPrice.from, fromPrice.to, maxPrice]);

  const handleClear = (e) => {
    e.stopPropagation();
    if (type === "checkbox") {
      setSelected([]);
    } else if (type === "input") {
      setFromPrice({ from: "", to: "" });
      const queries = getQueriesFromParams(params);
      Object.keys(queries).forEach((key) => {
        if (["from", "to", "price", "gte", "lte"].includes(key)) {
          delete queries[key];
        }
      });
      queries.page = 1;
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString(),
      });
    }
  };

  const handleChangeSelected = (e) => {
    e.stopPropagation();
    setSelected((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((el) => el !== e.target.value)
        : [...prev, e.target.value]
    );
  };
  return (
    <div
      className="cursor-pointer p-3 text-gray-500 gap-5 relative border border-gray-300 
    flex justify-between items-center rounded-md
    hover:border-blue-500 hover:shadow-md 
    transition-all duration-300 ease-in-out
    bg-white"
      onClick={() => changeActiveClick(name)}
    >
      <span className="capitalize font-medium">{name}</span>
      <FaChevronDown
        className={`transition-transform duration-300 ${
          activeClick === name ? "rotate-180" : ""
        }`}
      />
      {activeClick === name && (
        <div
          className="m-w-[150px] top-[calc(100%+1px)] absolute left-0 z-10 w-fit
        animate-slideDown"
        >
          {type === "checkbox" && (
            <div className="p-4 items-center bg-white border border-gray-300 rounded-md">
              <div className=" gap-8 items-center flex justify-between  ">
                <span className="whitespace-nowrap ">{`${selected.length} selected`}</span>
                <span
                  onClick={handleClear}
                  className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-all duration-200 font-medium"
                >
                  Clear
                </span>
              </div>
              <div className="mt-4 w-[calc(100%+32px)] -ml-4 border-t border-gray-200"></div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col"
              >
                {colors.map((el) => (
                  <div
                    key={el}
                    className="flex items-center gap-4 mt-2 p-2 rounded-md
                  hover:bg-gray-50 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      id={el}
                      value={el}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleChangeSelected(e);
                      }}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                      className="w-4 h-4 text-blue-600 bg-gray-100 
                     border-gray-300 rounded 
                   focus:ring-blue-500 focus:ring-2
                transition-all duration-200
                cursor-pointer"
                    />
                    <label
                      className="capitalize text-gray-600 cursor-pointer select-none
                hover:text-blue-500 transition-colors duration-200"
                      htmlFor={el}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className=" gap-8 items-center flex justify-between  ">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(maxPrice);
                  }}
                  className="whitespace-nowrap "
                >{`The highest price is ${maxPrice.toLocaleString()} VND`}</span>
                <span
                  onClick={handleClear}
                  className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-all duration-200 font-medium"
                >
                  Clear
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    className="form-input"
                    type="number"
                    id="from"
                    value={fromPrice.from}
                    onChange={(e) =>
                      setFromPrice((prev) => ({
                        ...prev,
                        from: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    className="form-input"
                    type="number"
                    id="to"
                    value={fromPrice.to}
                    onChange={(e) =>
                      setFromPrice((prev) => ({
                        ...prev,
                        to: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);

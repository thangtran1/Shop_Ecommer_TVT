import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "apis/product";
import Masonry from "react-masonry-css";
import { InputSelectFilter, Pagination, SearchItem, Product } from "components";
import { sortOptions } from "ultils/constants";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(false);
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(sortOptions[0].value);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (queries) => {
    if (category && category !== "products") queries.category = category;
    const response = await apiGetProducts({ ...queries });
    if (response.success) {
      setProducts(response);
    }
  };
  console.log(products, "products");

  useEffect(() => {
    const queries = Object.fromEntries([...searchParams.entries()]);
    let priceQuery1 = {};
    if (queries.to && queries.from) {
      priceQuery1 = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    }

    const q = { ...queries, ...priceQuery1 };
    const pageFromURL = +queries.page || 1;
    setCurrentPage(pageFromURL);

    fetchProducts(q);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchParams]);

  const changeActiveClick = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null);
      } else {
        setActiveClick(name);
      }
    },
    [activeClick]
  );

  const changeValue = useCallback((value) => {
    setSort(value);
  }, []);

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort, page: 1 }).toString(),
      });
    }
  }, [category, navigate, sort]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({ ...searchParams, page }).toString(),
    });
  };

  return (
    <div className="w-full">
      <div className="w-main border p-4 flex justify-between mt-8 mx-auto">
        <div className="w-4/5 flex-auto flex flex-col  gap-4 ">
          <span className="text-sm font-semibold">Filter by</span>
          <div className="flex items-center gap-3">
            <SearchItem
              name="price"
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
              type="input"
            />
            <SearchItem
              name="color"
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
            />

            <SearchItem
              name="size"
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
            />
            <SearchItem
              name="brand"
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
            />
            <SearchItem
              name="category"
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
            />
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-2">
          <span className="text-sm font-semibold">Sort by</span>
          <div className="w-full">
            <InputSelectFilter
              value={sort}
              changeValue={changeValue}
              options={sortOptions}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 w-main mx-auto  ">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {products?.products?.map((el) => (
            <Product key={el._id} productData={el} normal={true} pid={el._id} />
          ))}
        </Masonry>
      </div>
      <div className=" w-main mx-auto my-4 flex justify-end  ">
        <Pagination
          category={category}
          totalCounts={products?.counts}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { apiGetProductDetail } from "../../apis/product";
import { Breadcrumb } from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const DetailProduct = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  console.log("product", product);
  const fetchProductDetail = useCallback(async () => {
    const response = await apiGetProductDetail(pid);
    if (response.success) {
      setProduct(response.productData);
    }
  }, [pid]);
  useEffect(() => {
    if (pid) fetchProductDetail();
  }, [pid, fetchProductDetail]);
  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3>{title}</h3>
          <Breadcrumb title={title} category={product?.category} />
        </div>
      </div>
      <div className="w-main mx-auto mt-4 flex">
        <div className=" flex flex-col gap-4 w-2/5">
          <div className="w-[458px] h-[458px] border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: product?.images[0],
                },
                largeImage: {
                  src: product?.images[0],
                  width: 1800,
                  height: 1500,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider
              className="image flex flex-2 justify-between -mx-2"
              {...settings}
            >
              {product?.images.map((el) => (
                <div className="flex-1 p-1 " key={el}>
                  <img
                    src={el}
                    alt="img-detail"
                    className="h-[143px] w-full object-cover cursor-pointer hover:opacity-90 border-solid border border-gray-200"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="border-purple-950 border  w-2/5">price</div>
        <div className="border-red-500 border w-1/5">inforation</div>
      </div>
      <div className="h-[500px] w-full bg-gray-100"></div>
    </div>
  );
};

export default DetailProduct;

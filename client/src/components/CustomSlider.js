import React from "react";
import Slider from "react-slick";
import { Product } from ".";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};
const CustomSlider = ({ products, activedTab, normal }) => {
  return (
    <div>
      {products && (
        <Slider className="custom-slider" {...settings}>
          {products?.map((el) => (
            <Product
              key={el._id}
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
              normal={normal}
              discountPercentage={el.discountPercentage}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};
export default CustomSlider;

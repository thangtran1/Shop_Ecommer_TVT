import React from "react";
import banner from "assets/banner3.png";
import withBase from "hocs/withBase";
const Banner = () => {
  return (
    <div className="w-full ">
      <img
        src={banner}
        alt="banner"
        className="w-full h-[400px]  object-cover]"
      />
    </div>
  );
};
export default withBase(Banner);

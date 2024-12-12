import React, { memo } from "react";
import icons from "ultils/icons";

const { MdOutlineMail } = icons;
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main  flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">
              Sign up to Newsletter
            </span>
            <small className="text-[13px] text-gray-300">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className=" w-full  p-4 pr-0 outline-none rounded-l-full  bg-[#F04646] text-gray-100 placeholder:text-sm placeholder:opacity-50  placeholder:text-gray-200 placeholder:italic  "
              type="text"
              placeholder="Your email address"
            />
            <div className="h-[56px] w-[56px] text-white flex items-center justify-center bg-[#F04646] rounded-r-full">
              <MdOutlineMail size={16} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] flex items-center justify-center w-full bg-gray-800  ">
        <div className="w-main flex  text-white text-[13px]">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px]  text-[15px] font-medium border-l-2 border-main pl-[15px]">
              About Us
            </h3>

            <span>
              <span>Address: </span>
              <span className="opacity-50">
                474 Ontario St Toronto, ON M4X 1M7 Canada
              </span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="opacity-50">(+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-50">tadathemes@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px]  text-[15px] font-medium border-l-2 border-main pl-[15px]">
              Information
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contact</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px]  text-[15px] font-medium border-l-2 border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px]  text-[15px] font-medium border-l-2 border-main pl-[15px]">
              #DigitalWorldStore
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);

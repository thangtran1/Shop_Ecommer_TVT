import React, { useEffect, useState } from "react";
import { apiGetBlogDetail } from "apis/blogs";
import { useParams } from "react-router-dom";
import Breadcrumb from "components/Breadcrumb";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import { Link } from "react-router-dom";

const DetailBlog = () => {
  const { bid } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);

  useEffect(() => {
    apiGetBlogDetail(bid)
      .then((res) => {
        console.log("API Response:", res);
        setBlogDetail(res);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, [bid]);

  return (
    <>
      <div className="h-[81px] w-full flex items-center justify-center bg-gray-100 shadow-lg">
        <div className="w-main">
          <Breadcrumb category="Blogs" title={blogDetail?.result?.title} />
        </div>
      </div>
      <div className="w-main flex gap-5 items-center py-4 text-sm text-gray-700">
        <span>By Tada Theme </span>
        <MdOutlineNavigateNext size={20} />
        <span>
          {new Date(blogDetail?.result?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <MdOutlineNavigateNext size={20} />
        <span>{`${blogDetail?.result?.numberView} views`} </span>
      </div>
      <div className="w-main">
        <div className="w-full">
          <img
            className="w-full h-[600px] object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            src={blogDetail?.result?.image}
            alt="blogDetail"
          />
        </div>
      </div>
      <div className="w-main py-5">
        <div className="text-lg text-gray-800 leading-relaxed">
          {blogDetail?.result?.description}
        </div>
        <div className="flex gap-3 my-6">
          <span className="flex border border-gray-300 rounded-md px-4 py-2 items-center gap-2 text-gray-700 hover:bg-blue-100 transition duration-200">
            Facebook
            <FaFacebookF />
          </span>
          <span className="flex border border-gray-300 rounded-md px-4 py-2 items-center gap-2 text-gray-700 hover:bg-blue-100 transition duration-200">
            Twitter
            <FaTwitter />
          </span>
          <span className="flex border border-gray-300 rounded-md px-4 py-2 items-center gap-2 text-gray-700 hover:bg-blue-100 transition duration-200">
            Pinterest
            <FaPinterestP />
          </span>
        </div>
      </div>
      <div className="w-main mb-8">
        <Link
          to={`/blogs`}
          className="flex font-['slick'] uppercase justify-end gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="flex hover:text-main gap-2 text-gray-700">
            <IoIosArrowRoundBack size={24} />
            <span className="text-sm">Back to Blogs</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default DetailBlog;

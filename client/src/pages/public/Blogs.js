import React, { useEffect, useState } from "react";
import { apiGetBlogs } from "apis";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useLocation } from "react-router-dom";
import { CiCalendarDate, CiEdit } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
import detailBlog from "assets/detailBlog.png";
import Breadcrumb from "components/Breadcrumb";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await apiGetBlogs();
      if (response?.success) {
        setBlogs(response.Blogs);
        setRecentArticles(response.Blogs.slice(0, 5));
      }
    };
    fetchBlogs();
  }, []);

  // Cấu hình slider
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {location.pathname === "/" ? (
        <div className="shadow-lg rounded-lg w-main blogs-container mx-auto mt-5">
          <h2 className="text-2xl pt-3 font-bold text-center">Latest Blogs</h2>
          <div>
            <Slider className="blog-slider" {...sliderSettings}>
              {blogs.map((blog) => (
                <div key={blog._id} className="blog-card px-3 pb-4 ">
                  <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
                    <Link
                      className="flex flex-col gap-4 text-center"
                      to={`/blogs/${blog._id}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="object-cover w-full h-[200px]"
                      />
                      <h3 className="text-[18px] text-[#2e2e2e] h-[56px] font-semibold mb-2 ">
                        {blog.title}
                      </h3>
                    </Link>
                    <div className="p-4 h-[135px]">
                      <div className="flex justify-between">
                        <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                          <CiCalendarDate size={20} />
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                          <CiEdit size={20} />
                          {new Date(blog.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      <p className="text-gray-700 line-clamp-3">
                        {blog.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full h-[81px] flex items-center justify-center bg-gray-100">
            <div className="w-main">
              <h3 className="font-semibold uppercase">Blogs</h3>
              <Breadcrumb
                category={location?.pathname
                  ?.split("/", "")
                  ?.slice("-")
                  ?.join(" ")}
              />
            </div>
          </div>
          <div className=" w-main blogs-container mx-auto mt-5">
            <h2 className="text-2xl pt-3 font-bold text-center">
              Latest Blogs
            </h2>
            <div className="flex bg-white">
              <div className="flex-7 shadow-lg rounded-lg">
                {blogs.map((blog) => (
                  <div key={blog._id} className="blog-card px-3 pb-4 ">
                    <div className="border flex rounded-lg overflow-hidden shadow-lg bg-white">
                      <div className="flex-4">
                        <Link
                          className="flex flex-col gap-4 text-center"
                          to={`/blogs/${blog._id}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="object-cover rounded-lg mx-auto w-[420px] h-[280px]"
                          />
                        </Link>
                      </div>
                      <div className="p-4 h-[135px] flex-6">
                        <div className="pb-3">
                          <Link
                            onClick={() => window.scrollTo(0, 0)}
                            to={`/blogs/${blog._id}`}
                            className="text-[18px] text-[#2e2e2e] h-[56px] font-semibold mb-2 hover:text-main"
                          >
                            {blog.title}
                          </Link>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                            <CiCalendarDate size={20} />
                            {new Date(blog.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                            <CiEdit size={20} />
                            {new Date(blog.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <p className="text-gray-700 line-clamp-7">
                          {blog.description}
                        </p>
                        <Link
                          to={`/blogs/${blog._id}`}
                          className="text-main mt-[-10px] hover:text-black hover:underline text-sm flex items-center gap-2"
                        >
                          Read More <BsArrowRight size={17} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-2 flex flex-col h-fit">
                <div className="text-2xl bg-main font-semibold p-4 text-white rounded-t-lg shadow-md">
                  Recent Articles
                </div>
                <div className="rounded-b-lg ">
                  <div className="flex flex-col gap-6">
                    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
                      {recentArticles.map((article) => (
                        <div
                          key={article._id}
                          className="p-4 border-b hover:bg-gray-50 transition duration-200"
                        >
                          <Link
                            to={`/blogs/${article._id}`}
                            className="  text-[#1c1d1d] hover:text-main"
                          >
                            {article.title}
                          </Link>
                          <p className="text-gray-500 text-sm mt-1">
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={detailBlog}
                        alt="detailBlog"
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Blogs;

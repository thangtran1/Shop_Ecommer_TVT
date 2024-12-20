import React, { memo, useState } from "react";
import { tabs } from "ultils/constants";
import { Votebar, Buttons, VoteOptions, CommentDetail } from "../index";
import { renderStarFromNumber } from "ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appReducer";
import { apiRatings } from "apis";
import Swal from "sweetalert2";
import path from "ultils/path";
import { useNavigate } from "react-router-dom";
const DetailInformation = ({
  totalRatings,
  totalCount,
  nameProduct,
  pid,
  ratings,
  reRender,
  images,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleSubmitVoteOptions = async (formData) => {
    if (!formData.get("star") || !formData.get("comment") || !pid) {
      alert("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiRatings(formData);
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Đánh giá sản phẩm thành công!",
          positionL: "middle-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        reRender();
        dispatch(
          showModal({
            isShowModal: false,
            modalChildren: null,
          })
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.msg || "Có lỗi xảy ra, vui lòng thử lại!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoteNow = () => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " Please login to vote",
        confirmButtonText: "Login",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
      return;
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOptions
              nameProduct={nameProduct}
              handleSubmitVoteOptions={handleSubmitVoteOptions}
              pid={pid}
              images={images}
              isLoading={isLoading}
            />
          ),
        })
      );
    }
  };
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {tabs.map((el) => (
          <span
            onClick={() => setActiveTab(el.id)}
            className={`p-2 px-4 text-sm font-medium cursor-pointer
              transition-all duration-200 hover:bg-gray-200
              ${
                el.id === activeTab
                  ? "text-black bg-white border border-gray-300 font-medium"
                  : "bg-gray-100 hover:text-gray-800"
              }`}
            key={el.id}
          >
            {el.value}
          </span>
        ))}
      </div>
      <div className="w-full  border p-4">
        <div
          key={activeTab}
          className="animate-fade-in transition-all duration-300 ease-in-out"
          dangerouslySetInnerHTML={{
            __html: tabs.find((el) => el.id === activeTab)?.content,
          }}
        />
      </div>

      <div className="flex flex-col py-8  w-main">
        <span className="p-2 px-4 text-sm font-medium cursor-pointer transition-all border border-gray-200 border-b-2 hover:bg-gray-100  hover:text-gray-800">
          CUSTOMER REVIEW
        </span>
        <div className="flex-4 flex">
          <div className="flex-4 border flex flex-col  justify-center items-center border-red-700">
            <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
            <span className="flex  items-center gap-1">
              {renderStarFromNumber(totalRatings)?.map((el, index) => (
                <span key={index}>{el} </span>
              ))}
            </span>
            <span className="text-sm">{`${ratings?.length} reviews and commentors`}</span>
          </div>
          <div className="flex-6 p-4 border gap-2 flex flex-col border-yellow-700">
            {Array.from(Array(5).keys())
              .reverse()
              .map((starNumber) => (
                <Votebar
                  key={starNumber}
                  number={starNumber + 1}
                  ratingTotal={ratings?.length || 0}
                  ratingsCount={
                    ratings?.filter((rating) => rating.star === starNumber + 1)
                      ?.length || 0
                  }
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col items-center p-4 justify-center text-sm">
          <span>Do you want to rate this product?</span>
          <Buttons
            handleOnclick={() => {
              handleVoteNow();
            }}
          >
            Vote now
          </Buttons>
        </div>
        <div className="flex flex-col gap-4">
          {ratings?.map((el) => (
            <CommentDetail
              key={el._id}
              image={el?.postedBy?.avatar}
              name={`${el?.postedBy?.firstname} ${el?.postedBy?.lastname}`}
              star={el?.star}
              comment={el?.comment}
              createdAt={el?.createdAt}
              postedBy={el?.postedBy}
              images={el?.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(DetailInformation);

import React, { memo, useRef, useEffect, useState } from "react";
import { voteOptions } from "ultils/constants";
import { FaStar } from "react-icons/fa";
import Buttons from "../Buttons";
import { useDispatch } from "react-redux";
import { showModal } from "store/app/appReducer";
import icon_comment from "assets/icon_comment.png";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
const VoteOptions = ({
  nameProduct,
  handleSubmitVoteOptions,
  pid,
  isLoading,
}) => {
  const modalRef = useRef();
  const [chooseStar, setChooseStar] = useState(null);
  const [hoverStar, setHoverStar] = useState(null);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const MAX_IMAGES = 3;
  useEffect(() => {
    modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleCloseModal = () => {
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };

  const handleSubmit = () => {
    if (!chooseStar || !comment) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (comment.length <= 15) {
      toast.warning("Lời bình luận phải có ít nhất 15 ký tự!");
      return;
    }

    const formData = new FormData();
    formData.append("star", chooseStar);
    formData.append("comment", comment);
    formData.append("pid", pid);

    images.forEach((image) => {
      formData.append("images", image);
    });

    handleSubmitVoteOptions(formData);
    handleCloseModal();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - images.length;

    if (files.length > remainingSlots) {
      alert(`Bạn chỉ có thể tải lên thêm ${remainingSlots} hình ảnh nữa`);
      // Chỉ lấy số lượng ảnh còn được phép
      const allowedFiles = files.slice(0, remainingSlots);
      setImages((prev) => [...prev, ...allowedFiles]);
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  return (
    <div
      className="bg-white flex-col gap-4 w-[700px] relative flex justify-center items-center shadow-lg rounded-lg"
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-red-500 font-medium">Đang xử lý...</span>
          </div>
        </div>
      )}
      <div className="flex p-4 items-center justify-between bg-gradient-to-r from-red-500 to-red-600 text-white w-full rounded-t-lg">
        <div className="font-semibold text-xl">Đánh giá & nhận xét</div>
        <button
          className="text-white hover:text-gray-200 text-xl"
          onClick={() =>
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
          }
        >
          ✕
        </button>
      </div>

      <div className="w-full p-6">
        <div className="p-4 flex items-center justify-start gap-4 border-b border-gray-200 bg-gray-50 rounded-lg mb-4">
          <img
            src={icon_comment}
            alt="mascot"
            className="w-24 h-24 object-contain p-2 bg-white rounded-lg shadow-sm"
          />
          <h3 className="font-medium text-lg text-gray-800">{nameProduct}</h3>
        </div>

        <div className="w-full flex flex-col gap-6 mb-6">
          <p className="text-lg font-medium text-gray-700">
            Bạn đánh giá sản phẩm này như thế nào?
          </p>
          <div className="flex justify-center gap-12 bg-gray-50 py-6 rounded-lg">
            {voteOptions.map((el) => (
              <div
                key={el.id}
                className={`flex flex-col items-center gap-3 cursor-pointer transition-all
                ${
                  chooseStar === el.id
                    ? "scale-110 transform-gpu"
                    : "hover:scale-105"
                }`}
                onClick={() => setChooseStar(el.id)}
                onMouseEnter={() => setHoverStar(el.id)}
                onMouseLeave={() => setHoverStar(null)}
              >
                <FaStar
                  size={32}
                  color={
                    Number(hoverStar || chooseStar) >= el.id
                      ? "#fbbf24"
                      : "#d1d5db"
                  }
                  className="transition-colors duration-200"
                />
                <span className="text-sm font-medium text-gray-600">
                  {el.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Xin mời chia sẻ những trải nghiệm của bạn về sản phẩm (nhập tối thiểu 15 ký tự)"
          className="form-textarea w-full h-[120px] rounded-lg p-4 border border-gray-300 
          placeholder:text-gray-500 placeholder:text-sm focus:ring-2 focus:ring-[#485fc7] focus:border-transparent
          transition-all duration-200 resize-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="mt-4 mb-4">
          {images.length < MAX_IMAGES && (
            <label
              className="inline-flex border border-dashed flex-col items-center gap-2
          rounded-lg cursor-pointer transition-colors duration-200 px-[11px] py-[7px]
          hover:bg-gray-50"
            >
              <FaCamera className="text-gray-700" />
              <span className="italic text-gray-700 text-sm">
                Thêm hình ảnh ({images.length}/{MAX_IMAGES})
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}

          {images.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 
                flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full mt-6">
          <Buttons
            fw
            isLoading={isLoading}
            handleOnclick={handleSubmit}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg
            hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium text-lg shadow-md
            hover:shadow-lg transform-gpu hover:-translate-y-0.5
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Gửi đánh giá
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default memo(VoteOptions);

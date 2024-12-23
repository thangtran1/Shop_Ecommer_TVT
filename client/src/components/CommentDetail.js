import React from "react";
import avatar from "assets/avatar_default.jpg";
import moment from "moment";
import { renderStarFromNumber } from "ultils/helper";
const CommentDetail = ({
  image = avatar,
  name = "lacdy",
  createdAt,
  comment,
  star,
  images,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-none">
        <img
          src={image}
          alt="avatar"
          className="w-[25px] h-[25px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto pb-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-xs text-gray-500 italic">
            {moment(createdAt)?.fromNow()}
          </span>
        </div>
        <div className="flex flex-col gap-2 pl-4 text-sm mt-4 border-2 border-gray-300 py-2 bg-gray-100 rounded-lg">
          <span className="flex items-center gap-2">
            <span className="font-semibold">Vote</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(star)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold">Đánh giá:</span>
            <span className="flex items-center gap-1">{comment}</span>
          </span>
          {images?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images?.map((el, index) => (
                <div key={index} className="relative group">
                  <img
                    src={el}
                    alt={`comment-image-${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(el, "_blank")}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentDetail;

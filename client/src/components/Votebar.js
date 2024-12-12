import React, { useRef, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
const Votebar = ({ number, ratingsCount, ratingTotal }) => {
  const percenRef = useRef();
  useEffect(() => {
    const percentage = Math.round((ratingsCount * 100) / ratingTotal) || 0;
    percenRef.current.style.cssText = `right: ${100 - percentage}%`;
  }, [ratingsCount, ratingTotal]);
  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="w-[75%]">
        <div className="w-full relative h-[6px] bg-gray-200 rounded-l-full rounded-r-full overflow-hidden">
          <div ref={percenRef} className="absolute inset-0 bg-red-500 "></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end text-xs text-400">{`${ratingsCount} reviewers`}</div>
    </div>
  );
};

export default Votebar;

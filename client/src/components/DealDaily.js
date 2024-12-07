import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
import { formatMoney, renderStarFromNumber } from "../ultils/helper";
import CountDown from "./CountDown";

const { MdOutlineStar, IoMdMenu } = icons;
let interval;
const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hours, setHours] = useState(() => {
    const saved = localStorage.getItem("dealDaily");
    if (saved) {
      const { hours } = JSON.parse(saved);
      return hours || 23;
    }
    return 23;
  });
  const [minutes, setMinutes] = useState(() => {
    const saved = localStorage.getItem("dealDaily");
    if (saved) {
      const { minutes } = JSON.parse(saved);
      return minutes || 59;
    }
    return 59;
  });
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem("dealDaily");
    if (saved) {
      const { seconds } = JSON.parse(saved);
      return seconds || 59;
    }
    return 59;
  });
  const [expiredTime, setExpiredTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    if (response.success) {
      setDealDaily(response.products[0]);
      // Lưu sản phẩm và thời gian vào localStorage
      localStorage.setItem(
        "dealDaily",
        JSON.stringify({
          product: response.products[0],
          hours: 23,
          minutes: 59,
          seconds: 59,
          timestamp: new Date().getTime(),
        })
      );
      setHours(23);
      setMinutes(59);
      setSeconds(59);
      setExpiredTime(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem có deal đã lưu không
    const savedDeal = localStorage.getItem("dealDaily");
    if (savedDeal) {
      const { product, timestamp } = JSON.parse(savedDeal);
      const currentTime = new Date().getTime();
      const timePassed = Math.floor((currentTime - timestamp) / 1000); // Số giây đã trôi qua

      // Nếu chưa hết hạn, load lại deal cũ
      if (timePassed < 24 * 60 * 60) {
        // 24 giờ tính bằng giây
        setDealDaily(product);
        // Tính toán thời gian còn lại
        const remainingSeconds = 24 * 60 * 60 - timePassed;
        const h = Math.floor(remainingSeconds / 3600);
        const m = Math.floor((remainingSeconds % 3600) / 60);
        const s = remainingSeconds % 60;
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      } else {
        // Nếu đã hết hạn, fetch deal mới
        fetchDealDaily();
      }
    } else {
      fetchDealDaily();
    }
  }, []);

  useEffect(() => {
    if (!expiredTime) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prev) => prev - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setExpiredTime(true);
          clearInterval(interval);
          // Gọi fetchDealDaily khi hết thời gian
          fetchDealDaily();
        }
        // Cập nhật localStorage mỗi giây
        const savedDeal = localStorage.getItem("dealDaily");
        if (savedDeal) {
          const dealData = JSON.parse(savedDeal);
          localStorage.setItem(
            "dealDaily",
            JSON.stringify({
              ...dealData,
              hours,
              minutes,
              seconds,
            })
          );
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, minutes, hours, expiredTime]);
  return (
    <div className="border w-full flex-auto">
      <div className="items-center flex justify-center p-4 w-full">
        <span className="flex-1 flex justify-center ">
          <MdOutlineStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-500 uppercase">
          Deal Daily
        </span>
        <span className="flex-1 "></span>
      </div>
      <div className="w-full flex pt-8 gap-2 flex-col items-center">
        <img
          src={
            dealDaily?.thumb ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s"
          }
          alt="Img Deal daily"
          className="w-full h-full object-cover"
        />
        <span className="flex h-4">
          {renderStarFromNumber(dealDaily?.totalRatings)}
        </span>
        <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
        <span>
          {dealDaily?.price !== undefined
            ? `${formatMoney(dealDaily?.price)} VND`
            : "N/A"}
        </span>
      </div>
      <div className="px-4 mt-8">
        <div className="flex justify-center items-center gap-2  mb-4">
          <CountDown unit="Hours" number={hours} />
          <CountDown unit="Minutes" number={minutes} />
          <CountDown unit="Seconds" number={seconds} />
        </div>
        <button
          type="button"
          className="py-2 flex items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium gap-2"
        >
          <IoMdMenu size={20} />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);

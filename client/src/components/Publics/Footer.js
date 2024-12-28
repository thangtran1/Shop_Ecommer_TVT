import React, { memo } from "react";
import Buttons from "components/Buttons";
import {
  policies,
  supportLines,
  paymentIcons,
  other,
  connectTVT,
} from "ultils/constants";
import schannel from "assets/IconFooter/schannel.png";
import dt from "assets/IconFooter/dt.png";
import care from "assets/IconFooter/care.png";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import QR_TVT from "assets/IconFooter/QR_TVT.png";
import AppStore from "assets/IconFooter/AppStore.png";
import ChPlay from "assets/IconFooter/ChPlay.png";
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-full flex items-center justify-center w-full bg-white shadow-lg border-t border-[#E0E0E0]   ">
        <div className="w-main flex   text-[#363636] text-[13px] mb-4 my-[25px]">
          {/* Tổng đài hỗ trợ miễn phí */}
          <div className="flex-1 flex flex-col gap-2 px-[15px] ">
            <div className="text-[16px] font-medium font-emoji text-[#363636]">
              Tổng đài hỗ trợ miễn phí
            </div>
            <div className="flex flex-col gap-2 px-[12px] font-emoji">
              {supportLines.map((line, index) => (
                <small key={index}>
                  {line.label} <b>{line.phone}</b> ({line.time})
                </small>
              ))}
            </div>

            {/* Phương thức thanh toán */}
            <div className="text-[16px] font-medium font-emoji text-[#363636]">
              Phương thức thanh toán
            </div>
            <div className="flex flex-col gap-2 px-[12px] font-emoji">
              <ul className="flex flex-wrap gap-[5px]">
                {paymentIcons.map((icon, index) => (
                  <li key={index} className="border rounded-[5px]">
                    <a href="tel:1800.2097">
                      <img src={icon} alt={`iconpayment${index + 1}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Đăng ký nhận tin khuyến mãi */}
            <div className=" text-[16px] font-medium font-emoji  text-[#363636]">
              ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI
            </div>
            <div className="flex flex-col gap-2 px-[12px] font-emoji">
              <small className="text-main font-emoji">
                (*) Nhận ngay voucher 10%
              </small>
              <small className="font-emoji">
                *Voucher sẽ được gửi sau 24h, chỉ áp dụng cho khách hàng mới
              </small>
              <Link to="/login">
                <Buttons fw>ĐĂNG KÝ NGAY</Buttons>
              </Link>
            </div>
          </div>

          {/* Thông tin và chính sách */}
          <div className="flex-1 flex flex-col gap-2 px-[15px]">
            <div className="text-[16px] font-medium font-emoji text-[#363636]">
              Thông tin và chính sách
            </div>
            <div className="flex flex-col gap-2 px-[12px] font-emoji">
              <ul className="flex flex-col">
                {policies.map((policy, index) => (
                  <li
                    key={index}
                    className="flex flex-wrap gap-[5px] font-emoji text-[13px]"
                  >
                    <a className="mb-1 hover:text-main" href="tel:1800.2097">
                      <span>{policy}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dịch vụ và thông tin khác */}
          <div className="flex-1 flex flex-col gap-2 px-[15px]">
            <div className="text-[16px] font-medium font-emoji text-[#363636]">
              Dịch vụ và thông tin khác
            </div>
            <div className="flex flex-col gap-2 px-[12px] font-emoji">
              <ul className="flex flex-col">
                {other.map((policy, index) => (
                  <li
                    key={index}
                    className="flex flex-wrap gap-[5px] font-emoji text-[13px]"
                  >
                    <a
                      className="mb-1 hover:text-main flex items-center"
                      href="tel:1800.2097"
                    >
                      <span>{policy}</span>
                      {policy === "Smember: Tích điểm & sử dụng ưu đãi" && (
                        <FaStar className="ml-2 text-yellow-500" /> // Thêm icon ở đây
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 ">
              <div className="flex-1">
                <img src={QR_TVT} alt="QR_TVT" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div>
                  <img src={AppStore} alt="AppStore" />
                </div>
                <div>
                  <img src={ChPlay} alt="ChPlay" />
                </div>
              </div>
            </div>
          </div>

          {/* Kết nối với CellphoneS */}
          <div className="flex-1 flex flex-col gap-2 px-[15px]">
            <div className=" text-[16px] font-medium font-emoji  text-[#363636]">
              Kết nối với TVT
            </div>
            <div className="flex flex-col gap-2 px-[12px] font-emoji">
              <ul className="flex flex-wrap gap-[5px]">
                {connectTVT.map((icon, index) => (
                  <li key={index} className="border rounded-[5px]">
                    <a href="tel:1800.2097">
                      <img src={icon} alt={`iconpayment${index + 1}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" text-[16px] font-medium font-emoji  text-[#363636]">
              Website một thành viên
            </div>
            <div className="mt-1 text-[16px] font-medium font-emoji  text-[#363636]">
              Hệ thống bảo hành sửa chữa Điện thoại - Máy tính
              <img src={dt} alt="dt" className="mt-1" />
            </div>
            <div className="mt-1 text-[16px] font-medium font-emoji  text-[#363636]">
              Kênh thông tin giải trí công nghệ cho giới trẻ
              <img src={schannel} alt="dt" className="mt-1" />
            </div>
            <div className="mt-1 text-[16px] font-medium font-emoji  text-[#363636]">
              Trang thông tin công nghệ mới nhất
              <img src={care} alt="dt" className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Footer);

import React, { Fragment, useState, useEffect } from "react";
import logo from "assets/logo_digital.png";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import path from "ultils/path";
import { logout } from "store/user.js/userSlice";
import Swal from "sweetalert2";
import withBase from "hocs/withBase";
import { showCart } from "store/app/appReducer";
const Header = ({ current, dispatch }) => {
  const { MdLocalPhone, MdOutlineMail, IoBagHandleOutline, FaUser } = icons;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("#dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <MdLocalPhone color="red" />
            <span className="font-semibold"> (+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <MdOutlineMail color="red" />
            <span className="font-semibold"> support@tadathemes.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div
              onClick={() => dispatch(showCart())}
              className="cursor-pointer flex items-center px-6 border-r justify-center gap-2"
            >
              <IoBagHandleOutline color="red" />
              <span>{current?.cart?.length} item(s)</span>
            </div>
            <div
              className="cursor-pointer flex px-6 items-center gap-2 relative"
              onClick={() => setIsOpen(!isOpen)}
              id="dropdown"
            >
              <FaUser color="red" />
              <span>Profile</span>
              {isOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="py-2 flex flex-col absolute top-full m-w-[140px] left-[16px] border bg-gray-100 shadow-md p-4 rounded-md"
                >
                  <Link
                    className="p-2 w-full hover:bg-gray-200"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {current?.role === "admin" && (
                    <Link
                      className="p-2 w-full hover:bg-gray-200"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin workspace
                    </Link>
                  )}
                  <span
                    onClick={handleLogout}
                    className="p-2 w-full hover:bg-gray-200"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withBase(Header);

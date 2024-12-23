import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import path from "ultils/path";
import icons from "ultils/icons";
import { useSelector } from "react-redux";
import { getCurrent } from "store/user.js/asyncAction";
import { logout, clearMessage } from "store/user.js/userSlice";
import Swal from "sweetalert2";
import withBase from "hocs/withBase";
const TopHeader = ({ dispatch, navigate, current }) => {
  const { LuLogOut } = icons;
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearMessage());
    navigate(`/${path.LOGIN}`);
  };
  const { message } = useSelector((state) => state.user);
  useEffect(() => {
    let localStorageData = window.localStorage.getItem("persist:shop/users");
    if (localStorageData) {
      const parsed = JSON.parse(localStorageData);
      const token = parsed.token?.replace(/['"]+/g, "");

      if (token && token !== "null" && token !== "undefined" && !current) {
        dispatch(getCurrent());
      }
    }
  }, [dispatch]);
  useEffect(() => {
    if (message) {
      Swal.fire("Oops!", message, "error").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
    }
  }, [message]);
  return (
    <div className="h-[38px] w-full bg-main border flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span className="">ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {current ? (
          <div className="flex items-center gap-4 text-sm">
            <small>{`Welcome ${current?.lastname} ${current?.firstname}`}</small>
            <span
              onClick={handleLogout}
              className="cursor-pointer hover:rounded-full hover:bg-gray-100 hover:text-main p-2"
            >
              <LuLogOut size={18} />
            </span>
          </div>
        ) : (
          <Link to={`/${path.LOGIN}`} className="">
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};
export default withBase(TopHeader);

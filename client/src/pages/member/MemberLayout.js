import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "ultils/path";
import { MemberSiderbar } from "components";
const MemberLayout = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || current.role !== "member") {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="flex">
      <div className="w-[20%] h-screen">
        <MemberSiderbar />
      </div>
      <div className="flex-auto bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;

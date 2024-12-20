import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "ultils/path";
import { AdminSidebar } from "components";
const AdminLayout = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || current.role !== "admin") {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="flex w-full text-black bg-gray-100 min-h-screen relative">
      <div className="w-[20%] flex-none border border-red-900 fixed top-0 bottom-0 left-0 ">
        <AdminSidebar />
      </div>
      <div className="w-[20%]"></div>
      <div className="w-[80%] flex flex-auto border border-gray-600">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

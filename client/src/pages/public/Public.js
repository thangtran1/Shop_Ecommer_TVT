import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, TopHeader, Footer } from "components";
const Public = () => {
  return (
    <div className="w-full flex flex-col items-center  justify-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex flex-col items-center">
        <Outlet />
      </div>
      <Footer />
      <div className="h-96"></div>
    </div>
  );
};

export default Public;

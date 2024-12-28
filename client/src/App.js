import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Service,
  FAQ,
  Products,
  DetailProduct,
  Blogs,
  FinalRegister,
  ResetPassword,
  DetailCart,
  DetailBlog,
} from "./pages/public";
import { Checkout } from "./pages/member";
import path from "./ultils/path";
import { apiGetCategories } from "./store/app/asyncActions";
import { useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "./components";
import Cart from "./components/Publics/Cart";
import withBase from "hocs/withBase";
import {
  AdminLayout,
  ManageProduct,
  CreateProduct,
  ManageUser,
  ManageOrder,
  Dashboard,
} from "./pages/admin";
import { MemberLayout, Personal, Wishlish, History } from "./pages/member";
function App({ dispatch }) {
  const { isShowModal, modalChildren, isShowCart } = useSelector(
    (state) => state.app
  );
  useEffect(() => {
    dispatch(apiGetCategories());
  }, [dispatch]);
  return (
    <div className="font-main h-screen">
      {isShowCart && (
        <div className="bg-overlay-right inset-0 z-50 flex justify-end">
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.CHECKOUT} element={<Checkout />}></Route>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route
            path={path.DETAIL_PRODUCT_CATEGORY_PID_TITLE}
            element={<DetailProduct />}
          ></Route>
          <Route path={path.DETAIL_BLOG} element={<DetailBlog />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route path={path.OUR_SERVICES} element={<Service />}></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />}></Route>
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
          <Route path={path.ALL} element={<Home />}></Route>
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />}></Route>
          <Route
            path={path.MANAGE_PRODUCTS}
            element={<ManageProduct />}
          ></Route>
          <Route
            path={path.CREATE_PRODUCTS}
            element={<CreateProduct />}
          ></Route>
          <Route path={path.MANAGE_USER} element={<ManageUser />}></Route>
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />}></Route>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />}></Route>
          <Route path={path.WISHLIST} element={<Wishlish />}></Route>
          <Route path={path.DETAIL_CART} element={<DetailCart />}></Route>
          <Route path={path.BUY_HISTORY} element={<History />}></Route>
        </Route>
        <Route path={path.LOGIN} element={<Login id="login" />}></Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default withBase(App);

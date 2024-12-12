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
} from "./pages/public";
import path from "./ultils/path";
import { apiGetCategories } from "./store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "./components";
function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(apiGetCategories());
  }, [dispatch]);
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route
            path={path.DETAIL_PRODUCT_CATEGORY_PID_TITLE}
            element={<DetailProduct />}
          ></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route path={path.OUR_SERVICES} element={<Service />}></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
        </Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
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

export default App;

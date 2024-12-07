// import { configureStore } from "@reduxjs/toolkit";
// import appReducer from "./app/appReducer";
// import productSlider from "./products/productSlider";
// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";
// import userSlice from "./user.js/userSlice";
// const commonConfig = {
//   key: "shop/users",
//   storage,
// };
// const userConfig = {
//   ...commonConfig,
//   whitelist: ["isLoggedIn", "token"],
// };
// export const store = configureStore({
//   reducer: {
//     app: appReducer,
//     product: productSlider,
//     user: persistReducer(userConfig, userSlice),
//   },
// });
// export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./app/appReducer";
import productSlider from "./products/productSlider";
import userSlice from "./user.js/userSlice";

// Cấu hình chung cho redux-persist
const commonConfig = {
  key: "shop/users",
  storage,
};

// Cấu hình cho user slice, chỉ lưu trữ các trường cần thiết
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token"],
};

// Tạo store
const store = configureStore({
  reducer: {
    app: appReducer,
    product: productSlider,
    user: persistReducer(userConfig, userSlice), // Sử dụng persistReducer cho user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST", // Loại trừ các action của redux-persist khỏi kiểm tra
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Tạo persistor để quản lý trạng thái lưu trữ
export const persistor = persistStore(store);

// Xuất store và persistor
export { store }; // Xuất store có tên cụ thể
export default store; // Giữ lại export mặc địn

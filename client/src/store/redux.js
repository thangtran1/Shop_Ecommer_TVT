import { configureStore, current } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./app/appReducer";
import productSlider from "./products/productSlider";
import userSlice from "./user.js/userSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const commonConfig = {
  key: "shop/users",
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "currentCart", "current"],
};

const store = configureStore({
  reducer: {
    app: appReducer,
    product: productSlider,
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export { store };
export default store;

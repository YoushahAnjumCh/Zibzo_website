import auth from "./auth/slice/authSignInSlice";
import authSignUpReducer from "./auth/slice/authSignUpSlice";
import adminAuthSlice from "./auth/slice/adminSigninSlice";
import addToCartSlice from "./cart/slice/addToCartSlice";
import fetchCartSlice from "./cart/slice/fetchCartItem";
import deleteCartSlice from "./cart/slice/deleteCartSlice";
import { configureStore } from "@reduxjs/toolkit";
import Products from "./homepage/slice/HomePageSlice";
import createSagaMiddlware from "redux-saga";

const sagaMiddleware = createSagaMiddlware();
export const store = configureStore({
  reducer: {
    auth,
    authSignUp: authSignUpReducer,
    products: Products,
    addToCartSlice,
    fetchCartSlice,
    deleteCartSlice,
    adminAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([sagaMiddleware]),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

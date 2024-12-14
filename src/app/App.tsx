import { BrowserRouter,HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { NewProduct } from "../features/presentation/backend/productupload/NewProduct";

import { UploadCategory } from "../features/presentation/backend/categoryUpload/UploadCategory";
import RequireAuth from "../core/RequiredAuth";
import store from "../features/redux/store";
import SignUpComponent from "../features/presentation/components/organisms/sign-up/SignUpComponent";
import SigninComponent from "../features/presentation/components/organisms/signIn/SigninComponent";
import HomePage from "../features/presentation/components/organisms/homepage/HomePage";
import HomePageTemplate from "../features/presentation/components/templates/homepage/HomePageTemplate";
import SignUpView from "../features/presentation/components/pages/signupView/SignUpView";
import SignInView from "../features/presentation/components/pages/signInView/SignInView";

import { AuthProvider } from "../hooks/authContext";
import CartScreen from "../features/presentation/components/organisms/cart/CartScreen";
import { CartProvider } from "../hooks/cartContext";
import UploadDataToDb from "../features/presentation/backend/uploadData/UploadDataToDb";
import { UploadHomeBanner } from "../features/presentation/backend/categoryUpload/UploadHomeBanner";
import { UploadDealoftheDay } from "../features/presentation/backend/categoryUpload/UploadDealoftheDay";
import AdminLogin from "../features/presentation/backend/adminLogin/AdminLogin";
import AdminRequireAuth from "../core/AdminRequiredAuth";
import { AdminAuthProvider } from "../hooks/adminAuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Toaster position="top-center" reverseOrder={false} />

        <Provider store={store}>
          <HashRouter>
            <Routes>
              <Route path="/signup" element={<SignUpView />}></Route>
              <Route path="/" element={<SignInView />}></Route>
              <Route
                path="/homepage"
                element={
                  <CartProvider>
                    <RequireAuth>
                      <HomePageTemplate />
                    </RequireAuth>
                  </CartProvider>
                }
              ></Route>
              <Route
                path="/cart"
                element={
                  <CartProvider>
                    <RequireAuth>
                      <CartScreen />
                    </RequireAuth>
                  </CartProvider>
                }
              ></Route>

              {/* Backend Data */}
              <Route
                path="/newProduct"
                element={
                  <AdminRequireAuth>
                    <NewProduct />
                  </AdminRequireAuth>
                }
              ></Route>

              <Route
                path="/upload"
                element={
                  <AdminRequireAuth>
                    <UploadDataToDb />
                  </AdminRequireAuth>
                }
              ></Route>

              <Route
                path="/uploadcategory"
                element={
                  <AdminRequireAuth>
                    <UploadCategory />
                  </AdminRequireAuth>
                }
              ></Route>

              <Route
                path="/uploadhomebanner"
                element={
                  <AdminRequireAuth>
                    <UploadHomeBanner />
                  </AdminRequireAuth>
                }
              ></Route>

              <Route
                path="/upload_dealday"
                element={
                  <AdminRequireAuth>
                    <UploadDealoftheDay />
                  </AdminRequireAuth>
                }
              ></Route>

              <Route path="/adminlogin" element={<AdminLogin />}></Route>
            </Routes>
          </HashRouter>
        </Provider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;

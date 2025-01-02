import { useDispatch, useSelector } from "react-redux";
import Footer from "../homepage/footer/Footer";
import Navbar from "../navbar/Navbar";
import { AppDispatch, AppState } from "../../../../redux/store";
import { useEffect } from "react";
import { fetchCartItems } from "../../../../redux/cart/slice/fetchCartItem";
import { useAuthentication } from "../../../../../hooks/authContext";
import TitleHeading from "../../atoms/title_headings/TitleHeading";
import CartCard from "./CartCard";
import { useCart } from "../../../../../hooks/cartContext";
import CustomButton from "../../atoms/custom-button/CustomButton";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  deleteCartItems,
  removeProductFromState,
} from "../../../../redux/cart/slice/deleteCartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../atoms/loading/loading";
export default function CartScreen() {
  const dispatch: AppDispatch = useDispatch();
  const { authData } = useAuthentication();
  const { setCartCount, cartCount } = useCart();
  var totalOfferPrice: any;
  useEffect(() => {
    if (authData?.id) {
      dispatch(
        fetchCartItems({
          userID: String(authData.id),
          token: String(authData?.token),
        })
      );
    }
  }, [dispatch, authData]);

  const { cart, products, cartProductCount, loading, error } = useSelector(
    (state: AppState) => state.fetchCartSlice
  );
  const deleteCartProduct = async (id: string) => {
    try {
      dispatch(removeProductFromState(id));
      const resultAction = await dispatch(
        deleteCartItems({
          userID: String(authData?.id),
          productID: id,
          token: String(authData?.token),
        })
      );

      const response = unwrapResult(resultAction);

      toast.success("Cart item deleted!");

      if (response.cart && response.cart.cartProductCount !== undefined) {
        setCartCount(response.cart.cartProductCount);
      } else {
        setCartCount(response.cartProductCount);
      }
    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 404) {
        toast.error("Cart is already empty.");
        setCartCount(0);
      } else {
        toast.error("Failed to delete cart item. Please try again.");
      }

      dispatch(
        fetchCartItems({
          userID: String(authData?.id),
          token: String(authData?.token),
        })
      );
    }
  };

  useEffect(() => {
    if (cartProductCount !== undefined) {
      setCartCount(cartProductCount);
    }
  }, [cartProductCount, setCartCount]);
  if (products && products.length > 0) {
    totalOfferPrice = products.reduce(
      (acc, product) => acc + product.offerPrice,
      0
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Navbar />
          <div className="mx-5">
            <TitleHeading
              title="Shopping Cart"
              level={2}
              divClassName="flex justify-start px-4 py-2"
              hClassName="md:text-2xl text-xl font-serif"
            />
            <div className="flex flex-col lg:flex-row h-screen relative">
              {/* Products Section */}
              <div className="grow overflow-y-auto relative">
                {/* Overlay Spinner */}
                <div className="flex flex-col space-y-4">
                  {cartCount > 0 ? (
                    products && products.length > 0 ? (
                      products.map((product, index) => (
                        <CartCard
                          key={index}
                          image={product.image}
                          offerPrice={product.offerPrice}
                          subtitle={product.subtitle}
                          id={product._id ?? ""}
                          title={product.title}
                          actualPrice={product.actualPrice}
                          offerPercentage={product.offerPercentage}
                          onClick={deleteCartProduct}
                        />
                      ))
                    ) : (
                      <div></div>
                    )
                  ) : (
                    <div className="text-center mt-20">
                      <p className="text-gray-600 text-xl font-semibold">
                        Your cart is empty.
                      </p>
                      <Link
                        to="/homepage"
                        className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-md"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Section */}
              {cartCount > 0 ? (
                products &&
                products.length > 0 && (
                  <div className="w-full lg:w-3/12 lg:sticky lg:top-0 mt-4 lg:mt-0 p-4">
                    <h3 className="text-lg font-semibold">Total Price:</h3>
                    <p className="text-2xl font-bold text-black">
                      {totalOfferPrice ?? 0}
                    </p>
                    <CustomButton
                      className="container bg-black mt-8 text-white text-center rounded-md p-2"
                      text="Buy Now"
                    />
                  </div>
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

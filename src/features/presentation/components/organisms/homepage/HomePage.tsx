import React, { useEffect, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import Logo from "../../../../../assets/app_logo.png";
import Navbar from "../navbar/Navbar";
import Hero from "../../molecules/homepage/hero/Hero";
import Products from "./products/Products";
import Category from "./category/Category";
import DealsOfDay from "./deal_of_day/DealsOfDay";
import ImageOffer from "../../molecules/homepage/image_offer/BannerImageOffer";
import InfoCard from "./ordercancel_return/OrderCancelReturnPolicy";
import AboutUs from "./about_us/AboutUs";
import Footer from "./footer/Footer";

import ProductLogo from "../../../../../assets/product_logo.png";
import OfferBannerImage from "../../../../assets/home/brand_banner.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../redux/store";
import { fetchProductsAndBanners } from "../../../../redux/homepage/slice/HomePageSlice";
import { useAuthentication } from "../../../../../hooks/authContext";
import { CartProvider, useCart } from "../../../../../hooks/cartContext";
import Loading from "../../atoms/loading/loading";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/homepage",
  },
  {
    id: 3,
    name: "Contacts Us",
    link: "/#",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
];

export default function HomePage() {
  const { authData } = useAuthentication();
  const { setCartCount, cartCount } = useCart();
  const dispatch: AppDispatch = useDispatch();
  const {
    products,
    homebanner,
    category,
    offerdeal,
    offerbanner,
    cartProductCount,
    loading,
    error,
  } = useSelector((state: AppState) => state.products);

  if (cartCount > cartProductCount) {
    setCartCount(cartCount);
  } else if (cartProductCount > cartCount) {
    setCartCount(cartProductCount);
  }
  useEffect(() => {
    dispatch(
      fetchProductsAndBanners({
        userID: String(authData?.id),
      })
    );
  }, [dispatch]);
  if (loading) return <Loading />;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Navbar />
          {homebanner && homebanner.length > 0 && (
            <Hero slides={homebanner} />
          )}{" "}
          {products && products.length > 0 && <Products products={products} />}
          {category && category.length > 0 && (
            <Category categories={category} />
          )}
          {offerbanner && offerbanner.length > 0 && (
            <ImageOffer banner={offerbanner} />
          )}
          {offerdeal && offerdeal.length > 0 && (
            <DealsOfDay deals={offerdeal} />
          )}
          <InfoCard />
          <AboutUs />
        </main>
        <Footer />
      </div>
    </>
  );
}

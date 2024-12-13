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

import HomeBanner1 from "../../../../../assets/home/home_banner1.png";
import HomeBanner2 from "../../../../../assets/home/home_banner2.png";
import HomeBanner3 from "../../../../../assets/home/home_banner3.png";
import HomeBanner4 from "../../../../../assets/home/home_banner4.png";

import HomeProduct1 from "../../../../../assets/home/home_products_1.png";
import HomeProduct2 from "../../../../../assets/home/home_products_2.png";
import HomeProduct3 from "../../../../../assets/home/home_products_3.png";
import HomeProduct4 from "../../../../../assets/home/home_products_4.png";
import HomeProduct5 from "../../../../../assets/home/home_products_5.png";
import HomeProduct6 from "../../../../../assets/home/home_products_6.png";
import HomeProduct7 from "../../../../../assets/home/home_products_7.png";
import HomeProduct8 from "../../../../../assets/home/home_products_8.png";

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

const heroProps = [
  {
    id: 1,
    image: HomeBanner1,
  },
  {
    id: 2,
    image: HomeBanner2,
  },
  {
    id: 3,
    image: HomeBanner3,
  },
  {
    id: 4,
    image: HomeBanner4,
  },
];

const productsProps = [
  {
    id: 1,
    image: HomeProduct1,
    offerPrice: 700,
    subtitle: "Brand Name",
    title: "Womens Denim Jacket",
    actualPrice: 1000,
    offerPercentage: 30,
  },
  {
    id: 2,
    image: HomeProduct2,
    offerPrice: 700,
    subtitle: "Brand Name",
    title: "Womens Denim Jacket",
    actualPrice: 1000,
    offerPercentage: 30,
  },
  {
    id: 3,
    image: HomeProduct3,
    offerPrice: 700,
    subtitle: "Brand Name",
    title: "Womens Denim Jacket",
    actualPrice: 1000,
    offerPercentage: 30,
  },
  {
    id: 4,
    image: HomeProduct4,
    offerPrice: 700,
    subtitle: "Brand Name",
    title: "Womens Denim Jacket",
    actualPrice: 1000,
    offerPercentage: 30,
  },
  {
    id: 5,
    image: HomeProduct5,
    offerPrice: 700,
    subtitle: "Brand Name",
    title: "Womens Denim Jacket",
    actualPrice: 1000,
    offerPercentage: 30,
  },
  {
    id: 6,
    image: HomeProduct6,
    offerPrice: 700,
    subtitle: "Brand Name",
    title: "Womens Denim Jacket",
    actualPrice: 1000,
    offerPercentage: 30,
  },
  {
    id: 7,
    image: HomeProduct7,
    offerPrice: 700,
    subtitle: "Brand Name",
    title: "Womens Denim Jacket",
    actualPrice: 1000,
    offerPercentage: 30,
  },
  {
    id: 8,
    image: HomeProduct8,
    offerPrice: 700,
    subtitle: "Brand Name",
    title: "Womens Denim Jacket",
    actualPrice: 1000,
    offerPercentage: 30,
  },
];

const dealsOfDayProps = [
  {
    id: 1,
    image: HomeProduct1,
    logo: ProductLogo,
    title: "Best of Styles",
    offer: 799,
    offerUnderPrice: true,
  },
  {
    id: 2,
    image: HomeProduct8,
    title: "Best of Styles",
    offer: 1099,
    offerUnderPrice: false,
  },
  {
    id: 3,
    image: HomeProduct7,
    logo: ProductLogo,
    title: "Best of Styles",
    offer: 999,
    offerUnderPrice: true,
  },
  {
    id: 4,
    image: HomeProduct6,
    logo: ProductLogo,
    title: "Best of Styles",
    offer: 499,
    offerUnderPrice: true,
  },
  {
    id: 5,
    image: HomeProduct5,
    logo: ProductLogo,
    title: "Best of Styles",
    offer: 899,
    offerUnderPrice: true,
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

  const isFirstRender = useRef(true); // Track first render
  console.log("Products" + products);
  console.log("ooo" + cartCount);
  if (cartCount > cartProductCount) {
    setCartCount(cartCount);
  } else if (cartProductCount > cartCount) {
    setCartCount(cartProductCount);
  }
  console.log("db" + cartProductCount);
  console.log(cartCount);
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
          {offerbanner && offerbanner.length > 0 && (
            <ImageOffer banner={offerbanner} />
          )}
          <Category categories={category} />
          <DealsOfDay deals={offerdeal} />
          <InfoCard />
          <AboutUs />
        </main>
        <Footer />
      </div>
    </>
  );
}

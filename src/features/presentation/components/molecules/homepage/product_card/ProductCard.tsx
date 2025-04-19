import { toast } from "react-hot-toast";
import CustomImage from "../../../atoms/image/CustomImage";
import TitleParagraph from "../../../atoms/title_headings/TitleParagraph";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";
import { IoMdCart } from "react-icons/io";
import { useAuthentication } from "../../../../../../hooks/authContext";
import { AppDispatch } from "../../../../../redux/store";
import { useDispatch } from "react-redux";
import { addToCartDB } from "../../../../../redux/cart/slice/addToCartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCart } from "../../../../../../hooks/cartContext";

type ProductCardProps = {
  title: string;
  subtitle: string;
  offerPrice: number;
  actualPrice: number;
  image: string;
  offerPercentage: number;
  id: string;
};

export default function ProductCard(props: ProductCardProps) {
  const { authData } = useAuthentication();
  const { setCartCount } = useCart();
  const dispatch: AppDispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      const resultAction = await dispatch(
        addToCartDB({
          userID: String(authData?.id),
          productID: props.id,
          token: String(authData?.token),
        })
      );
      const response = unwrapResult(resultAction);

      if (response.cart.cartProductCount) {
        setCartCount(response.cart.cartProductCount);
        toast.success("Product added to cart successfully!");
      }
    } catch (error) {
      toast(`${error}`);
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="md:w-64 w-32 relative space-x-3 shadow-sm rounded-sm hover:scale-95 transition duration-200 cursor-pointer group">
      {/* Product Image */}
      <CustomImage
        ImageSrc={props.image[0]}
        alt={props.title}
        className="md:h-[190px] h-[120px] w-full object-contain rounded-t-lg"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 rounded-lg  group-hover:opacity-45  flex justify-end ">
        <button
          onClick={handleAddToCart}
          className="hidden group-hover:flex bg-stone-700 h-12 w-12 mt-2 mr-2 rounded-lg items-center justify-center"
        >
          <IoMdCart className="h-8 w-8 text-white" />
        </button>
      </div>

      <div className="px-1 pt-1 pb-3 ">
        {/* Product Title */}
        <TitleHeading
          level={3}
          title={props.title}
          hClassName="md:text-base truncate text-[10px] font-bold"
        />
        <TitleHeading
          level={3}
          title={props.subtitle}
          hClassName="md:text-sm text-[8px] mt-1 font-normal truncate text-stone-800"
        />

        <div className="flex flex-row flex-wrap gap-1 mt-1">
          <TitleParagraph
            title={`₹ ${props.offerPrice}`}
            className="text-black md:text-base text-[10px] font-bold"
          />
          <TitleParagraph
            title={`₹ ${props.actualPrice}`}
            className="text-gray-500 flex flex-col text-center justify-center md:text-sm text-[8px] line-through"
          />
          <TitleParagraph
            title={`${props.offerPercentage} % off`}
            className="text-brandGreen flex flex-col text-center justify-center md:text-sm text-[8px]"
          />
        </div>
      </div>
    </div>
  );
}

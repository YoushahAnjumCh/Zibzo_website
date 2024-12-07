import React from "react";
import CustomImage from "../../../atoms/image/CustomImage";
import ShopImage from "../../../../../../assets/home/shop_image.png";

export default function AboutUsImage() {
  return (
    <div className="flex-1 ">
      {/* Shop Image */}

      <CustomImage
        ImageSrc={ShopImage}
        className="py-3 object-cover w-full"
        alt="Shop Image"
      />
    </div>
  );
}

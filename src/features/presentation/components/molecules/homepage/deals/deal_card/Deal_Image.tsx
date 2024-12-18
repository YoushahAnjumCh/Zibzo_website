import React from "react";
import CustomImage from "../../../../atoms/image/CustomImage";

type DealImageProps = {
  image: string;
  title: string;
  logo?: string;
};

export default function Deal_Image(props: DealImageProps) {
  const imageHeightClass = props.logo?.trim()
    ? "md:h-[190px] h-[130px]"
    : "md:h-[220px] h-[160px]";

  return (
    <>
      <CustomImage
        ImageSrc={props.image}
        alt={props.title}
        className={`bg-gray-100 ${imageHeightClass} w-full object-center rounded-t-lg`}
      />
    </>
  );
}

import React from "react";
import CustomImage from "../../../../atoms/image/CustomImage";
import ApiService from "../../../../../../../constant/Environment";

type DealImageProps = {
  image: string;
  title: string;
};

export default function Deal_Image(props: DealImageProps) {
  return (
    <>
      <CustomImage
        ImageSrc={props.image}
        alt={props.title}
        className=" bg-gray-100 md:h-[190px] h-[130px] w-full  object-center rounded-t-lg"
      />
    </>
  );
}

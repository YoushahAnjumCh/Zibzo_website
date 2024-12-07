import React from "react";
import CustomImage from "../../../../atoms/image/CustomImage";

type DealImageProps = {
  image: string;
  title: string;
};

export default function Deal_Image(props: DealImageProps) {
  console.log(`ccc ${props.image}`);
  return (
    <>
      <CustomImage
        ImageSrc={`http://localhost:4000/${props.image}`}
        alt={props.title}
        className=" bg-gray-100 md:h-[190px] h-[130px] w-full  object-center rounded-t-lg"
      />
    </>
  );
}

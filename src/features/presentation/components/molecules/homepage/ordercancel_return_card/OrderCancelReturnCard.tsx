import React from "react";
import CustomImage from "../../../atoms/image/CustomImage";
import TitleParagraph from "../../../atoms/title_headings/TitleParagraph";

type OrderCancelReturnCardProps = {
  imageSrc: string;
  title: string;
  description: string;
};

export default function OrderCancelReturnCard(
  props: OrderCancelReturnCardProps
) {
  return (
    <div className="rounded-lg bg-homeCardInfoColor w-full lg:flex-1 h-32">
      <div className="flex flex-col items-center justify-center h-full">
        {/* InfoCard Image  */}
        <CustomImage ImageSrc={props.imageSrc} alt="Delivery Icon" />

        {/* InfoCard Title */}
        <TitleParagraph
          title={props.title}
          className="text-base font-bold py-2"
        />

        {/* InfoCard Description */}
        <TitleParagraph
          title={props.description}
          className="text-xs text-stone-600 text-center"
        />
      </div>
    </div>
  );
}

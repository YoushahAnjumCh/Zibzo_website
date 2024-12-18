import React from "react";
import CustomImage from "../../../atoms/image/CustomImage";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";

type CategoryCardProps = {
  categoryImage: string;
  categoryTitle: string;
};

export default function CategoryCard(props: CategoryCardProps) {
  return (
    <div className="cursor-pointer relative md:w-72 w-36 md:h-48 h-28 min-w-[10rem] flex-shrink-0">
      <div className=" rounded-xl overflow-hidden relative w-full h-full">
        {/* Category Image   */}
        <CustomImage
          ImageSrc={props.categoryImage}
          alt={props.categoryImage}
          className="w-full h-full object-cover"
        />

        {/* Shadow overlay */}
        <div className="absolute inset-0 rounded-lg bg-gray-900 opacity-50"></div>

        {/* Centered text */}

        <div className="absolute inset-0 flex items-center justify-center">
          {/* Category Title    */}
          <TitleHeading
            level={2}
            title={props.categoryTitle}
            hClassName="text-white md:text-base text-xs truncate font-bold"
          />
        </div>
      </div>
    </div>
  );
}

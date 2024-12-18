import React from "react";
import CustomImage from "../../atoms/image/CustomImage";
import TitleHeading from "../../atoms/title_headings/TitleHeading";
import TitleParagraph from "../../atoms/title_headings/TitleParagraph";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import ApiService from "../../../../../constant/Environment";
type CardCardProps = {
  title: string;
  subtitle: string;
  offerPrice: number;
  actualPrice: number;
  image: string;
  offerPercentage: number;
  id: string;
  onClick?: (id: string) => void;
};
export default function CartCard(props: CardCardProps) {
  const apiService = ApiService.getInstance();

  // Example usage in an API call
  const API_URL = apiService.getApiUrl();
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.id); // Call the onClick function passed from parent with the product id
    }
  };
  return (
    <div className="flex">
      <CustomImage
        ImageSrc={props.image[0]}
        alt={props.title}
        className="md:h-[180px] h-[110px] md:w-[180px] w-[100px] object-cover rounded-md"
      />
      <div className="flex-row grow  px-4 lg:py-4">
        <div className="flex-col">
          <TitleHeading
            level={2}
            title={props.title}
            hClassName="text-sm line-clamp-2 lg:line-clamp-2  lg:leading-normal lg:text-ellipsis lg:overflow-hidden lg:text-xl font-bold "
          />
          <TitleHeading
            level={3}
            title={props.subtitle}
            hClassName="text-xs lg:text-[16px] mt-1 font-normal truncate text-stone-800 lg:py-2"
          />
          <TitleParagraph
            title={`₹ ${props.offerPrice}`}
            className="text-green-800 text-base lg:text-2xl font-bold lg:py-2"
          />
        </div>
      </div>
      <div className="flex justify-end pr-9 pt-9">
        <FaTrash
          onClick={handleClick}
          className="text-red-600 cursor-pointer"
        />
      </div>
    </div>
  );
}

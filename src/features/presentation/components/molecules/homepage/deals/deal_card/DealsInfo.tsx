import React from "react";
import TitleHeading from "../../../../atoms/title_headings/TitleHeading";
import CustomImage from "../../../../atoms/image/CustomImage";
import TitleParagraph from "../../../../atoms/title_headings/TitleParagraph";
import ApiService from "../../../../../../../constant/Environment";

type DealInfoProps = {
  logo?: string;
  logoTitle: string;

  title: string;
  offer: string;
};

export default function DealsInfo(props: DealInfoProps) {
  const apiService = ApiService.getInstance();

  // Example usage in an API call
  const API_URL = apiService.getApiUrl();
  return (
    <div className="flex flex-col justify-center items-center py-4">
      {props.logo && (
        <div>
          {/* Product Logo */}
          <CustomImage
            ImageSrc={`${API_URL}/${props.logo}`}
            alt={props.logoTitle}
            className="md:w-24 w-16"
          />
        </div>
      )}
      <div className="flex flex-col justify-center text-center">
        {/* Offer Title   */}
        <TitleHeading
          level={3}
          title={props.title}
          hClassName="md:text-lg truncate pt-4 text-[10px] font-bold"
        />
        <div className="flex flex-row justify-center items-center pt-2">
          {/* Offer Price */}
          <TitleParagraph
            className="text-black text-[8px] font-bold md:text-sm truncate pt-1 "
            title={props.offer}
          />
        </div>
      </div>
    </div>
  );
}

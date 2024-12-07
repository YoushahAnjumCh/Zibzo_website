import React from "react";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";
import TitleParagraph from "../../../atoms/title_headings/TitleParagraph";
import CustomImage from "../../../atoms/image/CustomImage";
import AboutUsImage from "../../../molecules/homepage/about_us/AboutUsImage";
import BrandNameInfo from "../../../molecules/homepage/about_us/BrandNameInfo";
import ContactInfo from "../../../molecules/homepage/about_us/ContactInfo";
export default function AboutUs() {
  return (
    <div className="py-4 px-4">
      <div className="flex lg:flex-row flex-col">
        <div className="flex-1 lg:pr-6">
          <div className="flex flex-col">
            {/* About Us Title */}
            <TitleHeading
              level={2}
              title="About Us"
              hClassName="md:text-3xl text-xl font-bold font-serif"
            />
            <BrandNameInfo />
            <ContactInfo />
          </div>
        </div>
        <AboutUsImage />
      </div>
    </div>
  );
}

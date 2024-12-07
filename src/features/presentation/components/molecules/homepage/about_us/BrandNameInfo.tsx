import React from "react";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";
import TitleParagraph from "../../../atoms/title_headings/TitleParagraph";

export default function BrandNameInfo() {
  return (
    <>
      {/* Brand Name */}
      <TitleHeading
        level={2}
        title="Zibzo"
        hClassName="md:text-3xl text-base py-2 font-bold"
      />
      {/* Brand Description */}
      <TitleParagraph
        title="Zibzo is an innovative e-commerce brand committed to bringing
              quality products directly to customers with ease, affordability,
              and exceptional service. Specializing in top-rated, stylish, and
              in-demand items, Zibzo aims to deliver an effortless shopping
              experience with fast shipping, easy returns, and 24/7 customer
              support. At Zibzo, we prioritize customer satisfaction, ensuring
              each purchase meets high standards of quality and convenience. We
              believe in offering value and a hassle-free shopping experience,
              allowing customers to shop confidently and efficiently. Whether
              you're looking for everyday essentials or unique finds, Zibzo is
              here to make online shopping rewarding and enjoyable."
        className="md:text-lg text-base"
      />
    </>
  );
}

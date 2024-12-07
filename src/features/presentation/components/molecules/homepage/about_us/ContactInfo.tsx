import React from "react";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";

export default function ContactInfo() {
  return (
    <>
      {/* Contact Information */}
      <TitleHeading
        level={2}
        title="Contact Information"
        hClassName="py-3 text-xl font-semibold "
      />

      <TitleHeading
        level={2}
        title="Youshah Anjum"
        hClassName="py-1 md:text-xl text-base"
      />

      <TitleHeading
        level={2}
        title="mohdyoushah@gmail.com"
        hClassName="py-1 md:text-xl text-base"
      />

      <TitleHeading
        level={2}
        title="+ 91 9020872020"
        hClassName="py-1 md:text-xl text-base"
      />
    </>
  );
}

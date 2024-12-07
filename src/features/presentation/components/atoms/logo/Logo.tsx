import React from "react";
import TitleHeading from "../title_headings/TitleHeading";

export default function Logo() {
  return (
    <TitleHeading
      level={2}
      title="ZIBZO"
      divClassName="flex justify-center text-center"
      hClassName="md:text-3xl text-base font-bold cursor-pointer"
    />
  );
}

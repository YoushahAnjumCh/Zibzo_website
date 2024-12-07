import React from "react";

type FooterCategoryLinkProps = {
  categoryHeading: string;
  categoryItems: string[];
};

export default function FooterCategoryLink({
  categoryHeading,
  categoryItems,
}: FooterCategoryLinkProps) {
  return (
    <div className="flex-auto">
      <div className="flex flex-col">
        <h3 className="text-lg md:text-xl py-1 font-medium">
          {categoryHeading}
        </h3>
        {categoryItems.map((item) => (
          <p
            key={item}
            className="text-sm text-stone-300 font-thin py-1 cursor-pointer"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

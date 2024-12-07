import React from "react";

import ProductCard from "../../../molecules/homepage/product_card/ProductCard";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";

type Product = {
  image: string;
  string?: number;
  offerPrice: number;
  subtitle: string;
  title: string;
  _id: string;
  actualPrice: number;
  offerPercentage: number;
};

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: ProductsProps) {
  return (
    <>
      {/* Product Title */}

      <TitleHeading
        level={2}
        title="Trending Now"
        divClassName="flex  justify-start px-4  py-2 "
        hClassName="md:text-2xl text-xs font-serif"
      />
      {/* Product Card */}
      <div className="flex overflow-x-scroll space-x-4 px-4 py-2 no-scrollbar overflow-y-auto  scrollbar-hide snap-x snap-mandatory scroll-smooth whitespace-nowrap">
        <div className=" flex space-x-4 ">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              offerPrice={product.offerPrice}
              subtitle={product.subtitle}
              id={product._id ?? ""}
              title={product.title}
              actualPrice={product.actualPrice}
              offerPercentage={product.offerPercentage}
            />
          ))}
        </div>
      </div>
    </>
  );
}

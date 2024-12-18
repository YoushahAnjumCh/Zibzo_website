import React from "react";
import Card from "../../../molecules/homepage/product_card/ProductCard";
import HomeProducts1 from "../../../../../../assets/home/home_products_1.png";
import HomeProducts2 from "../../../../../../assets/home/home_products_5.png";
import HomeProducts3 from "../../../../../../assets/home/home_products_6.png";
import HomeProducts4 from "../../../../../../assets/home/home_products_7.png";
import HomeProducts5 from "../../../../../../assets/home/home_products_8.png";
import DealOfDayCard from "../../../molecules/homepage/deals/deal_card/DealOfDayCard";

import ProductLogo from "../../../../../../assets/product_logo.png";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";
import { OfferDealModel } from "../../../../../redux/homepage/model/ProductModel";

type DealOfDay = {
  image: string;
  id?: number;
  logo?: string;
  title: string;
  offer: string;
};

type DealsOfDayProps = {
  deals: OfferDealModel[];
};

export default function DealsOfDay({ deals }: DealsOfDayProps) {
  return (
    <div className="pt-4">
      <div>
        <TitleHeading
          title="Deals of the Day"
          level={2}
          divClassName="flex  justify-start px-4  py-2"
          hClassName="md:text-2xl text-xs font-serif"
        />
        <div className="flex overflow-x-scroll no-scrollbar overflow-y-auto  px-4 py-2  scrollbar-hide snap-x snap-mandatory scroll-smooth whitespace-nowrap">
          {/* Sample Cards */}
          <div className=" flex space-x-8">
            {deals.map((deal, index) => (
              <DealOfDayCard
                key={index}
                image={deal.image}
                title={deal.title}
                offer={deal.offer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

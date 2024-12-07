import React from "react";
import DeliveryIcon from "../../../../../../assets/icon/delivery.png";
import ReturnIcon from "../../../../../../assets/icon/return.png";
import SupportIcon from "../../../../../../assets/icon/support.png";
import OfferIcon from "../../../../../../assets/icon/offer.png";
import CustomImage from "../../../atoms/image/CustomImage";
import TitleParagraph from "../../../atoms/title_headings/TitleParagraph";
import OrderCancelReturnCard from "../../../molecules/homepage/ordercancel_return_card/OrderCancelReturnCard";

export default function OrderCancelReturnPolicy() {
  return (
    <div className="px-3 py-3">
      <div className="flex flex-wrap  gap-4">
        <OrderCancelReturnCard
          description="We provide fast delivery to our customers"
          imageSrc={DeliveryIcon}
          title="Fast Delivery"
        />

        <OrderCancelReturnCard
          description="We provide easy return policy."
          imageSrc={ReturnIcon}
          title="Easy Return"
        />

        <OrderCancelReturnCard
          description="We give 24/7 online support"
          imageSrc={SupportIcon}
          title="Online Support"
        />

        <OrderCancelReturnCard
          description="We give best offers to our customers"
          imageSrc={OfferIcon}
          title="Best Offers"
        />
      </div>
    </div>
  );
}

import CustomImage from "../../../../atoms/image/CustomImage";
import TitleHeading from "../../../../atoms/title_headings/TitleHeading";
import TitleParagraph from "../../../../atoms/title_headings/TitleParagraph";
import Deal_Image from "./Deal_Image";
import DealsInfo from "./DealsInfo";

type CardProps = {
  title: string;
  offer: string;
  image: string;
  logo?: string;
};

export default function DealOfDayCard(props: CardProps) {
  return (
    <div className=" md:w-80 w-48  space-x-3   shadow-sm rounded-sm cursor-pointer">
      {/* Deal of Day Image  */}
      <Deal_Image image={props.image} title={props.title} />
      {/* Deal of the Title Logo Price */}
      <DealsInfo
        logo={props.logo}
        logoTitle={props.title}
        title={props.title}
        offer={props.offer}
      />
    </div>
  );
}

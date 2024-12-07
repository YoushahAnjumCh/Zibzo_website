import AppLogo from "../../../../../../assets/app_logo.png";
import { FaXTwitter } from "react-icons/fa6";
import WhatsappIcon from "../../../../../../assets/icon/whatsapp_icon.png";
import FacebookIcon from "../../../../../../assets/icon/facebook_icon.png";
import InstaIcon from "../../../../../../assets/icon/insta_icon.png";
import CustomImage from "../../../atoms/image/CustomImage";
import TitleHeading from "../../../atoms/title_headings/TitleHeading";
import FooterCategoryLink from "../../../molecules/homepage/footer_category_link/FooterCategoryLink";
import TitleParagraph from "../../../atoms/title_headings/TitleParagraph";
export default function Footer() {
  return (
    <footer className="bg-homeFooterColor">
      <div className="container mx-auto py-8">
        <div className="text-white">
          {/* Logo and Title */}
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-4">
            <CustomImage
              ImageSrc={AppLogo}
              alt="App Logo"
              className="md:w-24 md:h-20 w-16 h-10"
            />
            <div className="flex flex-col justify-center text-center md:text-left">
              <TitleHeading
                level={2}
                title="ZIBZO"
                hClassName="md:text-4xl text-lg ml-0 md:ml-2 font-bold"
              />
            </div>
          </div>

          {/* Category Links */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between text-center mx-3 py-8 space-y-4 md:space-y-0 md:space-x-8">
            <FooterCategoryLink
              categoryHeading="Women"
              categoryItems={["All women", "Skirt", "T-Shirt", "Top"]}
            />
            <FooterCategoryLink
              categoryHeading="Men"
              categoryItems={["All men", "Shirts", "T-Shirt", "Shorts"]}
            />
            <FooterCategoryLink
              categoryHeading="Kids"
              categoryItems={["All kids", "Skirts", "Shorts", "Jackets"]}
            />
            <FooterCategoryLink
              categoryHeading="Shopping"
              categoryItems={[
                "Your cart",
                "Your orders",
                "Compared items",
                "Shipping Details",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-white" />

      {/* Footer Bottom Links */}
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between container py-3 space-y-4 md:space-y-0">
        <TitleParagraph
          title="Terms & Conditions"
          className="text-sm text-stone-300 font-thin cursor-pointer"
        />
        <TitleParagraph
          title="Privacy Policy"
          className="text-sm text-stone-300 font-thin cursor-pointer"
        />
        <div className="flex flex-row gap-4">
          <CustomImage
            ImageSrc={FacebookIcon}
            alt="Facebook"
            className="w-5 md:w-6 h-5 md:h-6 cursor-pointer"
          />
          <CustomImage
            ImageSrc={InstaIcon}
            alt="Instagram"
            className="w-5 md:w-6 h-5 md:h-6 cursor-pointer"
          />
          <CustomImage
            ImageSrc={WhatsappIcon}
            alt="WhatsApp"
            className="w-5 md:w-6 h-5 md:h-6 cursor-pointer"
          />
          <FaXTwitter className="w-5 md:w-6 h-5 md:h-6 cursor-pointer text-white" />
        </div>
      </div>
    </footer>
  );
}

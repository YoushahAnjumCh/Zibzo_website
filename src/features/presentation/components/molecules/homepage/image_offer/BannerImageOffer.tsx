import ApiService from "../../../../../../constant/Environment";
import CustomImage from "../../../atoms/image/CustomImage";

type BannerImageOfferProps = {
  image: string;
  title?: string;
};

type OfferBannerProps = {
  banner: BannerImageOfferProps[];
};

export default function BannerImageOffer({ banner }: OfferBannerProps) {
  const apiService = ApiService.getInstance();

  // Example usage in an API call
  const API_URL = apiService.getApiUrl();
  return (
    <>
      {banner.map((item: BannerImageOfferProps, index: number) => (
        <div className="py-2 cursor-pointer" key={index}>
          <CustomImage
            ImageSrc={`${API_URL}/${item.image}`}
            alt="Brand Banner"
            className="w-full h-[230px] md:h-[550px] object-cover"
          />
        </div>
      ))}
    </>
  );
}

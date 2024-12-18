import CustomImage from "../../../atoms/image/CustomImage";

type BannerImageOfferProps = {
  image: string;
  title?: string;
};

type OfferBannerProps = {
  banner: BannerImageOfferProps[];
};

export default function BannerImageOffer({ banner }: OfferBannerProps) {
  return (
    <>
      {banner.map((item: BannerImageOfferProps, index: number) => (
        <div className="py-2 cursor-pointer" key={index}>
          <CustomImage
            ImageSrc={item.image}
            alt="Brand Banner"
            className="w-full h-[230px] md:h-[550px] object-cover"
          />
        </div>
      ))}
    </>
  );
}

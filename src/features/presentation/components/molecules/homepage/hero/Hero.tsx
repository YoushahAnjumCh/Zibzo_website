import React from "react";
import Macbook from "../../../../../../assets/category/gaming.png";
import Slider from "react-slick";
import ApiService from "../../../../../../constant/Environment";
type Slide = {
  id: number;
  image: string;
};

type HeroProps = {
  slides: Slide[];
};

export default function Hero({ slides }: HeroProps) {
  const apiService = ApiService.getInstance();

  // Example usage in an API call
  const API_URL = apiService.getApiUrl();
  const settings = {
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id} className="flex flex-row">
          <div className="w-full">
            <img
              src={`${API_URL}/${slide.image}`}
              alt=""
              className="w-full h-[200px] md:h-[510px] cursor-pointer object-cover"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}

import React from "react";
import Macbook from "../../../../../../assets/category/gaming.png";
import Slider from "react-slick";
type Slide = {
  id: number;
  image: string;
};

type HeroProps = {
  slides: Slide[];
};

export default function Hero({ slides }: HeroProps) {
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
              src={`http://localhost:4000/${slide.image}`}
              alt=""
              className="w-full h-[200px] md:h-[510px] cursor-pointer object-cover"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router";
import type { Banner } from "@/types/landing";
import SliderArrowButton from "@/components/ui/slider-arrow-button";

const BannerSlider = ({ banners }: { banners: Banner[] }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className="banner-swiper-wrapper position-relative rounded-4 overflow-hidden slider-arrow-host">
      <SliderArrowButton
        direction="prev"
        ariaLabel="Previous banner"
        onClick={() => swiperRef.current?.slidePrev()}
        revealOnHover
        className="d-none d-sm-inline-flex"
      />
      <SliderArrowButton
        direction="next"
        ariaLabel="Next banner"
        onClick={() => swiperRef.current?.slideNext()}
        revealOnHover
        className="d-none d-sm-inline-flex"
      />

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={banners.length > 1}
        speed={500}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        className="banner-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={`banner-${banner.id}`}>
            <Link to={banner.url} aria-label={banner.image_description}>
              <img
                src={banner.image}
                alt={banner.image_description}
                className="w-100 h-100 object-fit-cover"
                style={{ objectPosition: "center" }}
                loading="lazy"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;

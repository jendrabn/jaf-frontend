import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import type { ProductBrand } from "@/types/product";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import { paths } from "@/config/paths";
import SliderArrowButton from "@/components/ui/slider-arrow-button";

const BrandSlider = ({ brands }: { brands: ProductBrand[] }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className="brand-swiper-wrapper position-relative slider-arrow-host">
      <SliderArrowButton
        direction="prev"
        ariaLabel="Previous brand"
        onClick={() => swiperRef.current?.slidePrev()}
        revealOnHover
        className="d-none d-sm-inline-flex"
      />
      <SliderArrowButton
        direction="next"
        ariaLabel="Next brand"
        onClick={() => swiperRef.current?.slideNext()}
        revealOnHover
        className="d-none d-sm-inline-flex"
      />

      <Swiper
        modules={[Autoplay, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        speed={400}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          1400: { slidesPerView: 4 },
          1200: { slidesPerView: 3 },
          992: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          576: { slidesPerView: 2 },
          0: { slidesPerView: 2 },
        }}
        navigation={false}
        className="brand-swiper"
      >
        {brands.map((brand) => (
          <SwiperSlide
            key={`brand-${brand.id ?? brand.name}`}
            className="brand-slide"
          >
            <Link
              to={`${paths.products.root()}?brand_id=${brand.id}`}
              className="brand-link d-block"
              aria-label={`Lihat produk brand ${brand.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card className="brand-card" body>
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="brand-logo img-fluid"
                    loading="lazy"
                  />
                ) : (
                  <div className="brand-title line-clamp-1" title={brand.name}>
                    {brand.name}
                  </div>
                )}
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;

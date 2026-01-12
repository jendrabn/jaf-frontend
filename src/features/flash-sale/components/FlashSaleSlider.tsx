import type { Product } from "@/types/product";
import { useRef } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import SliderArrowButton from "@/components/ui/slider-arrow-button";

interface FlashSaleSliderProps {
  products: Product[];
}

const FlashSaleSlider = ({ products }: FlashSaleSliderProps) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <div className="flash-sale-swiper-wrapper position-relative slider-arrow-host">
      <SliderArrowButton
        direction="prev"
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        revealOnHover
      />
      <SliderArrowButton
        direction="next"
        onClick={() => swiperRef.current?.swiper.slideNext()}
        revealOnHover
      />

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        loop={products.length > 6}
        speed={400}
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={16}
        navigation={false}
        breakpoints={{
          768: { slidesPerView: 4, slidesPerGroup: 2 },
          992: { slidesPerView: 6, slidesPerGroup: 2 },
        }}
        className="flash-sale-swiper"
      >
        {products.map((product) => (
          <SwiperSlide className="flash-sale-slide" key={product.id}>
            <ProductCard
              product={product}
              showRating={false}
              flashSaleStatus="running"
              hideZeroSoldCount
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FlashSaleSlider;

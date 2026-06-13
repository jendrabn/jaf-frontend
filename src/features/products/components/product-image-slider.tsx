import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import SliderArrowButton from "@/components/ui/slider-arrow-button";

const ProductImageSlider = ({ images }: { images: string[] }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const hasMultiple = (images?.length ?? 0) > 1;

  return (
    <div className="product-image-slider">
      <div className="slider-box position-relative rounded-3 overflow-hidden bg-body-tertiary slider-arrow-host">
        {hasMultiple && (
          <>
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
          </>
        )}

        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          loop={false}
          speed={500}
          slidesPerView={1}
          navigation={false}
          onSlideChange={(swiper) => setActiveIdx(swiper.activeIndex)}
          className="product-image-swiper"
        >
          {(images || []).map((src, idx) => (
            <SwiperSlide key={`image-${idx}`} className="product-image-slide">
              <div className="ratio ratio-4x3">
                <img
                  src={src}
                  alt={`Product Image ${idx + 1}`}
                  className="position-absolute top-0 start-0 w-100 h-100 object-fit-contain"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {(images?.length ?? 0) > 0 && (
        <div className="product-image-thumbs d-none d-lg-block mt-3">
          <ul className="d-flex justify-content-center list-unstyled gap-2 m-0">
            {images.map((src, idx) => (
              <li
                key={`thumb-${idx}-${src}`}
                className={`thumb-item ${activeIdx === idx ? "active" : ""}`}
              >
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent w-100 h-100"
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => swiperRef.current?.swiper.slideTo(idx)}
                >
                  <img src={src} alt={`Thumbnail ${idx + 1}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductImageSlider;

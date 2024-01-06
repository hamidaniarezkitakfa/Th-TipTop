import React from "react";
import SwiperCore, { Virtual, Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Virtual, Navigation, Pagination, Autoplay]);

import "./slide.scss";

const Slide = ({ data }) => {
  const navigate = useNavigate();
  const handleSlideClick = () => {
    navigate("/participer");
  };
  return (
    <div className="slide">
      <div className="container">
        <div className="caroussel">
          <Swiper
            className="swipper"
            centeredSlides={true}
            spaceBetween={30}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            virtual
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 40
              },
              1440: {
                slidesPerView: 1,
                spaceBetween: 50
              }
            }}
          >
            {data.map((card) => (
              <SwiperSlide
                className="swipperslide"
                key={card.id}
                virtualIndex={card.id}
                onClick={handleSlideClick}
              >
                <img src={card.img} alt={card.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Slide;

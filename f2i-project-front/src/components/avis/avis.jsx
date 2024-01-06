import React from "react";
import styled from '@emotion/styled';
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Container = styled.div`
    font-family: 'Georgia', serif;
    background-color: #FFFFFF;
    border-radius: 15px;
    margin-top: -20px;
    margin-left: 5%;
    margin-right: 5%;
    width: 90vw;
    height: auto;
`;

const Title = styled.h1`
    font-size: 30px;
    text-align: center;
    margin-bottom: 50px;
    color: #333;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
`;

const SlideContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: #EEEEEE;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    width: auto;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
`;

const ClientName = styled.h2`
    font-size: 20px;
    color: #333;
    margin: 5px 0;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
`;

const Stars = styled.div`
    color: #FFC107;
    font-size: 24px;
`;

const ReviewText = styled.p`
    font-size: 14px;
    color: #555;
    margin: 5px 0;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
`;

SwiperCore.use([Navigation, Pagination]);

const Slide = ({ data }) => {

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i}>{i < rating ? "★" : "☆"}</span>
            );
        }
        return <>{stars}</>;
    };

    return (
        <Container>
            <Title>Avis Clients...</Title>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    2000: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }}
            >
                {data.map((card, index) => (
                    <SwiperSlide key={index}>
                        <SlideContent>
                            <ClientName>{card.name}</ClientName>
                            <Stars>
                                {renderStars(card.rating)}
                            </Stars>
                            <ReviewText>{card.review}</ReviewText>
                        </SlideContent>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
};

export default Slide;

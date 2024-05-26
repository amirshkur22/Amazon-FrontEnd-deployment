import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carouselImage from "../../data/Data";
import CarouselStyles from "./carousel.module.css";
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        swipeable={false}
        transitionTime={4000}
      >
        {carouselImage.map((singleImg, index) => {
          return <img src={singleImg} alt={`carousel${index}`}  key={index}/>;
        })}
      </Carousel>
      <div className={CarouselStyles.fade}></div>
    </div>
  );
};

export default CarouselEffect;

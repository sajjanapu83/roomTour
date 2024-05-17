import React from "react";
import Carousel from "react-bootstrap/Carousel";

const RoomImage = ({ images }) => {
  return (
    <div>
      <Carousel interval="5000">
        {images.map(function (image) {
          return (
            <Carousel.Item>
              <img src={image} height="200" width="300" />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default RoomImage;

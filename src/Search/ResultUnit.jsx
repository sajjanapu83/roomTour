import React, { useState, useEffect } from "react";
import Tour, { tour } from "./Tour";
import "./resultUnit.css";

const ResultUnit = (props) => {
  console.log(props);
  const [randomRating, setRandomRating] = useState(
    (Math.random() * (5 - 3) + 3).toFixed(2)
  );
  const [imageUrl, setImageUrl] = useState(null);

  const formattedString = props.amenities.length > 1 
  ? `${props.amenities.slice(0, -1).join(', ')} and ${props.amenities.slice(-1)}`
  : props.amenities[0];


  
  useEffect(() => {
    const latitude = 37.7749;
    const longitude = -122.4194;
    const zoom = 13;
    const size = "150x150";
    const marker = `color:red|label|${props.latitude},${props.longitude}`;
    const apiKey = "AIzaSyANh-4dgNTF7LEC2yVRBK9hwSQCt8_qGAw";

    setImageUrl(
      `https://maps.googleapis.com/maps/api/staticmap?center=${props.latitude},${props.longitude}&zoom=${zoom}&size=${size}&markers=${marker}&key=${apiKey}`
    );
  });

  return (
    <div className="result-unit">
      <div className="result-card">
        <img
          className="result-image"
          src={props.image}
          alt="Result Image"
        />
        <div className="result-details">
          <h2 className="result-name">{props.name}</h2>
          <p className="result-address"><strong>Address: </strong>{props.address}</p>
          {props.amenities.length > 0 && (<p className="result-amenities"><strong>Amenities: </strong>{formattedString}</p>)}
          {props.activities && (<p className="result-activities"><strong>Activities: </strong>{props.activities}</p>)}
          <p className="result-attractions"><strong>Attractions: </strong>{props.attractions}</p>
          <p className="result-rating">
            <span className="result-rating-value">{randomRating}</span>
            <span className="result-rating-out-of">/5</span>
          </p>
          <Tour />
        </div>
        <img
          className="result-maps-image"
          src={imageUrl}
          alt="Maps Image"
        />
      </div>
    </div>


  );
};

export default ResultUnit;

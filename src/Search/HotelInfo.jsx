import React from 'react';
import "./hotelInfo.css";

const HotelInfo = ({ hotel }) => {
  // Filter out keys with empty values
  const pills = Object.entries(hotel)
    .filter(([key, value]) =>
     key !== 'name' && key !== 'region' && key !== 'latitude' && key !== 'longitude' && value !== '' && value !=null
     )
    .map(([key, value]) => (
      <span key={key} className="pill">{`${key}: ${value}`}</span>
    ));

  return (
    <div>
      {pills}
    </div>
  );
}

export { HotelInfo };

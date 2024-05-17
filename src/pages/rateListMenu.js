import React from "react";
import RoomPanel from "../components/roomPanel";
import roomsData from "./testData";

const RateListMenu = () => {
  return (
    <div class="container">
      <div class="top-container">
        <div class="hotel-message-title">Select a Room and Rate</div>
      </div>

      <div class="search-form-container">
        <div class="available-room-label">
          {roomsData.length} Available Rooms
        </div>
        <div>
          {roomsData.map(function (room) {
            return <RoomPanel room={room} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RateListMenu;

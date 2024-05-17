import RatePanel from "./ratePanel";
import RoomImage from "./roomImage";
import Tour from "./Tour";

const RoomPanel = ({ room }) => {
  return (
    <div class="mb-2 pt-1">
      <div class="row">
        <div class="col">
          <RoomImage images={room.images} />
          <div class="col">
            <Tour />
          </div>
        </div>
        <div class="col flex-grow-1">
          <div class="row">{room.roomTitle}</div>

          {room.rates.map(function (rate) {
            return <RatePanel rate={rate} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomPanel;

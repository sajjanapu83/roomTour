import React from "react";

const RatePanel = ({ rate }) => {
  return (
    <div class="row flex-grow-1">
      <div class="col">
        <span class="rate-name">{rate.rateType}</span>
      </div>
      <div class="col">
        <span class="currency-label">{rate.rate.amount} USD / Night</span>
      </div>
    </div>
  );
};

export default RatePanel;

const roomsData = [
  {
    roomTitle: "Larger Suite, 1 King, Sofa bed, Corner room",
    images: [
      "https://loremflickr.com/640/480/hotelroom?lock=208919785897984",
      "https://loremflickr.com/640/480/hotelroom?lock=7278050123186176",
      "https://loremflickr.com/640/480/hotelroom?lock=1178808845598720",
    ],
    rates: [
      { rateType: "Flexible Rate", rate: { amount: 450, currency: "USD" } },
      {
        rateType: "Member Rate Flexible",
        rate: { amount: 291, currency: "USD" },
      },
    ],
  },
  {
    roomTitle: "Suite, 2 Queen, Sofa bed",
    images: [
      "https://loremflickr.com/640/480/hotelroom?lock=5705079006953472",
      "https://loremflickr.com/640/480/hotelroom?lock=2101931419893760",
      "https://loremflickr.com/640/480/hotelroom?lock=1796041871458304",
    ],
    rates: [
      { rateType: "business", rate: { amount: 286, currency: "USD" } },
      {
        rateType: "Member Rate Flexible",
        rate: { amount: 298, currency: "USD" },
      },
    ],
  },
];

export default roomsData;

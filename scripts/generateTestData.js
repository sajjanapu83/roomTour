// CJS
const { faker } = require("@faker-js/faker");

const createRandomRoom = () => {
  return {
    roomTitle: faker.helpers.arrayElement([
      "Studio, 1 King, Sofa bed, Studio, 1 King, Sofa bed",
      "Studio, 2 Queen, Sofa bed, Studio, 2 Queen, Sofa bed",
      "1 Bedroom Suite, Sofa bed, 1 Bedroom Suite, 1 King, Sofa bed",
      "2 Queen Beds, Traditional Guest Room",
      "2 Queen Beds, Junior Suite",
      "Suite, 2 Queen, Sofa bed",
      "Larger Suite, 1 King, Sofa bed, Corner room",
      "Suite, 1 King, Sofa bed, City view",
      "Suite, 2 Queen, Sofa bed, City view",
    ]),
  };
};

const createRandomRates = () => {
  return {
    rateType: faker.helpers.arrayElement([
      "Member Rate Flexible",
      "Flexible Rate",
      "business",
    ]),
    rate: {
      amount: faker.number.int({ min: 250, max: 450 }),
      currency: "USD",
    },
  };
};

const numberOfRooms = faker.number.int({ min: 2, max: 4 });
const rooms = faker.helpers.multiple(createRandomRoom, {
  count: numberOfRooms,
});

const randomHotelRoomImages = () => {
  const images = [];
  for (let i = 0; i < 3; i++) {
    images.push(
      faker.image.urlLoremFlickr({
        category: "hotelroom",
        width: 640,
        height: 480,
        randomize: true,
      })
    );
  }
  return images;
};

const data = rooms.map((room) => {
  room.images = randomHotelRoomImages();
  room.rates = faker.helpers.multiple(createRandomRates, {
    count: 2,
  });
  return room;
});

console.log("data ", JSON.stringify(data));

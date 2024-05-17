import { Configuration, OpenAIApi } from "openai";
import { sampleResponse } from "./sampleResponse";

const OPENAI_API_KEY = "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"; // TODO: move it to .env

const AWS_BASE_URL =
  "http://ec2-3-12-83-249.us-east-2.compute.amazonaws.com:8983"; // Update this when EC2 is changed

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Content = prompt for chatGPT
// The content keywords similar to solr
const messages = [
  {
    role: "system",
    content: `
      In the sentence below, give me the list of:
      - hotel name named entity
      - location named entity
      - city named entity
      - state named entity
      - country named entity
      - region named entity
      - map hotel amenities into one of the values ["Free Wifi","Fitness Center","bar","fitness center","restaurant","pool","spa","Spa","Outdoor Pool","Pets Allowed","Pool","Beachfront","Rooftop Terrace","Free Breakfast","Gym","Jacuzzi","Parking","Rooftop Bar","Free Parking"] for amenities named entity
      - calculate the latitude of the city or airport or poi
      - calculate the longitude of the city or airport or poi
      - point of interest named entity
      Format the output in json with the following keys:
      - name for hotel named entity
      - location for location named entity
      - city for city named entity
      - state for state named entity
      - country for country named entity
      - region for region named entity
      - amenities array for hotel amenities entity
      - latitude for hotel amenities entity
      - longitude for hotel amenities entity
      - point_of_interests for point of interest named entity
      `,
  },
];

const chatCompletion = async (searchTerm) => {
  try {
    messages.push({
      role: "user",
      content: searchTerm,
    });
    const response = await openai.createChatCompletion({
      messages,
      model: "gpt-3.5-turbo",
    });
    const botMessage = response.data.choices[0].message;
    return botMessage.content;
    // TODO 1: show the classifications/entities/filters in the UI under search box (pill)
    // TODO 2: Follow up - make solar call with token and add some logic in new function to build a query (with query params based on chatGPT)
  } catch (error) {
    console.log(error);
    return "No results found due to error with chatGPT";
  }
};

// SOLR integration
// Sample Cities: Dallas, New York, Florida
const fetchHotels = async (userSearchInput, chatGptResponse) => {
  // bq=ammenities
  /**
     * &rows=<count> | default=10
    http://ec2-18-189-16-239.us-east-2.compute.amazonaws.com:8983/solr/hotels-search/select?q=hotels%20near%20time%20square

    bq=point_of_interests:"Times%20Square"^5.0 
     
    http://ec2-18-189-16-239.us-east-2.compute.amazonaws.com:8983/solr/hotels-search/select?q=hotels%20near%20time%20square&bq=key1:"value1"^5.0&bq=key2:"value2"^5.0

    Eg:
    http://ec2-18-189-16-239.us-east-2.compute.amazonaws.com:8983/solr/hotels-search/select?q=hotels%20near%20time%20square&bq=point_of_interests:"Times%20Square"
     */
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  let targetUrl = `${AWS_BASE_URL}/solr/hotels-search/select?indent=true&q=${userSearchInput}`;
  if (chatGptResponse) {
    if (
      Array.isArray(chatGptResponse.amenities) &&
      chatGptResponse.amenities.length > 0
    ) {
      const amenitiesVal = chatGptResponse.amenities.map(
        (value) => `amenities:"${encodeURI(value)}"^2.0`
      );
      targetUrl += `&bq=${amenitiesVal.join("&bq=")}`;
    }
    if (
      Array.isArray(chatGptResponse.point_of_interests) &&
      chatGptResponse.point_of_interests.length > 0
    ) {
      const pointsOfInterestsVal = chatGptResponse.point_of_interests.map(
        (value) => `point_of_interests:"${encodeURI(value)}"^2.0`
      );
      targetUrl += `&bq=${pointsOfInterestsVal.join("&bq=")}`;
    }
    if (chatGptResponse.city) {
      targetUrl += `&bq=city:"${chatGptResponse.city}"^10.0`;
    }
    if (chatGptResponse.state) {
      targetUrl += `&bq=state:"${chatGptResponse.state}"^5.0`;
    }

    console.log(targetUrl);
  }

  const url = `${proxyUrl}${targetUrl}`;

  const response =  await fetch(url);
  const data = await response.json(); // Some change
  return data;
};

const getProxyUrl = (userSearchInput, chatGptResponse) => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  let targetUrl = `${AWS_BASE_URL}/solr/hotels-search/select?indent=true&q=${userSearchInput}`;
  if (chatGptResponse) {
    if (
      Array.isArray(chatGptResponse.amenities) &&
      chatGptResponse.amenities.length > 0
    ) {
      const amenitiesVal = chatGptResponse.amenities.map(
        (value) => `amenities:"${encodeURI(value)}"^2.0`
      );
      targetUrl += `&bq=${amenitiesVal.join("&bq=")}`;
    }
    if (
      Array.isArray(chatGptResponse.point_of_interests) &&
      chatGptResponse.point_of_interests.length > 0
    ) {
      const pointsOfInterestsVal = chatGptResponse.point_of_interests.map(
        (value) => `point_of_interests:"${encodeURI(value)}"^2.0`
      );
      targetUrl += `&bq=${pointsOfInterestsVal.join("&bq=")}`;
    }
    if (chatGptResponse.city) {
      targetUrl += `&bq=city:"${chatGptResponse.city}"^10.0`;
    }
    if (chatGptResponse.state) {
      targetUrl += `&bq=state:"${chatGptResponse.state}"^5.0`;
    }
  }

  const url = `${proxyUrl}${targetUrl}`;

  return url;
}
export { chatCompletion, fetchHotels, getProxyUrl };

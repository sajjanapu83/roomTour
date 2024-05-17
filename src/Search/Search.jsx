import React, { useState, useEffect } from "react";
import { chatCompletion, fetchHotels, getProxyUrl } from "./utils/openAiIntegration";
import ResultUnit from "./ResultUnit";
import { HotelInfo } from "./HotelInfo";
import { sampleResponse } from "./utils/sampleResponse";
import { BeatLoader } from "react-spinners";
import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatGPTresults, setChatGPTresults] = useState(null);
  const [hotelResults, setHotelResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [solarError, setSolarError] = useState(false);
  const [solarUrl, setSolarUrl] = useState(null);
  const loadingOverride = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(0, 0, 0, 0.3)",
  };


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsSearching(true);
    const res = await chatCompletion(searchTerm);
    let parsedResponse = null;
    try {
      console.log("Parsing Initial response from chat GPT");
      console.log(res);
      parsedResponse = JSON.parse(res);
      console.log("parsed response");
      console.log(parsedResponse);
      setSolarError(false);
      setChatGPTresults(parsedResponse);
    } catch (error) {
      console.log(error);
      setChatGPTresults({ error: "No results from OpenAI" });
    }

    try {
      const hotels = sampleResponse; // commented by Uday - await fetchHotels(searchTerm, parsedResponse);
      const proxyUrl = getProxyUrl(searchTerm, parsedResponse);
      setSolarUrl(proxyUrl);
      console.log('proxy url:');
      console.log(proxyUrl);
      setSolarError(false);
      console.log("hotel results");
      console.log(hotels);
      setIsSearching(false);
      setHotelResults(hotels);
    } catch (error) {
      console.log("error making the Solar GET call");
      const proxyUrl = getProxyUrl(searchTerm, parsedResponse);
      setSolarUrl(proxyUrl);
      console.log('proxy url:');
      console.log(proxyUrl);
      console.log(error);
      setIsSearching(false);
      setSolarError(true);
    }
  };

  // TODO: put address on the top, ammenities, activities and point of interest
  // TODO: make the address and labels bold

  return (
    <div className="display-page">
      <div className="search-container-entry">
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search Phrase. Eg: Get me some breakfast hotels in Dallas"
              style={{ width: "100%", padding: "20px", fontSize: "20px" }}
            />
            <button
              className={
                isSearching ? "search-button disabled" : "search-button"
              }
              type="submit"
              disabled={isSearching}
              style={{ marginLeft: "10px" }}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      <BeatLoader css={loadingOverride} loading={isSearching} size={20} />
      {chatGPTresults && !isSearching && <HotelInfo hotel={chatGPTresults} />}

      {solarError && (<div>Solr call broke. Please click <a href={solarUrl} target="_blank">solar URL</a> to accept proxy and refresh the page</div>)}
      {hotelResults && !isSearching && (
        <div className="results-container">
          <h3>Found {hotelResults.response.numFound} results</h3>
          {hotelResults.response.docs.map((result, index) => (
            <ResultUnit
              key={index}
              image={`https://picsum.photos/200?random=${index}`}
              name={result.name}
              amenities={result.amenities}
              activities={result.activities_available}
              address={`${result.address}, ${result.city}, ${result.state}, ${result.country}`}
              attractions={`${result.point_of_interests
                .slice(0, -1)
                .join(", ")} and ${result.point_of_interests.slice(-1)}`}
              latitude={result.latitude}
              longitude={result.longitude}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

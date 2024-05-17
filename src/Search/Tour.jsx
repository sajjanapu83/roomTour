import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom';
import video_link from './bird.mp4'

const Tour = () => {
  const [showPopup, setShowPopup] = React.useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleShowPopup}>Room Tour</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Room Tour</h2>
            {/* 
            commented by Uday - 
            <video width="100%" height="300" controls>
              <source src={video_link} type="video/mp4" />
              Your browser does not support the video tag.
            </video> 
            
            */}
            
            <iframe class="loading-bg" legacy-location="" width="100%" height="100%" frameborder="0" id="iframe" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" aria-label="360 Photo of Presidential Suite in " ng-src="https://my.matterport.com/show/?m=gRvQLAYtZ6S&amp;cloudEdit=1&amp;sr=,-.96&amp;ss=14&amp;play=1&amp;dh=0/" src="https://my.matterport.com/show/?m=gRvQLAYtZ6S&amp;cloudEdit=1&amp;sr=,-.96&amp;ss=14&amp;play=1&amp;dh=0/">
      <p class="iframe-err-text">Your Browser Does Not Support This iframe</p>
    </iframe>
            <button onClick={handleHidePopup}>Close</button>
          </div>
            </div>
        )}
    </div>
  );
};

export default Tour;
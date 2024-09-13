import React from "react";
import "./ImageDisplay.css";

const ImageDisplay = ({ image, loading }) => {
  console.log("ImageDisplay - loading:", loading, "image:", image);
  return (
    <div className="display-container">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : image ? (
        <>
          <img src={image} alt="Processed" />
          <a href={image} target="_blank" rel="noopener noreferrer">
            <button type="button" className="view-button">
              View Full Size
            </button>
          </a>
        </>
      ) : (
        <div className="skeleton">No image processed</div>
      )}
    </div>
  );
};

export default ImageDisplay;
// 039UvAE3TYUR6S4vGaOggzIXbie0PTKyw8rO+WC7
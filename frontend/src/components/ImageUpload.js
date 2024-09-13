import React, { useState } from "react";
import "./ImageUpload.css";

const apiUrl = process.env.REACT_APP_API_URL;

const ImageUpload = ({ setServerImage, setLoading }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
    console.log("File selected:", selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;
    setLoading(true); // Show loading indicator
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Replace '192.168.18.56' with the actual IP address of the backend device
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      const blob = await response.blob();
      console.log("Response Blob:", blob);
      const serverImageUrl = URL.createObjectURL(blob);
      console.log("Server Image URL:", serverImageUrl);
      setServerImage(serverImageUrl);
    } catch (error) {
      console.error("Error uploading the image:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="image-upload-label">
          {file ? (
            <img src={imageUrl} alt="Selected" className="selected-image" />
          ) : (
            <div className="skeleton">Click to select image</div>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit">Upload</button>
        {file && (
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <button type="button" className="view-button">
              View Full Size
            </button>
          </a>
        )}
      </form>
    </div>
  );
};

export default ImageUpload;

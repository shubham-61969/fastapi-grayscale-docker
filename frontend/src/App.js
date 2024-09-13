import React, { useState } from "react";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import ImageDisplay from "./components/ImageDisplay";
import "./App.css";

const App = () => {
  const [serverImage, setServerImage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <ImageUpload setServerImage={setServerImage} setLoading={setLoading} />
        <ImageDisplay image={serverImage} loading={loading} />
      </div>
    </div>
  );
};

export default App;

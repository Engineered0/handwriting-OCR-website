// OCRReader Component
import React, { useState } from "react";
import Tesseract from "tesseract.js";
import ImageUpload from "./ImageUpload";

const OCRReader = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("------------------------");

  const handleImageChange = (imageData) => {
    setImage(imageData);
    processImage(imageData);
  };

  const processImage = (imageData) => {
    Tesseract.recognize(imageData, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setText(text);
    });
  };

  return (
    <div>
      <ImageUpload onImageChange={handleImageChange} />
      {image && (
        <div>
          <img
            src={image}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      )}
      <div>
        <h3>Extracted Text:</h3>
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default OCRReader;

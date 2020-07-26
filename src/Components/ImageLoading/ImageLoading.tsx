import React, { FC, useState } from "react";

type ImageProps = {
  width: number;
  height: number;
  imageUrl: string;
  alt: string;
};
const ImageLoading: FC<ImageProps> = ({ imageUrl, width, height, alt }) => {
  const [highResClass, setHighResClass] = useState("d-none");
  const [lowResClass, setLowResClass] = useState("d-block");

  const highResImgLoaded = () => {
    setHighResClass("d-block");
    setLowResClass("d-none");
  };

  return (
    <div className="image-container d-inline-block">
      <img
        alt={alt}
        className={lowResClass}
        style={{ height: height, width: width }}
        src={`https://ik.imagekit.io/cjvyejrxtm/${imageUrl}?tr=h-${height},w-${width},bl-${Math.ceil(
          height / 50
        )}`}
      ></img>
      <img
        alt={alt}
        className={highResClass}
        style={{ height: height, width: width }}
        src={`https://ik.imagekit.io/cjvyejrxtm/${imageUrl}?tr=h-${height},w-${width}`}
        onLoad={highResImgLoaded}
      ></img>
    </div>
  );
};

export default ImageLoading;

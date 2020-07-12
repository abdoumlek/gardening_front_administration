import React, { FC, useState, useEffect } from "react";
import { IKContext, IKImage } from "imagekitio-react";

type ImageProps = {
  width: number;
  height: number;
  imageUrl: string;
};
const ImageLoading: FC<ImageProps> = ({ imageUrl, width, height }) => {
  const [highRes, setHighRes] = useState("d-none");
  const [LowRes, setLowRes] = useState("d-block");
  useEffect(() => {
    const buffer = new Image(); // Here is the secret! :)
    buffer.onload = () => {
      setLowRes("d-none");
      setHighRes("d-block");
    };
    buffer.src = `https://ik.imagekit.io/cjvyejrxtm/${imageUrl}?tr=h-${height},w-${width}`;
  });
  return (
    <div className="image-container">
      <IKContext
        publicKey="public_LV4KSYYDKUQ9OWZZM0ZIerfMH1s="
        urlEndpoint="https://ik.imagekit.io/cjvyejrxtm"
        transformationPosition="path"
        authenticationEndpoint="https://plantes-et-jardins-back.herokuapp.com/api/products/upload"
      >
        <IKImage
          className={LowRes}
          path={imageUrl}
          transformation={[
            {
              height: height,
              width: width,
              blur: Math.ceil(height/100),
            },
          ]}
        />
        <IKImage
          className={highRes}
          path={imageUrl}
          transformation={[
            {
              height: height,
              width: width,
            },
          ]}
        />
      </IKContext>
    </div>
  );
};

export default ImageLoading;

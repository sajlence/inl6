import React, { Component } from "react";
import { useEffect, useState } from "react";

const imageUrl = "https://api.thecatapi.com/v1/images/search?limit=1";

export default function GetImageFromApi() {
  const [img, setImg] = useState();

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <img src={img} alt="icons" />
    </>
  );
}

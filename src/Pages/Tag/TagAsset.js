import React from "react";

import Header from "../../components/Header/Header";
import WebcamCapture from "../../components/webcam/WebcamCapture";
import TagAssetComp from "../../components/TagComp/TagAssetComp";
import Nav from "../../components/Navbar/Nav";

const TagAsset = () => {
  return (
    <div>
      <Nav />
      <TagAssetComp />
    </div>
  );
};

export default TagAsset;

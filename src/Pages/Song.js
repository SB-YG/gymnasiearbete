import React from "react";
import { useParams } from "react-router-dom";
import SpotifyTrack from "../Components/Fetch/Track";
import SpotifySingle from "../Components/Fetch/Single";

const Song = () => {
  const { type, id } = useParams(); // URL "./{type}/{id}"

  // använd olika komponenter beroende på vilken "type" som används i URLn
  const renderType = (type, id) => {
    if (type === "track") {
      return <SpotifyTrack trackId={id} />;
    } else if (type == "single") {
      return <SpotifySingle singleId={id} />;
    } else if (type === "album") {
      return <p>this is album info</p>; //<SpotifyAlbum albumId={id} />;
    } else {
      return <p>This page doesn't work from here</p>;
    }
  };

  return <div>{renderType(type, id)}</div>;
};

export default Song;

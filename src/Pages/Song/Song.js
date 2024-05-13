import React from "react";
import { useParams } from "react-router-dom";
import SpotifyTrack from "../../Components/Fetch/Track";
import SpotifySingle from "../../Components/Fetch/Single";
import SpotifyAlbum from "../../Components/Fetch/Album";
import "./Song.css";

const Song = () => {
  const { type, id } = useParams(); // URL "./{type}/{id}"

  // använd olika komponenter beroende på vilken "type" som används i URLn
  const renderType = (type, id) => {
    if (type === "track") {
      return <SpotifyTrack trackId={id} />;
    } else if (type == "single") {
      return <SpotifySingle singleId={id} />;
    } else if (type === "album") {
      return <SpotifyAlbum albumId={id} />;
    }
  };

  return <div>{renderType(type, id)}</div>;
};

export default Song;

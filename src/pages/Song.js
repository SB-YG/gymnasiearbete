import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const SongDetails = () => {
  const { id } = useParams();

  const songData = {
    1: { title: "Beliver", artist: "Imagine Dragons", album: "Evolve (2017)" },
    2: { title: "Song 2", artist: "Artist 2", album: "Album 2" },
    3: { title: "Song 3", artist: "Artist 3", album: "Album 3" },
  };

  const song = songData[id];

  return (
    <div>
      <Header />
      <h2>Song Details</h2>
      {song ? (
        <div>
          <p>Title: {song.title}</p>
          <p>Artist: {song.artist}</p>
          <p>Album: {song.album}</p>
          <hr />
        </div>
      ) : (
        <p>Song not found</p>
      )}
    </div>
  );
};

export default SongDetails;

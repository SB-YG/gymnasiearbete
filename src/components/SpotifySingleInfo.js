import React, { useState } from "react";
import { useAccessToken } from "./fetch/AccessToken";

const SpotifySingleInfo = () => {
  const accessToken = useAccessToken();
  const [singleId, setSingleId] = useState("");
  const [singleInfo, setSingleInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSingleId(event.target.value);
  };

  const fetchSingleInfo = () => {
    if (!singleId) {
      setError("Please enter a Spotify single ID.");
      return;
    }

    const apiUrl = `https://api.spotify.com/v1/tracks/${singleId}?market=SV`;

    const fetchConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`, // You should replace `spotifyAccessToken` with your actual access token
      },
    };

    fetch(apiUrl, fetchConfig)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Please use a Spotify Track ID");
        }
        return response.json();
      })
      .then((data) => {
        setSingleInfo(data);
        setError(null);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Spotify Single Info</h1>
      <input
        type="text"
        placeholder="Enter Spotify Single ID"
        value={singleId}
        onChange={handleInputChange}
      />
      <button onClick={fetchSingleInfo}>Get Single Info</button>
      {error && <p>Error: {error}</p>}
      {singleInfo && (
        <div>
          <h2>Title: {singleInfo.name}</h2>
          <p>
            Artist: {singleInfo.artists.map((artist) => artist.name).join(", ")}{" "}
            (ID: {singleInfo.artists.map((artist) => artist.id).join(", ")})
          </p>
          <p>Genre: {singleInfo.genre ? singleInfo.genre : "(no genre)"}</p>
          <p>
            Album name: {singleInfo.album.name} (ID: {singleInfo.album.id})
          </p>
          <p>Album release date: {singleInfo.album.release_date}</p>
          <p>
            Preview:{" "}
            <a href={singleInfo.preview_url} target="_blank">
              Listen here! {/* Will be embeded later */}
            </a>
          </p>
          {singleInfo.album && (
            <img
              src={singleInfo.album.images[1].url}
              alt={singleInfo.album.name}
              className="album-image"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifySingleInfo;

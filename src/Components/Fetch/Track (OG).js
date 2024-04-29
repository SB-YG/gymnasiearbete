{
  /* Component för att anropa info från Spotifys API, få tillbaks den i JSON format, och rendera den på ett enkelt sätt  */
}
import React, { useState } from "react";
import { useAccessToken } from "./AccessToken";

const SpotifyTrackOG = () => {
  const accessToken = useAccessToken();
  const [trackId, setTrackId] = useState("");
  const [trackInfo, setTrackInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setTrackId(event.target.value);
  };

  const fetchTrackInfo = () => {
    if (!trackId) {
      setError("Please enter a Spotify track ID.");
      return;
    }

    const apiUrl = `https://api.spotify.com/v1/tracks/${trackId}?market=SV`;

    const fetchConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        setTrackInfo(data);
        setError(null);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      });
  };

  return (
    <div className="trackInfo">
      <h3>Spotify Track Info</h3>
      <input
        type="text"
        placeholder="Enter Spotify track ID"
        value={trackId}
        onChange={handleInputChange}
      />
      <button onClick={fetchTrackInfo}>Get Track Info</button>
      {error && <p>Error: {error}</p>}
      {trackInfo && (
        <div>
          <h2>Title: {trackInfo.name}</h2>
          <p>
            Artist: {trackInfo.artists.map((artist) => artist.name).join(", ")}{" "}
            (ID: {trackInfo.artists.map((artist) => artist.id).join(", ")})
          </p>
          <p>
            Genre: {trackInfo.genre ? trackInfo.genre : "(no genre fetched)"}
          </p>
          <p>
            Album name: {trackInfo.album.name} (ID: {trackInfo.album.id})
          </p>
          <p>Album release date: {trackInfo.album.release_date}</p>
          <p>
            Preview:{" "}
            <a href={trackInfo.preview_url} target="_blank" rel="noreferrer">
              Listen here! {/* Will be embeded later */}
            </a>
          </p>
          {trackInfo.album && (
            <img
              src={trackInfo.album.images[1].url}
              alt={trackInfo.album.name}
              className="album-image"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifyTrackOG;

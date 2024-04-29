import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";
import ReturnButton from "../ReturnButton";

const SpotifyTrack = ({ trackId }) => {
  const accessToken = useAccessToken();
  const [trackDetails, setTrackDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch track details");
        }

        const data = await response.json();
        setTrackDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (accessToken) {
      fetchTrackDetails();
    }
  }, [accessToken, trackId]); // Include accessToken and trackId as dependencies

  return (
    <>
      {error && <p>Error: {error}</p>}
      {trackDetails && (
        <div className="trackPage">
          <ReturnButton />
          <h1
            style={{
              textDecoration: "underline",
              width: "80%",
              borderBottom: "3px solid pink",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {trackDetails.name}
            <a
              href={trackDetails.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "white",
                textDecoration: "underline",
                marginLeft: "15px",
                marginRight: "auto",
              }}
            >
              <Image src="spotifyLogo.png" alt="Spotify Logo" size="25px" />
            </a>
          </h1>
          <p>Title: {trackDetails.name}</p>
          <p>Artist: {trackDetails.artists[0].name}</p>
          <p>Album: {trackDetails.album.name}</p>
          <p>Album release date: {trackDetails.album.release_date}</p>
          <p>Preview:</p>
          {trackDetails.preview_url && (
            <audio
              src={trackDetails.preview_url}
              controls
              style={{ border: "1px solid white" }}
            />
          )}
          <p>
            Listen on spotify:{" "}
            <a
              href={trackDetails.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              <Image src="spotifyLogo.png" alt="Spotify Logo" size="25px" />
            </a>
          </p>
          {trackDetails.album && (
            <img
              src={trackDetails.album.images[1].url}
              alt={trackDetails.album.name}
              className="album-image"
              style={{ width: "175px", height: "auto" }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SpotifyTrack;

function Image({ src, alt, size }) {
  const imagePath = `/Images/${src}`;
  const style = {
    width: size,
    height: size,
    margin: "0px",
    verticalAlign: "middle",
  };

  return <img src={imagePath} alt={alt} style={style} />;
}

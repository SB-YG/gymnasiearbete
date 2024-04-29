import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";
import ReturnButton from "../ReturnButton";

const SpotifySingle = ({ singleId }) => {
  const accessToken = useAccessToken();
  const [singleDetails, setSingleDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${singleId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch single details");
        }

        const data = await response.json();
        setSingleDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (accessToken) {
      fetchSingleDetails();
    }
  }, [accessToken, singleId]); // Include accessToken and singleId as dependencies

  return (
    <>
      {error && <p>Error: {error}</p>}
      {singleDetails && (
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
            {singleDetails.name}
            <a
              href={singleDetails.external_urls.spotify}
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
          <p>
            Title: {singleDetails.name} - {singleDetails.album_type}
          </p>
          <p>Artist: {singleDetails.artists[0].name}</p>
          <p>Album: {singleDetails.name}</p>
          <p>Album release date: {singleDetails.release_date}</p>
          <p>Preview:</p>
          {singleDetails.preview_url && (
            <audio
              src={singleDetails.preview_url}
              controls
              style={{ border: "1px solid white" }}
            />
          )}
          <p>
            Listen on spotify:{" "}
            <a
              href={singleDetails.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              <Image src="spotifyLogo.png" alt="Spotify Logo" size="25px" />
            </a>
          </p>
          {singleDetails.images[0].url && (
            <img
              src={singleDetails.images[0].url}
              alt={singleDetails.name}
              className="album-image"
              style={{ width: "175px", height: "auto" }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SpotifySingle;

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

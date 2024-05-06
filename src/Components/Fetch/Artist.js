{
  /* En liknande component som Track.js men för artist info, så som alla dess låter i en lista, profilbild m.m. */
}

import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";

const ArtistInfo = () => {
  const accessToken = useAccessToken();
  const [artistData, setArtistData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/53XhwfbYqKCa1cC15pYq2q`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch track data");
        }

        const data = await response.json();
        setArtistData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (accessToken) {
      fetchArtistData();
    }
  }, [accessToken]); // Include accessToken and artistId as dependencies

  const ExternalURL = {
    1: {
      platform: "YouTube",
      url: "https://www.youtube.com/@ImagineDragons",
    },
    2: {
      platform: "Apple Music",
      url: "https://music.apple.com/us/artist/imagine-dragons/358714030",
    },
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      {artistData && (
        <div className="aboutPage">
          <h1 style={{ textDecoration: "underline", marginTop: "5px" }}>
            About {artistData.name}
          </h1>
          <div className="artistInfo">
            <div className="artistInfo-Item">
              <a
                href={artistData.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                <Image src="spotify.png" alt="Spotify Logo" size="25px" />
              </a>
              <a href={ExternalURL[1].url} target="_blank" rel="noreferrer">
                <Image src="youtube.png" alt="YouTube Logo" size="25px" />
              </a>
              <a href={ExternalURL[2].url} target="_blank" rel="noreferrer">
                <Image
                  src="appleMusic.png"
                  alt="Apple Music Logo"
                  size="25px"
                />
              </a>
            </div>
            <div
              className="artistInfo-Item artistInfo-Image"
              style={{
                background: `url(${artistData.images[0].url}) center center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              hi
            </div>
          </div>
          <p>
            url:
            <a
              href={artistData.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
            >
              listen
            </a>
          </p>
          <p>followers: {artistData.followers.total}</p>
          <p>Genres:</p>
          <ul>
            {artistData.genres.map((genre, index) => (
              <li key={index} style={{ color: "magenta" }}>
                {genre} - {index + 1}
              </li>
            ))}
          </ul>

          <p>image:</p>
          {artistData.images[0].url && (
            <img
              src={artistData.images[1].url}
              alt={artistData.name}
              className="artist-image"
              width="150px"
              height="150px"
            />
          )}
        </div>
      )}
    </>
  );
};

export default ArtistInfo;

function Image({ src, alt, size }) {
  const imagePath = `/Images/${src}`;
  const style = {
    width: size,
    height: "auto",
    margin: "0px 5px",
    verticalAlign: "middle",
  };

  return <img src={imagePath} alt={alt} style={style} />;
}

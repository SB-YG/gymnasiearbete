{
  /* En liknande component som Track.js men för artist info, så som alla dess låter i en lista, profilbild m.m. */
}

import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";
import ReturnButton from "../ReturnButton";

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

  return (
    <>
      {error && <p>Error: {error}</p>}
      <h1>h1</h1>
      {artistData && (
        <div className="trackPage">
          <ReturnButton />
          <h1 style={{ textDecoration: "underline" }}>{artistData.name}</h1>
          <p>url: {artistData.external_urls.spotify}</p>
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
              width="75px"
              height="75px"
            />
          )}
        </div>
      )}
    </>
  );
};

export default ArtistInfo;

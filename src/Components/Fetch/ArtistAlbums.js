{
  /* En liknande component som Track.js men för artist info, så som alla dess låter i en lista, profilbild m.m. */
}

import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";

const ArtistAlbums = ({ group }) => {
  const accessToken = useAccessToken();
  const [artistData, setArtistData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/53XhwfbYqKCa1cC15pYq2q/albums?include_groups=${group}&market=SV&limit=50&offset=0`,
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
      {artistData && (
        <div className="trackPage">
          <h1 style={{ textDecoration: "underline" }}>{artistData.name}</h1>

          <ul>
            {artistData.items.map((album, index) => (
              <li key={index}>
                <h3>
                  {index + 1}. {album.name} - {album.album_type} ({album.id})
                </h3>
                <p>Release Date: {album.release_date}</p>
                <p>Total Tracks: {album.total_tracks}</p>
                <p>
                  <a
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Spotify
                  </a>
                </p>
                <a href={`${album.album_type}/${album.id}`}>
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    width="75px"
                    height="75px"
                  />
                </a>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ArtistAlbums;

{
  /* En liknande component som Track.js men för artist info, så som alla dess låter i en lista, profilbild m.m. */
}

import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";
import EmptySpace from "../EmptySpace";

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
      {artistData ? (
        <div className="trackPage">
          <h1 style={{ textDecoration: "underline" }}>{artistData.name}</h1>

          <ul className="flex-container">
            {artistData.items.map((album, index) => (
              <li
                key={index}
                className="flex-item"
                style={{
                  backgroundImage: `url(${album.images[0].url})`,
                }}
              >
                <a href={`${album.album_type}/${album.id}`}>
                  <AlbumTitle title={album.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptySpace margin="100vh" /> /* innan alla album/singles är renderade (ca 0.5 sekunder), för att inte skapa problem med uppbyggnad*/
      )}
    </>
  );
};

export default ArtistAlbums;

const AlbumTitle = ({ title }) => {
  // Komponent för att förkorta ned titlar, bl.a. ta bort [] och () med specifika undantag. Använder regex för att korta ned titlarna
  let modifiedTitle = title;
  const hasSquareBrackets = title.includes("[");

  if (hasSquareBrackets) {
    modifiedTitle = modifiedTitle.replace(/\[.*?\]/g, "");
  } else {
    if (!title.includes("(Deluxe)")) {
      if (!title.includes("feat")) {
        modifiedTitle = modifiedTitle.replace(/\(.*?\)/g, "");
      }
    }
  }
  if (title.includes("(With") || title.includes("(with")) {
    modifiedTitle = modifiedTitle.replace(/\(.*?\)/g, "");
  }

  return modifiedTitle;
};

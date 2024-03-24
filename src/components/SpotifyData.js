import React, { useState, useEffect } from "react";
import ArtistInfo from "./ArtistInfo";
import spotifyAccessToken from "../tokens/SpotifyAccessToken";

const SpotifyData = () => {
  const accessToken = spotifyAccessToken;

  const [spotifyData, setSpotifyData] = useState(null);

  useEffect(() => {
    // Din fetch-kod här för att hämta Spotify-data
    const apiUrl = "https://api.spotify.com/v1/artists/53XhwfbYqKCa1cC15pYq2q";

    const fetchConfig = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(apiUrl, fetchConfig)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSpotifyData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [accessToken]);

  return (
    <div>
      <h1>Spotify Data</h1>
      <ArtistInfo artistData={spotifyData} />
    </div>
  );
};

export default SpotifyData;

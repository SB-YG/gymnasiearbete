import React, { useState, useEffect } from "react";

const SpotifyData = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);
  const [error, setError] = useState(null); // Add state for errors

  useEffect(() => {
    const generateAccessToken = async () => {
      const clientId = "2996a4789f6c4508a187d42e86df6eac";
      const clientSecret = "eae403656d5d4b4cb324745279a224e1";

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        }),
      });

      const data = await response.json();
      setAccessToken(data.access_token);
    };

    generateAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      const apiUrl =
        "https://api.spotify.com/v1/artists/53XhwfbYqKCa1cC15pYq2q";

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
          console.log("Spotify Data:", data); // Log the Spotify data
          console.log("Spotify Access Token:", accessToken); // Log the Spotify access token
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          setError(error.message); // Set error message
        });
    }
  }, [accessToken]);

  return (
    <div>
      <h1>Spotify Data</h1>
      {error && <p>Error: {error}</p>} {/* Display error if any */}
      {spotifyData && spotifyData.items ? (
        <>
          <ArtistInfo artistData={spotifyData} />
          <hr />
          <h2>{spotifyData.name} - Albums</h2>
          <div className="albums-container">
            {spotifyData.items.map((album) => (
              <div key={album.id} className="album-item">
                <img src={album.images[0].url} alt={album.name} />
                <h3>{album.name}</h3>
                <p>Release Date: {album.release_date}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpotifyData;

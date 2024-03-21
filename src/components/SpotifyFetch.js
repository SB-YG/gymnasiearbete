import React, { useState, useEffect } from "react";

const SpotifyFetch = () => {
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/artists/53XhwfbYqKCa1cC15pYq2q",
        );
        const data = await response.json();
        setAlbumData(data);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };

    fetchAlbumInfo();
  }, []);

  return (
    <div>
      {albumData && (
        <div>
          <h2>{albumData.name}</h2>
          <p>
            Artist: {albumData.artists.map((artist) => artist.name).join(", ")}
          </p>
          <p>Released: {albumData.release_date}</p>
          {/* Lägg till fler fält här beroende på den data du vill visa */}
        </div>
      )}
    </div>
  );
};

export default SpotifyFetch;

import React, { useState, useEffect } from "react";
import ArtistInfo from "./ArtistInfo";

const SpotifyData = () => {
  const accessToken =
    "BQCM3siJdc7P30lwa0NjYe8ejH3bsvMPW_gvSbz4s1gpwr6yv1fK1TmeNEPo4W_P3NNUbXxmmZTxWLZceGyVJO8NNbh84dg00969iZzNO0wzoquJ_9R-a9J7yttlLkrhFCdqu1Xv7JXrFIBUakM-4PAFy17AveFLoAyhQjjDkQv3xLp6ZPxHv6YMO3e48l6w_VipAYmVq1PRwHltCAEK1OI8v_8CQCZJyu_mc8C_eAHB77UQE3ktS6O1wEhKrrfuSclcOFJY02YhPtdn_HCpBnCHw4qGhbbLVIUSYeO1RdCw3pOMQDswmF1nsRrAxlj_UvMrYNWwxnTsOviOafMJxeYzsFnZ";

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

import React, { useState, useEffect } from "react";

export default function SpotifyFetch({ type, trackId }) {
  const [trackDetails, setTrackDetails] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                "2996a4789f6c4508a187d42e86df6eac:eae403656d5d4b4cb324745279a224e1",
              ),
          },
          body: "grant_type=client_credentials",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        setAccessToken(data.access_token);
        return data.access_token;
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    const fetchTrackDetails = async () => {
      try {
        const accessToken = await fetchAccessToken();
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch track details");
        }

        const data = await response.json();
        setTrackDetails(data);
      } catch (error) {
        console.error("Error fetching track details:", error);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  return (
    <>
      {/* Villkorlig rendering baserat på type */}
      {type === "track" ||
        (!type && trackDetails && (
          <div>
            <h3>Track Details</h3>
            <p>Title: {trackDetails.name}</p>
            <p>Artist: {trackDetails.artists[0].name}</p>
            <p>Album: {trackDetails.album.name}</p>
            <p>track</p>
          </div>
        ))}

      {type === "album" && trackDetails && (
        <div>
          <h3>Album Details</h3>
          <p>Album: {trackDetails.album.name}</p>
          <p>Artist: {trackDetails.artists[0].name}</p>
          {/* Add more album details if needed */}
        </div>
      )}
    </>
  );
}

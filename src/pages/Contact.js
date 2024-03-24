import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Contact() {
  const [trackDetails, setTrackDetails] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // Initialize accessToken state

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
        setAccessToken(data.access_token); // Set accessToken state with the obtained access token
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    const fetchTrackDetails = async () => {
      try {
        const trackId = "5VC29kHMkzcaorzPKUqJbl";
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

    if (accessToken) {
      fetchTrackDetails();
    } else {
      fetchAccessToken();
    }
  }, [accessToken]); // Include accessToken as a dependency to trigger the effect when it changes

  return (
    <>
      <Header />
      <h2>Contact Page</h2>
      {trackDetails && (
        <div>
          <h3>Track Details</h3>
          <p>Title: {trackDetails.name}</p>
          <p>Artist: {trackDetails.artists[0].name}</p>
          <p>Album: {trackDetails.album.name}</p>
          <p>AccessToken: {accessToken}</p> {/* Display the access token */}
          {/* Visa övriga detaljer om låten om det behövs */}
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";

const SpotifyFetch = () => {
  const [trackDetails, setTrackDetails] = useState(null); // Tillståndsvariabel för låtinformation
  const [accessToken, setAccessToken] = useState(null); // Tillståndsvariabel för åtkomsttoken

  useEffect(() => {
    // Funktion för att hämta åtkomsttoken från Spotifys API
    const fetchAccessToken = async () => {
      try {
        // Steg 1: Hämta åtkomsttoken från Spotifys API
        const tokenResponse = await fetch(
          "https://accounts.spotify.com/api/token",
          {
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
          },
        );

        // Steg 2: Kontrollera om svaret är OK
        if (!tokenResponse.ok) {
          console.error("Failed to fetch access token"); // Logga felmeddelande om det inte är OK
          return; // Avsluta funktionen om det inte är OK
        }

        // Steg 3: Omvandla svaret till JSON och spara åtkomsttokenen
        const accessTokenData = await tokenResponse.json();
        setAccessToken(accessTokenData.access_token); // Uppdatera tillståndet med åtkomsttokenen
      } catch (error) {
        console.error("Error fetching access token:", error); // Logga felmeddelandet om något fel uppstår
      }
    };

    // Funktion för att hämta låtinformation med den hämtade åtkomsttokenen
    const fetchTrackDetails = async () => {
      try {
        // Steg 1: Hämta information om en specifik låt från Spotifys API med den hämtade åtkomsttokenen
        const trackId = "5VC29kHMkzcaorzPKUqJbl";
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`, // Använd åtkomsttokenen i autentiseringsheaderen
            },
          },
        );

        // Steg 2: Kontrollera om svaret för låtinformation är OK
        if (!response.ok) {
          throw new Error("Failed to fetch track details"); // Kasta ett fel om det inte är OK
        }

        // Steg 3: Omvandla svaret för låtinformation till JSON och spara låtinformationen
        const data = await response.json();
        setTrackDetails(data); // Uppdatera tillståndet med låtinformationen
      } catch (error) {
        console.error("Error fetching track details:", error); // Logga felmeddelandet om något fel uppstår
      }
    };

    fetchAccessToken(); // Anropa funktionen för att hämta åtkomsttokenen när komponenten renderas
  }, []);

  useEffect(() => {
    // Anropa funktionen för att hämta låtinformation när åtkomsttokenen ändras
    if (accessToken) {
      fetchTrackDetails();
    }
  }, [accessToken]); // Anropa funktionen när accessToken-tillståndet ändras

  return (
    <div>
      {trackDetails && ( // Visa låtinformationen om den finns tillgänglig
        <div>
          <h3>Track Details</h3>
          <p>Title: {trackDetails.name}</p>
          <p>Artist: {trackDetails.artists[0].name}</p>
          <p>Album: {trackDetails.album.name}</p>
          <p>AccessToken: accessToken</p>
          {/* Visa övriga detaljer om låten om det behövs */}
        </div>
      )}
    </div>
  );
};

export default SpotifyFetch;

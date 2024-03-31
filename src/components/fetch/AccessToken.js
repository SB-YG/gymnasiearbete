import { useState } from "react";

export default function AccessToken() {
  const [accessToken, setAccessToken] = useState(null); // Tillståndsvariabel för att lagra åtkomsttoken

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
      setAccessToken(data.access_token); // Sätt åtkomsttoken i staten
      return data.access_token; // Returnera åtkomsttoken
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  // Returnera funktionen fetchAccessToken så att den kan användas externt.
  return fetchAccessToken;
}

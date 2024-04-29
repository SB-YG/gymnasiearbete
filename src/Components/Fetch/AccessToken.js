{
  /* Component för att generera en AccessToken för att få tillgång Spotifys API */
}
import React, { useState, useEffect } from "react";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [clientId, setClientId] = useState("2996a4789f6c4508a187d42e86df6eac");
  const [clientSecret, setClientSecret] = useState(
    "eae403656d5d4b4cb324745279a224e1",
  );

  useEffect(() => {
    const generateAccessToken = async () => {
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

  return accessToken;
};

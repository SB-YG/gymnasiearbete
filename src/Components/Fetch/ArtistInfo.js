{
  /* En liknande component som Track.js men för artist info, så som alla dess låter i en lista, profilbild m.m. */
}

import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";

const ArtistInfo = () => {
  const accessToken = useAccessToken();
  const [artistData, setArtistData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/53XhwfbYqKCa1cC15pYq2q`,
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
  }, [accessToken]); // Include accessToken as dependencies

  const ExternalURL = {
    1: {
      platform: "YouTube",
      url: "https://www.youtube.com/@ImagineDragons",
    },
    2: {
      platform: "Apple Music",
      url: "https://music.apple.com/artist/imagine-dragons/358714030",
    },
    3: {
      platform: "Sound Cloud",
      url: "https://soundcloud.com/imaginedragons",
    },
    4: {
      platform: "Deezer",
      url: "https://www.deezer.com/artist/416239",
    },
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      {artistData && (
        <div className="artistInfo">
          <div
            className="artistInfo-Banner"
            style={{
              background: `url(${artistData.images[0].url}) center center no-repeat`,
            }}
          ></div>
          <h1>About {artistData.name}</h1>
          <hr
            style={{
              backgroundColor: "black",
              height: "2px",
              marginTop: "-10px",
              marginLeft: "50px",
              marginRight: "50px",
              margin: "-16px 50px 5px 50px",
            }}
          />
          <div className="artistInfo-Links">
            <a
              href={artistData.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
            >
              <Image src="spotify.png" alt="Spotify Logo" size="25px" />
            </a>
            <a href={ExternalURL[1].url} target="_blank" rel="noreferrer">
              <Image src="youtube.png" alt="YouTube Logo" size="25px" />
            </a>
            <a href={ExternalURL[2].url} target="_blank" rel="noreferrer">
              <Image src="appleMusic.png" alt="Apple Music Logo" size="25px" />
            </a>
            <a href={ExternalURL[3].url} target="_blank" rel="noreferrer">
              <Image src="soundCloud.png" alt="Sound Cloud Logo" size="25px" />
            </a>
            <a href={ExternalURL[4].url} target="_blank" rel="noreferrer">
              <Image src="deezer.png" alt="Deezer Logo" size="25px" />
            </a>
          </div>
          <div className="artistInfo-Text">
            <p>
              <span style={{ fontSize: "150%", fontWeight: "700" }}>
                Imagine Dragons
              </span>
              , a Las Vegas-born band formed in 2008, isn't your typical band.
              They've taken the world by storm with their electrifying blend of
              pop, rock, and electronic influences, captivating millions. Their
              Spotify following stands at a staggering{" "}
              <b>{artistData.followers.total}</b> strong, a testament to their
              global reach.
              <br />
              <br />
              Imagine Dragons defies easy categorization. Their sound
              incorporates elements of {artistData.genres[1]} and{" "}
              {artistData.genres[2]}, creating a unique sonic identity. Hits
              like "Radioactive" and "Believer" showcase their infectious energy
              and powerful storytelling, leaving a lasting impression on
              listeners.
              <br />
              <br />
              But Imagine Dragons is more than catchy tunes. Their music delves
              into themes of hope, resilience, and overcoming challenges,
              connecting with fans on a deeper level. Their electrifying live
              performances are a must-see, a testament to their raw talent and
              passion.
              <br />
              <br />
              Still active and constantly evolving, Imagine Dragons continues to
              push boundaries. Dive deeper into their world - explore their
              music, connect with their massive fanbase, and experience the
              electrifying force that is Imagine Dragons!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtistInfo;

function Image({ src, alt, size }) {
  const imagePath = `/Images/${src}`;
  const style = {
    width: size,
    height: "auto",
    margin: "0px 5px",
    verticalAlign: "middle",
  };

  return <img src={imagePath} alt={alt} style={style} />;
}

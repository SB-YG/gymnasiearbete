import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";
import ReturnButton from "../ReturnButton";
import EmptySpace from "../EmptySpace";

const SpotifyTrack = ({ trackId }) => {
  const accessToken = useAccessToken();
  const [trackDetails, setTrackDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${trackId}?market=SV`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch track details");
        }

        const data = await response.json();
        setTrackDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (accessToken) {
      fetchTrackDetails();
    }
  }, [accessToken, trackId]);

  return (
    <>
      {error && <p>Error: {error}</p>}
      {trackDetails && (
        <div className="trackPage">
          <ReturnButton />
          <h1>{trackDetails.name}</h1>
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

          <span className="track-link">
            <a
              href={trackDetails.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
            >
              <Image src="spotify.png" alt="Spotify Logo" size="35px" />
            </a>
          </span>
          <div class="track">
            <div className="track-item">
              <p>
                <b>{trackDetails.name}</b> is a track made by{" "}
                {trackDetails.artists.map((artist, index) => (
                  <>
                    <a
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "black" }}
                    >
                      {artist.name}
                    </a>
                    {/* comma if not the last artist */}
                    {index !== trackDetails.artists.length - 1 && ", "}
                  </>
                ))}
                . It is featured on the {trackDetails.album.album_type}{" "}
                <a
                  href={trackDetails.album.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "black" }}
                >
                  {trackDetails.album.name}
                </a>
                , released on {trackDetails.album.release_date}.
                <br />
                It's duration is{" "}
                <FormatDuration ms={trackDetails.duration_ms} />.
              </p>
              {trackDetails.preview_url ? (
                <>
                  Preview of {trackDetails.name}:
                  <audio
                    src={trackDetails.preview_url}
                    controls
                    style={{ border: "1px solid black" }}
                  />
                </>
              ) : (
                <div className="listenOnSpotify">
                  <br />
                  <a
                    href={trackDetails.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Listen on to {trackDetails.name}
                  </a>{" "}
                  <a
                    href={trackDetails.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black" }}
                  >
                    on Spotify
                  </a>
                  .
                </div>
              )}
            </div>
            <div
              className="track-item track-img"
              style={{
                backgroundImage: `url(${trackDetails.album.images[0].url})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div className="copyrights">
            <EmptySpace margin="1px" />
          </div>
        </div>
      )}
    </>
  );
};

export default SpotifyTrack;

function Image({ src, alt, size }) {
  const imagePath = `/Images/${src}`;
  const style = {
    width: size,
    height: size,
    margin: "0px",
    verticalAlign: "middle",
  };

  return <img src={imagePath} alt={alt} style={style} />;
}

function FormatDuration({ ms }) {
  // Convert milliseconds to seconds
  let totalSeconds = ms / 1000;

  // Calculate minutes and seconds
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);

  // Format the output
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

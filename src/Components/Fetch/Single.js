import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";
import ReturnButton from "../ReturnButton";

const SpotifySingle = ({ singleId }) => {
  const accessToken = useAccessToken();
  const [singleDetails, setSingleDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${singleId}?market=SV`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch single details");
        }

        const data = await response.json();
        setSingleDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (accessToken) {
      fetchSingleDetails();
    }
  }, [accessToken, singleId]);
  return (
    <>
      {error && <p>Error: {error}</p>}
      {singleDetails && (
        <div className="trackPage">
          <ReturnButton />
          <h1>{singleDetails.name}</h1>
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
              href={singleDetails.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
            >
              <Image src="spotify.png" alt="Spotify Logo" size="35px" />
            </a>
          </span>
          <div class="track">
            <div className="track-item">
              <p>
                <b>{singleDetails.name}</b> is a {singleDetails.album_type} made
                by{" "}
                {singleDetails.artists.map((artist, index) => (
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
                    {index !== singleDetails.artists.length - 1 && ", "}
                  </>
                ))}
                .<br />
                The {singleDetails.album_type} was released on{" "}
                {singleDetails.release_date}.
              </p>
              {singleDetails.preview_url ? (
                <>
                  Preview of {singleDetails.name}:
                  <audio
                    src={singleDetails.preview_url}
                    controls
                    style={{ border: "1px solid black" }}
                  />
                </>
              ) : (
                <div className="listenOnSpotify">
                  <br />
                  <a
                    href={singleDetails.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Listen on to {singleDetails.name}
                  </a>{" "}
                  <a
                    href={singleDetails.external_urls.spotify}
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
                backgroundImage: `url(${singleDetails.images[0].url})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div className="copyrights">{singleDetails.copyrights[0].text}</div>
        </div>
      )}
    </>
  );
};

export default SpotifySingle;

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

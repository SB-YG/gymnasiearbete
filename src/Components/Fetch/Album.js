{
  /* En liknande component som Track.js men för Album info, så som alla låter i ett album m.m. */
}
import React, { useState, useEffect } from "react";
import { useAccessToken } from "./AccessToken";
import ReturnButton from "../ReturnButton";

const SpotifyAlbum = ({ albumId }) => {
  const accessToken = useAccessToken();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${albumId}?tracks?market=SV&limit=50&offset=0`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch album details");
        }

        const data = await response.json();
        setAlbumDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (accessToken) {
      fetchAlbumDetails();
    }
  }, [accessToken, albumId]);

  return (
    <>
      {error && <p>Error: {error}</p>}
      {albumDetails && (
        <div className="albumPage">
          <ReturnButton />
          <h1>{albumDetails.name}</h1>
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
              href={albumDetails.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
            >
              <Image src="spotify.png" alt="Spotify Logo" size="35px" />
            </a>
          </span>
          <div class="track">
            <div className="track-item">
              <p>
                <b>{albumDetails.name}</b> is an album by{" "}
                {albumDetails.artists.map((artist, index) => (
                  <>
                    <a
                      href={`https://open.spotify.com/artist/${artist.id}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "black" }}
                    >
                      {artist.name}
                    </a>
                  </>
                ))}
                , released on {albumDetails.release_date}.<br />
                It consists of <i>{albumDetails.total_tracks}</i> tracks in
                total listed below:
                <ol>
                  {albumDetails.tracks.items.map((track) => (
                    <li>
                      <a href={`/track/${track.id}`} style={{ color: "black" }}>
                        {track.name}
                      </a>
                    </li>
                  ))}
                </ol>
              </p>
              <div className="listenOnSpotify">
                <br />
                <a
                  href={albumDetails.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Listen on to {albumDetails.name}
                </a>{" "}
                <a
                  href={albumDetails.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "black" }}
                >
                  on Spotify
                </a>
                .
              </div>
            </div>
            <div
              className="track-item track-img"
              style={{
                backgroundImage: `url(${albumDetails.images[0].url})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div className="copyrights">{albumDetails.copyrights[0].text}</div>
        </div>
      )}
    </>
  );
};

export default SpotifyAlbum;

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

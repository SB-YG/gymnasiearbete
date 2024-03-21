import React from "react";

const ArtistInfo = ({ artistData }) => {
  return (
    <div>
      <h2>Artist Information</h2>
      {artistData && (
        <div>
          <p>Artist Name: {artistData.name}</p>
          <p>Followers: {artistData.followers.total}</p>
          <p>Genres: {artistData.genres.join(", ")}</p>
          <p>Popularity: {artistData.popularity}</p>
          <p>
            External URL:{" "}
            <a
              href={artistData.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {artistData.external_urls.spotify}
            </a>
          </p>
          <p>Images:</p>
          <div>
            {artistData.images.map((image, index) => (
              <img key={index} src={image.url} alt={`Artist Image ${index}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistInfo;

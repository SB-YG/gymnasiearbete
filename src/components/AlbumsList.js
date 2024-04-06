import React from "react";

const AlbumsList = ({ albums }) => {
  return (
    <div className="albums-container">
      <h2>{albums[0].artists[0].name} - Albums</h2>{" "}
      {/* Access artist name from albums */}
      {albums.map((album) => (
        <div key={album.id} className="album-item">
          <img src={album.images[0].url} alt={album.name} />
          <h3>{album.name}</h3>
          <p>Release Date: {album.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumsList;

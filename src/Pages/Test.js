import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import ArtistAlbums from "../Components/Fetch/ArtistAlbums";

export default function Test() {
  return (
    <>
      <Header />
      <ArtistAlbums />
    </>
  );
}

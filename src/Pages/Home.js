import Header from "../Components/Header";
import Counter from "../Components/Counter";
import SpotifyTrackOG from "../Components/Fetch/Track (OG)";

import { useState } from "react";

export default function Home() {
  return (
    <div className="homePage">
      <h1>Welcome!</h1>
      <h2>Explore the Music of Imagine Dragons</h2>
      <p>
        Explore Imagine Dragons Explorer! This website, built on React
        celebrates the music of Imagine Dragons. Through Spotifys API we
        showcase details, about Imagine Dragons albums, songs and additional
        content. Delve into their music collection uncover treasures. Fully
        immerse yourself in the realm of Imagine Dragons.
      </p>
      <br />
      {/*<Counter />*/}
      <SpotifyTrackOG />
    </div>
  );
}

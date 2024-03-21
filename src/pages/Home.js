import Header from "../components/Header";
import Counter from "../components/Counter";
import ArtistInfo from "../components/ArtistInfo";

import { useState } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <h2>Home Page</h2>
      <>
        <p>Hi there!</p>
        <br />
        <Counter />
        <ArtistInfo />
      </>
    </>
  );
}

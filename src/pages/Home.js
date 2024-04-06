import Header from "../components/Header";
import Counter from "../components/Counter";
import SpotifySingleInfo from "../components/SpotifySingleInfo";

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
        <hr />
        <SpotifySingleInfo />
        <p>new paragraph!</p>
      </>
    </>
  );
}

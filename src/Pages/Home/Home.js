import "./Home.css";

import { useState } from "react";

export default function Home() {
  return (
    <div className="homePage">
      <div
        className="welcomeScreen"
        style={{ backgroundImage: "url('/Images/banner.png')" }}
      ></div>
      <h2>Dive Deep into the World of Imagine Dragons</h2>
      <hr
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          height: "2px",
          marginTop: "-5px",
          marginLeft: "50px",
          marginRight: "50px",
          margin: "-5px 50px 5px 50px",
        }}
      />
      <p>
        Experience Imagine Dragons like never before! This website is your
        ultimate resource, fueled by the power of Spotify API. Explore their
        electrifying discography in detail, with each album showcasing data
        directly from Spotify.
        <br />
        <br />
        Uncover fascinating details like fan favorites and delve deeper into the
        stories behind their music. Here, you can explore songs, albums, and
        connect with a dedicated Imagine Dragons community. Become a true
        Believer and unleash the Dragons within!
      </p>
      <h3>
        <span> Website Features</span>
      </h3>
      <div class="websiteFeatures">
        <div class="feature">
          <h4>
            <a href="/about">The Band</a>
          </h4>{" "}
          Meet the musical minds behind Imagine Dragons! This section provides a
          quick introduction to the band members and their musical journey.
        </div>
        <div class="feature">
          <h4>
            <a href="/discography">Discography</a>
          </h4>{" "}
          Unleash your inner music explorer! Dive deep into Imagine Dragons'
          complete discography. Discover a collection of albums and singles that
          showcase their evolution and musical mastery.
        </div>
      </div>
    </div>
  );
}

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import ArtistAlbums from "../../Components/Fetch/ArtistAlbums";
import "./Discography.css";

export default function Discography() {
  useEffect(() => {
    // effekt för att förhindra att flikarna överlappar navigeringslinkar på mobil
    const navCheck = document.getElementById("nav-check");

    const handleNavCheck = () => {
      const tabList = document.querySelector(".react-tabs__tab-list");
      tabList.style.visibility = navCheck.checked ? "hidden" : "visible";
    };

    navCheck.addEventListener("change", handleNavCheck);

    return () => {
      navCheck.removeEventListener("change", handleNavCheck);
    };
  }, []);
  return (
    <div className="discography">
      <Header />
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
      <Tabs>
        <TabList>
          <Tab>Albums</Tab>
          <Tab>Singles</Tab>
        </TabList>

        <TabPanel>
          <h2
            style={{
              textAlign: "center",
              textDecoration: "underline",
              paddingTop: "5px",
            }}
          >
            Albums
          </h2>
          <ArtistAlbums group="album" />
        </TabPanel>

        <TabPanel>
          <h2
            style={{
              textAlign: "center",
              textDecoration: "underline",
              paddingTop: "5px",
            }}
          >
            Singles
          </h2>
          <ArtistAlbums group="single" />
        </TabPanel>
      </Tabs>
    </div>
  );
}

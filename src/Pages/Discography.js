import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import ArtistAlbums from "../Components/Fetch/ArtistAlbums";

export default function Discography() {
  return (
    <>
      <Header />
      {/*<ArtistAlbums group="single" />*/}
      <Tabs>
        <TabList>
          <Tab>Albums</Tab>
          <Tab>Singles</Tab>
        </TabList>

        <TabPanel>
          <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
            Albums
          </h2>
          <ArtistAlbums group="album" />
        </TabPanel>

        <TabPanel>
          <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
            Singles
          </h2>
          <ArtistAlbums group="single" />
        </TabPanel>
      </Tabs>
    </>
  );
}

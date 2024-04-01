import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
// routes
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Discography from "./pages/Discography";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import SongDetails from "./pages/Song";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />{" "}
          {/* Redirect */}
          <Route path="/index" element={<Home />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/song" element={<SongDetails />} />
          <Route path="/song/:id" element={<SongDetails />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

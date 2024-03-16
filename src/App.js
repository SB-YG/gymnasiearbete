import "./styles.css";
import "./App.css";
import Menu from "./Navbar";
import { useState } from "react";
// routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Discography from "./pages/Discography";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <div>
      <>this is on every page</>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/index" element={<Home />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

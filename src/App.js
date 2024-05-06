import "./App.css";
import Navbar from "./Layout/Navbar/Navbar";
import Footer from "./Layout/Footer/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import Song from "./Pages/Song";
import Test from "./Pages/Test";
import About from "./Pages/About";
import Discography from "./Pages/Discography";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="Content">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/index" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/discography" element={<Discography />} />
            <Route path="/about" element={<About />} />
            <Route path="/:type/:id" element={<Song />} />
            <Route path="*" element={<NoPage />} /> {/* 404 page */}
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
};

export default App;

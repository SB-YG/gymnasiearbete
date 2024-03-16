import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Logo />
      <MenuToggle isOpen={isOpen} toggleMenu={toggleMenu} />
      <Menu isOpen={isOpen} />
    </nav>
  );
};

const Logo = () => {
  return <div className="navbar-logo">Logo</div>;
};

const MenuToggle = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className={`navbar-toggle ${isOpen ? "active" : ""}`}
      onClick={toggleMenu}
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  );
};

const Menu = ({ isOpen }) => {
  return (
    <div className={`navbar-links ${isOpen ? "active" : ""}`}>
      <MenuItem link="/">Hem</MenuItem>
      <MenuItem link="/">Om oss</MenuItem>
      <MenuItem link="/">Kontakt</MenuItem>
    </div>
  );
};

const MenuItem = ({ link, children }) => {
  return (
    <a href={link} className="menu-item">
      {children}
    </a>
  );
};

export default Navbar;

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/sound.png" />
      </div>
      <div className="menu">
        <a href="/" className="menu-item">
          Home
        </a>
        <a href="/discography" className="menu-item">
          Discography
        </a>
        <a href="/about" className="menu-item">
          About
        </a>
        <a href="/contact" className="menu-item">
          Contact
        </a>
      </div>
    </div>
  );
}

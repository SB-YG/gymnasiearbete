import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">
          <Image />
          Imagine Dragons Explorer
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <NavbarLink a="home" />
        <NavbarLink a="about" />
        <NavbarLink a="discography" />
      </div>
    </div>
  );
}

function NavbarLink({ a }) {
  const capitalizeFirstLetter = (string) => {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return <a href={"/" + a}>{capitalizeFirstLetter(a)}</a>;
}

function Image() {
  return (
    <img
      src="/Images/note.png"
      style={{
        width: "1em",
        height: "1em",
        marginRight: "0.5em",
        paddingTop: "0.225em",
      }}
    />
  );
}

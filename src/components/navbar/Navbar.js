import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div class="nav">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">
            <Image />
            Website
          </div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div class="nav-links">
          <NavbarLink a="home" />
          <NavbarLink a="about" />
          <NavbarLink a="discography" />
          <NavbarLink a="gallery" />
          <NavbarLink a="contact" />
        </div>
      </div>
    </>
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
      src="/sound.png"
      style={{
        width: "1em",
        height: "1em",
        marginRight: "0.5em",
        paddingTop: "0.225em",
        filter: "invert(100%)",
      }}
    />
  );
}

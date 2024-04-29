import Header from "../Components/Header";
import ArtistInfo from "../Components/Fetch/Artist";

export default function About() {
  return (
    <>
      <Header />
      <h2 style={{ textAlign: "center" }}>About Page</h2>
      <ArtistInfo artistId="53XhwfbYqKCa1cC15pYq2q" />

      <p style={{ textAlign: "center" }}>
        Return to the{" "}
        <a href="/" style={{ color: "white" }}>
          home page
        </a>
        .
      </p>
    </>
  );
}

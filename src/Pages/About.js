import Header from "../Components/Header";
import ArtistInfo from "../Components/Fetch/Artist";

export default function About() {
  return (
    <>
      <ArtistInfo artistId="53XhwfbYqKCa1cC15pYq2q" />

      <p style={{ textAlign: "center" }}>
        Return to the{" "}
        <a href="/" style={{ color: "black" }}>
          home page
        </a>
        .
      </p>
    </>
  );
}

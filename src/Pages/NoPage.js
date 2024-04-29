import Header from "../Components/Header";

export default function NoPage() {
  return (
    <>
      <Header />
      <h2 style={{ textAlign: "center" }}>Error 404: Page not found</h2>
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

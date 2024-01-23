import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1 style={{ color: "green" }}>Hello World</h1>
      <h2>A website in react in the making</h2>
      <img
        style={{
          width: "50%",
          height: "50%",
          backgroundColor: "red",
          borderRadius: "10px",
        }}
        src="https://www.reactjs.org/logo-og.png"
        alt="React Image"
      />
    </div>
  );
}

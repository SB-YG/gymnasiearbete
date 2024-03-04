import "./styles.css";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <h1 style={{ color: "green" }}>Gymnasiearbete</h1>
      <h2>A website in react</h2>
      <img
        className="image"
        src="https://www.reactjs.org/logo-og.png"
        alt="React Image"
      />
      <br />
      <MyButton />
      <ul>
        <li>https://www.figma.com/</li>
        <li>https://www.flaticon.com/</li>
      </ul>
    </div>
  );
}

// functions below;

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}

/*
      <img
        style={{
          className: "image",
          width: "50%",
          height: "50%",
          backgroundColor: "red",
          borderRadius: "10px",
        }}
        src="https://www.reactjs.org/logo-og.png"
        alt="React Image"
      />*/

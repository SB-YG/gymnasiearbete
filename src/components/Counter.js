import React, { useState } from "react";

const Counter = () => {
  // Använd useState för att skapa ett tillstånd för räknaren med initialvärdet 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;

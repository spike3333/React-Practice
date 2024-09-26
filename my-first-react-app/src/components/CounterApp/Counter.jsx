import React from "react";
import "./counter.css";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncreaseCount = () => {
    setCount(Math.min(3,count + 1));
    console.log(count);
  };
  const handleDecreaseCount = () => {
    // count != 0 ? setCount(count - 1) : setCount(0);
    setCount(Math.max(0, count-1))
    console.log(count);
  };

  const handleReset = () => {
    setCount(0);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>This is my counter application</h1>

      <div className="counter_div">
        <button onClick={handleIncreaseCount}>Increase +</button>

        <input type="text" value={count} readOnly></input>

        <button onClick={handleDecreaseCount}>Decrease -</button>
      </div>


        <button style={{display:"block",margin:"0, auto"}} onClick={handleReset}> Reset </button>

    </>
  );
};

export default Counter;

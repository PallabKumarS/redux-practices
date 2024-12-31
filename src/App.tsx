import React from "react";
import {
  decrement,
  increment,
  incrementBy5,
} from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.counter);

  const handleIncrement = (amount: number) => {
    dispatch(increment(amount));
  };

  const handleDecrement = (amount: number) => {
    dispatch(decrement(amount));
  };

  return (
    <div className="">
      <h1 className="">Counter With Redux</h1>
      <button onClick={() => handleIncrement(1)}>Increment +</button>
      <button onClick={() => handleIncrement(5)}>Increment by 5</button>
      <div>{count}</div>
      <button onClick={() => handleDecrement(1)}>Decrement -</button>
      <button onClick={() => handleDecrement(5)}>Decrement by 5</button>
    </div>
  );
}

export default App;

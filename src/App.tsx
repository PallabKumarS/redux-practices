// import { decrement, increment } from "./redux/features/counter/counterSlice";
// import { useAppDispatch, useAppSelector } from "./redux/hook";
// import { Button } from "./components/ui/button";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

function App() {
  // const dispatch = useAppDispatch();
  // const { count } = useAppSelector((state) => state.counter);

  // const handleIncrement = (amount: number) => {
  //   dispatch(increment(amount));
  // };

  // const handleDecrement = (amount: number) => {
  //   dispatch(decrement(amount));
  // };

  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;

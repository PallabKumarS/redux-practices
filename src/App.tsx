import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { Button } from "./components/ui/button";

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
    <div className="mt-5 text-center">
      <h1 className="">Counter With Redux</h1>
      <Button className="mx-4" onClick={() => handleIncrement(1)}>
        Increment +
      </Button>
      <Button className="mx-4" onClick={() => handleIncrement(5)}>
        Increment by 5
      </Button>
      <div>{count}</div>
      <Button className="mx-4" onClick={() => handleDecrement(1)}>
        Decrement -
      </Button>
      <Button className="mx-4" onClick={() => handleDecrement(5)}>
        Decrement by 5
      </Button>
    </div>
  );
}

export default App;

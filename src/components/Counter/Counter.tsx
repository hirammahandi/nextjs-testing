import { ChangeEvent, useState } from "react";

export interface CounterProps {
  description: string;
  defaultCount: number;
}

export const Counter = ({ description, defaultCount }: CounterProps) => {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);

  const handleChangeIncrementor = (e: ChangeEvent<HTMLInputElement>) =>
    setIncrementor(+e.target.value || 0);

  return (
    <div>
      <h2>
        DESC:{description} - DC: {defaultCount}
      </h2>
      <label>
        Incrementor:
        <input
          type="number"
          name="incrementor"
          value={incrementor}
          onChange={handleChangeIncrementor}
        />
      </label>
      <button
        aria-label="Decrement"
        onClick={() => setCount(count - incrementor)}
      >
        -
      </button>
      Current Count: {count}
      <button
        aria-label="Increment"
        onClick={() => setCount(count + incrementor)}
      >
        +
      </button>
      <button
        aria-label="Increment Async"
        onClick={() => setTimeout(() => setCount(count + incrementor), 200)}
      >
        + Async
      </button>
    </div>
  );
};

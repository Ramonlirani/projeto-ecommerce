import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function InputIncrement() {
  const [value, setValue] = useState<number>(1);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) || event.target.value === "") {
      setValue(newValue);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          className="w-10 bg-tomilho-500 rounded-md flex items-center justify-center text-white"
          type="button"
          onClick={handleDecrement}
          disabled={value === 0}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <input
          type="number"
          className="rounded-md w-24 text-end"
          value={value}
          onChange={handleInputChange}
        />
        <button
          className="w-10 bg-tomilho-500 rounded-md flex items-center justify-center text-white"
          type="button"
          onClick={handleIncrement}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

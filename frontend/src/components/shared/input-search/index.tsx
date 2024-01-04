import { InputHTMLAttributes, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  setSearch: (search: string) => void;
  refetch: any;
}

export const InputSearch = ({
  placeholder,
  setSearch,
  refetch,
  ...rest
}: CustomInputProps) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = (event: any) => {
    setIsFilled(!!event.target.value);
  };

  function getClasses() {
    return `block w-full rounded-md border-0 text-gray-700 ring-1 ring-gray-300 placeholder:text-gray-300 focus:ring-red-600 focus:ring-1 sm:text-sm sm:leading-6 pr-10`;
  }

  function handleChange(event: any) {
    setSearch(event.target.value);
  }

  return (
    <div className="relative rounded-md shadow-sm">
      <input
        {...rest}
        step={"any"}
        onBlur={(event) => handleInputBlur(event)}
        className={getClasses()}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <div
        className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 border-l-2 pl-2"
        onClick={refetch}
      >
        <MagnifyingGlassIcon
          className={`h-5 w-5 ${
            isFilled ? "text-red-600" : "text-gray-400"
          } opacity-80`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

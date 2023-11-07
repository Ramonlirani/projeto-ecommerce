import { ButtonHTMLAttributes } from "react";
import { Loading } from "../loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({
  children,
  disabled = false,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <div>
      <button
        {...rest}
        disabled={disabled || isLoading}
        className="flex items-center w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black min-w-[150px] "
      >
        {isLoading && <Loading />}
        {children}
      </button>
    </div>
  );
}

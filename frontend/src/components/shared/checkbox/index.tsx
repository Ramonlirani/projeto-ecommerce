import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: FieldError | undefined;
  isRequired?: boolean;
}

const CheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
> = ({ id, label, error, isRequired = false, ...rest }, ref) => {
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          {...rest}
          ref={ref}
          id={id}
          type="checkbox"
          className="mr-3 w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2 "
        />
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-700"
        >
          {label + (isRequired ? " *" : "")}
        </label>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error.message}
        </p>
      )}
    </>
  );
};

export const Checkbox = forwardRef(CheckboxBase);

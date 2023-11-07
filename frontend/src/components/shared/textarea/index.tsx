import {
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { FieldError } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface CustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;

  error?: FieldError;
  divClasses?: string;
  isRequired?: boolean;
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  CustomTextareaProps
> = (
  {
    label,
    placeholder,
    error,
    divClasses = undefined,
    isRequired = false,
    ...rest
  },
  ref
) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleTextareaBlur = (event: any) => {
    setIsFilled(!!event.target.value);
  };

  function getClasses() {
    return `block w-full rounded-md border-0 py-3 text-gray-700 pl-3 ring-1 ring-inset  placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 min-h-[100px] ${
      error
        ? "focus:ring-red-500 ring-red-500"
        : "ring-gray-300 focus:ring-black "
    } ${isFilled && "ring-black ring-1"}`;
  }

  return (
    <div className={divClasses}>
      {label && (
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label + (isRequired ? " *" : "")}
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm">
        <textarea
          {...rest}
          ref={ref}
          onBlur={(event) => handleTextareaBlur(event)}
          className={getClasses()}
          placeholder={placeholder || label}
          aria-invalid={!!error}
        />

        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export const TextArea = forwardRef(TextareaBase);

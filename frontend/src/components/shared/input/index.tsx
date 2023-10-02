import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from "react";
import { FieldError } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  info?: string;
  placeholder?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  error?: FieldError | undefined;
  divClasses?: string;
  isRequired?: boolean;
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
> = (
  {
    label,
    info,
    placeholder,
    Icon,
    error,
    divClasses = undefined,
    isRequired = false,
    ...rest
  },
  ref
) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = (event: any) => {
    setIsFilled(!!event.target.value);
  };

  function getClasses() {
    return `block w-full rounded-md border-0 py-3 text-gray-700 ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${
      error
        ? " focus:ring-red-500 ring-red-500 "
        : " ring-gray-300 focus:ring-tomilho-600 "
    } ${isFilled && " ring-tomilho-600 ring-1 "}
    ${Icon ? " pl-10 " : " pl-3"}`;
  }

  return (
    <div className={divClasses}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-700">
          {label + (isRequired ? " *" : "")}
          {info && <span className="text-xs text-gray-500 ml-2">{info}</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon
              className={`h-5 w-5 ${
                isFilled ? "text-tomilho-600" : "text-tomilho-400"
              } opacity-80 `}
              aria-hidden="true"
            />
          </div>
        )}
        <input
          {...rest}
          ref={ref}
          step={"any"}
          onBlur={(event) => handleInputBlur(event)}
          className={rest?.type !== "radio" ? getClasses() : rest.className}
          placeholder={placeholder || label}
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

export const Input = forwardRef(InputBase);

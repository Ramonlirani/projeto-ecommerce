import { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface InputMaskProps extends PatternFormatProps {
  control: Control<any>;
  name: string;
  format: string;
  label?: string;
  placeholder?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  error?: FieldError | undefined;
  divClasses?: string;
  isRequired?: boolean;
}

export function InputMask({
  control,
  name,
  format,
  label,
  placeholder,
  Icon,
  error,
  divClasses = undefined,
  isRequired = false,
  ...rest
}: InputMaskProps) {
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = (event: any) => {
    setIsFilled(!!event.target.value);
  };

  function getClasses() {
    return `block w-full rounded-md border-0 py-3 text-gray-700 ring-1 ring-inset  placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${
      error
        ? "focus:ring-red-500 ring-red-500"
        : "ring-gray-300 focus:ring-black "
    } ${isFilled && "ring-black ring-1"}
    ${Icon ? "pl-10" : "pl-3"}`;
  }
  return (
    <div className={divClasses}>
      {label && (
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-700"
        >
          {label + (isRequired ? " *" : "")}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon
              className={`h-5 w-5 ${
                isFilled ? "text-black" : "text-jet"
              } opacity-80 `}
              aria-hidden="true"
            />
          </div>
        )}

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, name, value } }) => (
            <PatternFormat
              format={format}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={(event) => handleInputBlur(event)}
              className={getClasses()}
              placeholder={placeholder || label}
              {...rest}
            />
          )}
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
}

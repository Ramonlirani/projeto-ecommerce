import { Switch } from "@headlessui/react";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { FieldError } from "react-hook-form";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CustomToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: any;
  onChange: (event: any) => void;
  name: string;
  error?: FieldError;
  label?: string;
  question?: string;
}

const CustomToggle: ForwardRefRenderFunction<
  HTMLButtonElement,
  CustomToggleProps
> = ({ label, question, name, value, onChange, ...rest }, ref) => {
  return (
    <Switch.Group as="div" className="flex justify-between md:justify-normal ">
      {question && <p className="text-sm text-gray-600 mr-4">{question}</p>}
      <Switch
        {...rest}
        ref={ref}
        name={name}
        checked={value}
        onChange={onChange}
        className={classNames(
          value ? "bg-red-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            value ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      {label && (
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">{label}</span>
        </Switch.Label>
      )}
    </Switch.Group>
  );
};

export const Toggle = forwardRef(CustomToggle);

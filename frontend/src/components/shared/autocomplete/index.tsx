import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Control, Controller, FieldError } from "react-hook-form";

interface AutocompleteProps {
  label: string;
  options: any[];
  control: Control<any>;
  name: string;
  error?: FieldError | undefined;
  isRequired?: boolean;
}
export function Autocomplete({
  label,
  options = [],
  control,
  name,
  error,
  isRequired = false,
}: AutocompleteProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  function getClasses() {
    return `ring-1 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm ${
      error
        ? "focus:ring-red-500 ring-red-500"
        : "ring-gray-300 focus:ring-tomilho-600 "
    }`;
  }

  return (
    <div className="relation z-auto w-full">
      <label className="block text-sm font-medium leading-6 text-gray-700">
        {label + (isRequired ? " *" : "")}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ref, value } }) => (
          <Combobox
            value={options.find((option) => option.id === value) || options[0]}
            onChange={(item) => onChange(item.id)}
            ref={ref}
          >
            <div className="relative">
              <div className={getClasses()}>
                <Combobox.Input
                  className="block w-full rounded-md border-0 py-3 text-gray-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-0"
                  displayValue={(item: any) => item.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                  {filteredOptions.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nada encontrado.
                    </div>
                  ) : (
                    filteredOptions.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        className={({ active }) =>
                          `cursor-pointer relative select-none py-2 pl-10 pr-4 ${
                            active ? "bg-black text-white" : "text-gray-900"
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.name}
                            </span>
                            {active ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 text-white`}
                              >
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        )}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error.message}
        </p>
      )}
    </div>
  );
}

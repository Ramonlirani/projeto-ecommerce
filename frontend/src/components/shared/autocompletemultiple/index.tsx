import { Fragment, InputHTMLAttributes, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { Control, Controller, FieldError } from "react-hook-form";

interface AutocompleteMultipleProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  options: any[];
  divClasses?: string;
  control: Control<any>;

  name: string;
  error?: FieldError | undefined;
  isRequired?: boolean;
}

export default function AutocompleteMultiple({
  isRequired = false,
  label,
  divClasses = undefined,
  options = [],
  control,
  name,
  error,
}: AutocompleteMultipleProps) {
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? options
      : options.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  console.log("filteredPeople", filteredPeople);

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
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ref, value } }) => (
          <Combobox
            value={options.find((option) => option.id === value) || options[0]}
            onChange={(item) => onChange(item.id)}
            multiple
          >
            <div className="relative mt-1 ">
              <div
                className="w-full  
           placeholder:text-gray-400 border-none text-left sm:text-sm "
              >
                <Combobox.Input
                  className="block w-full rounded-md border-0 text-gray-700 border-gray-300 h-12 py-3 pl-3 pr-10 text-sm leading-6 ring-gray-300 ring-1 focus:ring-tomilho-600"
                  displayValue={(people: any) =>
                    people.map((person: any) => person.name).join(", ")
                  }
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
                <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5  sm:text-sm">
                  {filteredPeople.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nada encontrado.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `cursor-pointer relative select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-tomilho-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-tomilho-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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

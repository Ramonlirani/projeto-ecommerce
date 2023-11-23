interface SelectMenuProps {
  options: (string | number)[];
  defaultValue: string | number;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectMenu({ options, defaultValue }: SelectMenuProps) {
  const isNumber = typeof defaultValue === "number";

  return (
    <div>
      <select
        id="location"
        name="location"
        className={classNames(
          isNumber
            ? "mt-2 block w-20 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"
            : "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"
        )}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
}

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchHeader() {
  return (
    <div className="flex items-center py-4 ">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Buscar
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-black"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-off-red sm:text-sm sm:leading-6 hover:bg-gray-200"
            placeholder="Buscar"
            type="search"
          />
        </div>
      </div>
    </div>
  );
}

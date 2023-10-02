import { Dispatch, SetStateAction } from "react";
import { Meta } from "@/interfaces/Meta";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { PaginationItem } from "./pagination-item";

interface PaginationProps {
  meta: Meta;
  setPage: Dispatch<SetStateAction<number>>;
}

const siblingsCount = 1;

function Dots() {
  return (
    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
      ...
    </span>
  );
}

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({ meta, setPage }: PaginationProps) {
  const currentPage = meta.page;
  const lastPage = Math.ceil(meta.itemCount / meta.take);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  function handlePreviousPage() {
    setPage((currentPage) => currentPage - 1);
  }

  function handleNextPage() {
    setPage((currentPage) => currentPage + 1);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={!meta.hasPreviousPage}
          onClick={handlePreviousPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          anterior
        </button>
        <button
          disabled={!meta.hasNextPage}
          onClick={handleNextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          próxima
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando
            <span className="font-medium"> {meta.showing}</span> de{" "}
            <span className="font-medium">{meta.itemCount}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={!meta.hasPreviousPage}
              onClick={handlePreviousPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {currentPage > 1 + siblingsCount && (
              <>
                <PaginationItem onPageChange={setPage} number={1} />
                {currentPage > 2 + siblingsCount && <Dots />}
              </>
            )}

            {previousPages.length > 0 &&
              previousPages.map((page) => {
                return (
                  <PaginationItem
                    onPageChange={setPage}
                    key={page}
                    number={page}
                  />
                );
              })}

            <PaginationItem
              onPageChange={setPage}
              number={currentPage}
              isCurrent
            />

            {nextPages.length > 0 &&
              nextPages.map((page) => {
                return (
                  <PaginationItem
                    onPageChange={setPage}
                    key={page}
                    number={page}
                  />
                );
              })}

            {currentPage + siblingsCount < lastPage && (
              <>
                {currentPage + 1 + siblingsCount < lastPage && <Dots />}
                <PaginationItem onPageChange={setPage} number={lastPage} />
              </>
            )}

            <button
              disabled={!meta.hasNextPage}
              onClick={handleNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

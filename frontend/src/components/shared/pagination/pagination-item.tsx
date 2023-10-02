interface PageItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}
export function PaginationItem({
  isCurrent,
  number,
  onPageChange,
}: PageItemProps) {
  function classes() {
    const inCommon =
      "relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20";
    return (
      inCommon +
      (isCurrent
        ? "z-10  bg-tomilho-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tomilho-600"
        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0")
    );
  }

  return (
    <button
      onClick={() => onPageChange(number)}
      aria-current={isCurrent ? "page" : "false"}
      className={classes()}
    >
      {number}
    </button>
  );
}

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export function NotFoundOrEmpty() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ExclamationCircleIcon width={50} className="text-yellow-500 mb-10" />

      <p className="text-xl text-gray-600">Nenhum item encontrado</p>
    </div>
  );
}

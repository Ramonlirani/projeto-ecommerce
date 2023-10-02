import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { PencilIcon } from "@heroicons/react/24/outline";
import { usePermission } from "@/hooks/zustand/permission";

interface EditButtonProps {
  id: string;
  url: string;
  modelName: string;
}
export function EditButton({ url, id, modelName }: EditButtonProps) {
  const userHasPermission = usePermission().userHasPermission(
    "UPDATE",
    modelName
  );

  return userHasPermission ? (
    <>
      <Link
        href={`/system/${url}/form/${id}`}
        className="mr-2"
        data-tooltip-id={`edit-album-${id}`}
        data-tooltip-content="Editar"
      >
        <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-indigo-700">
          <PencilIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </Link>
      <Tooltip id={`edit-album-${id}`} />
    </>
  ) : null;
}

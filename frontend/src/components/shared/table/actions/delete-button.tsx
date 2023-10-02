import { TrashIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import { deleteEntity } from "@/helpers/delete-entity";
import { useShowConfirmation } from "@/hooks/zustand/show-confirmation";
import { usePermission } from "@/hooks/zustand/permission";

interface DeleteButtonProps {
  id: string;
  url: string;
  modelName: string;
  refetch: () => void;
}
export function DeleteButton({
  id,
  url,
  modelName,
  refetch,
}: DeleteButtonProps) {
  const userHasPermission = usePermission().userHasPermission(
    "DELETE",
    modelName
  );
  const { setShowing, setOnConfirm } = useShowConfirmation();

  async function handleDeleteEntity() {
    setShowing(true);
    setOnConfirm(async () => {
      await deleteEntity({ id, url });
      setShowing(false);
      refetch();
    });
  }

  return userHasPermission ? (
    <>
      <button
        data-tooltip-id={`delete-entity-${id}`}
        data-tooltip-content="Apagar"
        onClick={handleDeleteEntity}
      >
        <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-red-700">
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </button>
      <Tooltip id={`delete-entity-${id}`} />
    </>
  ) : null;
}

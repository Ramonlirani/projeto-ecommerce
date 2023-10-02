import { FetchError } from "@/lib/fetch-json";
import { toast } from "react-toastify";

interface DeleteEntityProps {
  id: string;
  url: string;
  showToast?: boolean;
}

export async function deleteEntity({
  id,
  url,
  showToast = true,
}: DeleteEntityProps) {
  try {
    const body = JSON.stringify({
      id,
      url,
    });

    const response = await fetch("/api/delete", {
      method: "POST",
      body,
    }).then((res) => res.json());

    if (!response.error && showToast) {
      toast.success(`Removido com sucesso`);
    }

    return response;
  } catch (error) {
    if (error instanceof FetchError) {
      toast.warn(error.message);
      return { error: true };
    }

    toast.error((error as Error).message);
    return { error: true };
  }
}

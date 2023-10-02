import { FetchError } from "@/lib/fetch-json";
import { get } from "lodash";
import { toast } from "react-toastify";

interface CreateOrUpdateProps {
  url: string;
  currentEntity: any;
  entityName: string;
  formData: any;
  toastMessage?: string | null;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        const base64String = reader.result as string;
        resolve(base64String);
      } else {
        reject(new Error("Error reading file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsDataURL(file);
  });
}

export async function createOrUpdate({
  currentEntity,
  url,
  entityName,
  formData,
  toastMessage = null,
}: CreateOrUpdateProps) {
  try {
    const id = get(currentEntity, "id");
    const method = id ? "PUT" : "POST";

    const body = JSON.stringify({
      id,
      url,
      method,
      formData,
    });

    const response = await fetch("/api/create-or-update", {
      method: "POST",
      body,
    }).then((res) => res.json());

    if (!response.error) {
      toast.success(
        toastMessage ||
          `${entityName} ${id ? "atualizado" : "cadastrado"} com sucesso`
      );
    } else {
      toast.warn(response.message);
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

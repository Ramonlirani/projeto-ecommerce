import { toast } from "react-toastify";
import fetchJson, { FetchError } from "@/lib/fetch-json";

interface GetByIdProps {
  id: string;
  url: string;
  token: string;
}
export async function getById({ id, url, token }: GetByIdProps): Promise<any> {
  try {
    const urlFormatted = `/${url}/${id ? id : ""}`;

    const response = await fetchJson(urlFormatted, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return null;
  }
}

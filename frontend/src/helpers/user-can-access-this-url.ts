import fetchJson, { FetchError } from "@/lib/fetch-json";

interface UserCanAccessThisUrlProps {
  url: string;
  action: string;
  token: string;
}

export async function userCanAccessThisUrl({
  url,
  action,
  token,
}: UserCanAccessThisUrlProps) {
  try {
    const urlFormatted = `/menu-items/check-permission/${url}/${action}`;

    const response = await fetchJson(urlFormatted, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    if (error instanceof FetchError) {
      return { error: true, hasPermission: false };
    }

    return { error: true, hasPermission: false };
  }
}

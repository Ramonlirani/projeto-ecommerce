import { backURL } from "@/helpers/backend-url";

export class FetchError extends Error {
  error: boolean;
  response: Response;
  status: number;
  data: {
    message: string;
  };

  constructor({
    error,
    message,
    response,
    data,
    status,
  }: {
    error: boolean;
    message: string;
    response: Response;
    data: {
      message: string;
    };
    status: number;
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.error = true;
    this.name = "FetchError";
    this.response = response;
    this.status = status;
    this.data = data ?? { message: message };
  }
}

export default async function fetchJson<JSON = unknown>(
  info: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  let formattedURL = null;

  if (typeof info === "string") {
    const thereIsSlash = info[0] === "/";

    if (thereIsSlash) {
      formattedURL = `${backURL}${info}`;
    } else {
      formattedURL = `${backURL}/${info}`;
    }
  }

  const response = await fetch(formattedURL || info, init);

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new FetchError({
    error: true,
    message: data.message || response.statusText,
    status: data.statusCode || response.status,
    response,
    data,
  });
}

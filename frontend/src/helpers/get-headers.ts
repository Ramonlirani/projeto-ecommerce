import { NextApiRequest } from "next";

export function getHeaders(req: NextApiRequest) {
  const token = req.session.token as string;

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
}

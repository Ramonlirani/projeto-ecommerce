import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import fetchJson, { FetchError } from "@/lib/fetch-json";
import { getHeaders } from "@/helpers/get-headers";

async function DeleteRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(403).end();
    }

    const { id, url } = JSON.parse(req.body);
    const { headers } = getHeaders(req);

    const response = await fetchJson(`/${url}/${id}`, {
      method: "DELETE",
      headers,
    });

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof FetchError) {
      return res
        .status(error.status)
        .json({ error: true, message: error.message });
    }

    return res
      .status(500)
      .json({ error: true, message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(DeleteRoute, sessionOptions);

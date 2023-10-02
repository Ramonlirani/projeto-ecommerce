import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import fetchJson, { FetchError } from "@/lib/fetch-json";
import { PaginationResponse } from "@/interfaces/PaginationResponse";
import { getHeaders } from "@/helpers/get-headers";

async function PaginationRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(403).end();
    }

    const { headers } = getHeaders(req);
    const { url, body } = JSON.parse(req.body);

    let fullUrl = `/${url}/pagination`;

    const response = await fetchJson<PaginationResponse<any>>(fullUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
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

export default withIronSessionApiRoute(PaginationRoute, sessionOptions);

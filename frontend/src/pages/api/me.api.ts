import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import fetchJson from "@/lib/fetch-json";
import { sessionOptions } from "@/lib/session";
import { getHeaders } from "@/helpers/get-headers";

async function authMeRouter(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(403).end();
  }

  try {
    if (!req.session?.token) return;
    const { headers } = getHeaders(req);

    const response = await fetchJson<any>("/auth/me", {
      method: "GET",
      headers,
    });

    return res.status(200).json(response);
  } catch (error) {
    req.session.destroy();
  }
}

export default withIronSessionApiRoute(authMeRouter, sessionOptions);

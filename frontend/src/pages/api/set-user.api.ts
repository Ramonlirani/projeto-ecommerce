import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { get } from "lodash";
import fetchJson from "@/lib/fetch-json";
import { sessionOptions } from "@/lib/session";
import { getHeaders } from "@/helpers/get-headers";

async function setUserRouter(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(403).end();
  }

  let isLoggedIn = false;

  try {
    if (!req.session?.token) return;
    const { headers } = getHeaders(req);

    const response = await fetchJson<any>("/auth/me", {
      method: "GET",
      headers,
    });

    const user = get(response, "user");

    if (user) {
      req.session.user = user;
      await req.session.save();

      isLoggedIn = true;
    }
  } catch (error) {
    req.session.destroy();
  } finally {
    return res.status(200).json({
      isLoggedIn,
    });
  }
}

export default withIronSessionApiRoute(setUserRouter, sessionOptions);

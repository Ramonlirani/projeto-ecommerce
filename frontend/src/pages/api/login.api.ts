import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import fetchJson, { FetchError } from "@/lib/fetch-json";
import { getHeaders } from "@/helpers/get-headers";

interface ResponseBody {
  error: boolean;
  token: string;
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(403).end();
    }

    const { headers } = getHeaders(req);

    const response = await fetchJson<ResponseBody>("/auth/login", {
      method: "POST",
      body: req.body,
      headers,
    });

    const { error, token } = response;

    if (!error && token) {
      req.session.token = token;
      req.session.isLoggedIn = true;
      await req.session.save();

      return res.status(200).json({
        isLoggedIn: true,
      });
    }

    return res.status(403).end();
  } catch (error) {
    req.session.destroy();
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

export default withIronSessionApiRoute(loginRoute, sessionOptions);

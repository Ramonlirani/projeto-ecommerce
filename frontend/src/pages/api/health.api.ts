import { NextApiRequest, NextApiResponse } from "next";

export default function healthRoute(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ message: "ok" });
}

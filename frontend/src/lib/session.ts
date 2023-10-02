// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import { User } from "@/interfaces/User";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "vojoanaconvites-cookie",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    token?: string;
    user?: User;
    isLoggedIn: boolean;
  }
}

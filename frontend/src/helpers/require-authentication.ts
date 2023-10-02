import { withIronSessionSsr } from "iron-session/next";
import { get } from "lodash";
import { sessionOptions } from "@/lib/session";
import { userCanAccessThisUrl } from "./user-can-access-this-url";

export function requireAuthentication(gssp: any) {
  return withIronSessionSsr(async function (context) {
    const { req, resolvedUrl } = context;

    const isLoggedIn = get(req, "session.isLoggedIn", false);
    const token = get(req, "session.token");
    const user = get(req, "session.user");

    let tokenExpired = false;
    const exp = get(user, "exp", null);

    if (exp && Date.now() >= exp * 1000) {
      tokenExpired = true;
    }

    if (tokenExpired || !isLoggedIn || !token || !user) {
      req.session.destroy();

      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    let action = "VIEW";
    const hasForm = resolvedUrl.includes("/form");

    if (hasForm) {
      const isCreating = resolvedUrl.includes("/new");
      action = isCreating ? "CREATE" : "UPDATE";
    }

    const response = await userCanAccessThisUrl({
      url: resolvedUrl.replace(/\//g, "yyyy"),
      action,
      token,
    });

    const userHasPermission = get(response, "hasPermission", false);

    if (!userHasPermission) {
      return {
        redirect: {
          destination: "/system/home",
          permanent: false,
        },
      };
    }

    return await gssp(context);
  }, sessionOptions);
}

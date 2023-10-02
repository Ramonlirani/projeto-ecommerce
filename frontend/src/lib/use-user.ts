import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { get } from "lodash";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
  const { data, mutate: mutateUser } = useSWR("/api/set-user", fetcher);

  const isLoggedIn = get(data, "isLoggedIn", false);

  useEffect(() => {
    if (!redirectTo) return;

    if (
      (redirectTo && !redirectIfFound && !isLoggedIn) ||
      (redirectIfFound && isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [isLoggedIn, redirectIfFound, redirectTo]);

  return { isLoggedIn, mutateUser };
}

import { ReactNode, useCallback, useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { get } from "lodash";
import { useRouter } from "next/router";

import { Sidebar } from "../sidebar";
import { Header } from "../header";
import { Footer } from "../footer";
import { User } from "@/interfaces/User";
import { SpinnerLogo } from "@/components/shared/spinner-logo";
import { Confirmation } from "@/components/shared/confirmation";
import { useShowConfirmation } from "@/hooks/zustand/show-confirmation";
import { usePermission } from "@/hooks/zustand/permission";

interface LayoutProps {
  children: ReactNode;
}

async function getInfo() {
  try {
    const { user, menuItems, permissions } = await fetch("/api/me").then(
      (res) => res.json()
    );

    return { user, menuItems, permissions };
  } catch (error) {
    return null;
  }
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { showing, setShowing } = useShowConfirmation();
  const { setPermissions } = usePermission();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState([]);

  const handleSignOut = useCallback(async () => {
    await fetch("/api/logout");
    router.push("/");
  }, [router]);

  useEffect(() => {
    async function validateLoggedUser() {
      try {
        // await new Promise((callback) => setTimeout(callback, 50000));
        const info = await getInfo();
        const user = get(info, "user");
        const menuItems = get(info, "menuItems");
        const permissions = get(info, "permissions");

        if (!user || !menuItems) return handleSignOut();

        setPermissions(permissions);
        setUser(user);
        setMenuItems(menuItems);
      } catch (error) {
        handleSignOut();
      }
    }

    validateLoggedUser();
  }, [handleSignOut, setPermissions]);

  return (
    <>
      {user && menuItems.length > 0 ? (
        <div className="h-full">
          <Confirmation open={showing} setOpen={setShowing} />
          <Sidebar
            user={user}
            menuItems={menuItems}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="lg:pl-72 h-full">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div
                className="h-6 w-px bg-gray-200 lg:hidden"
                aria-hidden="true"
              />

              <Header handleSignOut={handleSignOut} userName={user.name} />
            </div>

            <main className="mt-16">
              <div className="px-10 sm:px-12 lg:px-20 xl:px-28">{children}</div>
            </main>

            <Footer />
          </div>
        </div>
      ) : (
        <SpinnerLogo />
      )}
    </>
  );
}

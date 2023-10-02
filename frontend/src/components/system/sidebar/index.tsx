import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as icons from "@heroicons/react/24/outline";
import { Logo } from "@/components/shared/logo";
import { useRouter } from "next/router";
import Link from "next/link";
import { User } from "@/interfaces/User";
import { MenuItem } from "@/interfaces/MenuItem";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SidebarProps {
  user: User;
  menuItems: MenuItem[];
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

type IconName = keyof typeof icons;

interface DynamicIconProps {
  name: IconName;
  className?: string;
}

function DynamicIcon({ name, className = "", ...props }: DynamicIconProps) {
  const Icon = icons[name];
  if (!Icon) return <></>;
  return <Icon className={className} aria-hidden="true" {...props} />;
}

export function Sidebar({
  user,
  menuItems,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const { pathname } = useRouter();
  const domain = pathname.split("/")[2];

  menuItems.forEach((item) => (item.current = false));
  const index = menuItems.findIndex((item) => item.webUrl.includes(domain));
  if (index > -1) {
    menuItems[index].current = true;
  }

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <DynamicIcon
                        name="XMarkIcon"
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 pt-6">
                  <div className="flex h-16 shrink-0 items-center">
                    <Logo url="/system/home" />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      {menuItems.length > 0 && (
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Menu
                          </div>
                          <ul role="list" className="-mx-2 space-y-1">
                            {menuItems.map((item) => (
                              <li key={item.name}>
                                <Link
                                  target={item.target}
                                  href={item.webUrl}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-green-600"
                                      : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <DynamicIcon
                                    name={item.icon! as IconName}
                                    className={classNames(
                                      item.current
                                        ? "text-green-600"
                                        : "text-gray-400 group-hover:text-green-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 pt-6">
          <div className="flex h-16 shrink-0 items-center">
            <Logo url="/system/home" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Menu
                </div>
                <ul role="list" className="-mx-2 space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        target={item.target}
                        href={item.webUrl}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-green-600"
                            : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <DynamicIcon
                          name={item.icon! as IconName}
                          className={classNames(
                            item.current
                              ? "text-green-600"
                              : "text-gray-400 group-hover:text-green-600",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

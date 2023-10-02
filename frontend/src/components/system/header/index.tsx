import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

import { Loading } from "@/components/shared/loading";
import Link from "next/link";

interface HeaderProps {
  handleSignOut: () => void;
  userName: string | null;
}

const userNavigation = [{ name: "Perfil", href: "/system/perfil" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Header({ handleSignOut, userName }: HeaderProps) {
  return (
    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <div className="relative flex flex-1" />

      <div className="flex items-center gap-x-4 lg:gap-x-6">
        {userName ? (
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="flex items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="false"
                >
                  {userName}
                </span>
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="false"
                />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item key="sign-out">
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                      )}
                    >
                      Sair
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

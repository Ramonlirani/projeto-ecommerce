import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { UserIcon } from "@heroicons/react/24/solid";

import { Loading } from "@/components/shared/loading";
import Link from "next/link";

interface HeaderProps {
  handleSignOut: () => void;
  userName: string | null;
}

const userNavigation = [
  { name: "Entrar", href: "/auth/login" },
  { name: "Criar conta", href: "/auth/cadastrar" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function MenuUser() {
  return (
    <div className="flex flex-1 self-stretch">
      <div className="relative flex flex-1" />

      <div className="flex items-center gap-x-4">
        <Menu as="div" className="relative">
          <Menu.Button className="-m-1.5 flex items-center p-1.5">
            <span className="flex items-center">
              <UserIcon
                className="h-6 w-6 hover:opacity-75 md:block lg:block"
                aria-hidden="true"
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
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

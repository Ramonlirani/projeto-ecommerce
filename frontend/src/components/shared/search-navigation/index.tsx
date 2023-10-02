import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  PhoneIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { Input } from "../input";

const navigation = [
  { name: "Sacola", href: "#", icon: ShoppingBagIcon },
  { name: "Contato", href: "#", icon: PhoneIcon },
  // { name: "Usuário", href: "#", icon: UserIcon },
];

export default function SearchNavigation() {
  return (
    <div className="mt-6 flow-root">
      <div className="-my-6 divide-y divide-gray-500/10">
        <div className="space-y-10 py-10">
          <Input
            Icon={MagnifyingGlassIcon}
            placeholder="Olá, o que você procura?"
          />
          <div className="gap-2 pt-2">
            {navigation.map((item) => (
              <>
                <span className="text-capim-seco flex gap-5 py-2.5 items-center font-semibold ">
                  {item.icon && <item.icon className="w-6 h-6" />}
                  <p>{item.name}</p>
                </span>
              </>
            ))}
          </div>
        </div>
        <div className="py-6">
          <a
            href="#"
            className="flex py-2.5 font-semibold text-capim-seco gap-3"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            Entrar
          </a>
          <a
            href="#"
            className="flex py-2.5 font-semibold text-capim-seco gap-3"
          >
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            Sair
          </a>
        </div>
      </div>
    </div>
  );
}

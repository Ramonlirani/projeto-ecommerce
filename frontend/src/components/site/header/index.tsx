import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import lotusFlower from "@/assets/images/LotusFlower.svg";

import Image from "next/image";
import Link from "next/link";
import { ModalSearch } from "@/components/shared/modal-search";
import { useShowModal } from "@/hooks/zustand/show-modal";
import InputSearchModal from "@/components/shared/modal-search/body/input-search-modal";
import { MenuUser } from "@/components/shared/menu-user";

export function Header() {
  const { showModal, setShowModal, setBody } = useShowModal();

  function handleInput() {
    setBody(<InputSearchModal />);
    setShowModal(true);
  }

  return (
    <>
      <ModalSearch open={showModal} setOpen={setShowModal} />
      <header className="grid items-center w-full z-50 bg-tomilho-500 h-40">
        <nav className="flex items-center justify-between px-10 lg:px-14">
          <div className="flex lg:flex-1">
            <a href="/">
              <span className="sr-only">Your Company</span>
              <Image
                src={lotusFlower}
                className="w-20 md:w-36 lg:w-36"
                alt=""
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 text-white text-3xl">
            <p>
              <span>Vó Joana Convites</span> <br /> PAPELARIA FINA
            </p>
          </div>
          <div className="flex flex-1 text-white mx-auto justify-end space-x-2">
            <Link href="/contato">
              <p className="hidden md:block lg:block hover:opacity-75">
                Contato
              </p>
              <PhoneIcon className="w-6 h-6 md:hidden lg:hidden block" />
            </Link>
            <div className="cursor-pointer" onClick={handleInput}>
              <span className="sr-only">Search</span>
              <MagnifyingGlassIcon
                className="hidden h-6 w-6 hover:opacity-75 md:block lg:block"
                aria-hidden="true"
              />
            </div>
            <div>
              <MenuUser />
            </div>
            <a href="/carrinho" className="group -m-2 flex items-center">
              <ShoppingBagIcon
                className="h-6 w-6 flex-shrink-0 group-hover:text-gray-200"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium group-hover:text-gray-200">
                0
              </span>
              <span className="sr-only">items in cart, view bag</span>
            </a>
          </div>
        </nav>
        <div className="flex w-full items-center px-6 md:hidden lg:hidden">
          <input
            className="w-full bg-transparent border-b border-white p-2 border-t-0 border-x-0 text-white placeholder:text-white focus:ring-0 focus:border-b-white"
            placeholder="O que você está procurando?"
          />
          <MagnifyingGlassIcon className="w-6 h-6 text-white absolute right-14" />
        </div>
      </header>
    </>
  );
}

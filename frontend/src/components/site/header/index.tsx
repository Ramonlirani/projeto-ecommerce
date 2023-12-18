import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import dreamfit from "@/assets/logo/dreamfit.png";

import Image from "next/image";

import { MenuUser } from "@/components/shared/menu-user";
import { FlyoutMenu } from "@/components/shared/flyout-menu";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/Product";
import fetchJson from "@/lib/fetch-json";

interface ProductProps {
  productCategories: Product[];
  launches: Product[];
}

export function Header() {
  const [product, setProduct] = useState<Product[]>([]);
  const [launches, setLaunches] = useState<Product[]>([]);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetchJson<ProductProps>("/products/listAll");

        setProduct(response.productCategories);
        setLaunches(response.launches);
      } catch (error) {}
    }
    getProduct();
  }, []);

  return (
    <>
      <header className="grid items-center w-full z-50 bg-#f6e8ea h-34 px-10 lg:px-14 pt-8 ">
        <div className="bg-#f6e8ea hidden md:hidden md:justify-end  md:items-center lg:flex lg:justify-end  lg:items-center text-sm text-black space-x-3 ">
          <a href="/contato" className="hover:text-dim-gray">
            <p>Contate-nos</p>
          </a>
          <p className="text-black">|</p>
          <MenuUser />
        </div>
        <nav className="md:block md:items-center md:justify-between lg:flex lg:items-center lg:justify-between">
          <div className="flex lg:flex-1 items-center">
            <a
              href="/"
              className="flex items-center justify-start  mr-auto lg:mx-0"
            >
              <span className="sr-only">Your Company</span>
              <Image src={dreamfit} className="w-36" alt="logo" />
            </a>
            <div className="hidden md:hidden lg:block lg:flex-1">
              <FlyoutMenu product={product} launches={launches} />
            </div>
            <a
              href="/carrinho"
              className="group -m-2 flex items-center lg:hidden"
            >
              <ShoppingBagIcon
                className="h-6 w-6 flex-shrink-0 text-black group-hover:text-dim-gray"
                aria-hidden="true"
              />
              <span className="ml-2 mr-3 text-sm font-medium text-black group-hover:text-dim-gray">
                0
              </span>
              <span className="sr-only">items in cart, view bag</span>
            </a>
            <div className="sm:block md:block lg:hidden justify-center items-center">
              <FlyoutMenu product={product} launches={launches} />
            </div>
          </div>
          <div className="flex text-white  lg:mx-auto lg:justify-end lg:space-x-5">
            <div className="min-w-0 w-full md:px-0 lg:px-0 xl:col-span-6">
              <div className="flex items-center py-4 ">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Buscar
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-black"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-off-red sm:text-sm sm:leading-6 hover:bg-gray-200"
                      placeholder="Buscar"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <a
              href="/carrinho"
              className="group -m-2 hidden lg:flex lg:items-center"
            >
              <ShoppingBagIcon
                className="h-6 w-6 flex-shrink-0 text-black group-hover:text-dim-gray"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-black  group-hover:text-dim-gray">
                0
              </span>
              <span className="sr-only">items in cart, view bag</span>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}

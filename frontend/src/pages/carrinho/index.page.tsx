import { Layout } from "@/components/site/layout";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import convite1 from "@/assets/images/convite1.jpg";
import convite2 from "@/assets/images/convite2.jpg";
import convite3 from "@/assets/images/convite3.jpg";

import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { ReactElement } from "react";
import Image from "next/image";
import InputIncrement from "@/components/shared/input-increment";

const products = [
  {
    id: 1,
    name: "Convite clássico",
    href: "#",
    price: "R$18,00",
    color: "Rosa",
    inStock: true,
    size: "Pequeno",
    imageSrc: convite1,
    imageAlt: "Convite rosa",
  },
  {
    id: 2,
    name: "Convite de luxo",
    href: "#",
    price: "R$129,00",
    color: "Bege",
    inStock: false,
    leadTime: "3–4 semanas",
    size: "Grande",
    imageSrc: convite2,
    imageAlt: "Convite bege",
  },
  {
    id: 3,
    name: "Convite rústico",
    href: "#",
    price: "R$45,00",
    color: "Verde grama",
    size: "Médio",
    inStock: true,
    imageSrc: convite3,
    imageAlt: "Convite verde",
  },
];

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-salgueiro sm:text-4xl">
          Meu carrinho
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {products.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                              {product.size}
                            </p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {product.name}
                        </label>
                        <InputIncrement />
                        <p className="mt-2 text-center text-sm text-red-500 font-bold cursor-pointer">
                          Remover
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ClockIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product.inStock
                          ? "Em estoque"
                          : `Disponível em ${product.leadTime}`}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Resumo do pedido
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">R$192,00</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Valor do frete</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  Á calcular
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Pedido total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  R$192,00
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-tomilho-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-tomilho-700 focus:outline-none focus:ring-2 focus:ring-tomilho-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Enviar
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

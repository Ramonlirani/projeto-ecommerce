import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Layout } from "@/components/site/layout";
import { Fragment, useState, ReactElement } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import SelectMenu from "@/components/shared/select-menu";
import { CardProduct } from "@/components/shared/card-product";
import { Pagination } from "@/components/shared/pagination";

const filters = [
  {
    id: "model",
    name: "Modelos",
    options: [
      { value: "classic", label: "Clássico" },
      { value: "modern", label: "Moderno" },
      { value: "rustic", label: "Rústico" },
      { value: "laser", label: "Laser" },
      { value: "luxurious", label: "Luxuoso" },
    ],
  },
  {
    id: "category",
    name: "Categorias",
    options: [
      { value: "invitation", label: "Convites" },
      { value: "godparents", label: "Padrinhos" },
      { value: "fineStationery", label: "Papelaria Fina" },
      { value: "toilet", label: "Toilet" },
      { value: "schedules", label: "Agendas" },
    ],
  },
  {
    id: "color",
    name: "Cores",
    options: [
      { value: "white", label: "Branco" },
      { value: "beige", label: "Bege" },
      { value: "blue", label: "Azul" },
      { value: "brown", label: "Marrom" },
      { value: "green", label: "Verde" },
      { value: "purple", label: "Roxo" },
      { value: "red", label: "Vermelho" },
      { value: "black", label: "Preto" },
    ],
  },
];

const optionsSortBy = [
  "Mais relevantes",
  "Novidades",
  "Maiores preços",
  "Menores preços",
  "Maiores descontos",
  "Alfabética A > Z",
  "Alfabética Z > A",
];

const totalItems = [5, 10, 15, 20, 25];

const products = [
  {
    id: 1,
    name: "Convite de luxo",
    href: "#",
    price: "R$ 256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc: "./invitations/convite1.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 2,
    name: "Convite clássico",
    href: "#",
    price: "R$ 32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "./invitations/convite2.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 3,
    name: "Convite de luxo",
    href: "#",
    price: "R$ 256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc: "./invitations/convite1.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 4,
    name: "Convite clássico",
    href: "#",
    price: "R$ 42",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "./invitations/convite2.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 5,
    name: "Convite de luxo",
    href: "#",
    price: "R$ 214",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc: "./invitations/convite1.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 6,
    name: "Convite clássico",
    href: "#",
    price: "R$ 13",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "./invitations/convite2.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
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
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.name}
                          className="border-t border-gray-200 pb-4 pt-4"
                        >
                          {({ open }) => (
                            <fieldset>
                              <legend className="w-full px-2">
                                <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                  <span className="text-sm font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex h-7 items-center">
                                    <ChevronDownIcon
                                      className={classNames(
                                        open ? "-rotate-180" : "rotate-0",
                                        "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Disclosure.Button>
                              </legend>
                              <Disclosure.Panel className="px-4 pb-2 pt-4">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`${section.id}-${optionIdx}-mobile`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-tomilho-400 focus:ring-tomilho-400"
                                      />
                                      <label
                                        htmlFor={`${section.id}-${optionIdx}-mobile`}
                                        className="ml-3 text-sm text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </fieldset>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-2xl px-4 sm:px-6 pb-16 pt-6 sm:pb-24 lg:max-w-7xl lg:px-8">
            <ol role="list" className="flex items-center space-x-4 ">
              <Breadcrumbs />
            </ol>
            <div className="border-b border-gray-200 pb-10 pt-6">
              <h1 className="text-4xl font-bold tracking-tight text-salgueiro">
                Convites
              </h1>
              <p className="mt-4 text-base text-gray-500">
                O momento mais aguardado que marca o início dos preparativos, os
                convites é a parte mais esperada dos convidados.
              </p>
            </div>

            <div className="pt-12 lg:grid lg:grid-cols-6 lg:gap-x-8 xl:grid-cols-6">
              <aside>
                <h2 className="sr-only">Filters</h2>
                <button
                  type="button"
                  className="inline-flex items-center lg:hidden bg-tomilho-500 p-3 rounded-md"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-medium text-white">
                    Filtrar
                  </span>
                </button>
                <div className="flex justify-between md:hidden lg:hidden">
                  <SelectMenu options={totalItems} defaultValue={5} />
                  <SelectMenu
                    options={optionsSortBy}
                    defaultValue="Mais relevantes"
                  />
                </div>
                <div className="hidden lg:block">
                  <form className="space-y-10 divide-y divide-gray-200">
                    {filters.map((section, sectionIdx) => (
                      <div
                        key={section.name}
                        className={sectionIdx === 0 ? "" : "pt-10"}
                      >
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">
                            {section.name}
                          </legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-tomilho-400 focus:ring-tomilho-400"
                                />
                                <label
                                  htmlFor={`${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ))}
                  </form>
                </div>
              </aside>
              <div className="md:grid md:col-span-5  lg:grid lg:col-span-5">
                <div className="hidden md:flex md:justify-between md:col-span-1">
                  <SelectMenu options={totalItems} defaultValue={5} />
                  <SelectMenu
                    options={optionsSortBy}
                    defaultValue="Mais relevantes"
                  />
                </div>
                <div className="grid grid-cols-1 gap-y-4 pt-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
                  {products.map((product: any) => (
                    <CardProduct key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-20">
              <Pagination meta={1} setPage={setPage} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

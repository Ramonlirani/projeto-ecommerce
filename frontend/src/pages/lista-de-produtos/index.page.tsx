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
import { PaginationResponse } from "@/interfaces/PaginationResponse";
import { Product } from "@/interfaces/Product";
import { useQuery } from "@tanstack/react-query";

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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Unique {
  colors: { [key: string]: boolean };
  categories: { [key: string]: boolean };
}

type FilterType = "category" | "color";

const url = "products";

const Page: NextPageWithLayout = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["product", page],
    queryFn: () => fetchPagination(page),
    keepPreviousData: true,
  });
  const hasItems = data?.data?.length as number;

  async function fetchPagination(
    page: number
  ): Promise<PaginationResponse<Product>> {
    const body = JSON.stringify({
      body: { page, where: { deletedAt: null } },
      url,
    });

    return fetch("/api/pagination", {
      method: "POST",
      body,
    }).then((res) => res.json());
  }

  const handleSelection = (value: string, type: FilterType) => {
    if (type === "category") {
      setSelectedCategoryId((prevValue) =>
        prevValue === value ? null : value
      );
    } else if (type === "color") {
      setSelectedColor((prevValue) => (prevValue === value ? null : value));
    }
    refetch();
  };

  const filteredProducts =
    data?.data?.filter((product) => {
      const matchesCategory =
        selectedCategoryId === null ||
        product.category?.name.toLowerCase() === selectedCategoryId;
      const matchesColor =
        selectedColor === null || product.color.toLowerCase() === selectedColor;
      return matchesCategory && matchesColor;
    }) || data?.data;

  const unique: Unique = { colors: {}, categories: {} };

  data?.data?.forEach((product) => {
    unique.colors[product.color?.toLowerCase() ?? ""] = true;
    unique.categories[product.category?.name?.toLowerCase() ?? ""] = true;
  });

  const uniqueCategories = Object.keys(unique.categories).filter(Boolean);
  const uniqueColors = Object.keys(unique.colors).filter(Boolean);

  const filters = [
    {
      id: "category",
      name: "Categorias",
      options: uniqueCategories.map((category) => ({
        value: category,
        label: category,
      })),
    },
    {
      id: "color",
      name: "Cores",
      options: uniqueColors.map((color) => ({
        value: color,
        label: color,
      })),
    },
  ];

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
                                        className="h-4 w-4 rounded border-gray-300 text-off-red focus:ring-off-red"
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
            {/* <ol role="list" className="flex items-center space-x-4 ">
              <Breadcrumbs />
            </ol> */}
            <div className="border-b border-gray-200 pb-10 pt-6">
              <h1 className="text-4xl font-bold tracking-tight text-black">
                Produtos
              </h1>
              <p className="mt-4 text-base text-gray-500">
                Faça da sua roupa uma extensão do seu treino: DreamFit, a moda
                que eleva seu condicionamento.
              </p>
            </div>

            <div className="pt-12 lg:grid lg:grid-cols-6 lg:gap-x-8 xl:grid-cols-6">
              <aside>
                <h2 className="sr-only">Filters</h2>
                <button
                  type="button"
                  className="inline-flex items-center lg:hidden bg-black p-3 rounded-md"
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
                        key={`${section.name}-${sectionIdx}`}
                        className={sectionIdx === 0 ? "" : "pt-10"}
                      >
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">
                            {section.name}
                          </legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={`${option.value}-${optionIdx}`}
                                className="flex items-center"
                              >
                                <input
                                  id={`${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-off-red focus:ring-off-red"
                                  onChange={() => {
                                    // Ensure that option.value is defined before calling handleSelection
                                    if (option.value !== undefined) {
                                      handleSelection(
                                        option.value,
                                        section.id as FilterType
                                      );
                                    }
                                  }}
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
                  {filteredProducts?.map((product: any) => (
                    <CardProduct key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-20">
              {!isLoading && hasItems > 0 && (
                <Pagination meta={data!.meta} setPage={setPage} />
              )}
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

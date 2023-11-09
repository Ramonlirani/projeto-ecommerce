import { ReactElement, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { requireAuthentication } from "@/helpers/require-authentication";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { PaginationResponse } from "@/interfaces/PaginationResponse";
import { Pagination } from "@/components/shared/pagination";
import { Layout } from "@/components/system/layout";
import { PageTitle } from "@/components/shared/page-title";
import { NotFoundOrEmpty } from "@/components/not-found";
import { Loading } from "@/components/shared/loading";
import { DeleteButton } from "@/components/shared/table/actions/delete-button";
import { EditButton } from "@/components/shared/table/actions/edit-button";
import { CreateButton } from "@/components/shared/table/actions/create-button";
import { Product } from "@/interfaces/Product";
import { formatNumber } from "@/helpers/format-number";
import { ProductCategory } from "@/interfaces/ProductCategory";
import { SubCategory } from "@/interfaces/SubCategory";

const url = "products";

const Page: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchPagination(page),
    keepPreviousData: true,
  });
  const hasItems = data?.data?.length as number;
  console.log(data?.data);

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

  return (
    <>
      <div>
        <div className="mt-16 mb-6">
          <div className="flex items-center sm:items-center ">
            <div className="flex-auto">
              <PageTitle title="Produtos" />
            </div>

            <CreateButton url="/system/produto/form/new" modelName="product">
              Adicionar produto
            </CreateButton>
          </div>

          {isLoading ? (
            <div className="w-full text-center">
              <Loading size="lg" />
            </div>
          ) : (
            <div className="mt-8 flow-root">
              {hasItems ? (
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm  text-gray-400 sm:pl-0"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Nome do produto
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Categoria
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Subcategoria
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Preço
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Desconto
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Descrição
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                          >
                            <span className="sr-only"></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data!.data.map((product, index: number) => (
                          <tr key={product.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-400 sm:pl-0">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                              {product.name}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                              {product.category?.name}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                              {(product.category?.subcategories ?? []).length >
                              1
                                ? `${
                                    product.category?.subcategories[0]?.name
                                  }... +${
                                    (product.category?.subcategories.length ??
                                      0) - 1
                                  }`
                                : product.category?.subcategories?.[0]?.name}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                              {formatNumber({ number: product.price })}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                              {formatNumber({ number: product.discount })}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                              {product.description}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 overflow-visible">
                              <EditButton
                                url="categoria-faq"
                                id={product.id}
                                modelName="product"
                              />

                              <DeleteButton
                                modelName="product"
                                id={product.id}
                                url={url}
                                refetch={refetch}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <NotFoundOrEmpty />
              )}
            </div>
          )}
        </div>
        {!isLoading && hasItems > 0 && (
          <Pagination meta={data!.meta} setPage={setPage} />
        )}
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

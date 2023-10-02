import { ReactElement, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { requireAuthentication } from "@/helpers/require-authentication";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Faq } from "@/interfaces/Faq";
import { PaginationResponse } from "@/interfaces/PaginationResponse";
import { Pagination } from "@/components/shared/pagination";
import { Layout } from "@/components/system/layout";
import { PageTitle } from "@/components/shared/page-title";
import { NotFoundOrEmpty } from "@/components/not-found";
import { Loading } from "@/components/shared/loading";
import { DeleteButton } from "@/components/shared/table/actions/delete-button";
import { EditButton } from "@/components/shared/table/actions/edit-button";
import { CreateButton } from "@/components/shared/table/actions/create-button";

const url = "faqs";

const Page: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["faqs", page],
    queryFn: () => fetchPagination(page),
    keepPreviousData: true,
  });
  const hasItems = data?.data.length as number;

  async function fetchPagination(
    page: number
  ): Promise<PaginationResponse<Faq>> {
    const body = JSON.stringify({
      body: { page },
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
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <PageTitle title="Faqs" />
            </div>
            <CreateButton url="/system/faqs/form/new" modelName="faq">
              Adicionar Faqs
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
                  <div className="inline-block w-full py-2 align-middle">
                    <table className="w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-400 sm:pl-0"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Pergunta
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Resposta
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Ativo
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
                        {data!.data.map((faq, index: number) => (
                          <tr key={faq.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-400 sm:pl-0">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                              {faq.question}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {faq.answer}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {faq.active ? "Sim" : "Não"}
                            </td>

                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 overflow-visible">
                              <EditButton
                                url="faqs"
                                id={faq.id}
                                modelName="faq"
                              />

                              <DeleteButton
                                modelName="faq"
                                id={faq.id}
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

export const getServerSideProps = requireAuthentication(() => {
  return {
    props: {},
  };
});

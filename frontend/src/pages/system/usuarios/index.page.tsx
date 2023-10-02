import { Layout } from "@/components/system/layout";
import { requireAuthentication } from "@/helpers/require-authentication";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { ReactElement, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "@heroicons/react/20/solid";

import { Pagination } from "@/components/shared/pagination";
import { PaginationResponse } from "@/interfaces/PaginationResponse";
import { PageTitle } from "@/components/shared/page-title";
import { NotFoundOrEmpty } from "@/components/not-found";
import { Loading } from "@/components/shared/loading";
import { User } from "@/interfaces/User";
import { formatDate } from "@/helpers/format-date";
import { DeleteButton } from "@/components/shared/table/actions/delete-button";
import { CreateButton } from "@/components/shared/table/actions/create-button";
import { EditButton } from "@/components/shared/table/actions/edit-button";
import { InputSearch } from "@/components/shared/input-search";

const url = "users";

const Page: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchPagination(page),
    keepPreviousData: true,
  });
  const hasItems = data?.data?.length as number;

  async function fetchPagination(
    page: number
  ): Promise<PaginationResponse<User>> {
    const body = JSON.stringify({
      body: {
        page,
        where: {
          OR: [
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              document: {
                contains: search,
              },
            },
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              codeToIndicate: {
                contains: search,
              },
            },
          ],
        },
      },
      url,
    });

    return fetch("/api/pagination", {
      method: "POST",
      body,
    }).then((res) => res.json());
  }

  function handleSearch() {
    setPage(1);
    if (page === 1) refetch();
  }

  return (
    <>
      <div>
        <div className="mt-16 mb-6">
          <div className="flex-row justify-between items-center sm:flex sm:items-center">
            <div className="flex gap-2 items-center justify-between">
              <PageTitle title="Usuários" />

              <CreateButton url="/system/usuarios/form/new" modelName="user">
                <PlusIcon className="hidden sm:inline h-6 w-6 inline-block" />
                <span className="sm:hidden">Adicionar Usuário</span>
              </CreateButton>
            </div>

            <div className="ml-auto mt-2 sm:mt-0 md:mt-0 sm:w-80 w-full">
              <InputSearch
                placeholder="nome, e-mail, código e doc"
                value={search}
                setSearch={setSearch}
                refetch={handleSearch}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="w-full text-center">
              <Loading size="lg" />
            </div>
          ) : (
            <>
              <div className="mt-8 flow-root">
                {hasItems ? (
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <table className="min-w-[1100px] w-full divide-y divide-gray-300">
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
                              Nome
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              E-mail/Telefone
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Código
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Indicado por
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Criada em
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Documento
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Nível de acesso
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
                          {data!.data.map((user, index: number) => (
                            <tr key={user.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-400 sm:pl-0">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                                {user.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <p>{user.email}</p>
                                <p className="text-green-600">
                                  {user.phoneNumber || "Telefone não informado"}
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {user.codeToIndicate}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {user.codeIndicatedBy || "-----"}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {formatDate({ date: new Date(user.createdAt) })}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {user.document}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {user.role.name}
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 overflow-visible">
                                <EditButton
                                  modelName="user"
                                  id={user.id}
                                  url="usuarios"
                                />

                                <DeleteButton
                                  modelName="user"
                                  id={user.id}
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
            </>
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

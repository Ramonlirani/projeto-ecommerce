import { ReactElement } from "react";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { get } from "lodash";

import { requireAuthentication } from "@/helpers/require-authentication";
import { encryptJSON } from "@/helpers/encrypt-json";
import { decryptJSON } from "@/helpers/decrypt-json";
import { createOrUpdate } from "@/helpers/create-or-update";
import { getById } from "@/helpers/get-by-id";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";

import { Layout } from "@/components/system/layout";
import { Input } from "@/components/shared/input";
import { Toggle } from "@/components/shared/switch";
import { Button } from "@/components/shared/button";
import { PageTitle } from "@/components/shared/page-title";
import { Autocomplete } from "@/components/shared/autocomplete";
import { getHeaders } from "@/helpers/get-headers";
import fetchJson from "@/lib/fetch-json";
import { SubCategory } from "@/interfaces/SubCategory";
import { ProductCategory } from "@/interfaces/ProductCategory";

const schema = z.object({
  name: z.string().nonempty({ message: "Nome é obrigatório" }),
  productCategoryId: z
    .string({ required_error: "Categoria do produto é obrigatório" })
    .nonempty({ message: "Categoria do produto é obrigatório" }),
  active: z.boolean().default(true),
});
type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  subCategory: SubCategory;
  productCategories: ProductCategory[];
}

const url = "subcategories";

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { subCategory, productCategories } = decryptJSON<PageDecryptedProps>(
    props.data
  );

  const isEditing = get(subCategory, "id");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productCategoryId:
        subCategory.productCategoryId ||
        (productCategories?.length > 0 ? productCategories[0].id : ""),
      name: subCategory.name || "",
      active: get(subCategory, "active", true),
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  async function onSubmit(formData: FormData) {
    const response = await createOrUpdate({
      currentEntity: subCategory,
      formData,
      entityName: "Subcategoria",
      url,
    });

    if (get(response, "error", false)) {
      return;
    }

    if (!isEditing) reset();
  }

  return (
    <div className="border-b border-gray-900/10 pb-12 mt-16">
      <PageTitle
        title={`${isEditing ? "Editando" : "Cadastrando"} Subcategoria`}
        backUrl="/system/sub-categoria"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <Controller
                control={control}
                name="active"
                render={({ field: { ref, ...field } }) => (
                  <Toggle
                    {...field}
                    question="Deseja deixar essa subcategoria ativa?"
                  />
                )}
              />
            </div>
            <Input
              isRequired
              divClasses="sm:col-span-3"
              label="Nome da subcategoria"
              placeholder="Exemplo: Casamento"
              {...register("name")}
              error={errors.name}
            />

            <div className="relative z-50 col-span-3">
              <Autocomplete
                isRequired
                control={control}
                name="productCategoryId"
                options={productCategories}
                label="Categoria do Produto"
                error={errors.productCategoryId}
              />
            </div>

            <div className="col-span-full flex items-center justify-between">
              <p className="text-red-500 text-sm font-bold">
                Campos com * são de preenchimento obrigatório.
              </p>
              <Button type="submit" isLoading={isSubmitting}>
                {isEditing ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = requireAuthentication(
  async ({ req, query }: GetServerSidePropsContext) => {
    let subCategory = {};
    const token = req.session.token as string;

    if (typeof query?.id === "string" && query?.id && query.id !== "new") {
      const response = await getById({
        id: query.id,
        url,
        token,
      });

      if (!response) {
        return {
          redirect: {
            destination: "/system/sub-categoria",
            permanent: false,
          },
        };
      }

      subCategory = response.subCategory;
    }

    const { headers } = getHeaders(req as NextApiRequest);
    const { productCategories } = await fetchJson<any>(
      "/product-categories/list",
      {
        method: "GET",
        headers,
      }
    );

    const data = encryptJSON({
      subCategory,
      productCategories,
    });

    return {
      props: {
        data,
      },
    };
  }
);

export default Page;

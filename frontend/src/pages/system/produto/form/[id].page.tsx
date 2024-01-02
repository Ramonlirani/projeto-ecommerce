import { ReactElement, useEffect, useState } from "react";
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

import { Button } from "@/components/shared/button";
import { PageTitle } from "@/components/shared/page-title";
import { InputDecimal } from "@/components/shared/input-decimal";
import { Autocomplete } from "@/components/shared/autocomplete";
import AutocompleteMultiple from "@/components/shared/autocompletemultiple";
import { getHeaders } from "@/helpers/get-headers";
import fetchJson from "@/lib/fetch-json";
import { ProductCategory } from "@/interfaces/ProductCategory";
import { TextArea } from "@/components/shared/textarea";
import { Product } from "@/interfaces/Product";
import { Toggle } from "@/components/shared/switch";
import { InputFileImage } from "@/components/shared/input-file-image";

const subCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

const schema = z.object({
  name: z.string().nonempty({ message: "Nome é obrigatório" }),
  price: z.preprocess((a: any) => {
    const value = a.toString();
    const floatValue = parseFloat(
      value.replace(/[^\d,-]/g, "").replace(",", ".")
    );

    return Number(z.coerce.string().parse(floatValue));
  }, z.coerce.number({ invalid_type_error: "O valor é obrigatório" }).min(0.01, { message: "O valor mínimo é de R$ 0,01" })),
  discount: z.preprocess((a: any) => {
    const value = a.toString();
    const floatValue = parseFloat(
      value.replace(/[^\d,-]/g, "").replace(",", ".")
    );

    return Number(z.coerce.string().parse(floatValue));
  }, z.coerce.number({ invalid_type_error: "O valor é obrigatório" })),
  productCategoryId: z
    .string({ required_error: "Categoria do faq é obrigatório" })
    .nonempty({ message: "Categoria do faq é obrigatório" }),
  color: z.string().nonempty({ message: "Cor é obrigatória" }),
  size: z.string().nonempty({ message: "O tamanho é obrigatório" }),
  shortDescription: z.string().nonempty({ message: "Mensagem é obrigatória" }),
  description: z.string().nonempty({ message: "Mensagem é obrigatória" }),
  active: z.boolean().default(true),
  launches: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  subcategories: z.array(subCategorySchema).default([]),
  imageUrl: z
    .string({
      invalid_type_error: "Forneça uma imagem válida",
      required_error: "Foto do produto é obrigatório",
    })
    .nonempty({ message: "Foto do produto é obrigatório" }),
});
type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  productCategories: ProductCategory[];
  product: Product;
}

const url = "products";

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { productCategories, product } = decryptJSON<PageDecryptedProps>(
    props.data
  );

  const isEditing = get(product, productCategories, "id");
  const [subcategories, setSubcategories] = useState([]);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productCategoryId:
        product?.productCategoryId ||
        (productCategories?.length > 0 ? productCategories[0].id : ""),
      name: product?.name || "",
      active: get(product, "active", true),
      price: product?.price || 0,
      color: product?.color || "",
      size: product?.size || "",
      discount: product?.discount || 0,
      description: product?.description || "",
      shortDescription: product?.shortDescription || "",
      imageUrl: product?.imageUrl || "",
      launches: get(product, "launches", false),
      bestSeller: get(product, "bestSeller", false),
      subcategories:
        productCategories?.length > 0
          ? productCategories[0].subcategories?.map((subcategory) => ({
              id: subcategory.id,
              name: subcategory.name,
            })) || []
          : [],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = methods;

  useEffect(() => {
    async function getSubcategories() {
      try {
        const response = await fetch("/api/list-subcategories-by-category", {
          method: "POST",
          body: JSON.stringify({ id: watch("productCategoryId") }),
        }).then((res) => res.json());

        setSubcategories(response.subcategories);
      } catch (error) {}
    }

    getSubcategories();
  }, [watch("productCategoryId")]);

  async function onSubmit(formData: FormData) {
    const newPrice = get(formData, "price", 0);

    formData.price = newPrice * 100;

    const subcategoryIds = watch("subcategories");

    formData.subcategories = subcategoryIds;

    const response = await createOrUpdate({
      currentEntity: product,
      formData,
      entityName: "Produto",
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
        title={`${isEditing ? "Editando" : "Cadastrando"} produto`}
        backUrl="/system/produto"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-6 md:col-span-2">
              <Controller
                control={control}
                name="active"
                render={({ field: { ref, ...field } }) => (
                  <Toggle
                    {...field}
                    question="Deseja deixar esse produto ativo?"
                  />
                )}
              />
            </div>

            <div className="col-span-6 md:col-span-2">
              <Controller
                control={control}
                name="bestSeller"
                render={({ field: { ref, ...field } }) => (
                  <Toggle
                    {...field}
                    question="Esse produto é um dos mais vendidos?"
                  />
                )}
              />
            </div>
            <div className="col-span-6 md:col-span-2">
              <Controller
                control={control}
                name="launches"
                render={({ field: { ref, ...field } }) => (
                  <Toggle
                    {...field}
                    question="Deseja deixar esse produto como lançamento?"
                  />
                )}
              />
            </div>
            <div className="col-span-6 md:col-span-2">
              <InputFileImage
                isRequired
                formName="imageUrl"
                setValue={setValue}
                error={errors.imageUrl}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 flex items-center justify-between">
              <Input
                isRequired
                divClasses="w-full"
                label="Nome do produto"
                {...register("name")}
                error={errors.name}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 flex items-center justify-between">
              <Input
                isRequired
                divClasses="w-full"
                label="Tamanho do produto"
                {...register("size")}
                error={errors.size}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 flex items-center justify-between">
              <InputDecimal
                control={control}
                isRequired
                divClasses="w-full"
                label="Preço"
                {...register("price")}
                error={errors.price}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 flex items-center justify-between">
              <InputDecimal
                control={control}
                divClasses="w-full"
                label="Desconto"
                {...register("discount")}
                error={errors.discount}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 flex items-center justify-between">
              <Input
                isRequired
                divClasses="w-full"
                label="Cor"
                {...register("color")}
                error={errors.color}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 flex items-center justify-between ">
              <Autocomplete
                isRequired
                control={control}
                options={productCategories}
                label="Categoria do Produto"
                {...register("productCategoryId")}
                error={errors.name}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 flex items-center justify-between">
              <AutocompleteMultiple
                control={control}
                options={subcategories}
                isRequired
                label="Subcategorias"
                {...register("subcategories")}
                divClasses="w-full"
              />
            </div>
            <div className="col-span-6 sm:col-span-6 flex items-center justify-between ">
              <TextArea
                divClasses="w-full"
                label="Descrição resumida"
                isRequired
                {...register("shortDescription")}
                error={errors.shortDescription}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 flex items-center justify-between ">
              <TextArea
                divClasses="w-full"
                label="Descrição"
                isRequired
                {...register("description")}
                error={errors.description}
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
    let product = {};
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
            destination: "/system/produto",
            permanent: false,
          },
        };
      }

      product = response.product;
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
      product,
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

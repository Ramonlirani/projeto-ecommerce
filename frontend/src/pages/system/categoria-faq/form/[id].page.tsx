import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { useForm } from "react-hook-form";
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
import { FaqCategory } from "@/interfaces/FaqCategory";

const schema = z.object({
  name: z.string().nonempty({ message: "Nome é obrigatório" }),
});
type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  faqCategory: FaqCategory;
}

const url = "faq-categories";

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { faqCategory } = decryptJSON<PageDecryptedProps>(props.data);

  const isEditing = get(faqCategory, "id");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: faqCategory.name || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  async function onSubmit(formData: FormData) {
    const response = await createOrUpdate({
      currentEntity: faqCategory,
      formData,
      entityName: "Categoria do Faq",
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
        title={`${isEditing ? "Editando" : "Cadastrando"} categoria do faq`}
        backUrl="/system/categoria-faq"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              isRequired
              divClasses="col-span-full"
              label="Nome da categoria"
              {...register("name")}
              error={errors.name}
            />

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
    let faqCategory = {};
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
            destination: "/system/categoria-faq",
            permanent: false,
          },
        };
      }

      faqCategory = response.faqCategory;
    }

    const data = encryptJSON({
      faqCategory,
    });

    return {
      props: {
        data,
      },
    };
  }
);

export default Page;

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
import { Faq } from "@/interfaces/Faq";

import { Layout } from "@/components/system/layout";
import { Input } from "@/components/shared/input";
import { TextArea } from "@/components/shared/textarea";
import { Toggle } from "@/components/shared/switch";
import { Button } from "@/components/shared/button";
import { PageTitle } from "@/components/shared/page-title";
import { Autocomplete } from "@/components/shared/autocomplete";
import { getHeaders } from "@/helpers/get-headers";
import fetchJson from "@/lib/fetch-json";
import { FaqCategory } from "@/interfaces/FaqCategory";

const schema = z.object({
  question: z.string().nonempty({ message: "Pergunta é obrigatório" }),
  answer: z.string().nonempty({ message: "Resposta é obrigatório" }),
  faqCategoryId: z
    .string({ required_error: "Categoria do faq é obrigatório" })
    .nonempty({ message: "Categoria do faq é obrigatório" }),
  active: z.boolean().default(true),
});
type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  faq: Faq;
  faqCategories: FaqCategory[];
}

const url = "faqs";

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { faq, faqCategories } = decryptJSON<PageDecryptedProps>(props.data);

  const isEditing = get(faq, "id");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      faqCategoryId:
        faq.faqCategoryId ||
        (faqCategories.length > 0 ? faqCategories[0].id : ""),
      question: faq.question || "",
      answer: faq.answer || "",
      active: get(faq, "active", true),
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
      currentEntity: faq,
      formData,
      entityName: "Faq",
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
        title={`${isEditing ? "Editando" : "Cadastrando"} faq`}
        backUrl="/system/faqs"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <Controller
                control={control}
                name="active"
                render={({ field: { ref, ...field } }) => (
                  <Toggle {...field} question="Deseja deixar esse faq ativo?" />
                )}
              />
            </div>
            <Input
              isRequired
              divClasses="sm:col-span-3"
              label="Pergunta"
              placeholder="Exemplo: Que dia é hoje?"
              {...register("question")}
              error={errors.question}
            />

            <div className="relative z-50 col-span-3">
              <Autocomplete
                isRequired
                control={control}
                name="faqCategoryId"
                options={faqCategories}
                label="Categoria do Faq"
                error={errors.faqCategoryId}
              />
            </div>

            <TextArea
              isRequired
              divClasses="col-span-full"
              label="Resposta"
              placeholder="Exemplo: Hoje é dia tal"
              {...register("answer")}
              error={errors.answer}
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
    let faq = {};
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
            destination: "/system/faqs",
            permanent: false,
          },
        };
      }

      faq = response.faq;
    }

    const { headers } = getHeaders(req as NextApiRequest);
    const { faqCategories } = await fetchJson<any>("/faq-categories/list", {
      method: "GET",
      headers,
    });

    const data = encryptJSON({
      faq,
      faqCategories,
    });

    return {
      props: {
        data,
      },
    };
  }
);

export default Page;

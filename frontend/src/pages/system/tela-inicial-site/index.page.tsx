import { ReactElement } from "react";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { requireAuthentication } from "@/helpers/require-authentication";
import { encryptJSON } from "@/helpers/encrypt-json";
import { decryptJSON } from "@/helpers/decrypt-json";
import { createOrUpdate } from "@/helpers/create-or-update";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";

import { Layout } from "@/components/system/layout";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { PageTitle } from "@/components/shared/page-title";
import fetchJson from "@/lib/fetch-json";
import { getHeaders } from "@/helpers/get-headers";
import { Configuration } from "@/interfaces/Configuration";
import { get } from "lodash";
// import { CkEditor } from "@/components/shared/ckeditor";

const schema = z.object({
  pageTitle: z.string().optional(),
  pageSubtitle: z.string().optional(),
  pageContent: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  configurations: Configuration;
}

const url = "configurations";

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { configurations } = decryptJSON<PageDecryptedProps>(props.data);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: configurations,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  async function onSubmit(formData: FormData) {
    const response = await createOrUpdate({
      currentEntity: null,
      formData,
      toastMessage: "Configuração atualizada com sucesso",
      entityName: "Configuração",
      url,
    });

    if (get(response, "error", false)) {
      return;
    }
  }

  return (
    <div className="border-b border-gray-900/10 pb-12 mt-16">
      <PageTitle title="Informações do site" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              divClasses="sm:col-span-3"
              label="Título"
              {...register("pageTitle")}
              error={errors.pageTitle}
            />

            <Input
              divClasses="sm:col-span-3"
              label="Subtítulo"
              {...register("pageSubtitle")}
              error={errors.pageSubtitle}
            />

            {/* <div className="col-span-full">
              <CkEditor
                fieldName="pageContent"
                content={configurations.pageContent}
                setValue={setValue}
              />
            </div> */}

            <Button type="submit" isLoading={isSubmitting}>
              Salvar
            </Button>
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
  async (ctx: GetServerSidePropsContext) => {
    const req = ctx.req as NextApiRequest;
    const keys = ["pageTitle", "pageSubtitle", "pageContent"];

    const { headers } = getHeaders(req);
    const { configurations } = await fetchJson<any>("/configurations/filter", {
      method: "POST",
      body: JSON.stringify(keys),
      headers,
    });

    const data = encryptJSON({
      configurations,
    });

    return {
      props: {
        data,
      },
    };
  }
);

export default Page;

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
import { InputMask } from "@/components/shared/input-mask";
import { get } from "lodash";

const schema = z.object({
  businessName: z.string().nonempty({ message: "Razão social é obrigatório" }),
  fantasyName: z.string().nonempty({ message: "Nome Fantasia é obrigatório" }),
  phone: z.string().nonempty({ message: "Telefone é obrigatório" }),
  whatsApp: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  cnpj: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  facebook: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  configuration: Configuration;
}

const url = "configurations";

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { configuration } = decryptJSON<PageDecryptedProps>(props.data);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: configuration,
  });

  const {
    register,
    handleSubmit,
    control,
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
      <PageTitle title="Configurações" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              isRequired
              divClasses="sm:col-span-2"
              label="Razão Social"
              {...register("businessName")}
              error={errors.businessName}
            />

            <Input
              isRequired
              divClasses="sm:col-span-2"
              label="Nome Fantasia"
              {...register("fantasyName")}
              error={errors.fantasyName}
            />

            <InputMask
              format="##.###.###/####-##"
              divClasses="sm:col-span-2"
              label="CNPJ"
              control={control}
              name="cnpj"
              error={errors.cnpj}
            />

            <InputMask
              isRequired
              format="(##) ####-####"
              divClasses="sm:col-span-3"
              label="Telefone"
              control={control}
              name="phone"
              error={errors.phone}
            />

            <InputMask
              format="(##) #####-####"
              divClasses="sm:col-span-3"
              label="WhatsApp"
              control={control}
              name="whatsApp"
              error={errors.whatsApp}
            />

            <Input
              divClasses="sm:col-span-2"
              label="Endereço"
              {...register("address")}
              error={errors.address}
            />

            <Input
              divClasses="sm:col-span-2"
              label="Cidade"
              {...register("city")}
              error={errors.city}
            />

            <Input
              divClasses="sm:col-span-2"
              label="Estado"
              {...register("state")}
              error={errors.state}
            />

            <Input
              divClasses="sm:col-span-2"
              label="Instagram"
              {...register("instagram")}
              error={errors.instagram}
            />

            <Input
              divClasses="sm:col-span-2"
              label="Youtube"
              {...register("youtube")}
              error={errors.youtube}
            />

            <Input
              divClasses="sm:col-span-2"
              label="Facebook"
              {...register("facebook")}
              error={errors.facebook}
            />
            <div className="col-span-full flex items-center justify-between">
              <p className="text-red-500 text-sm font-bold">
                Campos com * são de preenchimento obrigatório.
              </p>
              <Button type="submit" isLoading={isSubmitting}>
                Salvar
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
  async (ctx: GetServerSidePropsContext) => {
    const req = ctx.req as NextApiRequest;

    const { headers } = getHeaders(req);
    const { configuration } = await fetchJson<any>("/configurations/company", {
      headers,
    });

    const data = encryptJSON({
      configuration,
    });

    return {
      props: {
        data,
      },
    };
  }
);

export default Page;

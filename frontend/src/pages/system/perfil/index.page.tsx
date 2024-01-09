import { ReactElement } from "react";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { get } from "lodash";
import { toast } from "react-toastify";

import { requireAuthentication } from "@/helpers/require-authentication";
import { encryptJSON } from "@/helpers/encrypt-json";
import { decryptJSON } from "@/helpers/decrypt-json";
import { createOrUpdate } from "@/helpers/create-or-update";
import { getHeaders } from "@/helpers/get-headers";
import { deleteEntity } from "@/helpers/delete-entity";

import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { User } from "@/interfaces/User";

import { Layout } from "@/components/system/layout";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { PageTitle } from "@/components/shared/page-title";
import { InputMask } from "@/components/shared/input-mask";
import fetchJson from "@/lib/fetch-json";

import { useResetFileInformation } from "@/hooks/zustand/reset-file-information";
import { useShowConfirmation } from "@/hooks/zustand/show-confirmation";

const schema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Nome é obrigatório" })
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    phoneNumber: z.string().optional().nullable(),
    document: z.string().nonempty({ message: "CPF é obrigatório" }),
    email: z
      .string()
      .email({ message: "E-mail inválido" })
      .nonempty({ message: "E-mail é obrigatório" }),
    username: z
      .string()
      .min(6, { message: "informe pelo menos 6 caracteres" })
      .nonempty({ message: "Nome de usuário é obrigatório" }),
    password: z.string().optional().nullable(),
    confirmPassword: z.string().optional().nullable(),
  })
  .refine((schema) => !(schema.password && schema.password.length < 8), {
    message: "A senha deve ter pelo menos 8 caracteres",
    path: ["password"],
  })
  .refine((schema) => !(schema.password && !schema.confirmPassword), {
    message: "Confirmar senha é obrigatório",
    path: ["confirmPassword"],
  })
  .refine((schema) => !(schema.password !== schema.confirmPassword), {
    message: "As senhas digitadas são diferentes",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  user: User;
}

const url = "users";

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const { setShowing, setOnConfirm } = useShowConfirmation();
  const { user } = decryptJSON<PageDecryptedProps>(props.data);
  const { resetFileInformation } = useResetFileInformation();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  async function onSubmit(formData: FormData) {
    const response = await createOrUpdate({
      currentEntity: user,
      formData,
      entityName: "Usuário",
      url,
    });

    if (!response.error) {
      resetField("password");
      resetField("confirmPassword");
      resetFileInformation();
    }
  }

  async function handleDeleteMyAccount() {
    setShowing(true);
    setOnConfirm(async () => {
      const response = await deleteEntity({
        id: user.id,
        url: "users/clients",
        showToast: false,
      });
      if (!get(response, "error", true)) {
        await fetch("/api/logout");
        router.push("/");
        return;
      }

      toast.warn(
        "Ocorreu algum problema ao deletar sua conta. Por favor, tente novamente mais tarde."
      );
      setShowing(false);
    });
  }

  return (
    <div className="border-b border-gray-900/10 pb-12 mt-16">
      <div className="w-full flex justify-between items-center">
        <PageTitle title="Perfil" />
        <p
          onClick={handleDeleteMyAccount}
          className="text-sm text-orange-400 hover:text-orange-500 cursor-pointer"
        >
          Apagar minha conta
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <Input
              divClasses="sm:col-span-3 mb-3"
              label="Nome"
              {...register("name")}
              isRequired
              error={errors.name}
            />

            <InputMask
              control={control}
              name="phoneNumber"
              format="(##) #####-####"
              divClasses="sm:col-span-3 mb-3"
              label="Celular"
              error={errors.phoneNumber}
            />

            <Input
              divClasses="sm:col-span-3 mb-3"
              label="E-mail"
              isRequired
              {...register("email")}
            />

            <Input
              divClasses="sm:col-span-3 mb-3"
              label="Nome de usuário"
              isRequired
              {...register("username")}
            />

            <InputMask
              control={control}
              name="document"
              isRequired
              format="###.###.###-17"
              divClasses="sm:col-span-3 mb-3"
              label="CPF"
            />

            <div className="col-span-full mt-10">
              <p className="text-green-600">
                Preencha as senhas <b>somente</b> se deseja altera-lás
              </p>
            </div>

            <Input
              divClasses="sm:col-span-3 mb-3"
              label="Senha"
              type="password"
              {...register("password")}
              error={errors.password}
            />

            <Input
              divClasses="sm:col-span-3 mb-3"
              label="Confirmar senha"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
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

    const userId = get(req, "session.user.id", null);

    const { headers } = getHeaders(req);
    const { user } = await fetchJson<any>(`/users/${userId}`, {
      method: "GET",
      headers,
    });

    const data = encryptJSON({
      user,
    });

    return {
      props: {
        data,
      },
    };
  }
);

export default Page;

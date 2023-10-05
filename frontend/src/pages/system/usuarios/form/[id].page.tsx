import { ReactElement, useEffect } from "react";
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
import { User } from "@/interfaces/User";
import { Role } from "@/interfaces/Role";

import { Layout } from "@/components/system/layout";
import { Input } from "@/components/shared/input";
import { Toggle } from "@/components/shared/switch";
import { Button } from "@/components/shared/button";
import { PageTitle } from "@/components/shared/page-title";
import { Autocomplete } from "@/components/shared/autocomplete";
import { getHeaders } from "@/helpers/get-headers";
import fetchJson from "@/lib/fetch-json";
import { InputCpfCnpj } from "@/components/shared/input-cpf-cnpj";

const schema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Nome é obrigatório" })
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    document: z.string().optional().nullable(),
    isAdminCreating: z.boolean().default(true),
    roleCode: z.string().optional().nullable(),
    email: z
      .string()
      .email({ message: "E-mail inválido" })
      .nonempty({ message: "E-mail é obrigatório" }),
    username: z
      .string()
      .min(6, { message: "informe pelo menos 6 caracteres" })
      .nonempty({ message: "Nome de usuário é obrigatório" }),
    password: z.string().optional().nullable(),
    codeIndicatedBy: z.string().optional().nullable(),
    isEditing: z.boolean().default(false),
    active: z.boolean().default(true),
    roleId: z
      .string({ required_error: "Nível de acesso é obrigatório" })
      .nonempty({ message: "Nível de acesso é obrigatório" }),
  })
  .refine((schema) => !(!schema.isEditing && !schema.password), {
    message: "A senha é obrigatório",
    path: ["password"],
  })
  .refine((schema) => !(schema.password && schema.password.length < 8), {
    message: "A senha deve ter pelo menos 8 caracteres",
    path: ["password"],
  })
  .refine((schema) => !(schema.roleCode !== "admin" && !schema.document), {
    message: "Documento é obrigatório",
    path: ["document"],
  })
  .transform((data) => {
    data.document = data.roleCode === "admin" ? null : data.document;
    return data;
  });

type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  user: User;
  roles: Role[];
}

const url = "users";

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { user, roles } = decryptJSON<PageDecryptedProps>(props.data);
  const isEditing = !!get(user, "id");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...user,
      isEditing,
      roleId: user.roleId || roles[0].id,
      roleCode: user.roleCode || roles[0].code,
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = methods;

  const role =
    (roles.find((role) => role.id === watch("roleId")) as Role) || roles[0];

  useEffect(() => {
    setValue("roleCode", role.code);
  }, [setValue, role.code]);

  async function onSubmit(formData: FormData) {
    formData.roleCode = role.code;

    const response = await createOrUpdate({
      currentEntity: user,
      formData,
      entityName: "Usuário",
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
        title={`${isEditing ? "Editando" : "Cadastrando"} usuário`}
        backUrl="/system/usuarios"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full col-span-full">
              <Controller
                control={control}
                name="active"
                render={({ field: { ref, ...field } }) => (
                  <Toggle
                    {...field}
                    question="Deseja deixar esse usuário ativo?"
                  />
                )}
              />
            </div>

            <div className="relative z-50 sm:col-span-3">
              <Autocomplete
                isRequired
                control={control}
                name="roleId"
                options={roles}
                label="Nível de acesso"
                error={errors.roleId}
              />
            </div>
            <div className="sm:col-span-3">
              {role.code === "client" ? (
                <Input
                  disabled={isEditing}
                  error={errors.codeIndicatedBy}
                  label="Código de indicação"
                  {...register("codeIndicatedBy")}
                />
              ) : null}
            </div>

            <Input
              isRequired
              divClasses="col-span-1 sm:col-span-3"
              label="Nome"
              {...register("name")}
              error={errors.name}
            />

            <div className="col-span-1 sm:col-span-3">
              {role.code !== "admin" ? (
                <InputCpfCnpj
                  isRequired
                  control={control}
                  label="CPF/CNPJ"
                  name="document"
                  error={errors.document}
                />
              ) : null}
            </div>

            <Input
              isRequired
              divClasses="col-span-1 sm:col-span-3"
              label="E-mail"
              placeholder="seu-email@example.com"
              {...register("email")}
              error={errors.email}
            />

            <Input
              isRequired
              divClasses="col-span-1 sm:col-span-3"
              label="Nome de usuário"
              {...register("username")}
              error={errors.username}
            />

            <Input
              isRequired={!isEditing}
              divClasses="col-span-1 sm:col-span-3"
              label="Senha"
              info={isEditing ? "(Só preencher se deseja alterar)" : ""}
              type="password"
              {...register("password")}
              error={errors.password}
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
    let user = {
      active: true,
    };
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
            destination: "/system/usuarios",
            permanent: false,
          },
        };
      }

      user = response.user;
    }

    const { headers } = getHeaders(req as NextApiRequest);
    const { roles } = await fetchJson<any>("/roles/list", {
      method: "GET",
      headers,
    });

    const data = encryptJSON({
      user,
      roles,
    });

    return {
      props: {
        data,
      },
    };
  }
);

export default Page;

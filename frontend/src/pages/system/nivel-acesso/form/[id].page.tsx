import { ReactElement } from "react";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { get } from "lodash";

import { requireAuthentication } from "@/helpers/require-authentication";
import { encryptJSON } from "@/helpers/encrypt-json";
import { decryptJSON } from "@/helpers/decrypt-json";
import { createOrUpdate } from "@/helpers/create-or-update";
import { getById } from "@/helpers/get-by-id";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Role } from "@/interfaces/Role";

import { Layout } from "@/components/system/layout";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PageTitle } from "@/components/page-title";
import { Checkbox } from "@/components/checkbox";
import { getHeaders } from "@/helpers/get-headers";
import fetchJson from "@/lib/fetch-json";

const schema = z.object({
  name: z.string().nonempty({ message: "Nome é obrigatório" }),
  menuItems: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      permissions: z.array(
        z.object({
          id: z.string(),
          action: z.string(),
          allowed: z.boolean(),
        })
      ),
    })
  ),
});

type FormData = z.infer<typeof schema>;

interface PageProps {
  data: string;
}

interface PageDecryptedProps {
  role: Role;
}

const url = "roles";

const actionDictionary = {
  CREATE: "Criar",
  DELETE: "Deletar",
  UPDATE: "Atualizar",
  VIEW: "Visualizar",
  "MENU-ITEM": "Menu Lateral",
};

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { role } = decryptJSON<PageDecryptedProps>(props.data);

  const menuItems = role.menuItems!.map((menuItem) => {
    const permissions = menuItem.permissions.map((permission) => ({
      id: permission.id,
      action: permission.action,
      allowed: get(permission, "roles[0].allowed", false),
    }));

    return {
      id: menuItem.id,
      name: menuItem.name,
      permissions,
    };
  });

  const isEditing = get(role, "id");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: role.name || "",
      menuItems,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: "menuItems",
  });

  async function onSubmit(formData: FormData) {
    const response = await createOrUpdate({
      currentEntity: role,
      formData,
      entityName: "Nível de acesso",
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
        title={`${isEditing ? "Editando" : "Cadastrando"} nível de acesso`}
        backUrl="/system/nivel-acesso"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              isRequired
              divClasses="sm:col-span-3"
              label="Nome"
              {...register("name")}
              error={errors.name}
            />

            <div className="col-span-full">
              {fields.map((field, index) => (
                <div key={field.id} className="border-b-gray-200 border-b py-6">
                  <p className="text-gray-600">{field.name}</p>
                  <div className="flex items-center gap-6">
                    {field.permissions.map((permission, indexP) => (
                      <Checkbox
                        id={permission.id}
                        key={permission.id}
                        label={
                          actionDictionary[
                            permission.action as keyof typeof actionDictionary
                          ]
                        }
                        {...register(
                          `menuItems.${index}.permissions.${indexP}.allowed`
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
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
    let role = null;
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
            destination: "/system/nivel-acesso",
            permanent: false,
          },
        };
      }

      role = response.role;
    } else {
      const { headers } = getHeaders(req as NextApiRequest);
      const { menuItems } = await fetchJson<any>("/menu-items/list", {
        method: "GET",
        headers,
      });

      role = { name: "", menuItems };
    }

    const data = encryptJSON({
      role,
    });

    return {
      props: {
        data,
      },
    };
  }
);

export default Page;

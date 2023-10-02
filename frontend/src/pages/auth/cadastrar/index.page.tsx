import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ReactElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/shared/button";
import { InputCpfCnpj } from "@/components/shared/input-cpf-cnpj";
import { Input } from "@/components/shared/input";
import { backURL } from "@/helpers/backend-url";
import { Layout } from "@/components/site/layout";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import fetchJson from "@/lib/fetch-json";
import { InputMask } from "@/components/shared/input-mask";
import { BackButton } from "@/components/shared/back-button";

const schema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Nome é obrigatório" })
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    roleCode: z.string().default("client"),
    document: z
      .string({ required_error: "CPF/CNPJ é obrigatório" })
      .nonempty({ message: "CPF/CNPJ é obrigatório" }),
    email: z
      .string()
      .email({ message: "E-mail inválido" })
      .nonempty({ message: "E-mail é obrigatório" }),
    phoneNumber: z
      .string()
      .nonempty({ message: "Número do telefone é obrigatório" }),
    password: z
      .string()
      .nonempty({ message: "Senha é obrigatória" })
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirmar senha é obrigatória" }),
  })

  .refine((schema) => !(schema.password !== schema.confirmPassword), {
    message: "As senhas digitadas são diferentes",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const Page: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      roleCode: "client",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  async function onSubmit(formData: FormData) {
    try {
      const response = await fetch(`${backURL}/users`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (response.error === false) {
        router.push("/auth/sucesso");
        return;
      } else {
        toast.warning(response.message);
      }
    } catch (error) {
      toast.warn(
        "Tivemos um erro ao processar suas informações. Por favor tente novamente mais tarde."
      );
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 justify-center">
        <div className="flex flex-1 flex-col px-4  pb-32 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-lg lg:w-[500px]">
            <div>
              <h2 className="mt-8 text-2xl font-semibold leading-9 tracking-tight text-tomilho-800 text-center">
                Crie sua conta na Vó Joana
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 text-center">
                Já tem uma conta?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-tomilho-600 hover:text-tomilho-500"
                >
                  Entrar
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div className="mb-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <Input
                    {...register("name")}
                    error={errors.name}
                    Icon={UserIcon}
                    label="Nome"
                  />

                  <InputCpfCnpj
                    name="document"
                    control={control}
                    error={errors.document}
                    Icon={IdentificationIcon}
                    label="CPF/CNPJ"
                  />

                  <Input
                    {...register("email")}
                    type="email"
                    Icon={EnvelopeIcon}
                    label="E-mail"
                    placeholder="seu-nome@exemplo.com"
                    error={errors.email}
                  />

                  <InputMask
                    control={control}
                    name="phoneNumber"
                    label="Número do telefone"
                    placeholder="(22) 22222-2222"
                    format="(##) #####-####"
                    error={errors.phoneNumber}
                  />
                  <div className="col-span-full ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        divClasses="col-span-1"
                        error={errors.password}
                        Icon={LockClosedIcon}
                        type="password"
                        label="Senha"
                        {...register("password")}
                      />

                      <Input
                        divClasses="col-span-1"
                        error={errors.confirmPassword}
                        Icon={LockClosedIcon}
                        type="password"
                        label="Confirmar Senha"
                        {...register("confirmPassword")}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Ao clicar em cadastrar, você concorda com nossas{" "}
                    <span className="text-tomilho-600">
                      <Link href="/politicas-termos">
                        políticas de privacidade e nossos termos
                      </Link>
                    </span>
                  </p>
                  <Button type="submit" isLoading={isSubmitting}>
                    Cadastrar
                  </Button>
                </form>
              </div>
              <BackButton title="voltar ao catálogo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  try {
    const { configuration } = await fetchJson<any>("/configurations/company", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { props: { configuration } };
  } catch (error) {
    return { props: { configuration: null } };
  }
}
export default Page;

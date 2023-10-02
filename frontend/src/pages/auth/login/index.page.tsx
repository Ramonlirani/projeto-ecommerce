import { ReactElement, useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import { z } from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/lib/use-user";
import { sessionOptions } from "@/lib/session";
import { Button } from "@/components/shared/button";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Layout } from "@/components/site/layout";
import { BackButton } from "@/components/shared/back-button";

const schema = z.object({
  login: z
    .string()
    .nonempty({ message: "E-mail ou nome de usuário é obrigatório" }),
  password: z.string().nonempty({ message: "Senha é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const { isLoggedIn, token } = req.session;

  let redirect = false;
  let destination = "/system/home";

  if (token && isLoggedIn) redirect = true;

  if (redirect) {
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}, sessionOptions);

const Page: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateUser } = useUser({
    redirectTo: "/system/home",
    redirectIfFound: true,
  });

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  async function onSubmit(formData: FormData) {
    try {
      setIsLoading(true);
      await mutateUser(
        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.error) {
              toast.warn(data?.message);
            }
          })
      );
    } catch (error) {
      toast.warn(
        "Identificamos uma instabilidade em nossos sistemas. Por favor tente novamente mais tarde"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 justify-center">
        <div className="flex flex-1 flex-col px-4 pb-32 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-semibold leading-9 tracking-tight text-tomilho-800 text-center">
                Acesse ao seu perfil da Vó
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 text-center">
                Não tem uma conta ainda?{" "}
                <Link
                  href="/auth/cadastrar"
                  className="font-semibold text-tomilho-600 hover:text-tomilho-500"
                >
                  Crie sua conta de graça
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div className="mb-10">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 shadow-sm"
                >
                  <Input
                    Icon={EnvelopeIcon}
                    label="E-mail"
                    {...register("login")}
                    error={errors.login}
                  />
                  <Input
                    type="password"
                    Icon={LockClosedIcon}
                    label="Senha"
                    {...register("password")}
                    error={errors.password}
                  />

                  <div className="flex items-center justify-between">
                    <div className="text-sm leading-6">
                      <Link
                        href="/auth/esqueci-senha"
                        className="font-semibold text-tomilho-600 hover:text-tomilho-500"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                  </div>

                  <Button isLoading={isLoading} type="submit">
                    Entrar
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

export default Page;

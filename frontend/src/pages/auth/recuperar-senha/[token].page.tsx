import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { get } from "lodash";
import { BackButton } from "@/components/shared/back-button";
import { backURL } from "@/helpers/backend-url";

const schema = z
  .object({
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

interface RecoverPasswordProps {
  token: string;
}

export default function RecoverPassword({ token }: RecoverPasswordProps) {
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  async function onSubmit(formData: FormData) {
    const body = JSON.stringify({
      password: formData.password,
      token: token || router.query?.token,
    });

    const response = await fetch(`${backURL}/auth/recover-password`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    const success = get(response, "success", false);
    if (success) {
      router.push("/auth/login");
      toast.success("Senha alterada com sucesso. Acesse sua conta");
    }
  }

  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-tomilho-500 to-tomilho-800 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="pt-24 sm:pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto text-center sm:w-full sm:max-w-md">
                <Logo />
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <h2 className="mb-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Recuperar senha
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Senha"
                    {...register("password")}
                    type="password"
                    error={errors.password}
                  />
                  <Input
                    label="Confirmar Senha"
                    {...register("confirmPassword")}
                    type="password"
                    error={errors.confirmPassword}
                  />

                  <Button type="submit" isLoading={isSubmitting}>
                    Recuperar senha
                  </Button>
                </form>

                <BackButton title="voltar ao site" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-tomilho-500 to-tomilho-800 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
    const token = params?.token as string;

    const res = await fetch(
      `${backURL}/auth/verify-token-recovery-password/${token}`
    ).then((res) => res.json());

    if (!res.tokenIsValid) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        token,
      },
    };
  },
  sessionOptions
);

import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { toast } from "react-toastify";
import { BackButton } from "@/components/shared/back-button";
import { backURL } from "@/helpers/backend-url";
import { Layout } from "@/components/site/layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "E-mail é obrigatório" })
    .email({ message: "E-mail inválido" }),
});

type FormData = z.infer<typeof schema>;

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  async function onSubmit(formData: FormData) {
    const response = await fetch(`${backURL}/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    const notVerifiedAt = get(response, "type.notVerifiedAt", false);
    const success = get(response, "type.success", false);

    if (success) {
      router.push("/auth/sucesso-esqueci-senha");
      return;
    } else if (notVerifiedAt) {
      toast.warn("Verifique seu e-mail para conseguir alterar sua senha.");
      router.push("/auth/login");
      return;
    }

    toast.warn("Nenhum email localizado.");
    router.push("/auth/login");
  }

  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex min-h-full flex-1 flex-col justify-center px-4 pb-56 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <h2 className="mb-6 text-2xl font-semibold leading-9 tracking-tight text-tomilho-800">
              Esqueci minha senha
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Informe seu e-mail"
                placeholder="email@exemplo.com"
                {...register("email")}
                type="email"
                error={errors.email}
              />

              <Button type="submit" isLoading={isSubmitting}>
                Enviar
              </Button>
            </form>
          </div>
          <BackButton title="voltar ao catálogo" />
        </div>
      </div>
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

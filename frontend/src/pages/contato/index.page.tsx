import { useState, ReactElement } from "react";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Image from "next/image";
import { get } from "lodash";

import fetchJson from "@/lib/fetch-json";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Layout } from "@/components/site/layout";
import { Input } from "@/components/shared/input";
import { TextArea } from "@/components/shared/textarea";
import { Button } from "@/components/shared/button";
import { InputMask } from "@/components/shared/input-mask";
import { ConfirmationContact } from "@/components/shared/confirmation-contact";
import logoFacebook from "@/assets/logo/facebook-logo.svg";
import logoInstagram from "@/assets/logo/instagram-logo.svg";
import logoYoutube from "@/assets/logo/youtube-logo.svg";

interface PageProps {
  configuration: {
    phone?: string;
    whatsApp?: string;
    address?: string;
    city?: string;
    state?: string;
    cnpj?: string;
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
}

const schema = z.object({
  name: z.string().nonempty({ message: "Nome é obrigatório" }),
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .nonempty({ message: "E-mail é obrigatório" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Número do telefone é obrigatório" }),
  message: z.string().nonempty({ message: "Mensagem é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const [showingConfirmContact, setShowingConfirmContact] = useState(false);

  const phone = get(props, "configuration.phone");
  const address = get(props, "configuration.address");
  const city = get(props, "configuration.city");
  const state = get(props, "configuration.state");
  const instagram = get(props, "configuration.instagram");
  const youtube = get(props, "configuration.youtube");
  const facebook = get(props, "configuration.facebook");

  const [isLoadingSwal, setIsLoadingSwal] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      email: "",
      message: "",
      name: "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isLoading },
  } = methods;

  async function onSubmit() {
    setShowingConfirmContact(true);
  }

  async function handleOnConfirm() {
    try {
      setIsLoadingSwal(true);
      const formData = getValues();

      const response = await fetchJson<any>("/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.error) {
        reset({ phoneNumber: "", email: "", message: "", name: "" });
        toast.success(
          "Sua mensagem foi recebida com sucesso e nossa equipe está trabalhando para fornecer uma resposta o mais breve possível."
        );
        return;
      }

      toast.warn(
        "Ocorreu um problema ao enviar sua mensagem. Por favor, tente novamente mais tarde."
      );
    } catch (error) {
      toast.warn(
        "Ocorreu um problema ao enviar sua mensagem. Por favor, tente novamente mais tarde."
      );
    } finally {
      setShowingConfirmContact(false);
      setIsLoadingSwal(false);
    }
  }

  return (
    <>
      <ConfirmationContact
        open={showingConfirmContact}
        setOpen={setShowingConfirmContact}
        onConfirm={handleOnConfirm}
        isLoading={isLoadingSwal}
      />

      <div className="relative isolate bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-tomilho-700">
                Entrar em Contato
              </h2>
              <p className="mt-6 text-lg leading-8 text-tomilho-700 ">
                Para ter informações sobre álbuns e serviços. Caso queira dar
                uma sugestão, elogio ou mesmo reclamação. Para nós, tua mensagem
                é muito importante.
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                {(address || city || state) && (
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <BuildingOffice2Icon
                        className="h-7 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <a
                      href="https://www.google.com/maps/place/LATITUDE,LONGITUDE"
                      className="hover:text-gray-900"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {address}, {city}
                      <br />
                      {state}
                    </a>
                  </div>
                )}
                {phone && (
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <PhoneIcon
                        className="h-7 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <a
                        className="hover:text-gray-900"
                        href="tel:+1 (555) 234-5678"
                      >
                        {phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      className="h-7 w-6 text-tomilho-600"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      className="text-gray-600 hover:text-gray-900 font-semibold"
                      href="mailto:hello@example.com"
                    >
                      contato@vojoanaconvites.com.br
                    </a>
                  </dd>
                </div>
                {facebook && (
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Facebook</span>
                      <Image src={logoFacebook} alt="Facebook" />
                    </dt>
                    <dd>
                      <a
                        className="hover:text-gray-900"
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {facebook}
                      </a>
                    </dd>
                  </div>
                )}
                {instagram && (
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Instagram</span>
                      <Image src={logoInstagram} alt="Instagram" />
                    </dt>
                    <dd>
                      <a
                        className="hover:text-gray-900"
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {instagram}
                      </a>
                    </dd>
                  </div>
                )}
                {youtube && (
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Youtube</span>
                      <Image src={logoYoutube} alt="Youtube" />
                    </dt>
                    <dd>
                      <a
                        className="hover:text-gray-900"
                        href="https://youtube.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {youtube}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48 bg-white"
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="sm:col-span-2">
                <div>
                  <Input
                    label="Nome"
                    placeholder="Digite seu nome completo"
                    {...register("name")}
                    error={errors.name}
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <Input
                      label="Email"
                      placeholder="seu-nome@exemplo.com"
                      {...register("email")}
                      error={errors.email}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <InputMask
                      control={control}
                      name="phoneNumber"
                      label="Número do telefone"
                      placeholder="(22) 22222-2222"
                      format="(##) #####-####"
                      error={errors.phoneNumber}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-2.5">
                    <TextArea
                      label="Mensagem"
                      placeholder="Digite sua mensagem"
                      {...register("message")}
                      error={errors.message}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  Enviar mensagem
                </Button>
              </div>
            </div>
          </form>
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

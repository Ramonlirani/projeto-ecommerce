import Image from "next/image";
import gmailLogo from "@/assets/images/gmail-icon.webp";
import outlookLogo from "@/assets/images/outlook-logo.png";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { BackButton } from "@/components/shared/back-button";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Layout } from "@/components/site/layout";
import { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return (
    <main className="isolate">
      <div className="mx-auto max-w-7xl text-center px-4 pb-32 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mt-12 text-lg leading-8 text-gray-600">
            <p className="text-center my-10">
              Quase lá! <b className="text-off-red">Acesse sua conta</b> para
              continuar o processo de recuperação de senha.
            </p>

            <p className="text-sm">
              Caso não encontre em sua caixa de entrada, verifique a pasta de
              spam.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <div className="flex justify-center mb-10">
            <Link
              href="https://mail.google.com/mail/u/0/?ogbl#inbox"
              target="_blank"
            >
              <Image
                className="max-h-9 object-contain"
                src={gmailLogo}
                alt="Gmail logo"
                width={138}
                height={38}
              />
            </Link>

            <Link href="https://outlook.live.com/mail/0/" target="_blank">
              <Image
                className="max-h-10 object-contain"
                src={outlookLogo}
                alt="Outlook logo"
                width={158}
                height={48}
              />
            </Link>
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

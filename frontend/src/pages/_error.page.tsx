import Image from "next/image";
import warning from "@/assets/images/warning.svg";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Logo } from "@/components/shared/logo";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode: number;
}
function Error({ statusCode }: ErrorProps) {
  return (
    <div className="w-full flex min-h-screen items-center justify-center relative flex-col gap-6">
      <Image
        src={warning}
        alt="Imagem informando problema"
        className="object-contain w-1/3"
      />

      {statusCode && statusCode === 404 ? (
        <p className="text-xl text-gray-700 text-center">
          Parece que você tentou acessar uma página que não existe. <br />
          Retorne ao nosso site.
        </p>
      ) : (
        <p className="text-xl text-gray-700 text-center">
          Ocorreu algum problema com nosso servidor. <br /> Por favor, tente
          novamente mais tarde.
        </p>
      )}

      <Link href="/" className="mt-4">
        <div className="flex gap-3 items-center text-tomilho">
          <ArrowLeftIcon width={20} /> voltar
        </div>
      </Link>

      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl top-30%]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-tomilho to-tomilho opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { Logo } from "@/components/shared/logo";
import { BackButton } from "@/components/shared/back-button";
import { backURL } from "@/helpers/backend-url";

export default function ValidateEmail() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto text-center text-gray-600">
        <Logo className="flex justify-center" />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-700">
          Erro ao validar link
        </h2>
        <p className="my-5">
          Tivemos algum problema em confirmar seu e-mail, por favor entre em
          contato ou tente novamente mais tarde.
        </p>

        <BackButton title="voltar para tela inicial" />
      </div>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ params }) {
    const code = params?.token as string;

    const res = await fetch(`${backURL}/auth/verify-code/${code}`).then((res) =>
      res.json()
    );

    if (res.error) {
      return {
        props: {},
      };
    }

    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  },
  sessionOptions
);

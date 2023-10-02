import { ReactElement } from "react";
import { Layout } from "@/components/system/layout";
import { requireAuthentication } from "@/helpers/require-authentication";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";

const Page: NextPageWithLayout = () => {
  return <p>Basic home screen</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

export const getServerSideProps = requireAuthentication(() => {
  return {
    props: {},
  };
});

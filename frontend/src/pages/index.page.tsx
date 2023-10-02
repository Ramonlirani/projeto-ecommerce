import type { ReactElement } from "react";

import { Layout } from "@/components/site/layout";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Banner } from "@/components/site/home/banner";
import { Bestseller } from "@/components/site/home/bestseller";
import { DeliveryDetails } from "@/components/site/home/delivery-details";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <Banner />
      <DeliveryDetails />
      <Bestseller />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

import type { ReactElement } from "react";

import { Layout } from "@/components/site/layout";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Banner } from "@/components/site/home/banner";
import { Bestseller } from "@/components/site/home/bestseller";
import { DeliveryDetails } from "@/components/site/home/delivery-details";
import { Highlights } from "@/components/shared/highlights";
import { Launch } from "@/components/shared/launch";
import { Tips } from "@/components/shared/tips";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <Banner />
      <DeliveryDetails />
      <Launch />
      <Highlights />
      <Bestseller />
      <Tips />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

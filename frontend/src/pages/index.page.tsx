import { type ReactElement } from "react";

import { Layout } from "@/components/site/layout";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Banner } from "@/components/site/home/banner";
import { Bestseller } from "@/components/site/home/bestseller";
import { DeliveryDetails } from "@/components/site/home/delivery-details";
import { Highlights } from "@/components/shared/highlights";
import { Launch } from "@/components/shared/launch";
import { Tips } from "@/components/shared/tips";
import fetchJson from "@/lib/fetch-json";
import { Product } from "@/interfaces/Product";
import { get } from "lodash";

interface PageProps {
  productLaunches: Product[];
  productBestSeller: Product[];
}

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const productLaunches = get(props, "productLaunches", []) || [];
  const productBestSeller = get(props, "productBestSeller", []) || [];

  return (
    <div>
      <Banner />
      <DeliveryDetails />
      <Launch productLaunches={productLaunches} />
      <Highlights />
      <Bestseller productBestSeller={productBestSeller} />
      <Tips />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async () => {
  const { productLaunches, productBestSeller } = await fetchJson<any>(
    "/products/launchesAndBestSeller",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return { props: { productLaunches, productBestSeller } };
};

export default Page;

import type { ReactElement } from "react";
import { get } from "lodash";

import { Layout } from "@/components/site/layout";
import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { FaqCategory } from "@/interfaces/FaqCategory";
import Faqs from "@/components/site/home/faqs/faqs";
import fetchJson from "@/lib/fetch-json";

interface PageProps {
  faqs: FaqCategory[];
}

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const faqs = get(props, "faqs", []) || [];

  return (
    <div>
      <div className="pb-24 mx-auto pt-6 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <section id="faq" className="xl:mx-auto xl:max-w-7xl">
          <Faqs faqCategories={faqs} />
        </section>
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async () => {
  const { faqs } = await fetchJson<any>("/faq-categories/list-with-faq", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { props: { faqs } };
};

export default Page;

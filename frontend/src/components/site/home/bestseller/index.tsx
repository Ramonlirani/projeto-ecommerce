import Image from "next/image";
import convite1 from "@/assets/images/convite1.jpg";
import convite2 from "@/assets/images/convite2.jpg";
import convite4 from "@/assets/images/convite4.jpg";

import { useState } from "react";
import { CardProduct } from "@/components/shared/card-product";
import HeadingAnimate from "@/components/shared/animate/HeadingAnimate";
import { Product } from "@/interfaces/Product";

interface BestSellerProps {
  productBestSeller: Product[];
}

export function Bestseller({ productBestSeller }: BestSellerProps) {
  return (
    <>
      <main className="mx-auto max-w-2xl px-4 lg:max-w-full lg:px-28">
        <HeadingAnimate amount={1}>
          <div className="border-b border-gray-200">
            <p className="text-black font-semibold text-xl">MAIS VENDIDOS</p>
          </div>
        </HeadingAnimate>

        <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <section
            aria-labelledby="product-heading"
            className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-4"
          >
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-5">
              {productBestSeller.map((product: any) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

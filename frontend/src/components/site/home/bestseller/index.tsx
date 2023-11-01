import Image from "next/image";
import convite1 from "@/assets/images/convite1.jpg";
import convite2 from "@/assets/images/convite2.jpg";
import convite4 from "@/assets/images/convite4.jpg";

import { useState } from "react";
import { CardProduct } from "@/components/shared/card-product";

const products = [
  {
    id: 1,
    name: "Convite de luxo",
    href: "#",
    price: "R$ 256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
    secondaryImage:
      "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 2,
    name: "Convite clássico",
    href: "#",
    price: "R$ 32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg",
    secondaryImage:
      "https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 3,
    name: "Convite de luxo",
    href: "#",
    price: "R$ 256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc: "./invitations/convite1.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 4,
    name: "Convite clássico",
    href: "#",
    price: "R$ 42",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "./invitations/convite2.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 5,
    name: "Convite de luxo",
    href: "#",
    price: "R$ 214",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc: "./invitations/convite1.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 6,
    name: "Convite clássico",
    href: "#",
    price: "R$ 13",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "./invitations/convite2.jpg",
    secondaryImage: "./invitations/convite4.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
];

export function Bestseller() {
  return (
    <>
      <main className="mx-auto max-w-2xl px-4 lg:max-w-full lg:px-28">
        <div className="border-b border-gray-200">
          <p className="text-black font-semibold text-xl">MAIS VENDIDOS</p>
        </div>

        <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <section
            aria-labelledby="product-heading"
            className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-4"
          >
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
              {products.map((product: any) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

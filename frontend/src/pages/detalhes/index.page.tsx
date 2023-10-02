import { ReactElement } from "react";

import { NextPageWithLayout } from "@/interfaces/NextPageWithLayout";
import { Layout } from "@/components/site/layout";

import Breadcrumbs from "@/components/shared/breadcrumbs";
import InputIncrement from "@/components/shared/input-increment";
import { CardProduct } from "@/components/shared/card-product";

const product = {
  name: "Botânica",
  price: "R$35,00",
  rating: 3.9,
  reviewCount: 512,
  href: "#",

  images: [
    {
      id: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
  ],
  colors: [
    { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    {
      name: "Heather Grey",
      bgColor: "bg-gray-400",
      selectedColor: "ring-gray-400",
    },
  ],
  description: `
    The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.
    Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.
  `,
  details: [
    "Only the best materials",
    "Ethically and locally made",
    "Pre-washed and pre-shrunk",
    "Machine wash cold with similar colors",
  ],
};

const products = [
  {
    id: 1,
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
    id: 2,
    name: "Convite clássico",
    href: "#",
    price: "R$ 32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "./invitations/convite2.jpg",
    secondaryImage: "./invitations/convite4.jpg",
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
];

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = (props: PageProps) => {
  return (
    <>
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4">
              <Breadcrumbs />
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>
                <div className="flex justify-center">
                  {product.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.imageSrc}
                      alt="Carrosel de imagens"
                      className="h-96 object-fill"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                {/* Product details */}
                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900 ">
                    Descrição
                  </h2>

                  <div className="prose prose-sm mt-4 mb-8 text-gray-500">
                    {product.description}
                  </div>
                </div>
                <form>
                  {/* Quantity */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Quantidade
                      </h2>
                    </div>
                    <InputIncrement />
                  </div>

                  <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-tomilho-600 px-8 py-3 text-base font-medium text-white hover:bg-tomilho-700 focus:outline-none focus:ring-2 focus:ring-tomilho-500 focus:ring-offset-2"
                  >
                    Adicionar à sacola
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full ">
              <h2 className="text-bold text-3xl text-capim-de-cheiro border-b border-gray-200 py-3 pt-32 ">
                Descrição Geral
              </h2>
              <p className="pt-12 text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
                cumque perspiciatis quaerat sint sapiente labore reprehenderit
                ut odio rem iste, consequuntur molestias laborum aperiam
                laudantium at tenetur aliquid ducimus odit? Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Tempore ipsa architecto
                vel cupiditate, hic sunt veniam inventore sint ea iste laborum
                vitae obcaecati tenetur, explicabo labore maiores necessitatibus
                minima doloremque.
                <br /> Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Illum, cumque perspiciatis quaerat sint sapiente labore
                reprehenderit ut odio rem iste, consequuntur molestias laborum
                aperiam laudantium at tenetur aliquid ducimus odit? Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Tempore ipsa
                architecto vel cupiditate, hic sunt veniam inventore sint ea
                iste laborum vitae obcaecati tenetur, explicabo labore maiores
                necessitatibus minima doloremque.
              </p>
            </div>
            <h2 className="text-bold text-3xl text-capim-de-cheiro border-b border-gray-200 py-3 pt-32">
              É do seu gosto? Então veja estes produtos similares
            </h2>
            <div className="grid grid-cols-1 gap-y-4 pt-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
              {products.map((product: any) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

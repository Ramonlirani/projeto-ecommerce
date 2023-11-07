import { CardProduct } from "../card-product";

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
];

export function Launch() {
  return (
    <div>
      <>
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-black md:mb-10 sm:hidden">
          <p className="text-white text-3xl tracking-wider">
            {`"FAÇA DO SEU ESTILO UM TREINO DIÁRIO: DREAM FIT, A MODA QUE TE MANTÉM EM FORMA."`}
          </p>
        </div>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-full lg:px-28">
          <div className="border-b border-gray-200">
            <p className="text-black font-semibold text-xl">
              NOSSOS LANÇAMENTOS
            </p>
          </div>
          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-4"
            >
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-5">
                {products.map((product: any) => (
                  <CardProduct
                    key={product.id}
                    product={product}
                    launch={true}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </>
    </div>
  );
}

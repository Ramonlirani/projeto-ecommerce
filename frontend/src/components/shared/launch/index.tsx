import HeadingAnimate from "../animate/HeadingAnimate";
import LoadAnimate from "../animate/LoadAnimate";
import { CardProduct } from "../card-product";
import { Product } from "@/interfaces/Product";

interface LaunchProps {
  productLaunches: Product[];
}

export function Launch({ productLaunches }: LaunchProps) {
  return (
    <div>
      <>
        <div className="hidden md:flex md:justify-center md:items-center md:p-12 md:bg-black md:mb-10 sm:hidden">
          <p className="text-white text-3xl tracking-wider">
            {`"FAÇA DO SEU ESTILO UM TREINO DIÁRIO: DREAM FIT, A MODA QUE TE MANTÉM EM FORMA."`}
          </p>
        </div>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-full lg:px-28">
          <HeadingAnimate amount={1}>
            <div className="border-b border-gray-200">
              <p className="text-black font-semibold text-xl">
                NOSSOS LANÇAMENTOS
              </p>
            </div>
          </HeadingAnimate>
          <div className="pb-24 pt-12 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:grid-cols-4">
            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-4"
            >
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-5">
                {productLaunches.map((product: any) => (
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

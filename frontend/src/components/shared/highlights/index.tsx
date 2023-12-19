import Image from "next/image";
import camisas from "@/assets/images/camisetafitness.png";
import joelheira from "@/assets/images/joelheira.png";
import cropped from "@/assets/images/croppedfitness.png";
import HeadingAnimate from "../animate/HeadingAnimate";
import LoadAnimate from "../animate/LoadAnimate";

const highlights = [
  {
    id: 1,
    name: "CAMISAS",
    href: "#",
    imageSrc: camisas,
    imageAlt: "Imagem de uma camisa",
  },
  {
    id: 2,
    name: "ACESSÓRIOS",
    href: "#",
    imageSrc: joelheira,
    imageAlt: "Imagem de uma joelheira",
  },
  {
    id: 3,
    name: "CROPPED",
    href: "#",
    imageSrc: cropped,
    imageAlt: "Imagem de um cropped",
  },
];

export function Highlights() {
  return (
    <>
      <main className="mx-auto max-w-2xl px-4 lg:max-w-full lg:px-28">
        <HeadingAnimate amount={1}>
          <div className="border-b border-gray-200">
            <p className="text-black font-semibold text-xl">
              NAVEGUE POR CATEGORIAS
            </p>
          </div>
        </HeadingAnimate>

        <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 ">
          <section
            aria-labelledby="product-heading"
            className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-4"
          >
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {highlights.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center cursor-pointer overflow-hidden group relative"
                >
                  <LoadAnimate amount={0}>
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      width={600}
                      height={800}
                      className="transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                      <p className="text-white text-2xl font-semibold">
                        {item.name}
                      </p>
                    </div>
                  </LoadAnimate>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

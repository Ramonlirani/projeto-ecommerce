import { Product } from "@/interfaces/Product";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { formatNumber } from "@/helpers/format-number";
import Link from "next/link";
import LoadAnimate from "../animate/LoadAnimate";

interface CardProductProps {
  product: Product;
  launch?: boolean;
}

function truncateText(text: string, maxWords: number): string {
  const words = text?.split(" ");
  if (words?.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  } else {
    return text;
  }
}

export function CardProduct({ product, launch }: CardProductProps) {
  const truncatedDescription = truncateText(product.shortDescription, 10);

  const sumTotal = product.discount + product.price;

  return (
    <div
      key={product.id}
      className="group flex flex-col overflow-hidden rounded-sm bg-white border border-gray-200 pt-3 pr-3 pl-3 pb-0 relative"
      id="div-main"
    >
      <LoadAnimate amount={0}>
        <a className="flex flex-col h-full" href={`/detalhes?id=${product.id}`}>
          {launch && (
            <div className="absolute inset-0 flex justify-start items-start pl-4 pt-4">
              <p className="text-white bg-off-red text-sm p-1">LANÇAMENTOS</p>
            </div>
          )}
          <div className="flex">
            <Image
              src={product.imageUrl}
              alt="Imagem dos produtos"
              width={400}
              height={200}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col justify-end p-4 h-full">
            <div>
              <h3 className="text-xl text-black tracking-widest font-semibold">
                {product.name.toUpperCase()}
              </h3>
              {!launch && (
                <p className="text-md text-gray-400">{truncatedDescription}</p>
              )}
            </div>
            <div className="justify-start">
              {product.discount > 0 && (
                <p className="text-md line-through">
                  de {formatNumber({ number: sumTotal })}
                </p>
              )}
              <p className="text-xl text-off-red">
                por {formatNumber({ number: product.price })}
              </p>

              {product.price >= 10000 && (
                <p className="text-sm text-black">em até 4x sem juros</p>
              )}

              <Tooltip id={`plus-icon-${product.id}`} />
            </div>
          </div>
        </a>
      </LoadAnimate>
    </div>
  );
}

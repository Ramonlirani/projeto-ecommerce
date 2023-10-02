import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

interface CardProductProps {
  product: any;
}

function truncateText(text: string, maxWords: number): string {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  } else {
    return text;
  }
}

export function CardProduct({ product }: CardProductProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const truncatedDescription = truncateText(product.description, 12);

  return (
    <div
      key={product.id}
      className="group relative flex flex-col overflow-hidden rounded-lg shadow-xl bg-white"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-top bg-cover bg-no-repeat h-56 transition-all duration-400"
        style={{
          backgroundImage: `url(${
            isHovering ? product.secondaryImage : product.imageSrc
          })`,
        }}
      ></div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-semibold text-tomilho-500">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400">{truncatedDescription}</p>{" "}
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-gray-500">{product.price}</p>
          <span className="flex justify-between mt-5">
            <a href="/detalhes">
              <p className="text-tomilho-500 hover:opacity-75">Ver detalhes</p>
            </a>
            <button
              className="bg-tomilho-500 hover:opacity-75 text-white rounded-full p-2 flex items-center justify-center"
              data-tooltip-id={`plus-icon-${product.id}`}
              data-tooltip-content="Adicionar a sacola"
            >
              <PlusIcon width={15} height={15} />
            </button>
          </span>
          <Tooltip id={`plus-icon-${product.id}`} />
        </div>
      </div>
    </div>
  );
}

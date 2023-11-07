import { useState } from "react";
import { Tooltip } from "react-tooltip";

interface CardProductProps {
  product: any;
  launch?: boolean;
}

function truncateText(text: string, maxWords: number): string {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  } else {
    return text;
  }
}

export function CardProduct({ product, launch }: CardProductProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const truncatedDescription = truncateText(product.description, 10);

  return (
    <div
      key={product.id}
      className="group relative flex flex-col overflow-hidden rounded-sm bg-white border border-gray-200 pt-3 pr-3 pl-3 pb-0"
      id="div-main"
    >
      <a href="/detalhes">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bg-top bg-cover bg-no-repeat h-96 transition-all duration-600"
          style={{
            backgroundImage: `url(${
              isHovering ? product.secondaryImage : product.imageSrc
            })`,
          }}
        ></div>

        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-xl  text-black tracking-widest font-semibold">
            {product.name.toUpperCase()}
          </h3>
          {!launch && (
            <p className="text-md text-gray-400">{truncatedDescription}</p>
          )}
          <div className="flex flex-1 flex-col justify-end ">
            <p className=" text-xl text-off-red font-bold">{product.price} </p>
            <Tooltip id={`plus-icon-${product.id}`} />
          </div>
          {launch && (
            <div className="absolute inset-0 flex items-start justify-start p-5 pl-7">
              <p className="text-white bg-off-red text-sm p-1">LANÇAMENTOS</p>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

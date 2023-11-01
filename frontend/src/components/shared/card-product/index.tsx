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
      className="group relative flex flex-col overflow-hidden rounded-sm bg-white border border-gray-300 pt-3 pr-3 pl-3 pb-0"
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
          <h3 className="text-lg  text-black">{product.name.toUpperCase()}</h3>
          {/* <p className="text-md text-gray-400">{truncatedDescription}</p>{" "} */}
          <div className="flex flex-1 flex-col justify-end ">
            <p className=" text-lg text-off-red">{product.price}</p>

            <Tooltip id={`plus-icon-${product.id}`} />
          </div>
        </div>
      </a>
    </div>
  );
}

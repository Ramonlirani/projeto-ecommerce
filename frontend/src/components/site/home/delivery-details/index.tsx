import Image from "next/image";

import truckFast from "@/assets/icons/truckFast.svg";
import creditCard from "@/assets/icons/creditCard.svg";
import tag from "@/assets/icons/tag.svg";
import money from "@/assets/icons/money.svg";

export function DeliveryDetails() {
  return (
    <>
      <div className="w-full md:h-36 text-center bg-background-main text-black ">
        <div className="flex flex-wrap md:gap-6 lg:gap-6 p-4 mx-auto max-w-2xl lg:max-w-7xl lg:px-8 justify-between h-full items-center text-center">
          <div className="md:flex">
            <Image
              src={creditCard}
              alt="Cartão de crédito"
              width={50}
              className="mx-auto md:mr-3 lg:mr-3"
            />
            <p>
              Pague parcelado <br /> no cartão de crédito
            </p>{" "}
          </div>
          <div className="md:flex">
            <Image
              src={truckFast}
              alt="Caminhão de entrega"
              width={50}
              className="mx-auto md:mr-3 lg:mr-3"
            />
            <p>
              Frete calculado apenas após <br /> finalização do pedido
            </p>
          </div>
          <div className="md:flex">
            <Image
              src={tag}
              alt="Tag"
              width={50}
              className="mx-auto md:mr-3 lg:mr-3"
            />
            <p>
              Desconto de 5% <br /> nas compra por PIX
            </p>
          </div>
          <div className="md:flex">
            <Image
              src={money}
              alt="Dinheiro"
              width={50}
              className="mx-auto md:mr-3 lg:mr-3"
            />
            <p className="w-44">
              Orçamento feito através <br /> dos nossos contatos
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

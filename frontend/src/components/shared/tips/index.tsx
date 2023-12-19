import imagem1 from "@/assets/images/imagem1.webp";
import imagem2 from "@/assets/images/imagem2.webp";
import imagem3 from "@/assets/images/imagem3.webp";
import Image from "next/image";
import LoadAnimate from "../animate/LoadAnimate";

const items = [
  {
    id: 1,
    tittle: "SHORT PARA ACADEMIA: CONFORTO, FRESCOR E ESTILO",
    imageSrc: imagem1,
    alt: "Imagem1",
    description:
      "O short para academia é ideal para treinos tanto indoor quanto outdoor. Nossas peças não embolam na perna e não ficam subindo durante os seus exercícios. Ou seja, são super confortáveis e apresentam zero transparência, além de proporcionar melhor frescor nos dias quentes de treino.",
  },
  {
    id: 2,
    tittle:
      "TOP PARA ACADEMIA DA HONEY BE: O UP QUE VOCÊ PRECISA NO SEU TREINO",
    imageSrc: imagem2,
    alt: "Imagem2",
    description:
      "Chega de ir treinar com tops para academia frouxos e que não dão sustentação e segurança. Os tops da DreamFit são confeccionados em poliamida e elastano, tecidos ideais para proporcionar sustentação e mobilidade. Assim, você pode tanto treinar força quanto cardio",
  },
  {
    id: 3,
    tittle: "ROUPA DE ACADEMIA FEMININA COM OS MELHORES PREÇOS",
    imageSrc: imagem3,
    alt: "Imagem3",
    description:
      "Na DreamFit fitness você encontra roupa de academia feminina com os melhores preços do mercado. O custo benefício é um dos melhores, afinal você compra roupa fitness com alta durabilidade por um precinho amigo!",
  },
];

export function Tips() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 lg:max-w-full lg:px-28 ">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        {items.map((item: any) => (
          <>
            <LoadAnimate amount={0}>
              <div>
                <Image
                  src={item.imageSrc}
                  width={600}
                  height={500}
                  alt={item.alt}
                />
                <p className="text-xl font-semibold text-start p-2">
                  {item.tittle}
                </p>
                <p className="text-start p-2 text-jet">{item.description}</p>
              </div>
            </LoadAnimate>
          </>
        ))}
      </div>
    </main>
  );
}

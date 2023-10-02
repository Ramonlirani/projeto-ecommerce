interface Props {
  number: number;
  divideBy100?: boolean;
}
export function formatNumber({ number, divideBy100 = true }: Props) {
  let value = divideBy100 ? number / 100 : number;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

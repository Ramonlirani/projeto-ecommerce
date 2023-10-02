export function maskNumber(number: number): string {
  const numberStr: string = number.toString();

  if (numberStr.length >= 5) {
    return numberStr;
  }

  const leadingZeros: number = 5 - numberStr.length;

  return '#' + '0'.repeat(leadingZeros) + numberStr;
}

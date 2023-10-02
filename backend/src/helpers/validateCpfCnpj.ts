export function validateCPFCNPJ(number: string): boolean {
  const cleanedNumber: string = number.replace(/\D/g, '');

  if (cleanedNumber.length === 11) {
    let sum = 0;
    let remainder = 0;

    if (
      cleanedNumber === '00000000000' ||
      cleanedNumber === '11111111111' ||
      cleanedNumber === '22222222222' ||
      cleanedNumber === '33333333333' ||
      cleanedNumber === '44444444444' ||
      cleanedNumber === '55555555555' ||
      cleanedNumber === '66666666666' ||
      cleanedNumber === '77777777777' ||
      cleanedNumber === '88888888888' ||
      cleanedNumber === '99999999999'
    ) {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedNumber[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedNumber[9])) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedNumber[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedNumber[10])) {
      return false;
    }

    return true;
  } else if (cleanedNumber.length === 14) {
    let size = cleanedNumber.length - 2;
    let numbers = cleanedNumber.substring(0, size);
    const digits = cleanedNumber.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result: number = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(0))) {
      return false;
    }

    size += 1;
    numbers = cleanedNumber.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(1))) {
      return false;
    }

    return true;
  } else {
    return false;
  }
}

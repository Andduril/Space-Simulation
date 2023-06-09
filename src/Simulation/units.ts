// 1 unité = 1000km;
export const ratioUnit = 1 / 1000;

export const kmToUnit = (nb: number): number => {
  return nb * ratioUnit;
}

export const unitToKm = (nb: number): number => {
  return nb / ratioUnit;
}
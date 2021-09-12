import { chunk } from 'lodash';
import { ScaledSize } from 'react-native';

export function splitInChunks(arr: any[], size: number): any[][] {
  return chunk(arr, size);
}

export function getHeightBasedOnText(
  text: string,
  dimensions: ScaledSize,
): number {
  // thats basically the rendered width for the text
  // -80 because of the horizontal padding
  const maxTextWidth = Math.ceil(dimensions.width - 80) * 0.8;
  const prop = Number((maxTextWidth / text.length).toFixed(2));

  let height;

  if (prop % 1 <= 0.1) height = 63;
  else if (prop >= 7.6) height = 44;
  else if (prop > 4.4) height = 63;
  else height = 80;

  return height + 15;

  // altura do comp para 1 linha: 45 (44)
  // altura do comp para 2 linhas: 63 (62.9)
  // altura do comp para 3 linhas: 80 (78.9)
}

export function asciify(intensity: number, maxIntensity: number) {
  const symbols = [" ", ",", "^", "*", ":", "!", "{", "%", "&", "#", "@"];

  const symbolIndex = Math.floor((intensity * 10) / maxIntensity);
  return symbols[symbolIndex];
}

/** Get the contrast color for a given hex color
 */
export function contrast(hexcolor) {
  if (!hexcolor) return "black";
  const r = parseInt(hexcolor.substr(1, 2), 16);
  const g = parseInt(hexcolor.substr(3, 2), 16);
  const b = parseInt(hexcolor.substr(5, 2), 16);
  const yiq = (r * 114 + g * 587 + b * 299) / 1000;
  return yiq >= 192 ? "black" : "white";
}

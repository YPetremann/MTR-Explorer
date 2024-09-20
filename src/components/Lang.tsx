import { useConfig } from "../context/config";

const prefered = 1;
export function lang(text) {
  if (text === undefined) return "";
  if (typeof text === "string") return text;
  const last = text.length - 1;
  const txt = text[Math.min(prefered, last)];
  return txt;
}
export default function Lang({ text }: { text: string[] }) {
  return lang(text);
}

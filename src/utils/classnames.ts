export default function classnames(...args) {
  return args.filter(Boolean).join(" ");
}

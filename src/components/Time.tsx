export function Time({ ticks }) {
  const seconds = Math.round(ticks / 20);
  const minutes = Math.floor(seconds / 60);
  return (
    <span className="dim">
      {!!minutes && `${minutes} min `}
      {!!seconds % 60 && `${seconds % 60} sec`}
    </span>
  );
}

export default function fileFormatter(results, context) {
  const files = new Set();
  for (const result of results) files.add(result.filePath);
  return (
    `Files need attention:\n` +
    [...files.values()].map((e) => ` - ${e}`).join("\n")
  );
}

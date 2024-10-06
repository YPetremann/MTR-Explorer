import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Uh Oh, something went wrong!</h1>
      <pre>{error.stack}</pre>
    </div>
  );
}

import { NavLink } from "../components/NavLink";

export function Page404() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-base text-neutral-600">404</p>
        <h1 className="mt-4 font-bold text-3xl text-neutral-800 tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base text-neutral-600 leading-7">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NavLink
            className="rounded-md bg-menu-600 px-3.5 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2"
            to="/"
          >
            Go back home
          </NavLink>
        </div>
      </div>
    </main>
  );
}

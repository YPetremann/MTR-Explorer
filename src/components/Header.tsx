export function Header({ name, children }) {
  return (
    <header className="bg-header text-header shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {name && <h1 className="font-bold text-3xl tracking-tight">{name}</h1>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </header>
  );
}

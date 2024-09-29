export default function Header({ name, children }) {
  return (
    <header className="bg-gray-200 shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {name && (
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {name}
          </h1>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </header>
  );
}

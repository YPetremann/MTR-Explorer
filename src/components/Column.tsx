export default function Column({ children, className }: { children: React.ReactNode }) {
  return <div className={`flex column ${className}`}>{children}</div>
}
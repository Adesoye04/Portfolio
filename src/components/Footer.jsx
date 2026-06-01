export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
      <div className="font-serif text-terracotta text-base">Adesoye Oyeyiola</div>
      <div>Prince George, BC · UNBC Class of 2028</div>
      <div className="flex gap-6">
        <a href="https://github.com/Adesoye04" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">GitHub</a>
        <a href="https://linkedin.com/in/adesoye-oyeyiola" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">LinkedIn</a>
        <a href="mailto:adesoyeoyeyiola44@gmail.com" className="hover:text-terracotta transition-colors">Email</a>
      </div>
    </footer>
  )
}

import { Search as SearchIcon } from "lucide-react";

export function Search() {
  const genres = ["Indie", "Rock", "Rap", "Eletrônica", "Alternativo", "Post-Punk", "Ambient"];

  return (
    <div className="p-5 pb-32 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Busca</h1>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-3.5 text-brand-muted" size={18} />
        <input
          type="text"
          placeholder="O que você quer descobrir?"
          className="w-full bg-brand-surface border border-brand-border rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent transition"
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Categorias Underground</h2>
        <div className="grid grid-cols-2 gap-3">
          {genres.map((genre) => (
            <div
              key={genre}
              className="h-20 bg-gradient-to-br from-brand-card to-brand-surface border border-brand-border/60 rounded-xl p-3 flex items-end font-semibold text-white hover:border-brand-accent/50 cursor-pointer transition"
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
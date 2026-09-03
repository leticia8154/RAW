import { Play, Flame, Sparkles } from "lucide-react";
import { MOCK_TRACKS } from "../data/mockData";

export function Home({ onSelectTrack }) {
  return (
    <div className="p-5 pb-32 max-w-md mx-auto space-y-8">
      {/* Header */}
      <header className="pt-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">RA<span className="text-brand-accent">W</span></h1>
          <p className="text-xs text-brand-muted font-medium tracking-wide mt-0.5">Seu underground favorito.</p>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-mono text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-full border border-brand-accent/30">
          Beta v1.0
        </span>
      </header>

      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-brand-card to-brand-surface p-5 border border-brand-border overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles size={14} />
          <span>Antes do Hype</span>
        </div>
        <h2 className="text-xl font-bold text-white leading-tight">
          Descubra o que ainda não foi escutado pelo algoritmo tradicional.
        </h2>
      </div>

      {/* RAW Invisível */}
      <section className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-bold text-white tracking-tight">RAW Invisível</h3>
          <span className="text-xs text-brand-muted font-mono">0.01% OUVINTES</span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-5 px-5">
          {MOCK_TRACKS.map((track) => (
            <div
              key={track.id}
              className="min-w-[200px] bg-brand-card/50 border border-brand-border rounded-xl p-3 flex flex-col justify-between group hover:border-brand-accent/50 transition cursor-pointer"
              onClick={() => onSelectTrack(track)}
            >
              <div className="relative mb-3">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-44 object-cover rounded-lg"
                />
                <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-brand-accent text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                  <Play size={18} fill="black" className="ml-0.5" />
                </button>
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-brand-accent border border-white/10">
                  SCORE {track.rawScore}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm truncate">{track.title}</h4>
                <p className="text-xs text-brand-muted truncate">{track.artist}</p>
                <div className="mt-2 flex justify-between items-center text-[10px] text-brand-muted border-t border-brand-border/50 pt-2">
                  <span>{track.genre}</span>
                  <span className="text-brand-accent font-mono">{track.popularity}% pop.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import { Play, Pause, SkipBack, SkipForward, ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function Player({ currentTrack, isPlaying, setIsPlaying }) {
  if (!currentTrack) return <div className="p-5 text-center text-brand-muted">Nenhuma música selecionada.</div>;

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen flex flex-col justify-between">
      <header className="flex justify-between items-center">
        <Link to="/" className="text-brand-muted hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <span className="text-xs font-mono uppercase tracking-widest text-brand-muted">TOCANDO DO RAW</span>
        <div className="w-6" />
      </header>

      {/* Capa */}
      <div className="my-6">
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-brand-border shadow-2xl">
          <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-brand-accent/30 text-xs font-mono text-brand-accent">
            RAW {currentTrack.rawScore}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{currentTrack.title}</h1>
          <p className="text-sm text-brand-muted">{currentTrack.artist}</p>
        </div>

        {/* Métrica Underground */}
        <div className="bg-brand-card p-3 rounded-xl border border-brand-border/60 flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase font-mono text-brand-muted block">Índice Popularidade</span>
            <span className="text-sm font-bold text-white">{currentTrack.popularity}% (Extremamente Baixo)</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-brand-accent block">"Você chegou antes!"</span>
          </div>
        </div>

        {/* Progresso */}
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-brand-surface rounded-full overflow-hidden">
            <div className="h-full bg-brand-accent w-1/3" />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-brand-muted">
            <span>1:12</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between pt-2">
          <button className="text-brand-muted hover:text-white"><SkipBack size={24} /></button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-brand-accent text-black flex items-center justify-center hover:scale-105 transition shadow-lg shadow-brand-accent/20"
          >
            {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
          </button>
          <button className="text-brand-muted hover:text-white"><SkipForward size={24} /></button>
        </div>
      </div>
    </div>
  );
}
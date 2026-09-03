import React from "react";
import { ShieldAlert, Award, Clock, Heart } from "lucide-react";
import { MOCK_TRACKS } from "../data/mockData";

export function Profile({ onSelectTrack }) {
  return (
    <div className="p-5 pb-32 max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-brand-accent font-bold text-xl">
          RAW
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Explorador RAW</h1>
          <p className="text-xs text-brand-muted font-mono">Pioneiro nível 04</p>
        </div>
      </div>

      {/* Alerta Proteção Auditiva RAW+ */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl flex items-start gap-3">
        <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={18} />
        <div className="text-xs">
          <h4 className="font-semibold text-amber-500">RAW+ Proteja sua Audição</h4>
          <p className="text-brand-muted mt-0.5">Exposição contínua alta. Considere diminuir o volume para continuar escutando com clareza.</p>
        </div>
      </div>

      {/* Seção Eu Cheguei Antes */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Award className="text-brand-accent" size={18} />
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">EU CHEGUEI ANTES</h2>
        </div>
        
        <div className="bg-brand-surface border border-brand-border rounded-xl p-4 space-y-3">
          <p className="text-xs text-brand-muted">Artistas que você descobriu quando tinham menos de 20% de popularidade:</p>
          {MOCK_TRACKS.map((track) => (
            <div key={track.id} className="flex items-center justify-between text-xs border-t border-brand-border/40 pt-2">
              <span className="font-medium text-white">{track.artist}</span>
              <span className="font-mono text-brand-accent">Descoberto a {track.popularity}% pop.</span>
            </div>
          ))}
        </div>
      </section>

      {/* Abas Rápidas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-card p-3 rounded-xl border border-brand-border flex items-center gap-2 text-xs font-semibold text-white">
          <Heart size={16} className="text-brand-accent" /> Favoritos
        </div>
        <div className="bg-brand-card p-3 rounded-xl border border-brand-border flex items-center gap-2 text-xs font-semibold text-white">
          <Clock size={16} className="text-brand-accent" /> Recentes
        </div>
      </div>
    </div>
  );
}
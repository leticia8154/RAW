import React from "react";
import { MOCK_TRACKS } from "../data/mockData";
import { TrendingUp, Zap, ShieldAlert, Sparkles } from "lucide-react";

export function Discover({ onSelectTrack }) {
  const categories = [
    { title: "Novas Descobertas", icon: Sparkles, tracks: MOCK_TRACKS },
    { title: "Em alta no underground", icon: TrendingUp, tracks: MOCK_TRACKS },
    { title: "Baixa popularidade, alto potencial", icon: Zap, tracks: MOCK_TRACKS },
  ];

  return (
    <div className="p-5 pb-32 max-w-md mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white tracking-tight">Descobrir</h1>

      {categories.map((cat, idx) => {
        const Icon = cat.icon;
        return (
          <section key={idx} className="space-y-3">
            <div className="flex items-center gap-2 text-brand-accent">
              <Icon size={18} />
              <h2 className="text-base font-semibold text-white">{cat.title}</h2>
            </div>
            <div className="space-y-2">
              {cat.tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => onSelectTrack(track)}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-brand-surface border border-brand-border/60 hover:border-brand-accent/40 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-md object-cover" />
                    <div>
                      <h4 className="text-sm font-medium text-white">{track.title}</h4>
                      <p className="text-xs text-brand-muted">{track.artist}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-brand-accent block">RAW {track.rawScore}</span>
                    <span className="text-[10px] text-brand-muted">{track.popularity}% pop.</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
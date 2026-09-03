import React from "react";
import { ShieldAlert, Volume2, Activity, CheckCircle2 } from "lucide-react";

export function RawPlus() {
  return (
    <div className="p-4 pb-36 space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold font-title text-[#A78BFA]">RAW+</h1>
        <p className="text-xs text-gray-400">Monitoramento e saúde auditiva em tempo real.</p>
      </header>

      {/* Widget principal */}
      <section className="bg-[#141419] border border-[#1F1F28] p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert size={16} /> Exposição Sonora Diária
          </span>
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 size={14} /> OK
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-2">
          <div>
            <span className="text-3xl font-extrabold text-white">2h 15m</span>
            <span className="text-xs text-gray-400 block mt-1">Média contínua estimada</span>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-[#A78BFA] border-t-transparent flex items-center justify-center font-mono text-xs text-[#A78BFA] font-bold">
            72dB
          </div>
        </div>
      </section>

      {/* Métricas adicionais */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-[#141419] border border-[#1F1F28] p-4 rounded-2xl space-y-1">
          <Volume2 size={20} className="text-[#A78BFA]" />
          <span className="text-xs text-gray-400 block pt-2">Pico Máximo</span>
          <span className="text-sm font-bold text-white">84 dB</span>
        </div>
        <div className="bg-[#141419] border border-[#1F1F28] p-4 rounded-2xl space-y-1">
          <Activity size={20} className="text-[#A78BFA]" />
          <span className="text-xs text-gray-400 block pt-2">Faixa Frequência</span>
          <span className="text-sm font-bold text-white">Dinâmica Safe</span>
        </div>
      </section>
    </div>
  );
}
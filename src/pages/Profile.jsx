import React from "react";
import { User, ShieldAlert, Award, Clock, Heart } from "lucide-react";

export function Profile() {
  return (
    <div className="p-4 pb-36 space-y-6">
      <div className="flex items-center gap-4 pt-2">
        <div className="w-16 h-16 rounded-full bg-[#A78BFA]/20 border border-[#A78BFA] flex items-center justify-center text-[#A78BFA]">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Explorador RAW</h1>
          <p className="text-xs text-gray-400 font-mono">Pioneiro Nível 04</p>
        </div>
      </div>

      <section className="bg-[#141419] border border-[#1F1F28] p-4 rounded-2xl space-y-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Conquistas RAW</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 bg-[#1F1F28]/50 rounded-xl">
            <Award className="text-[#A78BFA]" size={20} />
            <div>
              <h4 className="text-xs font-semibold text-white">Caçador do Underground</h4>
              <p className="text-[10px] text-gray-400">Escutou +50 artistas com menos de 10% de popularidade.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 bg-[#1F1F28]/50 rounded-xl">
            <Heart className="text-[#A78BFA]" size={20} />
            <div>
              <h4 className="text-xs font-semibold text-white">Apoiador Inicial</h4>
              <p className="text-[10px] text-gray-400">Salvou faixas de produtores independentes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
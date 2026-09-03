import React, { useEffect, useState } from "react";
import { ShieldAlert, ListMusic, User } from "lucide-react";
import { getUserPlaylists } from "../services/spotifyService";

export function Profile() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getUserPlaylists().then((data) => setPlaylists(data));
  }, []);

  return (
    <div className="p-4 pb-36 max-w-md mx-auto space-y-6">
      {/* Perfil Header */}
      <div className="flex items-center gap-4 pt-2">
        <div className="w-16 h-16 rounded-full bg-raw-purple/20 border border-raw-purple flex items-center justify-center text-raw-purple">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Explorador RAW</h1>
          <p className="text-xs text-raw-subtext font-mono">Pioneiro nível 04</p>
        </div>
      </div>

      {/* Widget RAW+ */}
      <section className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl flex items-start gap-3">
        <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={18} />
        <div className="text-xs">
          <h4 className="font-semibold text-amber-500">RAW+ Proteja sua Audição</h4>
          <p className="text-raw-subtext mt-0.5">Sua média diária está dentro do nível seguro (80dB).</p>
        </div>
      </section>

      {/* Playlists do Usuário */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <ListMusic size={16} className="text-raw-purple" /> Suas Playlists no Spotify
        </h2>

        <div className="space-y-2">
          {playlists.length > 0 ? (
            playlists.map((pl) => (
              <div key={pl.id} className="flex items-center gap-3 p-2.5 bg-raw-card border border-raw-border rounded-xl">
                <img src={pl.cover} alt={pl.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="text-xs font-semibold text-white">{pl.name}</h4>
                  <p className="text-[10px] text-raw-subtext">{pl.tracksCount} faixas</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-raw-subtext">Conecte o Spotify para carregar suas playlists.</p>
          )}
        </div>
      </section>
    </div>
  );
}
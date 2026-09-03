import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Discover } from "./pages/Discover";
import { Search } from "./pages/Search";
import { Profile } from "./pages/Profile";
import { Collections } from "./pages/Collections";
import { RawPlus } from "./pages/RawPlus";
import { BottomNav } from "./components/BottomNav";
import { MiniPlayer } from "./components/MiniPlayer";
import { MOCK_TRACKS } from "./data/mockData";
import { setAccessToken } from "./services/spotifyService";
import { getAccessTokenWithCode } from "./config/spotify";

export default function App() {
  const [currentTrack, setCurrentTrack] = useState(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("spotify_token"));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      getAccessTokenWithCode(code).then((newToken) => {
        if (newToken) {
          setToken(newToken);
          setAccessToken(newToken);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      });
    } else if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleSelectTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-black flex items-center justify-center p-0 sm:p-4">
        <div className="w-full max-w-md h-screen sm:h-[844px] bg-[#050507] sm:rounded-[40px] border-0 sm:border-[8px] border-[#1F1F28] relative overflow-hidden flex flex-col shadow-2xl">
          <main className="flex-1 overflow-y-auto no-scrollbar">
            <Routes>
              <Route path="/" element={<Home onSelectTrack={handleSelectTrack} />} />
              <Route path="/discover" element={<Discover onSelectTrack={handleSelectTrack} />} />
              <Route path="/search" element={<Search onSelectTrack={handleSelectTrack} />} />
              <Route path="/collections" element={<Collections onSelectTrack={handleSelectTrack} />} />
              <Route path="/raw-plus" element={<RawPlus />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          <MiniPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}
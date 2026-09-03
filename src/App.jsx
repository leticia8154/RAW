import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Discover } from "./pages/Discover";
import { Player } from "./pages/Player";
import { Search } from "./pages/Search";
import { Profile } from "./pages/Profile";
import { BottomNav } from "./components/BottomNav";
import { MiniPlayer } from "./components/MiniPlayer";
import { MOCK_TRACKS } from "./data/mockData";

export default function App() {
  const [currentTrack, setCurrentTrack] = useState(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-accent selection:text-black">
        <main>
          <Routes>
            <Route path="/" element={<Home onSelectTrack={handleSelectTrack} />} />
            <Route path="/discover" element={<Discover onSelectTrack={handleSelectTrack} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile onSelectTrack={handleSelectTrack} />} />
            <Route
              path="/player"
              element={
                <Player
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              }
            />
          </Routes>
        </main>

        <MiniPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <BottomNav />
      </div>
    </Router>
  );
}
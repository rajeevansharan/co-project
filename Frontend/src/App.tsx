import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TempleSearch from './components/TempleSearch';
import ArtistSearch from './components/ArtistSearch';
import TempleRegister from './components/TempleRegister';
import ArtistRegister from './components/ArtistRegister';

function App() {
  return (
    <div className="flex w-full min-h-screen relative z-10 md:flex-row flex-col">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center overflow-y-auto md:h-screen h-auto md:relative">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/temple-search" element={<TempleSearch />} />
          <Route path="/artist-search" element={<ArtistSearch />} />
          <Route path="/temple-register" element={<TempleRegister />} />
          <Route path="/artist-register" element={<ArtistRegister />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import { searchJamendoTracks } from './services/jamendo';
import './App.css';

// Función para convertir segundos a min:seg
function secondsToMinutesSeconds(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState('avicii');

  const location = useLocation();
  const navigate = useNavigate();

  // Determina la sección según la ruta
  const section = (() => {
    if (location.pathname === '/search') return 'search';
    if (location.pathname === '/library') return 'library';
    if (location.pathname === '/favoritos') return 'favoritos';
    if (location.pathname === '/top-hits') return 'top-hits';
    return 'home';
  })();

  useEffect(() => {
    if (section === 'search' || section === 'home') {
      async function fetchTracks() {
        const items = await searchJamendoTracks(search);
        setTracks(items);
        setCurrentTrack(null);
      }
      fetchTracks();
    }
  }, [search, section]);

  const handleSongClick = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!currentTrack) return;
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIdx = idx === 0 ? tracks.length - 1 : idx - 1;
    setCurrentTrack(tracks[prevIdx]);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIdx = idx === tracks.length - 1 ? 0 : idx + 1;
    setCurrentTrack(tracks[nextIdx]);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="App">
      <Sidebar onSectionChange={section => navigate(section === 'home' ? '/' : `/${section}`)} />
      <main className="main-content">
        {/* Página principal mejorada */}
        {section === 'home' && (
          <>
            <div
              style={{
                margin: '30px 0 40px 20px',
                padding: '2rem 2.5rem',
                background: 'linear-gradient(120deg, #1db954 0%, #191414 100%)',
                borderRadius: '18px',
                color: '#fff',
                boxShadow: '0 4px 32px #0004',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: 600,
              }}
            >
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>
                ¡Bienvenido a Sonarloop!
              </h1>
              <div style={{ fontSize: '1.2rem', color: '#e0ffe0' }}>
                Descubre música libre, escucha playlists y explora nuevos artistas cada día.<br />
                <span style={{ color: '#1db954', fontWeight: 700 }}>¡Todo gratis y sin límites!</span>
              </div>
            </div>

            <div style={{ marginLeft: 20, marginBottom: 16, fontWeight: 600, fontSize: '1.3rem', color: '#fff' }}>
              Recomendadas para ti
            </div>
            <div style={{ display: 'flex', gap: 24, marginLeft: 20, flexWrap: 'wrap' }}>
              {tracks.slice(0, 4).map(track => (
                <div
                  key={track.id}
                  onClick={() => handleSongClick(track)}
                  style={{
                    background: '#232323',
                    borderRadius: 14,
                    padding: 18,
                    width: 210,
                    cursor: 'pointer',
                    boxShadow: currentTrack && track.id === currentTrack.id ? '0 0 0 3px #1db954' : '0 2px 12px #0002',
                    transition: 'box-shadow 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={track.album_image}
                    alt={track.name}
                    style={{ width: 120, height: 120, borderRadius: 10, objectFit: 'cover', marginBottom: 12 }}
                  />
                  <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#fff', textAlign: 'center', marginBottom: 4 }}>
                    {track.name}
                  </div>
                  <div style={{ color: '#b3b3b3', fontSize: '0.98rem', textAlign: 'center' }}>
                    {track.artist_name}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Buscador y lista de canciones */}
        {section === 'search' && (
          <>
            <h1 style={{ marginLeft: 20 }}>Buscar</h1>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar canciones"
              className="search-input"
              style={{ marginLeft: 20, marginBottom: 20, width: 300 }}
            />
            <div className="track-table">
              <div className="track-table-header">
                <span>#</span>
                <span>Título</span>
                <span>Álbum</span>
                <span>Fecha</span>
                <span style={{ textAlign: 'right' }}>Duración</span>
              </div>
              <ul className="track-list">
                {tracks.map((track, idx) => (
                  <li
                    key={track.id}
                    className={`track-item ${currentTrack && track.id === currentTrack.id ? 'selected' : ''}`}
                    onClick={() => handleSongClick(track)}
                  >
                    <span className="track-index">{idx + 1}</span>
                    <div className="track-info-table">
                      <img
                        src={track.album_image}
                        alt={track.name}
                        className="track-cover"
                      />
                      <div>
                        <div className="track-title">{track.name}</div>
                        <div className="track-artist">{track.artist_name}</div>
                      </div>
                    </div>
                    <span className="track-album">{track.album_name}</span>
                    <span className="track-date">{track.releasedate?.split(' ')[0]}</span>
                    <span className="track-duration">
                      {typeof track.duration === 'number'
                        ? secondsToMinutesSeconds(track.duration)
                        : '-'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Otras secciones */}
        {section === 'library' && (
          <>
            <h1 style={{ marginLeft: 20 }}>Tu Biblioteca</h1>
            <div style={{ marginLeft: 20, color: '#b3b3b3' }}>Aquí aparecerán tus canciones guardadas.</div>
          </>
        )}
        {section === 'favoritos' && (
          <>
            <h1 style={{ marginLeft: 20 }}>Favoritos</h1>
            <div style={{ marginLeft: 20, color: '#b3b3b3' }}>Tus canciones favoritas aparecerán aquí.</div>
          </>
        )}
        {section === 'top-hits' && (
          <>
            <h1 style={{ marginLeft: 20 }}>Top Hits</h1>
            <div style={{ marginLeft: 20, color: '#b3b3b3' }}>Tus mejores éxitos aparecerán aquí.</div>
          </>
        )}
      </main>
      <Player
        song={currentTrack ? {
          title: currentTrack.name,
          artist: currentTrack.artist_name,
          url: currentTrack.audio,
          cover: currentTrack.album_image,
        } : null}
        onPrev={handlePrev}
        onNext={handleNext}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />
    </div>
  );
}

// Envuelve App en Router
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
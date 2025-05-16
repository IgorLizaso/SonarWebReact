import React, { useRef, useEffect, useState } from 'react';

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function Player({ song, onPrev, onNext, isPlaying, onPlayPause }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current && song && song.url) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [song]);

  const handleEnded = () => {
    onNext();
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const percent = e.target.value;
    const seekTime = (percent / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  if (!song) {
    return (
      <footer className="player">
        <span className="player-song">Selecciona una canción</span>
      </footer>
    );
  }

  return (
        <footer className="player" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
    {/* Portada a la izquierda, más centrada */}
    <div style={{
        display: 'flex',
        alignItems: 'center',
        minWidth: 120,
        maxWidth: 140,
        flex: '0 0 140px',
        justifyContent: 'center',
        paddingLeft: 0,
        paddingRight: 16
    }}>
        <img
        src={song.cover}
        alt={song.title}
        style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }}
        />
    </div>
    {/* Controles y barra en el centro */}
    <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginBottom: 4
        }}>
        <button onClick={onPrev} title="Anterior">
            <i className="ri-skip-back-fill"></i>
        </button>
        <button onClick={onPlayPause} title={isPlaying ? "Pausar" : "Reproducir"}>
            <i className={isPlaying ? "ri-pause-circle-fill" : "ri-play-circle-fill"} style={{ fontSize: 32 }}></i>
        </button>
        <button onClick={onNext} title="Siguiente">
            <i className="ri-skip-forward-fill"></i>
        </button>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 420
        }}>
        <span style={{ color: '#b3b3b3', fontVariantNumeric: 'tabular-nums', minWidth: 48, textAlign: 'right' }}>
            {formatTime(currentTime)}
        </span>
        <input
            type="range"
            min={0}
            max={100}
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            style={{
            width: 220,
            margin: '0 12px',
            accentColor: '#1db954',
            verticalAlign: 'middle'
            }}
        />
        <span style={{ color: '#b3b3b3', fontVariantNumeric: 'tabular-nums', minWidth: 48, textAlign: 'left' }}>
            {formatTime(duration)}
        </span>
        </div>
        <div style={{
        marginTop: 6,
        fontWeight: 600,
        fontSize: '1.08rem',
        color: '#fff',
        textAlign: 'center',
        maxWidth: 420,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
        }}>
        {song.title}
        <span style={{ color: '#b3b3b3', fontWeight: 400 }}> — {song.artist}</span>
        </div>
    </div>
    {/* Icono de volumen a la derecha */}
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minWidth: 80,
        maxWidth: 100,
        flex: '0 0 80px',
        paddingRight: 24
    }}>
        <i className="ri-volume-up-line" style={{ fontSize: 28, color: '#b3b3b3' }}></i>
    </div>
    <audio
        ref={audioRef}
        src={song.url}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay={isPlaying}
        style={{ display: 'none' }}
    />
    </footer>
  );
}

export default Player;
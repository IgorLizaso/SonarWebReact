import React from 'react';

function Sidebar({ onSectionChange }) {
  return (
    <nav className="sidebar">
      <h2 className="sidebar-logo">🎵 Sonarloop</h2>
      <ul className="sidebar-menu">
        <li onClick={() => onSectionChange('home')}>🏠 Inicio</li>
        <li onClick={() => onSectionChange('search')}>🔍 Buscar</li>
        <li onClick={() => onSectionChange('library')}>📚 Tu Biblioteca</li>
      </ul>
      <div className="sidebar-playlists">
        <h3>Playlists</h3>
        <ul>
          <li onClick={() => onSectionChange('favoritos')}>💚 Favoritos</li>
          <li onClick={() => onSectionChange('top-hits')}>🔥 Top Hits</li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
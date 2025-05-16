# Clon Spotify - Sonarloop

Este proyecto es un clon visual y funcional de Spotify, hecho en React, que utiliza la API de Jamendo y Spotify para buscar y reproducir música libre.

## Características

- 🎵 **Búsqueda de canciones** (Jamendo y Spotify)
- 🎧 **Reproductor moderno** con controles, barra de progreso y portada
- 📚 **Sidebar** con navegación entre Inicio, Buscar, Biblioteca, Favoritos y Top Hits
- 🌈 **Diseño moderno** con gradientes, glass effect y responsivo
- 🔒 **Variables de entorno** seguras para las APIs

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tuusuario/clon-spotify.git
   cd clon-spotify
   ```

2. Crea un archivo `.env` en la raíz con tus claves:
   ```
   REACT_APP_JAMENDO_CLIENT_ID=tu_client_id_jamendo
   REACT_APP_SPOTIFY_CLIENT_ID=tu_client_id_spotify
   REACT_APP_SPOTIFY_CLIENT_SECRET=tu_client_secret_spotify
   ```

3. Instala dependencias:
   ```sh
   npm install
   ```

4. Inicia la app:
   ```sh
   npm start
   ```

## Uso

- Usa la barra lateral para navegar entre secciones.
- Busca canciones en la sección "Buscar".
- Haz clic en una canción para reproducirla.
- Controla la reproducción desde el reproductor fijo abajo.

## Tecnologías

- React
- React Router
- CSS moderno (glassmorphism, gradientes)
- Remix Icon
- APIs: [Jamendo](https://developer.jamendo.com/v3.0), [Spotify](https://developer.spotify.com/documentation/web-api/)

## Créditos

- Inspirado en Spotify UI.
- Música libre de Jamendo.

---

¡Disfruta tu clon de Spotify! 🚀
import React from 'react';

/**
 * SpotifyEmbed React component
 * Props:
 *  - id: Spotify ID (playlist/track/album)
 *  - type: 'playlist' | 'track' | 'album' (default: 'playlist')
 *  - height: iframe height in px (default: 380)
 *  - className: optional extra class names
 */
export default function SpotifyEmbed({ id, type = 'playlist', height = 380, className = '' }) {
  if (!id) return null;
  const src = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  return (
    <div className={`spotify-embed ${className}`} aria-label={`Spotify ${type}`}>
      <div className="spotify-embed__frame" style={{ aspectRatio: '16 / 4' }}>
        <iframe
          src={src}
          width="100%"
          height={height}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`Spotify ${type} ${id}`}
        />
      </div>
    </div>
  );
}

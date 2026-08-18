Plain HTML snippet (drop into any static page):

```html
<!-- Spotify Embed: replace PLAYLIST_ID with your id (playlist/track/album) -->
<div class="spotify-embed">
  <div class="spotify-embed__frame">
    <iframe src="https://open.spotify.com/embed/playlist/PLAYLIST_ID?utm_source=generator&theme=0"
      width="100%" height="380" frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy" title="Spotify embed"></iframe>
  </div>
</div>
```

Required CSS (add to your stylesheet):

```css
.spotify-embed { width: 100%; max-width: 720px; margin: 1.25rem auto; }
.spotify-embed__frame { width: 100%; aspect-ratio: 16/4; border-radius: 12px; overflow: hidden; }
.spotify-embed__frame iframe { width: 100%; height: 100%; border: 0; display: block; }
```

React component example is available at `src/SpotifyEmbed.jsx` — import and use as:

```jsx
import SpotifyEmbed from './src/SpotifyEmbed.jsx';

<SpotifyEmbed id="37i9dQZF1DXcBWIGoYBM5M" type="playlist" height={380} />
```

Advanced playback control using the Spotify Web Playback SDK requires a backend for OAuth and secure token storage — see your provided prompt for the required routes and env vars (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REDIRECT_URI`).

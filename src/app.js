/* ═══════════════════════════════════════════════════════════════════════
   Ashlyn's Bookshelf — Application Logic
   ═══════════════════════════════════════════════════════════════════════ */

import { books, ORIGINAL_IMAGE_DIMENSIONS } from './data/books.js';

// ─── Configuration ────────────────────────────────────────────────────
// Set to `true` to enable the visual calibration helper.
// In calibration mode you click 4 corners on the bookshelf image to
// define a spine polygon. The coordinates are logged and copied.
const CALIBRATION_MODE = false;

// ─── DOM References ───────────────────────────────────────────────────
const container = document.getElementById('bookshelf-container');
const image = document.getElementById('bookshelf-image');
const preview = document.getElementById('cover-preview');
const previewImg = preview.querySelector('img');

// ─── Helpers ──────────────────────────────────────────────────────────

/**
 * Return the 4-corner polygon for a book as percentage coordinates.
 *
 * Supports three data formats:
 *  1) `points` — 4 pixel-coordinate pairs [[x,y], …] from the original image
 *  2) `polyBox` — 4 percentage-coordinate pairs (already normalised)
 *  3) `pixels` / `box` — legacy rectangle → auto-converted to 4 corners
 */
function getPolygon(book) {
  // Explicit pixel-coordinate polygon
  if (book.points) {
    return book.points.map(([x, y]) => [
      (x / ORIGINAL_IMAGE_DIMENSIONS.width) * 100,
      (y / ORIGINAL_IMAGE_DIMENSIONS.height) * 100,
    ]);
  }

  // Pre-normalised percentage polygon
  if (book.polyBox) {
    return book.polyBox;
  }

  // Legacy rectangle formats → 4 corners (TL, TR, BR, BL)
  let box = null;
  if (book.box) box = book.box;
  else if (book.pixels) {
    const p = book.pixels;
    box = {
      x: (p.x / ORIGINAL_IMAGE_DIMENSIONS.width) * 100,
      y: (p.y / ORIGINAL_IMAGE_DIMENSIONS.height) * 100,
      width: (p.width / ORIGINAL_IMAGE_DIMENSIONS.width) * 100,
      height: (p.height / ORIGINAL_IMAGE_DIMENSIONS.height) * 100,
    };
  }

  if (box) {
    return [
      [box.x, box.y],
      [box.x + box.width, box.y],
      [box.x + box.width, box.y + box.height],
      [box.x, box.y + box.height],
    ];
  }

  return null;
}

// ─── Render Hotspots ──────────────────────────────────────────────────

function renderHotspots() {
  container.querySelectorAll('.book-hotspot').forEach(el => el.remove());

  books.forEach(book => {
    const poly = getPolygon(book);
    if (!poly || poly.length < 3) return;

    // Compute bounding box of the polygon (in %)
    const xs = poly.map(p => p[0]);
    const ys = poly.map(p => p[1]);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const bw = maxX - minX;
    const bh = maxY - minY;

    const el = document.createElement('div');
    el.className = 'book-hotspot';
    el.id = `hotspot-${book.id}`;
    el.setAttribute('aria-label', book.title);

    // Position & size to the bounding box
    el.style.left = `${minX}%`;
    el.style.top = `${minY}%`;
    el.style.width = `${bw}%`;
    el.style.height = `${bh}%`;

    // Clip to the actual polygon shape
    const clipPoints = poly.map(([px, py]) => {
      const rx = bw > 0 ? ((px - minX) / bw) * 100 : 0;
      const ry = bh > 0 ? ((py - minY) / bh) * 100 : 0;
      return `${rx}% ${ry}%`;
    }).join(', ');
    el.style.clipPath = `polygon(${clipPoints})`;

    // ── Cover preview on hover & touch ─────────────────────────────
    const showPreview = () => {
      if (book.coverUrl) {
        previewImg.src = book.coverUrl;
        previewImg.alt = book.title;
        positionPreviewBySpine(el);
        preview.classList.add('visible');
      }
    };

    const hidePreview = () => {
      preview.classList.remove('visible');
    };

    el.addEventListener('mouseenter', showPreview);
    el.addEventListener('mouseleave', hidePreview);

    // Mobile tap toggle
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCurrent = preview.classList.contains('visible') && previewImg.src.includes(book.coverUrl);
      if (isCurrent) {
        hidePreview();
      } else {
        showPreview();
      }
    });

    container.appendChild(el);
  });
}

// ─── Visual centering helper: center the bookshelf so a visual focal point
// (e.g. "Very Good, Jeeves") at a given ratio of the image width appears
// at the viewport center. This shifts the entire `container` so hotspots
// and the image move together.
function centerBookshelf(ratio = 0.60) {
  if (!container || !image) return;
  const imgRect = image.getBoundingClientRect();
  const imgW = imgRect.width || image.offsetWidth;
  // shift relative to the currently centered state: (0.5 - ratio) * imgWidth
  const shift = (0.5 - ratio) * imgW;
  container.style.transform = `translateX(${shift}px)`;
}

// ─── Sync Spotify embed width to the bookshelf image so they visually match
function syncEmbedWidth() {
  const frame = document.querySelector('.spotify-embed__frame');
  if (!frame || !image) return;
  const imgRect = image.getBoundingClientRect();
  const imgW = Math.round(imgRect.width || image.offsetWidth);
  if (imgW > 0) {
    // make the embed slightly wider than the bookshelf (about 105%)
    const targetW = Math.round(imgW * 1.05);
    frame.style.width = targetW + 'px';
    // set a slightly taller aspect ratio for more vertical space
    frame.style.setProperty('aspect-ratio', '16 / 3.6');
  }
}

// ─── Cover Preview Positioning (anchored next to the spine) ───────────

function positionPreviewBySpine(hotspotEl) {
  const pad = 0; // zero gap so cover preview touches flush against the spine edge
  const spineRect = hotspotEl.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const isVertical = spineRect.height >= spineRect.width;
  const spineLength = isVertical ? spineRect.height : spineRect.width;

  // Scale cover height proportionally to spine length (minimum 120px on mobile for readability)
  const minH = vw < 600 ? 120 : 80;
  const targetHeight = Math.min(Math.max(spineLength * 1.15, minH), vh - 20);
  previewImg.style.height = `${Math.round(targetHeight)}px`;
  previewImg.style.width = 'auto';

  const pw = preview.offsetWidth || 160;
  const ph = preview.offsetHeight || targetHeight;

  // Determine visual center line of the bookshelf photo (centered at Very Good, Jeeves: ~60% of image width)
  const imgRect = image.getBoundingClientRect();
  const bookshelfCenterX = imgRect.left + imgRect.width * 0.60;
  const spineCenterX = spineRect.left + spineRect.width / 2;

  let x, y;

  // Horizontal position: project TOWARDS the visual center of the bookshelf (at Very Good, Jeeves)
  if (spineCenterX < bookshelfCenterX) {
    // Spine is to the LEFT of Very Good, Jeeves -> pop up to its RIGHT side (towards center)
    x = spineRect.right + pad;
  } else {
    // Spine is to the RIGHT of Very Good, Jeeves -> pop up to its LEFT side (towards center)
    x = spineRect.left - pad - pw;
  }

  // Vertical position:
  if (isVertical) {
    // Standing books: align top of cover preview directly with top of spine
    y = spineRect.top;
  } else {
    // Horizontal lying books (Range): center vertically alongside left/right end of spine
    y = spineRect.top + spineRect.height / 2 - ph / 2;
  }

  // Keep inside viewport bounds vertically and horizontally
  if (y < 4) y = 4;
  if (y + ph > vh - 4) y = vh - ph - 4;
  if (x < 4) x = 4;
  if (x + pw > vw - 4) x = vw - pw - 4;

  preview.style.left = `${Math.round(x)}px`;
  preview.style.top = `${Math.round(y)}px`;
}

// ─── Initialisation ───────────────────────────────────────────────────

function init() {
  if (image.complete) {
    renderHotspots();
    centerBookshelf();
    syncEmbedWidth();
  } else {
    image.addEventListener('load', () => {
      renderHotspots();
      centerBookshelf();
      syncEmbedWidth();
    }, { once: true });
  }

  const handleResize = () => {
    preview.classList.remove('visible');
    renderHotspots();
    centerBookshelf();
    syncEmbedWidth();
  };

  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);

  if ('ResizeObserver' in window) {
    new ResizeObserver(() => {
      renderHotspots();
      centerBookshelf();
      syncEmbedWidth();
    }).observe(image);
  }

  // Close cover preview when tapping outside on mobile/tablet/desktop
  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.book-hotspot')) {
      preview.classList.remove('visible');
    }
  });

  if (CALIBRATION_MODE) {
    initCalibration();
  }
}

// ─── Calibration Helper (click 4 corners) ─────────────────────────────

function initCalibration() {
  document.body.classList.add('calibration-active');

  const banner = document.createElement('div');
  banner.className = 'calibration-banner';
  banner.innerHTML = '📐 CALIBRATION MODE — Click 4 corners of a spine (clockwise). Press <kbd>Esc</kbd> to reset.';
  document.body.prepend(banner);

  let corners = [];   // collected click positions [{x, y}] in rendered px
  let dots = [];       // on-screen dot elements

  function addDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'calibration-dot';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.textContent = corners.length;
    container.appendChild(dot);
    dots.push(dot);
  }

  function clearDots() {
    dots.forEach(d => d.remove());
    dots = [];
    // Also remove any preview polygon
    container.querySelectorAll('.calibration-poly').forEach(el => el.remove());
  }

  function reset() {
    corners = [];
    clearDots();
    banner.innerHTML = '📐 CALIBRATION MODE — Click 4 corners of a spine (clockwise). Press <kbd>Esc</kbd> to reset.';
  }

  function drawPreviewPoly() {
    container.querySelectorAll('.calibration-poly').forEach(el => el.remove());

    if (corners.length < 2) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('calibration-poly');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '50';
    svg.setAttribute('viewBox', `0 0 ${image.offsetWidth} ${image.offsetHeight}`);

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    const pts = corners.map(c => `${c.x},${c.y}`).join(' ');
    polyline.setAttribute('points', pts);
    polyline.setAttribute('fill', 'rgba(0, 120, 255, 0.12)');
    polyline.setAttribute('stroke', 'rgba(0, 120, 255, 0.8)');
    polyline.setAttribute('stroke-width', '2');
    polyline.setAttribute('stroke-dasharray', '6 3');
    svg.appendChild(polyline);
    container.appendChild(svg);
  }

  container.addEventListener('click', (e) => {
    if (e.target.closest('.book-hotspot')) return;
    e.preventDefault();

    const cr = container.getBoundingClientRect();
    const x = e.clientX - cr.left;
    const y = e.clientY - cr.top;

    corners.push({ x, y });
    addDot(x, y);
    drawPreviewPoly();

    banner.innerHTML = `📐 Corner ${corners.length}/4 placed. ${corners.length < 4 ? 'Click next corner…' : 'Computing…'}`;

    if (corners.length === 4) {
      finalize();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') reset();
  });

  function finalize() {
    const imgW = image.offsetWidth;
    const imgH = image.offsetHeight;
    const scaleX = ORIGINAL_IMAGE_DIMENSIONS.width / imgW;
    const scaleY = ORIGINAL_IMAGE_DIMENSIONS.height / imgH;

    const pixelPoints = corners.map(c => [
      Math.round(c.x * scaleX),
      Math.round(c.y * scaleY),
    ]);

    const pctPoints = corners.map(c => [
      +((c.x / imgW) * 100).toFixed(2),
      +((c.y / imgH) * 100).toFixed(2),
    ]);

    const fmtArr = (arr) => arr.map(p => `[${p[0]}, ${p[1]}]`).join(', ');

    const snippet = [
      `// Pixel points (original image coords):`,
      `points: [${fmtArr(pixelPoints)}]`,
      `// Percentage points:`,
      `polyBox: [${fmtArr(pctPoints)}]`,
    ].join('\n');

    console.log('%c📐 Calibration result (4-point polygon)', 'font-weight:bold; color:#0078ff');
    console.log(snippet);

    navigator.clipboard.writeText(snippet).then(() => {
      console.log('%c✓ Copied to clipboard', 'color:green');
      banner.innerHTML = '📐 ✓ Coordinates copied to clipboard! Click to start another, or press <kbd>Esc</kbd> to reset.';
    }).catch(() => {
      console.log('%c✗ Clipboard copy failed (check permissions)', 'color:orange');
      banner.innerHTML = '📐 ✓ Coordinates logged to console. Click to start another, or press <kbd>Esc</kbd> to reset.';
    });

    // Reset for next spine after a short pause
    setTimeout(() => {
      corners = [];
      clearDots();
    }, 1500);
  }
}

// ── Boot ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

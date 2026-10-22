// Draws the travel map (land, graticule, routes, places) at the canvas's real pixel size
// so labels stay readable on phones.
import { landPath } from '../data/land';

type Place = { name: string; lat: number; lon: number; tag: string; label?: boolean };

const canvas = document.querySelector<HTMLCanvasElement>('#travel canvas');

if (canvas) {
  const places: Place[] = JSON.parse(canvas.dataset.places ?? '[]');
  const ctx = canvas.getContext('2d')!;
  const land = new Path2D(landPath);
  const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  const draw = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    // Equal scale on both axes: pick the longitude window, derive the latitude window from the box shape.
    const narrow = w < 600;
    const [lonMin, lonMax] = narrow ? [-125, 145] : [-150, 150];
    const latMax = narrow ? 76 : 84;
    const k = w / (lonMax - lonMin); // CSS px per degree
    const P = (lat: number, lon: number): [number, number] => [(lon - lonMin) * k, (latMax - lat) * k];

    const ink = css('--ink'), line = css('--line'), wash = css('--wash'), muted = css('--muted'), text = css('--text');
    const body = css('--body'), mono = css('--mono');
    const nameSize = narrow ? 11 : 14;
    const tagSize = narrow ? 9 : 10;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Land, drawn in degree units (x = lon, y = -lat) under a transform.
    ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * -lonMin * k, dpr * latMax * k);
    ctx.fillStyle = wash;
    ctx.fill(land);
    ctx.strokeStyle = line;
    ctx.lineWidth = 1 / k;
    ctx.stroke(land);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.strokeStyle = line;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 4]);
    for (let lon = -150; lon <= 150; lon += 30) {
      const [x] = P(0, lon);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const [, y] = P(lat, 0);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.setLineDash([]);

    const [hx, hy] = P(places[0].lat, places[0].lon);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    places.slice(1).filter((p) => p.tag).forEach((p) => {
      const [px, py] = P(p.lat, p.lon);
      const mx = (hx + px) / 2, my = Math.min(hy, py) - Math.abs(px - hx) * 0.18;
      ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(mx, my, px, py); ctx.stroke();
    });
    ctx.setLineDash([]);

    const s = 3;
    places.forEach((p) => {
      const [px, py] = P(p.lat, p.lon);
      ctx.fillStyle = ink;
      ctx.fillRect(px - s, py - s, s * 2, s * 2);
    });
    places.forEach((p) => {
      if (p.label === false) return;
      const [px, py] = P(p.lat, p.lon);
      // Bournemouth's label goes below its pin to stay clear of Scotland's.
      const off: [number, number] =
        p.name === 'Bournemouth' ? [s + 4, nameSize + 6] : [s + 5, 4];
      ctx.font = `600 ${nameSize}px ${body}`;
      // Phones show place names only; the list under the map carries the detail.
      const tag = narrow ? '' : p.tag;
      const tw = Math.max(ctx.measureText(p.name).width, (ctx.font = `${tagSize}px ${mono}`, ctx.measureText(tag).width));
      // Flip labels that would run off the right edge to the left of their pin.
      let x = px + off[0] + tw > w - 4 ? px - s - 5 - tw : px + off[0];
      let y = py + off[1];
      // Scotland's label sits centred above its pin, over the sea, so it never covers the UK.
      if (p.name === 'Scotland') { x = px - tw / 2; y = py - s - 6 - (tag ? tagSize + 3 : 0); }
      // A ground-coloured plate keeps labels legible over land and routes.
      ctx.fillStyle = css('--ground');
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x - 2, y - nameSize, tw + 4, tag ? nameSize + tagSize + 6 : nameSize + 4);
      ctx.globalAlpha = 1;
      ctx.fillStyle = text;
      ctx.font = `600 ${nameSize}px ${body}`;
      ctx.fillText(p.name, x, y);
      ctx.fillStyle = muted;
      ctx.font = `${tagSize}px ${mono}`;
      if (tag) ctx.fillText(tag, x, y + tagSize + 3);
    });
  };

  draw();
  document.fonts?.ready.then(draw);
  new ResizeObserver(draw).observe(canvas);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
}

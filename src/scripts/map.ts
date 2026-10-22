// Draws the journey map at the canvas's real pixel size so labels stay readable on phones.
type Place = { name: string; lat: number; lon: number; tag: string; label?: boolean };

const canvas = document.querySelector<HTMLCanvasElement>('#journey canvas');

if (canvas) {
  const places: Place[] = JSON.parse(canvas.dataset.places ?? '[]');
  const ctx = canvas.getContext('2d')!;
  const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  const draw = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Narrow screens crop to the part of the world the trips cover.
    const narrow = w < 600;
    const [lonMin, lonMax] = narrow ? [-122, 135] : [-135, 135];
    const [latMax, latMin] = narrow ? [70, 15] : [75, -15];
    const P = (lat: number, lon: number): [number, number] => [
      ((lon - lonMin) / (lonMax - lonMin)) * w,
      ((latMax - lat) / (latMax - latMin)) * h,
    ];

    const ink = css('--ink'), line = css('--line'), muted = css('--muted'), text = css('--text');
    const body = css('--body'), mono = css('--mono');
    const nameSize = narrow ? 11 : 15;
    const tagSize = narrow ? 9 : 10;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let lon = -135; lon <= 135; lon += 15) {
      const [x] = P(0, lon);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let lat = -15; lat <= 75; lat += 15) {
      const [, y] = P(lat, 0);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    if (!narrow) {
      ctx.fillStyle = muted;
      ctx.font = `${tagSize}px ${mono}`;
      for (let lat = 60; lat >= 0; lat -= 30) {
        const [, y] = P(lat, 0);
        ctx.fillText(`${lat}°${lat ? 'N' : ''}`, 4, y - 4);
      }
    }

    const [hx, hy] = P(places[0].lat, places[0].lon);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    places.slice(1).filter((p) => p.tag).forEach((p) => {
      const [px, py] = P(p.lat, p.lon);
      const mx = (hx + px) / 2, my = Math.min(hy, py) - Math.abs(px - hx) * 0.18;
      ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(mx, my, px, py); ctx.stroke();
    });
    ctx.setLineDash([]);

    const s = narrow ? 3 : 5;
    places.forEach((p) => {
      const [px, py] = P(p.lat, p.lon);
      ctx.fillStyle = ink;
      ctx.fillRect(px - s, py - s, s * 2, s * 2);
      if (p.label === false) return;
      // Scotland and Bournemouth sit almost on top of each other, so push their labels apart.
      const off: [number, number] =
        p.name === 'Scotland' ? [-nameSize * 2.2, -nameSize * 0.9] :
        p.name === 'Bournemouth' ? [s + 4, nameSize + 6] : [s + 5, 4];
      ctx.fillStyle = text;
      ctx.font = `600 ${nameSize}px ${body}`;
      ctx.fillText(p.name, px + off[0], py + off[1]);
      ctx.fillStyle = muted;
      ctx.font = `${tagSize}px ${mono}`;
      ctx.fillText(p.tag, px + off[0], py + off[1] + tagSize + 3);
    });
  };

  draw();
  document.fonts?.ready.then(draw);
  new ResizeObserver(draw).observe(canvas);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
}

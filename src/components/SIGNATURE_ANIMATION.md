# Signature Animation — How It Works

## Overview

`SignatureWatermark.jsx` animates the real Hasan Malik signature as a stroke-drawing effect in the hero section background. Every path in the component was derived from the actual signature image pixel-by-pixel — nothing was hand-drawn or approximated.

The source image is `Downloads/WhatsApp Image 2026-03-24 at 21.55.46.jpeg` — a clean digital signature (black ink on light gray background, 1600×1600 px).

---

## How the paths were generated

### Step 1 — Threshold
The image was loaded in grayscale and thresholded at pixel value < 100. This produces a binary mask: `True` = ink, `False` = background. At threshold 100, ~85,711 pixels (3.4% of the image) are ink.

### Step 2 — Skeletonize
`skimage.morphology.skeletonize` reduced the ink mask to single-pixel-wide centerlines (the skeleton). This gave 5,264 skeleton pixels — the true centerlines of every stroke.

### Step 3 — Classify nodes
An 8-connected neighbor count was computed for every skeleton pixel:
- **Endpoints**: 1 neighbor — the tip of a stroke
- **Junctions**: 3+ neighbors — where strokes cross or branch
- **Regular**: 2 neighbors — mid-stroke

Result: 28 endpoints, 91 junctions.

### Step 4 — Graph traversal (path tracing)
Starting from each endpoint (sorted left→right by x-coordinate), a walk was performed along the skeleton:
- At each step, the next pixel was chosen by preferring the direction that continues most straight (dot product with previous direction vector)
- Non-junction pixels were preferred to delay splits
- The walk stopped when it hit a junction or a dead end
- After endpoints, any unvisited pixels were traced (handles closed loops)
- Junction neighbors were re-entered to catch remaining segments

This produced 64 path segments covering 5,258/5,264 (99.9%) of the skeleton.

### Step 5 — Ramer-Douglas-Peucker simplification
Each traced pixel sequence was simplified with RDP at epsilon=1.5 pixels, removing redundant collinear points while preserving shape fidelity.

### Step 6 — Catmull-Rom → Cubic Bézier smoothing
The simplified waypoints were smoothed using Catmull-Rom spline conversion (tension=0.5) to cubic Bézier curves, producing smooth `C` commands in SVG path `d` strings. This eliminates the jaggedness of pixel-grid coordinates.

### Step 7 — Scale
All coordinates were multiplied by 0.25, mapping the 1600×1600 pixel space to a 400×400 SVG viewBox.

### Step 8 — Animation timing
Segments were sorted by their starting x-coordinate (left→right, approximating the natural writing order: H → asan → M → alik → underlines → dot).

- Total draw duration: **5 seconds**
- Each segment's duration is proportional to its arc length: `dur = (segment_length / total_length) * 5.0`
- Segments overlap slightly: each starts at `previous_delay + previous_dur * 0.6`
- Minimum duration per segment: 0.08s

### Step 9 — SVG opacity envelope
The outer `<motion.svg>` animates overall opacity:
- 0s: invisible (0)
- ~0.45s: fades in to 0.22 (visible during drawing)
- ~5.85s: holds at 0.22 (drawing complete)
- 9s: fades to 0.07 (permanent ghost watermark)

Times array: `[0, 0.05, 0.65, 1]` over a 9-second duration.

---

## Component parameters — what to change for common edits

### Make the watermark more/less visible
Change the opacity values in `SignatureWatermark.jsx`:
```jsx
animate={{ opacity: [0, 0.22, 0.22, 0.07] }}
```
- `0.22` = peak opacity during drawing phase
- `0.07` = resting watermark opacity after animation finishes
- Both can be tuned independently.

### Make it draw faster or slower
Change `TOTAL_DRAW` in the generation script (see Regenerating below). Or directly scale all `dur` values in `STROKES` by a constant multiplier. The `delay` values also need scaling — multiply all `delay` values by the same factor.

### Change stroke color
```jsx
stroke="white"
```
Change to any CSS color. Currently white because the hero background is dark (`bg-apple-bg`).

### Change stroke thickness
```jsx
strokeWidth={4}
```
4 units in a 400×400 viewBox. The original ink strokes were ~16px wide at 1600×1600 — at 0.25 scale that's 4px. Increase for a bolder look, decrease for thinner.

### Remove the animation (static watermark only)
Replace the component with:
```jsx
export default function SignatureWatermark() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{ opacity: 0.07 }}
    >
      {STROKES.map((s, i) => (
        <path
          key={i}
          d={s.d}
          stroke="white"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}
```

### Change the fade-to-watermark timing
```jsx
transition={{ duration: 9, times: [0, 0.05, 0.65, 1], ease: 'linear' }}
```
- `duration: 9` — total animation cycle in seconds
- `times[1]` (0.05) — when it reaches peak opacity (as fraction of duration)
- `times[2]` (0.65) — when it starts fading to watermark
- `times[3]` (1.0) — always 1 (end)

### Position/size the signature differently
The SVG uses `preserveAspectRatio="xMidYMid meet"` — it centers the signature and scales uniformly to fit. To align differently:
- `xMinYMin meet` — top-left aligned
- `xMaxYMax meet` — bottom-right aligned
- `none` — stretch to fill (will distort)

The signature occupies roughly x: 52–318, y: 109–295 within the 400×400 viewBox (centered).

---

## Regenerating the paths from scratch

If you get a new/updated signature image, run this pipeline in Python (requires `scikit-image`, `Pillow`, `vtracer`):

```python
import numpy as np
from PIL import Image
from skimage.morphology import skeletonize
from scipy import ndimage
import math, json

# --- CONFIG ---
IMAGE_PATH  = "path/to/signature.jpg"
OUT_JSON    = "/tmp/sig_paths.json"
THRESHOLD   = 100     # pixels darker than this = ink
SCALE       = 0.25    # 1600px → 400 units
TOTAL_DRAW  = 5.0     # seconds for full signature to draw
RDP_EPS     = 1.5     # higher = more simplified paths
TENSION     = 0.5     # Catmull-Rom tension (0=sharp, 1=loose)

# --- PIPELINE ---
img    = Image.open(IMAGE_PATH).convert('L')
arr    = np.array(img)
binary = arr < THRESHOLD

skel   = skeletonize(binary)
kernel = np.array([[1,1,1],[1,0,1],[1,1,1]], dtype=np.uint8)
nc     = ndimage.convolve(skel.astype(np.uint8), kernel, mode='constant', cval=0)
nc[~skel] = 0

all_px    = set(map(tuple, np.argwhere(skel).tolist()))
endpoints = set(map(tuple, np.argwhere((skel) & (nc == 1)).tolist()))
junctions = set(map(tuple, np.argwhere((skel) & (nc >= 3)).tolist()))

def neighbors8(y, x):
    for dy in (-1,0,1):
        for dx in (-1,0,1):
            if dy or dx: yield (y+dy, x+dx)

def trace(start, visited):
    path = [start]; visited.add(start); cur = start
    while True:
        nbs = [n for n in neighbors8(*cur) if n in all_px and n not in visited]
        if not nbs: break
        def score(n):
            dy, dx = n[0]-cur[0], n[1]-cur[1]
            dot = 0
            if len(path) >= 2:
                py, px = path[-2]
                dot = dy*(cur[0]-py) + dx*(cur[1]-px)
            return (-dot, 1 if n in junctions else 0)
        nbs.sort(key=score)
        nxt = nbs[0]; visited.add(nxt); path.append(nxt); cur = nxt
        if cur in junctions and len(path) > 2: break
    return path

visited = set(); segments = []
for start in sorted(endpoints, key=lambda p: (p[1], p[0])):
    if start not in visited:
        seg = trace(start, visited)
        if len(seg) >= 3: segments.append(seg)
for start in sorted(all_px - visited, key=lambda p: (p[1], p[0])):
    if start not in visited:
        seg = trace(start, visited)
        if len(seg) >= 3: segments.append(seg)
for j in sorted(junctions, key=lambda p: (p[1], p[0])):
    for nb in neighbors8(*j):
        if nb in all_px and nb not in visited:
            seg = trace(nb, visited)
            if len(seg) >= 3: segments.append(seg)

def rdp(pts, eps):
    if len(pts) < 3: return pts
    start, end = np.array(pts[0], float), np.array(pts[-1], float)
    line = end - start; ll = np.linalg.norm(line)
    if ll == 0:
        dists = [np.linalg.norm(np.array(p,float)-start) for p in pts[1:-1]]
    else:
        dists = [abs(np.cross(line, start-np.array(p,float)))/ll for p in pts[1:-1]]
    mi = int(np.argmax(dists)); md = dists[mi]
    if md > eps:
        L = rdp(pts[:mi+2], eps); R = rdp(pts[mi+1:], eps)
        return L[:-1] + R
    return [pts[0], pts[-1]]

def catmull_to_bezier(pts, tension):
    if len(pts) < 2: return None
    coords = [(p[1], p[0]) for p in pts]
    if len(coords) == 2:
        return f"M {coords[0][0]:.2f} {coords[0][1]:.2f} L {coords[1][0]:.2f} {coords[1][1]:.2f}"
    d = f"M {coords[0][0]:.2f} {coords[0][1]:.2f}"
    for i in range(1, len(coords)):
        p0 = coords[max(0,   i-2)]; p1 = coords[max(0,   i-1)]
        p2 = coords[min(len(coords)-1, i)]; p3 = coords[min(len(coords)-1, i+1)]
        cp1x = p1[0] + (p2[0]-p0[0]) * tension/3
        cp1y = p1[1] + (p2[1]-p0[1]) * tension/3
        cp2x = p2[0] - (p3[0]-p1[0]) * tension/3
        cp2y = p2[1] - (p3[1]-p1[1]) * tension/3
        d += f" C {cp1x:.2f} {cp1y:.2f} {cp2x:.2f} {cp2y:.2f} {p2[0]:.2f} {p2[1]:.2f}"
    return d

simplified = []
for seg in segments:
    s = rdp(seg, RDP_EPS)
    scaled = [(y*SCALE, x*SCALE) for (y,x) in s]
    d = catmull_to_bezier(scaled, TENSION)
    if d:
        sx  = scaled[0][1]
        arc = sum(math.hypot(scaled[i][1]-scaled[i-1][1], scaled[i][0]-scaled[i-1][0])
                  for i in range(1,len(scaled)))
        simplified.append({'d': d, 'sx': sx, 'len': arc})

simplified.sort(key=lambda s: s['sx'])

total_len = sum(s['len'] for s in simplified)
t = 0.0
for s in simplified:
    dur = max(0.08, (s['len'] / max(total_len, 1)) * TOTAL_DRAW)
    s['delay'] = round(t, 3); s['dur'] = round(dur, 3)
    t += dur * 0.6

with open(OUT_JSON, 'w') as f:
    json.dump(simplified, f)
print(f"Done: {len(simplified)} segments, last stroke at {max(s['delay']+s['dur'] for s in simplified):.2f}s")
```

Then generate the component:

```python
import json

paths = json.load(open('/tmp/sig_paths.json'))
lines = ["import { motion } from 'framer-motion'", "", "const STROKES = ["]
for s in paths:
    lines.append(f"  {{ d: '{s['d']}', delay: {s['delay']}, dur: {s['dur']} }},")
lines += [
    "]", "",
    "export default function SignatureWatermark() {",
    "  return (",
    "    <motion.svg",
    "      viewBox=\"0 0 400 400\"",
    "      className=\"absolute inset-0 w-full h-full pointer-events-none select-none\"",
    "      preserveAspectRatio=\"xMidYMid meet\"",
    "      aria-hidden=\"true\"",
    "      initial={{ opacity: 0 }}",
    "      animate={{ opacity: [0, 0.22, 0.22, 0.07] }}",
    "      transition={{ duration: 9, times: [0, 0.05, 0.65, 1], ease: 'linear' }}",
    "    >",
    "      {STROKES.map((s, i) => (",
    "        <motion.path",
    "          key={i}",
    "          d={s.d}",
    "          stroke=\"white\"",
    "          strokeWidth={4}",
    "          fill=\"none\"",
    "          strokeLinecap=\"round\"",
    "          strokeLinejoin=\"round\"",
    "          initial={{ pathLength: 0 }}",
    "          animate={{ pathLength: 1 }}",
    "          transition={{ delay: s.delay, duration: s.dur, ease: [0.4, 0, 0.2, 1] }}",
    "        />",
    "      ))}",
    "    </motion.svg>",
    "  )",
    "}",
]
with open('src/components/SignatureWatermark.jsx', 'w') as f:
    f.write('\n'.join(lines))
```

### Verify accuracy before committing
After regenerating, always run the overlay check to confirm paths align with the original:

```python
import json, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

paths = json.load(open('/tmp/sig_paths.json'))

def parse_svg_d(d):
    tokens = d.replace(',', ' ').split()
    pts = []; i = 0; cur = (0.0, 0.0)
    while i < len(tokens):
        cmd = tokens[i]; i += 1
        if cmd == 'M':
            x,y = float(tokens[i]),float(tokens[i+1]); i+=2; cur=(x,y); pts.append(cur)
        elif cmd == 'L':
            x,y = float(tokens[i]),float(tokens[i+1]); i+=2; cur=(x,y); pts.append(cur)
        elif cmd == 'C':
            cx1,cy1=float(tokens[i]),float(tokens[i+1]); i+=2
            cx2,cy2=float(tokens[i]),float(tokens[i+1]); i+=2
            ex,ey=float(tokens[i]),float(tokens[i+1]); i+=2
            for ti in range(1,21):
                t=ti/20; mt=1-t
                pts.append((mt**3*cur[0]+3*mt**2*t*cx1+3*mt*t**2*cx2+t**3*ex,
                             mt**3*cur[1]+3*mt**2*t*cy1+3*mt*t**2*cy2+t**3*ey))
            cur=(ex,ey)
    return pts

img   = Image.open("path/to/signature.jpg").convert('RGB')
small = img.resize((400,400), Image.LANCZOS)
fig, ax = plt.subplots(figsize=(8,8))
ax.imshow(np.array(small))
ax.set_xlim(0,400); ax.set_ylim(400,0); ax.set_aspect('equal')
for seg in paths:
    pts = parse_svg_d(seg['d'])
    if pts:
        ax.plot([p[0] for p in pts], [p[1] for p in pts], 'r-', lw=1.2, alpha=0.7)
plt.savefig('/tmp/overlay.png', dpi=120)
```

The red paths should trace exactly along the centerlines of the black ink. If they don't align, check the threshold value or SCALE factor.

---

## Dependencies

- `scikit-image` — skeletonize (`pip3 install scikit-image`)
- `scipy` — ndimage.convolve for neighbor count
- `Pillow` — image loading
- `framer-motion` — already in the project (used for `motion.svg` and `motion.path`)
- `matplotlib` — only for verification, not runtime

## Files involved

- `src/components/SignatureWatermark.jsx` — the component (do not edit paths by hand)
- `src/components/Hero.jsx` — imports and renders `<SignatureWatermark />` as the first child of the hero `<section>`
- Source image: `~/Downloads/WhatsApp Image 2026-03-24 at 21.55.46.jpeg`

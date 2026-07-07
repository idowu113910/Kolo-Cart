import React, { useEffect, useRef, useState } from "react";

/**
 * ShatterImage
 * Props:
 *  - src: image path (required)
 *  - rows, cols: grid resolution (defaults 6x6)
 *  - intensity: px distance multiplier for pieces (default 1)
 *  - duration: animation duration in ms (default 1400)
 *  - autoplay: boolean (true => animate on mount)
 *  - triggerOnClick: boolean (true => also animate when clicking image)
 */
export default function ShatterImage({
  src,
  rows = 6,
  cols = 6,
  intensity = 1,
  duration = 1400,
  autoplay = true,
  triggerOnClick = true,
}) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const [tiles, setTiles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // build tiles after image loads / size known
    const img = imgRef.current;
    if (!img) return;

    const buildTiles = () => {
      const w = img.clientWidth;
      const h = img.clientHeight;
      if (!w || !h) return;

      const tileW = Math.ceil(w / cols);
      const tileH = Math.ceil(h / rows);

      const tileList = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // center of tile relative to image center for direction
          const cx = c * tileW + tileW / 2 - w / 2;
          const cy = r * tileH + tileH / 2 - h / 2;

          // create randomized direction but based on center so outer tiles move more
          const angle = Math.atan2(cy, cx);
          const distance =
            (Math.hypot(cx, cy) / Math.hypot(w / 2, h / 2)) *
            1.0 *
            60 *
            intensity; // base distance multiplier (px)
          // add jitter
          const jitter = (Math.random() * 40 - 20) * intensity;
          const totalDist = distance + jitter;

          const dx = Math.cos(angle) * totalDist;
          const dy = Math.sin(angle) * totalDist;

          // random rotation
          const rot = (Math.random() * 60 - 30).toFixed(2) + "deg";

          // slight scale for mid animation
          const scale = (0.96 + Math.random() * 0.08).toFixed(2);

          // per-tile delay (stagger)
          const delay = (Math.random() * 200).toFixed(0) + "ms";

          tileList.push({
            r,
            c,
            left: c * tileW,
            top: r * tileH,
            width: tileW,
            height: tileH,
            bgPosX: -(c * tileW),
            bgPosY: -(r * tileH),
            dx: dx.toFixed(2) + "px",
            dy: dy.toFixed(2) + "px",
            rot,
            scale,
            delay,
          });
        }
      }

      // set CSS background-size so each tile's bg lines up correctly
      setTiles({
        list: tileList,
        imageWidth: w,
        imageHeight: h,
      });
    };

    // If image already loaded, build immediately, otherwise on load.
    if (img.complete && img.naturalWidth !== 0) buildTiles();
    else {
      img.onload = buildTiles;
    }

    // Rebuild on window resize (debounced)
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildTiles, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, rows, cols, intensity]);

  useEffect(() => {
    if (autoplay && tiles.list) {
      // small delay to ensure layout is stable, then trigger animation
      const t = setTimeout(() => play(), 120);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles, autoplay]);

  const play = () => {
    if (!tiles.list) return;
    setIsAnimating(false);
    // toggle to restart animation
    requestAnimationFrame(() => {
      // small pause to ensure class removal applied
      requestAnimationFrame(() => {
        setIsAnimating(true);
        // remove animate flag after duration to allow retrigger
        setTimeout(() => setIsAnimating(false), duration + 400);
      });
    });
  };

  return (
    <div
      ref={wrapRef}
      className={`shatter-wrap ${isAnimating ? "shatter-animate" : ""}`}
      style={{ "--anim-duration": `${duration}ms` }}
      onClick={() => triggerOnClick && play()}
    >
      {/* Real image (hidden visually but used to determine size) */}
      <img src={src} ref={imgRef} alt="" className="shatter-img" />

      {/* Tiles overlay */}
      {tiles.list && (
        <div
          className="shatter-grid"
          style={{
            width: tiles.imageWidth,
            height: tiles.imageHeight,
          }}
        >
          {tiles.list.map((t, i) => (
            <div
              key={i}
              className="shatter-tile"
              style={{
                left: t.left,
                top: t.top,
                width: t.width,
                height: t.height,
                backgroundImage: `url(${src})`,
                // background size must match image natural size so tile shows correct portion
                // CSS variables consumed by the animation keyframe
                // --bg-size-x and --bg-size-y used for background-size in css
                // note: background-size expects px for accurate cropping
                "--bg-size-x": `${tiles.imageWidth}px`,
                "--bg-size-y": `${tiles.imageHeight}px`,
                backgroundPosition: `${t.bgPosX}px ${t.bgPosY}px`,
                // per-tile animation variables
                "--dx": t.dx,
                "--dy": t.dy,
                "--rot": t.rot,
                "--scale": t.scale,
                "--delay": t.delay,
                // optional: mid opacity
                "--mid-opacity": 0.7,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

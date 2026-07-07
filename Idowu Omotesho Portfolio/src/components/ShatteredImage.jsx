import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/BrokenImage.css"; // adjust path if needed

export default function ShatterImage({
  src,
  rows = 6,
  cols = 6,
  intensity = 1,
  duration = 2200, // animation duration (ms)
  autoplay = true,
  triggerOnClick = true,
  pauseBetween = 5000, // wait between cycles (ms)
  triggerOnView = true, // only animate while visible
  wrapperClassName = "",
  style = {},
}) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const [tiles, setTiles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Timer/loop refs
  const singleTimeoutRef = useRef(null);
  const loopActiveRef = useRef(false);
  const observerRef = useRef(null);
  const isVisibleRef = useRef(false);

  // Build tiles based on image size
  useEffect(() => {
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
          const cx = c * tileW + tileW / 2 - w / 2;
          const cy = r * tileH + tileH / 2 - h / 2;

          const angle = Math.atan2(cy, cx);
          const distance =
            (Math.hypot(cx, cy) / Math.hypot(w / 2, h / 2)) *
            1.0 *
            60 *
            intensity;
          const jitter = (Math.random() * 60 - 30) * intensity;
          const totalDist = distance + jitter;

          const dx = Math.cos(angle) * totalDist;
          const dy = Math.sin(angle) * totalDist;
          const rot = (Math.random() * 40 - 20).toFixed(2) + "deg";
          const scale = (0.96 + Math.random() * 0.08).toFixed(2);

          // slower stagger: up to 700ms
          const delay = Math.round(Math.random() * 700) + "ms";

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

      setTiles({
        list: tileList,
        imageWidth: w,
        imageHeight: h,
      });
    };

    if (img.complete && img.naturalWidth !== 0) buildTiles();
    else (img.onload = buildTiles);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildTiles, 160);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [src, rows, cols, intensity]);

  // play returns a Promise that resolves when the animation cycle ends
  const play = () => {
    if (!tiles.list || isAnimating) return Promise.resolve(false);

    return new Promise((resolve) => {
      // restart animation by toggling the flag
      setIsAnimating(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);

          // clear any previous timeout
          if (singleTimeoutRef.current) clearTimeout(singleTimeoutRef.current);

          // resolve after animation duration + small buffer
          singleTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
            resolve(true);
          }, duration + 80);
        });
      });
    });
  };

  // Async loopRunner: repeatedly play() then wait pauseBetween while loopActiveRef.current === true
  const loopRunner = async () => {
    if (loopActiveRef.current) return; // already running
    loopActiveRef.current = true;

    while (loopActiveRef.current) {
      // guard
      if (!tiles.list) break;

      // Only play if autoplay is enabled and (if triggerOnView) element is visible
      if (!autoplay) break;
      if (triggerOnView && !isVisibleRef.current) {
        // wait a short time and check again, exit if loop turned off
        await new Promise((res) => {
          singleTimeoutRef.current = setTimeout(res, 300);
        });
        if (!loopActiveRef.current) break;
        continue;
      }

      try {
        await play();
      } catch (e) {
        // ignore errors from play
      }

      // after animation, wait pauseBetween (but exit early if loop turned off)
      await new Promise((res) => {
        singleTimeoutRef.current = setTimeout(res, pauseBetween);
      });
    }

    loopActiveRef.current = false;
  };

  const stopLoop = () => {
    loopActiveRef.current = false;
    if (singleTimeoutRef.current) {
      clearTimeout(singleTimeoutRef.current);
      singleTimeoutRef.current = null;
    }
  };

  // IntersectionObserver to start/stop loop when element enters/leaves viewport
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (!triggerOnView) {
      // not view-triggered: start loop immediately if autoplay
      if (autoplay) loopRunner();
      return () => stopLoop();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== wrap) return;
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
            // start loop only once visible
            if (autoplay) loopRunner();
          } else {
            isVisibleRef.current = false;
            // stop loop when out of view
            stopLoop();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(wrap);
    observerRef.current = observer;

    return () => {
      stopLoop();
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles, autoplay, triggerOnView, pauseBetween, duration]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      stopLoop();
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`shatter-wrap ${isAnimating ? "shatter-animate" : ""} ${wrapperClassName}`}
      style={{ ["--anim-duration"]: `${duration}ms`, ...style }}
      onClick={() => {
        if (triggerOnClick) {
          // if clicked, trigger one play (do not affect loopActiveRef)
          play();
        }
      }}
    >
      <img src={src} ref={imgRef} alt="" className="shatter-img" />

      {tiles.list && (
        <div
          className="shatter-grid"
          style={{
            width: tiles.imageWidth,
            height: tiles.imageHeight,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
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
                backgroundSize: `${tiles.imageWidth}px ${tiles.imageHeight}px`,
                backgroundPosition: `${t.bgPosX}px ${t.bgPosY}px`,
                ["--tx"]: t.dx,
                ["--ty"]: t.dy,
                ["--rot"]: t.rot,
                ["--delay"]: t.delay,
                ["--mid-opacity"]: 0.75,
                ["--anim-duration"]: `${duration}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

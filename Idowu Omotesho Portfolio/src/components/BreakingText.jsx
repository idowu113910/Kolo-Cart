// src/components/BreakingText.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const BreakingText = ({
  text = "Building, Breaking, Fixing —  Repeat 😎",
  className = "font-light text-[25px] md:text-[40px] text-white leading-[41px] md:mb-6 mb-0 w-full max-w-full px-4 text-center",
}) => {
  const chars = Array.from(text);
  const controls = chars.map(() => useAnimation());

  useEffect(() => {
    let mounted = true;

    const typeDelay = 60;
    const breakStagger = 12;
    const breakHold = 400;
    const rand = (min, max) => Math.random() * (max - min) + min;

    (async function run() {
      // Set initial invisible
      await Promise.all(
        controls.map((c) =>
          c.set({ opacity: 0, x: 0, y: 8, rotate: 0, scale: 1 }),
        ),
      );

      // BUILD — type each character once
      for (let i = 0; i < controls.length && mounted; i++) {
        controls[i].start({
          opacity: 1,
          y: 0,
          scale: [0.92, 1.02, 1],
          transition: { duration: 0.28, ease: "easeOut" },
        });
        await new Promise((r) => setTimeout(r, typeDelay));
      }

      await new Promise((r) => setTimeout(r, 600));
      if (!mounted) return;

      // BREAK — scatter each character once
      for (let i = 0; i < controls.length && mounted; i++) {
        const x = rand(-140, 140);
        const y = rand(-80, 80);
        const r = rand(-45, 45);
        const s = rand(0.85, 1.05);
        controls[i].start({
          x,
          y,
          rotate: r,
          scale: s,
          transition: { duration: 0.55, ease: "backOut" },
        });
        await new Promise((r) => setTimeout(r, breakStagger));
      }

      await new Promise((r) => setTimeout(r, breakHold));
      if (!mounted) return;

      // FIX — restore each character once
      for (let i = 0; i < controls.length && mounted; i++) {
        controls[i].start({
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          transition: { duration: 0.8, ease: "easeInOut" },
        });
        await new Promise((r) => setTimeout(r, 20));
      }

      // ✅ Done — stops here, no loop
    })();

    return () => {
      mounted = false;
      controls.forEach((c) => c.stop());
    };
  }, []);

  return (
    <motion.p className={className} aria-hidden={false}>
      {chars.map((ch, i) => {
        const charToRender = ch === " " ? "\u00A0" : ch;
        return (
          <motion.span
            key={`char-${i}-${ch}`}
            animate={controls[i]}
            initial={{ opacity: 0, x: 0, y: 8, rotate: 0 }}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              transformOrigin: "center",
            }}
          >
            {charToRender}
          </motion.span>
        );
      })}
    </motion.p>
  );
};

export default BreakingText;

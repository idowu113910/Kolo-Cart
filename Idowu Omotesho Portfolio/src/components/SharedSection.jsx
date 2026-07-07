import React from "react";
import { motion, useInView } from "framer-motion";
import stack from "../assets/stack.svg";
import laptop from "../assets/laptop.png";
import wa from "../assets/whatsapp.svg";
import link from "../assets/linkedin in.svg";
import git from "../assets/git git hub.svg";
import broken from "../assets/broken img.png";
import ShatteredImage from "../pages/ShatterImage";
import BreakingText from "./BreakingText";
import arr from "../assets/mdi_arrow-top-right.svg";

// ── Shared Variants ──────────────────────────────────────────────
const simpleFadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const imgVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: customDelay },
  }),
};

const staggerItem = {
  hidden: { opacity: 0, scale: 0.3, y: 30 },
  visible: {
    opacity: 1,
    scale: [0.3, 1.1, 0.9, 1],
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

// ── About ────────────────────────────────────────────────────────
export const AboutAnimated = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });

  return (
    <motion.div
      ref={ref}
      className="w-full flex flex-col items-center"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerItem}
    >
      <div className="lg:flex lg:gap-[32px]">
        <div className="lg:flex lg:flex-col">
          <motion.h4
            className="text-xl sm:text-2xl text-white lg:-ml-18"
            variants={simpleFadeUp}
          >
            <BreakingText text="Building, Breaking, Fixing — Repeat 😎" />
          </motion.h4>

          <motion.div
            className="w-full lg:w-[809.5px] lg:h-[362px] lg:py-[32px] lg:px-[24px] mt-8 lg:mt-2 text-left  bg-[#0E0E0E] rounded-[16px] lg:rounded-[32px] p-6"
            variants={simpleFadeUp}
          >
            <motion.p
              className="font-light text-[16px] lg:text-[24px] lg:-mt-4  text-gray-400 leading-relaxed"
              variants={simpleFadeUp}
            >
              I write code, break things, fix them, and somehow make it all
              work. I build web apps with Next.js, React, and Node.js, making
              sure they don't just run but run well. Sometimes, I add
              animations—because why not?
            </motion.p>

            <motion.p
              className="font-light text-[16px] lg:text-[24px] mt-4 lg:mt-3 text-gray-400 leading-relaxed"
              variants={simpleFadeUp}
            >
              I've built games, dashboards, and real-time apps, always finding
              new ways to make things faster, smoother, and less boring. If I'm
              not coding, I'm probably deep into a console game, trying to beat
              a final boss or just enjoying the pixels.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="w-full mt-8 flex items-left text-left lg:mt-24"
          variants={imgVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.08}
        >
          <ShatteredImage
            src={broken}
            rows={6}
            cols={6}
            duration={2400}
            pauseBetween={5000}
            autoplay={true}
            triggerOnView={true}
            className="w-full lg:w-[480px] h-auto lg:h-[431px] max-w-sm lg:max-w-none"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ── TechStack ────────────────────────────────────────────────────
export const TechStackAnimated = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col mt-8 items-center w-full lg-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
      }}
    >
      <div className="lg:flex lg:gap-[32px] lg:mt-24">
        <div className="lg:flex lg:flex-col">
          <motion.h6
            className="font-light text-[32px] text-white text-center lg:text-left lg:ml-3 mb-6"
            variants={simpleFadeUp}
          >
            My Tech Stack
          </motion.h6>

          <motion.img
            src={stack}
            alt="Tech stack"
            className="w-full lg:w-[1050px] lg:items-left mb-8 h-auto lg:h-[406px] object-contain"
            variants={imgVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.06}
          />
        </div>

        <motion.img
          src={laptop}
          alt="Laptop"
          className="w-full lg:w-[623px] h-auto lg:h-[367px] object-contain lg:mt-18"
          variants={imgVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.12}
        />
      </div>
    </motion.div>
  );
};

// ── Contact ──────────────────────────────────────────────────────
export const ContactAnimated = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const textFade = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col mt-20 items-start text-left w-full lg-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
      }}
    >
      <div className="lg:flex ">
        <motion.div variants={textFade}>
          <h5 className="text-[36px] lg:text-[64px] font-light text-white">
            Say hello
          </h5>
          <p className="text-[16px] lg:text-[36px] font-light text-gray-400 mt-2 lg:whitespace-pre-wrap">
            Have a project in mind? Let's work together.
          </p>
        </motion.div>

        <img
          src={arr}
          alt=""
          className="hidden lg:block lg:w-[117px] lg:h-[117px] lg:ml-100"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:mt-18 lg:gap-[303px] lg:-mb-16">
        <motion.p
          variants={textFade}
          className="font-light text-gray-400 text-[24px] lg:text-[50px] sm:text-[32px] w-full mt-12 hover:text-white break-all"
        >
          <a href="mailto:Idowuomotesho@outlook.com">
            Idowuomotesho@outlook.com
          </a>
        </motion.p>

        <motion.div
          variants={staggerItem}
          id="contact"
          className="flex gap-8 lg:gap-[40px] mt-12 mb-18"
        >
          <a
            href="https://wa.me/2349121801655"
            className="hover:scale-130 transition-transform"
          >
            <img
              src={wa}
              alt="WhatsApp"
              className="w-6 lg:w-[60px] h-6 lg:h-[60px]"
            />
          </a>
          <a
            href="http://linkedin.com/in/idowu-omotesho"
            className="hover:scale-130 transition-transform"
          >
            <img
              src={link}
              alt="LinkedIn"
              className="w-6 lg:w-[60px] h-6 lg:h-[60px]"
            />
          </a>
          <a
            href="https://github.com/idowu113910"
            className="hover:scale-130 transition-transform"
          >
            <img
              src={git}
              alt="GitHub"
              className="w-6 lg:w-[60px] h-6 lg:h-[60px]"
            />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

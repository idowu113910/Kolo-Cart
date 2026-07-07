import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ham from "../assets/hamburger.png";
import closeIcon from "../assets/x-mark.png";
import emo from "../assets/emoji icon.png";
import Typewriter from "typewriter-effect";
import ShatterImage from "./ShatterImage";
import wa from "../assets/whatsapp.svg";
import link from "../assets/linkedin in.svg";
import git from "../assets/git git hub.svg";
import ScrollReveal from "scrollreveal";
import slash from "../assets/slash.png";
import box from "../assets/box 1.png";
import boxx from "../assets/box 2.png";
import backdrop from "../assets/backdrop.png";
import Selected from "../components/MobileSelectedProjects";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import image from "../assets/emoji icon.png";
import SelectedProjects from "../components/SelectedProjects";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 16,
        duration: 0.9,
      },
    },
  };

  const scrollFadeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const heroRef = useRef(null);
  const socialRef = useRef(null);
  const backdropRef = useRef(null);
  const selectedProjectsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const socialInView = useInView(socialRef, { once: true, amount: 0.3 });
  const backdropInView = useInView(backdropRef, { once: true, amount: 0.3 });
  const selectedInView = useInView(selectedProjectsRef, {
    once: true,
    amount: 0.2,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { root: null, threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [open, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleMenu = () => {
    if (!open) {
      setScrollPosition(window.scrollY);
      setOpen(true);
    } else {
      setOpen(false);
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
      });
    }
  };

  const [showName, setShowName] = useState(true);

  useEffect(() => {
    const cycle = 4000;
    const id = setInterval(() => setShowName((s) => !s), cycle);
    return () => clearInterval(id);
  }, []);

  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsBlurred(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    ScrollReveal().reveal(".social", {
      duration: 1500,
      origin: "left",
      distance: "900px",
      delay: 100,
      easing: "ease-in-out",
      opacity: 0,
    });
  }, []);

  const scrollToCont = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  const scrollToAbout = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  const scrollToProjects = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  const aboutRef = useRef(null);

  return (
    <>
      <div className="w-full">
        <MobileNav />
        <DesktopNav />

        {/* HERO */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={scrollFadeVariants}
          className={`hero-slide-wrap hero relative ${
            visible ? "is-visible" : "not-visible"
          } flex flex-col justify-center items-center md:mt-28 mt-38 transition-all duration-300 ${
            open ? "blur-sm pointer-events-none" : ""
          }`}
        >
          <img src={image} alt="" />

          <h4
            className="font-bold leading-[1.2] text-[#C1C1C147] mt-6 sm:mt-7 md:mt-9 text-center"
            style={{ fontSize: "clamp(28px, 6vw, 72px)" }}
          >
            Hello there,
          </h4>
          <div className="flex justify-center px-4 md:px-10 w-full max-w-full overflow-x-hidden">
            <h1
              className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start leading-[1.1] font-semibold text-white text-center md:text-left"
              style={{ fontSize: "clamp(22px, 6vw, 72px)" }}
            >
              <span
                className={`whitespace-nowrap ${showName ? "mr-2 md:mr-3" : "mr-1 md:mr-3"}`}
              >
                I&apos;m
              </span>

              <span
                className="relative inline-grid max-w-full overflow-hidden"
                style={{ fontSize: "inherit", lineHeight: 1.1 }}
              >
                <span
                  className={`col-start-1 row-start-1 transition-all duration-500 ${
                    showName
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-full opacity-0"
                  }`}
                  style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                >
                  Idowu&nbsp;Omotesho
                </span>

                <span
                  className={`col-start-1 row-start-1 transition-all duration-500 ${
                    showName
                      ? "translate-y-full opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                  style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                >
                  a&nbsp;Full-Stack&nbsp;Dev
                </span>
              </span>
            </h1>
          </div>

          <div className="relative w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%] px-4 md:px-0">
            <span
              aria-hidden="true"
              className="invisible block text-center font-thin text-[#C1C1C1] mt-2 whitespace-normal break-words"
              style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}
            >
              I'm a frontend developer who builds responsive web applications
              using React, TypeScript, and Tailwind CSS. I focus on clean,
              maintainable code and have experience building full-stack
              applications.
            </span>

            <div className="absolute inset-0 flex items-start justify-center pointer-events-none px-4 md:px-0">
              <div
                className="text-center font-thin text-[#C1C1C1] mt-2 w-full break-words"
                style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}
              >
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        "I'm a frontend developer who builds responsive web applications using React, TypeScript, and Tailwind CSS. I focus on clean & maintainable code. also have experience building full-stack applications.",
                      )
                      .start();
                  }}
                  options={{ delay: 40, cursor: " " }}
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src={box}
              alt=""
              className="hidden lg:block absolute top-10 -left-4 w-[99px]"
            />
            <img
              src={boxx}
              alt=""
              className="hidden lg:block absolute top-86 -right-4 w-[148px]"
            />
          </div>
        </motion.div>

        {/* SOCIAL ICONS */}
        <motion.div
          ref={socialRef}
          initial="hidden"
          animate={socialInView ? "visible" : "hidden"}
          variants={scrollFadeVariants}
          className="social flex justify-center mt-124 md:mt-16"
        >
          <div
            className={`flex gap-8 cursor-pointer ${
              open
                ? "opacity-0 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            } z-20`}
          >
            <a
              href="https://wa.me/2349121801655"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={wa}
                alt="WhatsApp"
                className="w-[19.75px] md:w-[24px] h-[19.84px] md:h-[24px]"
              />
            </a>

            <a
              href="http://linkedin.com/in/idowu-omotesho"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={link}
                alt="LinkedIn"
                className="w-[19.75px] md:w-[24px] h-[19.84px] md:h-[24px]"
              />
            </a>

            <a
              href="https://github.com/idowu113910"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={git} alt="GitHub" className="md:w-[24px] md:h-[24px]" />
            </a>
          </div>
        </motion.div>

        {/* BACKDROP + SELECTED PROJECTS */}
        <div
          className={`transition-all duration-300 mt-16 md:mt-24 ${
            open ? "blur-sm pointer-events-none" : ""
          }`}
        >
          <motion.div
            ref={backdropRef}
            initial="hidden"
            animate={backdropInView ? "visible" : "hidden"}
            variants={scrollFadeVariants}
            className="flex justify-center lg:-mt-32 md:-mt-16"
          >
            <img src={backdrop} alt="" />
          </motion.div>

          {/* Mobile Selected Projects — shown below 1025px */}
          <Selected />

          <SelectedProjects />
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import git from "../assets/git git hub.svg";
import pro from "../assets/project img.png";
import admin from "../assets/Admin Booking.png";
import head5 from "../assets/projects img 5.png";
import head6 from "../assets/project img 6.png";
import broken from "../assets/broken img.png";
import stack from "../assets/tech stack svg.svg";
import connectFour from "../assets/project head img 1.png";
import laptop from "../assets/laptop.png";
import task from "../assets/task manager.png";
import wa from "../assets/whatsapp.svg";
import link from "../assets/linkedin in.svg";
import { motion, useInView } from "framer-motion";
import ShatteredImage from "../pages/ShatterImage";
import BreakingText from "./BreakingText";
import linkShare from "../assets/devlinks 1 mobile.png";
import {
  TechStackAnimated,
  ContactAnimated,
  AboutAnimated,
} from "./SharedSection";
import { projectsData } from "../data/ProjectsData";

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.995 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: customDelay },
  }),
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

const simpleFadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
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

const ProjectCard = ({ project, index }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const delayFactor = index * 0.18;

  return (
    <motion.div
      ref={ref}
      className="w-full border bg-[#0E0E0E] rounded-[21px] p-6 flex flex-col justify-between"
      variants={cardVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delayFactor}
    >
      <div>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full aspect-[16/9] object-cover rounded-[16px]"
          variants={imgVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={delayFactor + 0.02}
        />

        <motion.p
          className="font-thin text-white text-[22px] sm:text-[26px] mt-4 leading-snug"
          variants={cardVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={delayFactor + 0.06}
        >
          {project.title}
        </motion.p>

        <motion.p
          className="font-thin mt-2 text-gray-500 text-[14px] sm:text-[16px] leading-relaxed"
          variants={cardVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={delayFactor + 0.08}
        >
          {project.description}
        </motion.p>
      </div>

      <div>
        <motion.div
          className="flex flex-wrap gap-[14px] mt-6 mb-4 items-center"
          variants={cardVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={delayFactor + 0.12}
        >
          {project.tech.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt="tech"
              className="w-[20px] h-[20px] object-contain"
            />
          ))}
        </motion.div>

        <div className="flex flex-nowrap items-center justify-start text-white mt-6 gap-3 -ml-2">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[10px] bg-white text-black px-6 h-[38px] flex items-center justify-center font-light text-[14px] whitespace-nowrap"
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={delayFactor + 0.18}
          >
            Live Preview
          </motion.a>

          <motion.a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white rounded-[10px] h-[38px] px-6 justify-center whitespace-nowrap"
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={delayFactor + 0.22}
          >
            <span className="font-light text-[14px]">View Code</span>
            <img src={git} alt="GitHub" className="w-[14px] h-[14px]" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Selected = () => {
  return (
    <div className="w-full">
      {/* Mobile only — hidden from 1025px */}
      <div className="lg:hidden w-full px-6 sm:px-12 md:px-16 max-w-[1024px] mx-auto flex flex-col items-center justify-center">
        <div className="mt-10 mb-8 w-full text-center">
          <h2 className="text-center text-[28px] sm:text-[36px] font-light leading-[48px] tracking-[-0.02em] mb-2 text-white w-full">
            Selected Projects
          </h2>
        </div>
        <section
          id="projects"
          className="flex flex-col gap-10 items-center w-full"
        >
          {projectsData.map((project, index) => (
            <ProjectCard project={project} key={project.id} index={index} />
          ))}
        </section>

        {/* Mobile About + TechStack + Contact stacked vertically */}
        <section id="about" className="mt-24 w-full border-none">
          <AboutAnimated />
        </section>

        <div className="mt-24 w-full flex flex-col items-center">
          <TechStackAnimated />
          <ContactAnimated />
        </div>
      </div>
    </div>
  );
};

export default Selected;

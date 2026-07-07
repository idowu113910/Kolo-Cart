import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import git from "../assets/git git hub.svg";
import react from "../assets/svg react.svg";
import typescript from "../assets/svg TS.svg";
import express from "../assets/svg express.svg";
import mongo from "../assets/svg mongo svg.svg";
import tail from "../assets/tailwindCSS.png";
import next from "../assets/svg next.svg";
import framer from "../assets/svg motion.svg";
import glogo from "../assets/gsap logo.png";
import linkShare from "../assets/grehfhdncb.svg";
import Admin from "../assets/Admin Booking.png";
import jikooImg from "../assets/project img.png";
import kanbanImg from "../assets/task manager.png";
import hangmanImg from "../assets/projects img 3.png";
import pta from "../assets/Home 4.png";
import assureImg from "../assets/project img 6.png";
import sap from "../assets/SS.png";
import wise from "../assets/Wise .png";
import devquiz from "../assets/Dev.png";
import {
  TechStackAnimated,
  ContactAnimated,
  AboutAnimated,
} from "../components/SharedSection";
import unipay from "../assets/unipay.png";
import node from "../assets/nodejs.svg"
import html from "../assets/HTML.jpeg"
import js from "../assets/js.png"

const projectsData = [
  {
    id: 2,
    title: "Admin Dashboard UI",
    description:
      "A clean, modern admin dashboard interface featuring intuitive navigation, organized data tables, and clear visual hierarchy. Designed with a focus on readability, responsive layouts, and a polished, professional aesthetic suited for real-world business use",
    image: Admin,
    tech: [react, tail],
    liveUrl: "https://booking-admin-dashboard-app.vercel.app/",
    codeUrl: "https://github.com/idowu113910/Admin-Dashboard.git",
  },
  {
    id: 1,
    title: "DevLinks - A Developer Link Sharing Platform",
    description:
      "DevLinks is a web app for managing and sharing links easily. It offers link CRUD, drag-and-drop, real-time previews, and profile setup with pictures.",
    image: linkShare,
    tech: [react, tail],
    liveUrl: "https://sharing-djaq.vercel.app/",
    codeUrl: "https://github.com/idowu113910/Sharing.git",
  },
  {
    id: 4,
    title: "WiseWords - Daily Advice Generator",
    description:
      "A simple, satisfying app that delivers a fresh piece of advice at the click of a button. Pulls random quotes from an external API and presents them in a clean, minimal card layout with a smooth loading and transition experience.",
    image: wise,
    tech: [html, tail, js],
    liveUrl: "https://wise-ivory.vercel.app/",
    codeUrl: "https://github.com/idowu113910/wise.git",
  },
  {
    id: 3,
    title: "TaskFlow - Task Management App",
    description:
      "A full-stack task management application that lets users create, organize, and track tasks through an intuitive interface backed by a secure, persistent database. Includes user authentication, real-time updates, and a responsive design for seamless use across devices.",
    image: kanbanImg,
    tech: [react, tail, mongo, node],
    liveUrl: "https://personal-task-manager-three-ivory.vercel.app/",
    codeUrl: "https://github.com/idowu113910/Task-Manager.git",
  },
  {
    id: 5,
    title: "School App Project",
    description:
      "A mobile-first application designed to simplify school fee payments for university students. Features a smooth onboarding flow, secure verification, wallet management, and an intuitive dashboard for tracking transactions — delivering a fast, reliable payment experience tailored for mobile use",
    image: unipay,
    tech: [react, typescript, tail],
    liveUrl: "https://school-app-project-olive.vercel.app/",
    codeUrl: "https://github.com/idowu113910/School-App-Project.git",
  },
  {
    id: 6,
    title: "DevQuiz - Developer QuiZ Platform",
    description:
      "An interactive quiz platform testing frontend knowledge across HTML, CSS, JavaScript, and Accessibility. Users pick a category, answer a set of questions, and get scored out of 10 with instant feedback. Fully responsive across all screen sizes, with a smooth light/dark mode toggle.",
    image: devquiz,
    tech: [react, tail],
    liveUrl: "https://dev-quiz-psi.vercel.app/",
    codeUrl: "https://github.com/idowu113910/devQuiz.git",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="w-full bg-[#0E0E0E] rounded-[32px] p-[32px] flex flex-col border border-[#1A1A1A] min-h-[500px] 
      lg:min-h-[580px] xl:min-h-[650px] 2xl:min-h-[708px]"
    >
      {/* Project Image */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-[24px] mb-6"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[180px] lg:h-[220px] xl:h-[260px] 2xl:h-[292px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <motion.div variants={itemVariants}>
          <h3 className="text-[24px] lg:text-[28px] xl:text-[32px] font-normal leading-tight mb-1 text-white">
            {project.title}
          </h3>
          <p className="text-gray-500 font-extralight text-[14px] lg:text-[15px] xl:text-[16px] leading-relaxed mb-6 max-w-[480px]">
            {project.description}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          {/* Tech Icons */}
          <div className="flex flex-wrap gap-[14px] lg:gap-[18px] mb-10 lg:mb-14 items-center">
            {project.tech.map((icon, i) => (
              <img
                key={i}
                src={icon}
                alt="tech"
                className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] object-contain"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 lg:gap-[24px]  w-full">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-light rounded-[16px] flex items-center justify-center transition-all
    w-[45%] xs:w-full lg:w-[126px] lg:flex-none h-[38px] xs:h-[40px] lg:h-[44px]
    text-[11px] xs:text-[13px] lg:text-[16px] border-t border-x border-b-[5px]
    border-transparent
    hover:bg-transparent
    hover:text-white
    hover:border-white
    hover:light
    transition-all duration-300"
            >
              Live Preview
            </a>

            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white font-light rounded-[16px] flex items-center justify-center gap-1 xs:gap-2 transition-all hover:border-gray-400
    w-[45%] xs:w-full lg:w-[140px] lg:flex-none h-[38px] xs:h-[40px] lg:h-[44px]
    text-[11px] xs:text-[13px] lg:text-[16px]"
            >
              <span>View Code</span>
              <img
                src={git}
                alt="github"
                className="w-[12px] h-[12px] xs:w-[16px] xs:h-[16px] lg:w-[20px] lg:h-[20px]"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SelectedProjects = () => {
  const leftCol = projectsData.filter((_, i) => i % 2 === 0);
  const rightCol = projectsData.filter((_, i) => i % 2 !== 0);

  return (
    <section className="hidden lg:block bg-black text-white lg:py-20 px-[40px] lg:px-[60px] xl:px-[100px] 2xl:px-[160px] w-full">
      {/* Two-Column Staggered Grid */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-[60px] xl:gap-x-[80px] 2xl:gap-x-[120px] lg:items-start w-full">
        {/* LEFT COLUMN — header sits above first card */}
        <div className="flex flex-col gap-[280px] xl:gap-[320px] 2xl:gap-[360px]">
          {/* Header lives here now */}
          <div>
            <h2 className="text-center lg:text-left lg:text-[40px] font-light leading-[48px] tracking-[-0.02em] mb-2 text-white w-full">
              Selected Projects
            </h2>
            <p className="hidden lg:block text-[#666666] font-light text-[16px] leading-[24px] mb-[56px]">
              Crafted with attention to detail.
            </p>
            <div className="mt-[220px]">
              {leftCol[0] && <ProjectCard project={leftCol[0]} />}
            </div>
          </div>

          <div className="-mt-[18px]">
            {leftCol[1] && <ProjectCard project={leftCol[1]} />}
            <div className="mt-[320px]">
              {leftCol[2] && <ProjectCard project={leftCol[2]} />}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col">
          {rightCol[0] && (
            <div className="-mt-[1px]">
              <ProjectCard project={rightCol[0]} />
            </div>
          )}
          {rightCol[1] && (
            <div className="mt-[280px] xl:mt-[292px] 2xl:mt-[360px]">
              <ProjectCard project={rightCol[1]} />
            </div>
          )}
          {rightCol[2] && (
            <div className="mt-[280px] xl:mt-[265px] 2xl:mt-[360px]">
              <ProjectCard project={rightCol[2]} />
            </div>
          )}
        </div>
      </div>

      <section id="about" className="mt-24 w-full">
        <AboutAnimated />
        <TechStackAnimated />
      </section>

      <div className="mt-24 w-full flex flex-col items-center">
        <ContactAnimated />
      </div>
    </section>
  );
};

export default SelectedProjects;

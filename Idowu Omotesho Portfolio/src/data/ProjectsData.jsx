// src/data/projectsData.js
import linkShare from "../assets/grehfhdncb.svg";
import connectFour from "../assets/project head img 1.png";
import jikooImg from "../assets/project img.png";
import kanbanImg from "../assets/task manager.png";
import hangmanImg from "../assets/projects img 3.png";
import assureImg from "../assets/project img 6.png";
import react from "../assets/svg react.svg";
import typescript from "../assets/svg TS.svg";
import next from "../assets/svg next.svg";
import express from "../assets/svg express.svg";
import mongo from "../assets/svg mongo svg.svg";
import tail from "../assets/tailwindCSS.png";
import framer from "../assets/svg motion.svg";
import glogo from "../assets/gsap logo.png";
import Admin from "../assets/Admin Booking.png";
import wise from "../assets/Wise .png";
import devquiz from "../assets/Dev.png";
import unipay from "../assets/unipay.png";
import html from "../assets/HTML.jpeg"
import js from "../assets/js.png"

export const projectsData = [
  {
    id: 2,
    title: "DevLinks - A Developer Link Sharing Platform",
    description:
      "DevLinks is a web app for managing and sharing links easily. It offers link CRUD, drag-and-drop, real-time previews, and profile setup with pictures.",
    image: linkShare,
    tech: [react, tail],
    liveUrl: "https://sharing-djaq.vercel.app/",
    codeUrl: "https://github.com/idowu113910/Sharing.git",
  },
  {
    id: 1,
    title: "Admin Dashboard UI",
    description:
      "DevLinks is a web app for managing and sharing links easily. It offers link CRUD, drag-and-drop, real-time previews, and profile setup with pictures.",
    image: Admin,
    tech: [react, tail],
    liveUrl: "https://booking-admin-dashboard-app.vercel.app/",
    codeUrl: "https://github.com/idowu113910/Admin-Dashboard.git",
  },
  {
    id: 4,
    title: "TaskFlow - Task Management App",
    description:
      "A full-stack task management application that lets users create, organize, and track tasks through an intuitive interface backed by a secure, persistent database. Includes user authentication, real-time updates, and a responsive design for seamless use across devices.",

    image: kanbanImg,
    tech: [react, tail, mongo, node],
    liveUrl: "https://personal-task-manager-three-ivory.vercel.app/",
    codeUrl: "https://github.com/idowu113910/Task-Manager.git",
  },
  {
    id: 3,
    title: "WiseWords - Daily Advice Generator",
    description:
      "A simple, satisfying app that delivers a fresh piece of advice at the click of a button. Pulls random quotes from an external API and presents them in a clean, minimal card layout with a smooth loading and transition experience.",
    image: wise,
    tech: [html, tail, js],
    liveUrl: "https://wise-ivory.vercel.app/",
    codeUrl: "https://github.com/idowu113910/wise.git",
  },
  {
    id: 5,
    title: "DevQuiz - Developer Quiz Platform",
    description:
      "An interactive quiz platform testing frontend knowledge across HTML, CSS, JavaScript, and Accessibility. Users pick a category, answer a set of questions, and get scored out of 10 with instant feedback. Fully responsive across all screen sizes, with a smooth light/dark mode toggle.",
    image: devquiz,
    tech: [react, tail],
    liveUrl: "https://dev-quiz-psi.vercel.app/",
    codeUrl: "https://github.com/idowu113910/devQuiz.git",
  },
  {
    id: 6,
    title: "School App Project",
    description:
      "A mobile-first application designed to simplify school fee payments for university students. Features a smooth onboarding flow, secure verification, wallet management, and an intuitive dashboard for tracking transactions — delivering a fast, reliable payment experience tailored for mobile use",
    image: unipay,
    tech: [react, typescript, tail],
    liveUrl: "https://school-app-project-olive.vercel.app/",
    codeUrl: "https://github.com/idowu113910/School-App-Project.git",
  },
];

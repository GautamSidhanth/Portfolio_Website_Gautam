import React from "react";
import { FaReact, FaUniversity, FaGraduationCap, FaBook, FaBriefcase } from "react-icons/fa";
import url from "@/public/url.png";
import InterviewAI from "@/public/InterviewAI.png";
import chatty from "@/public/chatty.png";
import blogxy from "@/public/blogxy.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Timeline",
    hash: "#timeline",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "SBD International",
    location: "Bhadrak, Odisha",
    description:
      "Laid a strong academic foundation at SBD International School, consistently excelling in core subjects and achieving 84.4% in Class 10.",
    icon: <FaGraduationCap />,
    date: "2019",
  },
  {
    title: "Vikash Residential School",
    location: "Bhubaneswar, Odisha",
    description:
      "Completed Higher Secondary education with a major in Science and Mathematics, securing 81.4% in Class 12.",
    icon: <FaBook />,
    date: "2019 - 2021",
  },
  {
    title: "VIT Bhopal",
    location: "Bhopal, Madhya Pradesh",
    description:
      "Pursuing a Bachelor of Technology in Computer Science. Maintaining a CGPA of 7.85 while actively contributing to technical societies and hackathons.",
    icon: <FaUniversity />,
    date: "2021 - 2025",
  },
    {
    title: "MeetMux by Altrodav Technology",
    location: "Bengaluru, Karnataka",
    description:
      "Architected cloud infrastructure and CI/CD pipelines using Docker, AWS, and Kubernetes. Successfully reduced deployment time by 70% and optimized system uptime to 99.9%.",
    icon: <FaBriefcase />,
    date: "March 2025 - June 2025",
  },
] as const;

export const projectsData = [
  {
    title: "URL Shortener",
    description:
      "A high-performance URL shortener focusing on security. Engineered a scalable backend with Node.js and Redis, reducing page load latency by 50% via optimized caching strategies.",
    tags: ["React", "AWS", "MongoDB", "Tailwind", "Prisma", "LoadBalancer", "Docker"],
    imageUrl: url,
    githubUrl: "https://github.com/GautamSidhanth/UrlShortener",
    liveUrl: "https://urlshortenerforu.duckdns.org",
  },
  {
    title: "Interview-AI",
    description:
      "A smart job board for remote developers. Led the frontend development using Next.js, implementing real-time filtering, robust sorting algorithms, and seamless pagination.",
    tags: ["Convex", "TypeScript", "Next.js", "Tailwind", "clerk", "Stream"],
    imageUrl: InterviewAI,
    githubUrl: "https://github.com/GautamSidhanth/Interview-AI",
    liveUrl: "https://interview-ai-psi-three.vercel.app/",
  },
  {
    title: "Chatty",
    description:
      "A real-time messaging platform built with MERN stack and Socket.io. Features instant message delivery, JWT authentication, and 50% faster data transmission.",
    tags: ["React", "Socket.io", "Node.js", "Express", "MongoDB", "Tailwind", "JWT"],
    imageUrl: chatty,
    githubUrl: "https://github.com/GautamSidhanth/Real-Time-Chat-App",
    liveUrl: "https://real-time-chat-app-92lu.onrender.com/",
  },
    {
    title: "BloxY",
    description:
      "A next-gen web platform leveraging Edge computing. Built with Cloudflare Workers and Hono for sub-millisecond response times and superior scalability.",
    tags: ["CloudFlare Worker", "Next.js", "PostgreSQL", "Tailwind", "Hono"],
    imageUrl: blogxy,
    githubUrl: "https://github.com/GautamSidhanth/BLOGxY",
    liveUrl: "https://blogxy-git-main-gautamsidhanths-projects.vercel.app/",
  },
] as const;

export const skillsData = [
  "C",
  "C++",
  "JavaScript (ES6+)",
  "TypeScript",
  "SQL",
  "HTML5",
  "CSS3",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Shadcn UI",
  "Material UI",
  "Framer Motion",
  "Redux",
  "Recoil",
  "Node.js",
  "Express.js",
  "Django",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Mongoose",
  "Redis",
  "Docker",
  "Docker Swarm",
  "Kubernetes",
  "Helm",
  "GitOps",
  "AWS EC2",
  "AWS ECS",
  "AWS ECR",
  "AWS EKS",
  "AWS S3",
  "AWS ALB",
  "AWS CloudFront",
  "AWS DynamoDB",
  "AWS RDS",
  "AWS Lambda",
  "AWS VPC",
  "DigitalOcean",
  "Vercel",
  "Cloudflare Workers",
  "Nginx",
  "Git",
  "GitHub",
  "GitHub Actions",
  "Jenkins",
  "CI/CD",
  "Turborepo",
  "Load Balancers",
  "Monitoring (Prometheus)",
  "Monitoring (Grafana)",
  "Serverless Architecture",
  "OpenAPI",
  "Kafka",
  "JWT",
  "NextAuth",
  "WebSockets",
  "WebRTC",
  "GraphQL",
] as const;

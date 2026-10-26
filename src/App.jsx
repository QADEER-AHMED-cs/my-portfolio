import { Fragment, useEffect, useId, useRef, useState } from "react";
import {
  motion, AnimatePresence, useScroll, useSpring, useMotionValue, useMotionTemplate,
  useInView, animate, useTransform,
} from "framer-motion";
import "./styles.css";
import Orbit from "./Orbit.jsx";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */
const L = {
  email: "qadeerahmed.tech@gmail.com",
  location: "Karachi, Pakistan",
  linkedin: "https://www.linkedin.com/in/qadeer-ahmed-24310627b/",
  github: "https://github.com/QADEER-AHMED-cs",
  resume: "/Qadeer_Ahmed_Resume.pdf",
  photo: "/profile.jpg",
};

const NAV = ["about", "experience", "skills", "projects", "repos", "contact"];
const ROLES = [
  "Full-Stack Developer",
  "Node.js Backend",
  "AI/ML Enthusiast",
  "React + TypeScript",
  "Software Engineer",
];

/* every gradient is a [from, to] pair; cards read it as --c / --c2 */
const GRADS = [
  ["#22d3ee", "#6366f1"],
  ["#a78bfa", "#ec4899"],
  ["#f472b6", "#fb923c"],
  ["#34d399", "#22d3ee"],
  ["#fbbf24", "#f43f5e"],
  ["#818cf8", "#22d3ee"],
];

const STATS = [
  { n: 6, s: "+", t: "months experience", icon: "bolt", g: GRADS[4] },
  { n: 6, s: "+", t: "portals built", icon: "build", g: GRADS[0] },
  { n: 4, s: "", t: "major projects", icon: "rocket", g: GRADS[1] },
  { n: 3.12, s: "", t: "CGPA, BSCS", d: 2, icon: "cap", g: GRADS[3] },
];

const WORK = [
  "Developed and maintained enterprise portals (Student, LMS, ERPNext, ESS, Teacher) using React.js, TypeScript, and JavaScript.",
  "Built and integrated Node.js/Express REST APIs with ERPNext backend workflows.",
  "Handled REST API integration and testing using Postman, catching integration bugs before release.",
  "Supported ERPNext (Frappe Framework) backend workflows and modular frontend architecture.",
  "Implemented role-based access control (RBAC) across Employee, Teacher, and Admin roles.",
  "Built responsive UIs with Tailwind CSS and Framer Motion.",
  "Performed bug fixes, UI improvements, functional testing, and User Acceptance Testing (UAT).",
  "Collaborated across technical and operational teams to translate requirements into working solutions.",
];

const SKILLS = {
  Frontend: {
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "React Native", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Redux Toolkit", "Zustand"],
    g: GRADS[0], icon: "code",
  },
  "Backend & APIs": {
    items: ["Node.js", "Express.js", "Python", "REST APIs", "JWT Auth", "OAuth 2.0", "ERPNext", "Frappe", "Postman", "Swagger/OpenAPI"],
    g: GRADS[3], icon: "server",
  },
  Databases: {
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Prisma ORM", "Mongoose", "Redis"],
    g: GRADS[4], icon: "database",
  },
  "AI / ML & Data": {
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", "OpenCV", "NLP", "Pandas", "NumPy", "Power BI"],
    g: GRADS[1], icon: "brain",
  },
  "DevOps & Tools": {
    items: ["Git", "GitHub", "GitHub Actions", "Docker", "Vercel", "CI/CD", "VS Code", "Jupyter", "Claude Code", "Cursor AI"],
    g: GRADS[5], icon: "wrench",
  },
  "Testing & Practices": {
    items: ["SDLC", "Agile", "Jest", "Vitest", "React Testing Library", "Supertest", "Debugging", "System Integration", "RBAC", "UAT"],
    g: GRADS[2], icon: "clipboard",
  },
};
const MARQUEE = Object.values(SKILLS).flatMap((g) => g.items);

/*
  PROJECT IMAGES
  Put real screenshots in  public/projects/  and list them in `shots`.
  Files that don't exist are skipped automatically, and the card falls back to
  the generated preview art, so nothing ever looks broken.
*/
const PROJECTS = [
  {
    id: "student-portal", title: "Student & Parent Portal", tag: "Enterprise project · Learn School", kind: "portal",
    shots: ["/projects/student-portal-1.png", "/projects/student-portal-2.png", "/projects/student-portal-3.png"],
    short: "13-module academic portal with dual views (Student + Guardian), ERPNext integration, and AI face detection.",
    long: `Production-grade Student & Parent Portal for Learn School, integrated with ERPNext (Frappe).

📊 ACADEMIC MODULES (6)
• Dashboard — Overview of student's academic life
• Attendance — Daily & summary view with animated rings
• Results — Assessment results with grades
• Report Cards — View & download with PSD tracking
• Schedule — Weekly & daily class schedules
• Classroom — Course details & materials

💳 STUDENT SERVICES (6)
• ID Card Request — Photo submission with admin approval
• Fees — Invoices & payment tracking
• Notice Board — News, streams & circulars
• Screen Time — Device usage monitoring
• Login Activity — Account security log
• Profile — Personal info & guardian details

🎯 KEY HIGHLIGHTS
• Dual Portal — Student & Guardian views with child switcher
• AI Face Detection — MediaPipe-powered smart avatar with auto-crop (413×531)
• ID Card Cropper — Manual 1:1 square crop with zoom, rotate & drag (600×600)
• Modern UI — Glassmorphism, Framer Motion animations
• Status-Based Access — Only approved requests can print ID cards
• ERPNext Integration — Full CRUD via REST API
• Role-Based Security — Enforced at backend (Frappe roles)
• CSRF Protection — Token-based request security`,
    tech: ["React.js", "TypeScript", "Vite", "Tailwind", "MediaPipe", "ERPNext", "REST APIs"],
    repo: "https://github.com/QADEER-AHMED-cs/learn-school-student-portal",
    highlights: ["13 modules", "AI Face Detection", "Dual Portal", "ID Card Flow"],
    g: GRADS[0], icon: "graduation",
  },
  {
    id: "ess-portal", title: "Employee Self Service Portal", tag: "Enterprise project · Learn School", kind: "ess",
    shots: ["/projects/ess-portal-1.png", "/projects/ess-portal-2.png", "/projects/ess-portal-3.png"],
    short: "20+ module role-based portal for Employees, Teachers & Admins with ERPNext backend.",
    long: `Modern, role-based Employee Self Service Portal (ESS) for Learn School, fully integrated with ERPNext.

🎭 ROLE-BASED ACCESS — 3 ROLES × 20+ MODULES

👨‍💼 EMPLOYEE MODULES
• Dashboard, Attendance, Leave, Payroll, Tasks, Notice Board, Notifications, Profile, Login Activity

👨‍🏫 TEACHER / FACULTY MODULES
• My Classes, Mark Attendance, Assignments, Student Activity, Assessments, View Results

👨‍💼 ACADEMIC / ADMIN MODULES
• Manage Employees, Manage Teachers, Admin Attendance, Leave Approvals, Payroll Processing, Reports & Analytics, Sections & Programs, Student Groups, Publish Notices, Audit Log, CEO Schedule, Teacher Profiles

🔐 SECURITY
• ERPNext session-based auth
• CSRF token-based request signing
• Employee / Teacher / Academic / Admin role enforcement
• Client-side route guards
• Backend role-level permissions in ERPNext

🏗️ ARCHITECTURE
• 30+ modular custom React hooks
• Role-aware layouts (MainLayout, Topbar)
• Notification dropdown system
• Modal-based workflows
• Server-side helpers (Express, Google OAuth)`,
    tech: ["React.js", "TypeScript", "Vite", "Tailwind", "ERPNext", "Frappe", "RBAC", "Express"],
    repo: "https://github.com/QADEER-AHMED-cs/Learn-School-Employee-Self-Service-Portal-ESS",
    highlights: ["20+ modules", "3 roles", "Payroll", "Audit Log"],
    g: GRADS[3], icon: "briefcase",
  },
  {
    id: "risk", title: "Multimodal Suicide Risk Detection", tag: "Final year project · AI/ML", kind: "neural",
    shots: ["/projects/risk-1.png", "/projects/risk-2.png"],
    short: "AI model using Transformers + CNNs for suicide risk prediction from multimodal data.",
    long: `Final Year Project. AI model using Transformers and CNNs for suicide risk prediction from multimodal data.

🧠 TECHNICAL HIGHLIGHTS
• 📝 DistilBERT — Contextual text representation
• 🖼️ MobileViT v2 — Visual feature extraction
• 🔗 Early Fusion — Multimodal feature integration
• 🧠 Multi-Layer Perceptron — Final classification
• 🧪 Preprocessing, experimentation, training, integration, and evaluation`,
    tech: ["Python", "TensorFlow", "Hugging Face", "OpenCV", "NLP", "Deep Learning"],
    repo: "https://github.com/QADEER-AHMED-cs",
    highlights: ["DistilBERT", "MobileViT v2", "Early Fusion", "MLP"],
    g: GRADS[1], icon: "brain",
  },
  {
    id: "tumor", title: "Brain Tumor Detection & Segmentation", tag: "Personal project · AI/ML", kind: "scan",
    shots: ["/projects/tumor-1.png", "/projects/tumor-2.png"],
    short: "YOLOv11 detects tumor, SAM2 segments exact region on MRI scans.",
    long: `Personal Project. Two-stage AI pipeline for MRI tumor detection and segmentation.

🧠 TECHNICAL HIGHLIGHTS
• 🖼️ YOLOv11 — Tumor detection in MRI slices
• 🎯 SAM2 (Segment Anything Model 2) — Precise tumor segmentation
• 🔬 MRI image preprocessing with OpenCV
• 📊 End-to-end pipeline for medical imaging analysis

🎯 APPROACH
Stage 1: YOLOv11 detects where a tumor is in an MRI slice.
Stage 2: SAM2 segments the exact region from that detection.`,
    tech: ["Python", "YOLOv11", "SAM2", "OpenCV", "Deep Learning", "CV"],
    repo: "https://github.com/QADEER-AHMED-cs/Brain-Tumor-Detection-Segmentation-YOLOv11-SAM2",
    highlights: ["YOLOv11", "SAM2", "2-Stage Pipeline", "Medical Imaging"],
    g: GRADS[4], icon: "scan",
  },
];

const REPOS = [
  { name: "learn-school-student-portal", desc: "Modern Student & Parent Portal — React, TypeScript, Vite, Tailwind, ERPNext.", lang: "TypeScript", color: "#3178c6", url: "https://github.com/QADEER-AHMED-cs/learn-school-student-portal" },
  { name: "Learn-School-ESS-Portal", desc: "Role-based Employee Self Service Portal — React + TypeScript + Vite + Tailwind + ERPNext.", lang: "TypeScript", color: "#3178c6", url: "https://github.com/QADEER-AHMED-cs/Learn-School-Employee-Self-Service-Portal-ESS" },
  { name: "Brain-Tumor-Detection-YOLOv11-SAM2", desc: "Brain Tumor Detection & Segmentation using YOLOv11 and SAM2.", lang: "Jupyter", color: "#DA5B0B", url: "https://github.com/QADEER-AHMED-cs/Brain-Tumor-Detection-Segmentation-YOLOv11-SAM2" },
  { name: "University-Event-Management", desc: "University Event Management System.", lang: "JavaScript", color: "#f1e05a", url: "https://github.com/QADEER-AHMED-cs/University-Event-Management" },
  { name: "Portfolio", desc: "Personal Portfolio Website — React, Node.js, TailwindCSS.", lang: "TypeScript", color: "#3178c6", url: "https://github.com/QADEER-AHMED-cs/Portfolio" },
];

const INTERESTS = [
  { icon: "zap", label: "Full-Stack Engineering" },
  { icon: "server", label: "Backend & API Architecture" },
  { icon: "bot", label: "AI-Enabled Applications" },
  { icon: "building", label: "Enterprise Software" },
  { icon: "brain", label: "Large Language Models" },
  { icon: "link", label: "API & System Integration" },
  { icon: "layers", label: "Software Architecture" },
  { icon: "flask", label: "Quality Engineering" },
  { icon: "gear", label: "Automation & DevOps" },
];

const APPROACH = [
  { label: "Understand the Problem", desc: "Listen deeply, ask why." },
  { label: "Analyze Requirements", desc: "Break down scope and edge cases." },
  { label: "Design the Solution", desc: "Architecture, APIs, data flow." },
  { label: "Build & Integrate", desc: "Write clean, modular code." },
  { label: "Test & Debug", desc: "Unit, integration, and UAT." },
  { label: "Validate with Real Users", desc: "Feedback loop is critical." },
  { label: "Improve & Scale", desc: "Iterate based on real usage." },
];

const CODE = `const qadeer = {
  role: "Full-Stack Software Engineer",
  stack: ["React", "Next.js", "Node.js", "Express", "TypeScript", "Python"],
  db: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
  focus: ["Full-Stack", "AI/ML", "Enterprise Systems"],
  experience: "6+ months @ Learn Academy",
  location: "Karachi, Pakistan",
  openToWork: true,
};`;

/* ═══════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════ */
const FILLED = ["github", "linkedin"];
const ICONS = {
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  build: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" /></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
  cap: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  server: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>,
  brain: <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></>,
  database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></>,
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  clipboard: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></>,
  graduation: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /></>,
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  bot: <><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
  flask: <><path d="M9 3h6v4l5 10a2 2 0 0 1-1.8 3H5.8a2 2 0 0 1-1.8-3l5-10V3" /><path d="M3 15h18" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
  github: <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.62-5.5 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />,
  linkedin: <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  arrowLeft: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
  arrowUp: <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
  location: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
  x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  menu: <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>,
  arrowUpRight: <><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></>,
};
const Icon = ({ name, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={FILLED.includes(name) ? color : "none"}
    stroke={FILLED.includes(name) ? "none" : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block" }} aria-hidden="true">
    {ICONS[name] || ICONS.bolt}
  </svg>
);

/* ═══════════════════════════════════════════════════════
   HELPERS / HOOKS
   ═══════════════════════════════════════════════════════ */
const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const iconTile = (g) => ({
  background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`,
  boxShadow: `0 8px 22px color-mix(in srgb, ${g[0]} 45%, transparent)`,
});

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { const s = localStorage.getItem("portfolio-theme"); if (s) return s; } catch {}
    return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("portfolio-theme", theme); } catch {}
  }, [theme]);
  return { theme, setTheme };
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* keeps only the screenshot URLs that really exist */
function useValidImages(srcs) {
  const [ok, setOk] = useState([]);
  const key = srcs.join("|");
  useEffect(() => {
    let live = true;
    Promise.all(srcs.map((s) => new Promise((res) => {
      const im = new Image();
      im.onload = () => res(s);
      im.onerror = () => res(null);
      im.src = s;
    }))).then((r) => live && setOk(r.filter(Boolean)));
    return () => { live = false; };
  }, [key]);
  return ok;
}

/* ═══════════════════════════════════════════════════════
   LOADER
   ═══════════════════════════════════════════════════════ */
function Loader({ onDone }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const start = performance.now(), dur = 2000;
    let raf;
    const tick = (now) => {
      const v = Math.min(100, ((now - start) / dur) * 100);
      setP(v);
      if (v < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  const label = p < 35 ? "Booting up" : p < 70 ? "Loading projects" : p < 100 ? "Polishing pixels" : "Welcome";
  return (
    <motion.div className="loader" exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }} transition={{ duration: 0.6, ease: "easeInOut" }}>
      <motion.div className="loader-card glass" initial={{ opacity: 0, y: 30, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", damping: 16 }}>
        <div className="loader-ring" style={{ "--p": p }}><span className="loader-mark">QA</span></div>
        <motion.p key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="loader-text">{label}</motion.p>
        <span className="loader-percent">{Math.round(p)}%</span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   BACKGROUND + GLOBAL EFFECTS
   ═══════════════════════════════════════════════════════ */
function Aurora() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 4000], [0, -520]);
  const y2 = useTransform(scrollY, [0, 4000], [0, 340]);
  const y3 = useTransform(scrollY, [0, 4000], [0, -260]);
  const y4 = useTransform(scrollY, [0, 4000], [0, 460]);
  return (
    <div className="aurora" aria-hidden="true">
      <motion.div className="blob b1" style={{ y: y1 }}><i /></motion.div>
      <motion.div className="blob b2" style={{ y: y2 }}><i /></motion.div>
      <motion.div className="blob b3" style={{ y: y3 }}><i /></motion.div>
      <motion.div className="blob b4" style={{ y: y4 }}><i /></motion.div>
      <div className="blob b5"><i /></div>
      <div className="grid-fade" />
    </div>
  );
}

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    if (reduced()) return;
    const c = ref.current, x = c.getContext("2d");
    let w, h, id, m = { x: -999, y: -999 };
    const P = [];
    const rs = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    rs();
    const count = innerWidth < 700 ? 32 : 64;
    for (let i = 0; i < count; i++) P.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.6 + 0.8 });
    const mv = (e) => { m = { x: e.clientX, y: e.clientY }; };
    const loop = () => {
      x.clearRect(0, 0, w, h);
      const light = document.documentElement.getAttribute("data-theme") === "light";
      const rgb = light ? "109,74,255" : "165,243,252";
      P.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dm = Math.hypot(p.x - m.x, p.y - m.y);
        if (dm < 130 && dm > 0) { p.x += ((p.x - m.x) / dm) * 1.3; p.y += ((p.y - m.y) / dm) * 1.3; }
        x.fillStyle = `rgba(${rgb},${light ? 0.4 : 0.6})`;
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill();
        for (let j = i + 1; j < P.length; j++) {
          const q = P[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 115) {
            x.strokeStyle = `rgba(${rgb},${(light ? 0.16 : 0.16) * (1 - d / 115)})`;
            x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke();
          }
        }
      });
      id = requestAnimationFrame(loop);
    };
    loop();
    addEventListener("resize", rs); addEventListener("mousemove", mv);
    return () => { cancelAnimationFrame(id); removeEventListener("resize", rs); removeEventListener("mousemove", mv); };
  }, []);
  return <canvas ref={ref} className="bg" aria-hidden="true" />;
}

function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32 }), sy = useSpring(y, { stiffness: 420, damping: 32 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const mv = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      setBig(!!e.target.closest?.("a,button,input,textarea,.glass-card,.theme-toggle"));
    };
    addEventListener("mousemove", mv);
    return () => removeEventListener("mousemove", mv);
  }, [x, y]);
  return (
    <>
      <motion.div className="cursor-dot" style={{ x: sx, y: sy }} animate={{ scale: big ? 0 : 1 }} />
      <motion.div className="cursor" style={{ x: sx, y: sy }} animate={{ scale: big ? 2.2 : 1 }} />
    </>
  );
}

function Mag({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 });
  const mv = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }} onMouseMove={mv} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

function Typer() {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const w = ROLES[i];
    let t;
    if (!del && n < w.length) t = setTimeout(() => setN(n + 1), 70);
    else if (!del) t = setTimeout(() => setDel(true), 1400);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 30);
    else { setDel(false); setI((i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [i, n, del]);
  return <span className="typer">{ROLES[i].slice(0, n)}<i /></span>;
}

function Terminal() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= CODE.length) return;
    const id = setTimeout(() => setN(n + 1), 22);
    return () => clearTimeout(id);
  }, [n]);
  return (
    <motion.div className="term glass" initial={{ opacity: 0, y: 50, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 2.2, type: "spring", damping: 14 }}>
      <div className="dots"><b /><b /><b /><span>about.js</span></div>
      <pre>{CODE.slice(0, n)}<i /></pre>
    </motion.div>
  );
}

function Count({ n, s = "", d = 0 }) {
  const ref = useRef(null), inV = useInView(ref, { once: true }), [v, setV] = useState(0);
  useEffect(() => { if (inV) animate(0, n, { duration: 1.6, ease: "easeOut", onUpdate: setV }); }, [inV, n]);
  return <span ref={ref}>{v.toFixed(d)}{s}</span>;
}

/* Glass card: 3D tilt + spotlight + shine + rotating gradient border (CSS). Gradient pair via `g`. */
function GlassCard({ children, className = "", onClick, g = GRADS[0], tilt = 8, ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(50), my = useMotionValue(50);
  const rx = useSpring(0, { stiffness: 180, damping: 18 }), ry = useSpring(0, { stiffness: 180, damping: 18 });
  const spot = useMotionTemplate`radial-gradient(380px circle at ${mx}% ${my}%, color-mix(in srgb, var(--c) 36%, transparent), transparent 60%)`;
  const move = (e) => {
    if (reduced()) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    mx.set(px * 100); my.set(py * 100);
    rx.set((0.5 - py) * tilt); ry.set((px - 0.5) * tilt);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref}
      className={`glass glass-card ${className}`}
      style={{ "--c": g[0], "--c2": g[1], rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onMouseMove={move} onMouseLeave={leave} onClick={onClick}
      {...(onClick ? { role: "button", tabIndex: 0, onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick()) } : {})}
      {...rest}
    >
      <motion.span className="glass-spot" style={{ background: spot }} />
      <span className="glass-shine" />
      <div className="glass-inner">{children}</div>
    </motion.div>
  );
}

const Reveal = ({ children, delay = 0, y = 40, x = 0, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y, x, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-70px" }} transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

/* headline reveals word by word from a mask, then a gradient underline draws in */
const Title = ({ children, kicker }) => (
  <div className="title-wrap">
    {kicker && <Reveal y={20}><span className="title-kicker glass"><i />{kicker}</span></Reveal>}
    <h2>
      {String(children).split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="w-mask">
            <motion.span className="w" initial={{ y: "115%", rotate: 4 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.07, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
          </span>{" "}
        </Fragment>
      ))}
      <motion.u initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
    </h2>
  </div>
);

function ThemeToggle({ theme, setTheme }) {
  const click = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    if (!document.startViewTransition || reduced()) return setTheme(next);
    const x = e.clientX, y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(() => {
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    });
    t.ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      )
    );
  };
  return (
    <button className="theme-toggle glass" onClick={click} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 220 }}>
        <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
      </motion.span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECT PICTURES
   Generated previews (browser mock / pipeline diagram / tech constellation).
   Real screenshots from `shots` are shown first when they exist.
   ═══════════════════════════════════════════════════════ */
function SideBar({ fg }) {
  return (
    <g>
      <rect x="14" y="44" width="96" height="242" rx="12" fill="#fff" fillOpacity=".06" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="26" y={62 + i * 34} width={i === 0 ? 72 : 58 + (i % 3) * 7} height="10" rx="5" fill={i === 0 ? fg : "#fff"} fillOpacity={i === 0 ? 1 : 0.14} />
      ))}
    </g>
  );
}

function Art({ kind, g }) {
  const id = useId().replace(/:/g, "");
  const [a, b] = g;
  const fg = `url(#${id}fg)`;
  const Txt = (props) => <text fontFamily="Instrument Sans, system-ui, sans-serif" fill="#fff" {...props} />;
  return (
    <svg className="art" viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}fg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} stopOpacity=".38" /><stop offset="1" stopColor={b} stopOpacity=".38" /></linearGradient>
        <radialGradient id={`${id}sc`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#e5e7eb" stopOpacity=".9" /><stop offset=".6" stopColor="#6b7280" stopOpacity=".75" /><stop offset="1" stopColor="#111827" /></radialGradient>
      </defs>
      <rect width="480" height="300" fill="#0b0d22" />
      <rect width="480" height="300" fill={`url(#${id}bg)`} />
      <rect width="480" height="30" fill="#fff" fillOpacity=".06" />
      <circle cx="16" cy="15" r="4.5" fill="#ff5f57" /><circle cx="32" cy="15" r="4.5" fill="#febc2e" /><circle cx="48" cy="15" r="4.5" fill="#28c840" />
      <rect x="150" y="7" width="180" height="16" rx="8" fill="#fff" fillOpacity=".08" />

      {kind === "portal" && (
        <>
          <SideBar fg={fg} />
          <rect x="124" y="44" width="342" height="40" rx="12" fill="#fff" fillOpacity=".06" />
          <circle cx="146" cy="64" r="12" fill={fg} />
          <rect x="166" y="56" width="90" height="8" rx="4" fill="#fff" fillOpacity=".5" />
          <rect x="166" y="68" width="56" height="6" rx="3" fill="#fff" fillOpacity=".2" />
          <rect x="400" y="56" width="52" height="16" rx="8" fill={fg} />
          {[0, 1, 2].map((i) => {
            const cx = 178 + i * 116;
            return (
              <g key={i}>
                <rect x={cx - 52} y="98" width="104" height="92" rx="14" fill="#fff" fillOpacity=".06" />
                <circle cx={cx} cy="144" r="30" fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="8" />
                <circle cx={cx} cy="144" r="30" fill="none" stroke={fg} strokeWidth="8" strokeLinecap="round" className="art-ring"
                  style={{ "--o": [40, 70, 95][i], animationDelay: `${i * 0.25}s` }} transform={`rotate(-90 ${cx} 144)`} />
              </g>
            );
          })}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="124" y={204 + i * 28} width="342" height="22" rx="8" fill="#fff" fillOpacity=".06" />
              <circle cx="138" cy={215 + i * 28} r="5" fill={fg} />
              <rect x="152" y={211 + i * 28} width={120 + i * 40} height="8" rx="4" fill="#fff" fillOpacity=".25" />
            </g>
          ))}
        </>
      )}

      {kind === "ess" && (
        <>
          <SideBar fg={fg} />
          {["Employee", "Teacher", "Admin"].map((t, i) => (
            <g key={t}>
              <rect x={124 + i * 92} y="44" width="84" height="24" rx="12" fill={i === 1 ? fg : "#fff"} fillOpacity={i === 1 ? 1 : 0.08} />
              <Txt x={166 + i * 92} y="60" textAnchor="middle" fontSize="11" fontWeight="600" fillOpacity={i === 1 ? 1 : 0.7}>{t}</Txt>
            </g>
          ))}
          <rect x="124" y="80" width="342" height="204" rx="14" fill="#fff" fillOpacity=".06" />
          {[0, 1, 2].map((i) => <line key={i} x1="136" x2="456" y1={118 + i * 50} y2={118 + i * 50} stroke="#fff" strokeOpacity=".08" />)}
          {[52, 88, 64, 112, 78, 130, 98, 120].map((h, i) => (
            <rect key={i} className="art-bar" x={140 + i * 40} y={268 - h} width="24" height={h} rx="6" fill={fg} fillOpacity={0.55 + (i % 3) * 0.15} style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </>
      )}

      {kind === "neural" && (
        <>
          <rect x="24" y="64" width="128" height="52" rx="12" fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".18" />
          <Txt x="88" y="86" textAnchor="middle" fontSize="13" fontWeight="700">DistilBERT</Txt>
          <Txt x="88" y="103" textAnchor="middle" fontSize="10" fillOpacity=".6">text</Txt>
          <rect x="24" y="184" width="128" height="52" rx="12" fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".18" />
          <Txt x="88" y="206" textAnchor="middle" fontSize="13" fontWeight="700">MobileViT v2</Txt>
          <Txt x="88" y="223" textAnchor="middle" fontSize="10" fillOpacity=".6">image</Txt>
          <path d="M152 90 C192 90 192 150 196 150" stroke={fg} strokeWidth="2" fill="none" strokeDasharray="6 6" className="art-flow" />
          <path d="M152 210 C192 210 192 150 196 150" stroke={fg} strokeWidth="2" fill="none" strokeDasharray="6 6" className="art-flow" />
          <circle cx="232" cy="150" r="36" fill={fg} className="art-pulse-soft" />
          <Txt x="232" y="148" textAnchor="middle" fontSize="12" fontWeight="700">Early</Txt>
          <Txt x="232" y="163" textAnchor="middle" fontSize="12" fontWeight="700">Fusion</Txt>
          {(() => {
            const cols = [[330, 4], [380, 3], [430, 2]];
            const pts = cols.map(([x, c]) => Array.from({ length: c }, (_, k) => [x, 150 + (k - (c - 1) / 2) * 34]));
            const lines = [];
            pts[0].forEach(([x, y], k) => lines.push(<line key={`f${k}`} x1="268" y1="150" x2={x} y2={y} stroke="#fff" strokeOpacity=".22" />));
            for (let c = 0; c < 2; c++) pts[c].forEach(([x1, y1], i) => pts[c + 1].forEach(([x2, y2], j) => lines.push(<line key={`${c}${i}${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity=".18" />)));
            return (
              <g>
                {lines}
                {pts.flat().map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill={i >= 7 ? fg : "#fff"} fillOpacity={i >= 7 ? 1 : 0.85} className="art-node" style={{ animationDelay: `${i * 0.15}s` }} />)}
                <Txt x="380" y="240" textAnchor="middle" fontSize="12" fontWeight="700">MLP</Txt>
                <Txt x="380" y="256" textAnchor="middle" fontSize="10" fillOpacity=".6">final classification</Txt>
              </g>
            );
          })()}
        </>
      )}

      {kind === "scan" && (
        <>
          <ellipse cx="150" cy="170" rx="100" ry="112" fill={`url(#${id}sc)`} />
          <ellipse cx="128" cy="165" rx="18" ry="34" fill="#0b0d22" fillOpacity=".55" />
          <ellipse cx="172" cy="165" rx="18" ry="34" fill="#0b0d22" fillOpacity=".55" />
          <path d="M190 140 q14-18 32-6 q16 12 4 30 q-14 16 -32 6 q-14-10 -4-30z" fill="#fff" fillOpacity=".92" />
          <path d="M186 138 q16-22 38-8 q20 14 4 36 q-16 20 -38 8 q-18-12 -4-36z" fill={b} fillOpacity=".5" stroke={a} strokeWidth="2" className="art-pulse" />
          <rect x="172" y="112" width="68" height="70" rx="4" fill="none" stroke={a} strokeWidth="2" strokeDasharray="5 4" className="art-dash" />
          <Txt x="172" y="106" fontSize="10" fontWeight="700" fill={a}>YOLOv11</Txt>
          {[["Stage 1", "YOLOv11 detects the tumor", 64], ["Stage 2", "SAM2 segments the region", 150]].map(([t, d, y], i) => (
            <g key={t}>
              <rect x="290" y={y} width="176" height="70" rx="14" fill="#fff" fillOpacity=".07" stroke="#fff" strokeOpacity=".14" />
              <circle cx="314" cy={y + 35} r="13" fill={fg} />
              <Txt x="314" y={y + 40} textAnchor="middle" fontSize="13" fontWeight="800">{i + 1}</Txt>
              <Txt x="336" y={y + 30} fontSize="12" fontWeight="700">{t}</Txt>
              <Txt x="336" y={y + 48} fontSize="10.5" fillOpacity=".7">{d}</Txt>
            </g>
          ))}
          <path d="M378 134 v12" stroke={fg} strokeWidth="2" strokeDasharray="3 3" className="art-flow" />
        </>
      )}
    </svg>
  );
}

const POS = [[20, 18], [58, 12], [82, 36], [78, 70], [52, 88], [20, 76], [14, 46]];
function StackArt({ p }) {
  return (
    <div className="stack-art" style={{ "--a": p.g[0], "--b": p.g[1] }}>
      <span className="stack-ring r1" /><span className="stack-ring r2" />
      <div className="stack-core"><Icon name={p.icon} size={34} color="#fff" /></div>
      {p.tech.slice(0, 7).map((t, i) => (
        <span key={t} className="stack-pill" style={{ left: `${POS[i][0]}%`, top: `${POS[i][1]}%`, animationDelay: `${-i * 0.8}s` }}>{t}</span>
      ))}
    </div>
  );
}

const slideV = {
  enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 1.06 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d) => ({ x: d > 0 ? "-35%" : "35%", opacity: 0, scale: 0.96 }),
};

/* image / art carousel: crossfade-slide, drag to swipe, arrows, dots, autoplay */
function MediaCarousel({ p, auto = true }) {
  const shots = useValidImages(p.shots || []);
  const slides = [...shots.map((src) => ({ t: "img", src })), { t: "ui" }, { t: "stack" }];
  const n = slides.length;
  const [[page, dir], setPage] = useState([0, 1]);
  const [hover, setHover] = useState(false);
  const i = ((page % n) + n) % n;
  const go = (d) => setPage(([cur]) => [cur + d, d]);

  useEffect(() => { setPage([0, 1]); }, [p.id]);
  useEffect(() => {
    if (!auto || hover || reduced()) return;
    const id = setInterval(() => go(1), 4200);
    return () => clearInterval(id);
  }, [auto, hover, n, page]);

  const s = slides[i];
  return (
    <div className="media" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <AnimatePresence initial={false} custom={dir}>
        <motion.div key={`${p.id}-${page}`} className="media-slide" custom={dir} variants={slideV} initial="enter" animate="center" exit="exit"
          transition={{ x: { type: "spring", stiffness: 260, damping: 30 }, opacity: { duration: 0.35 }, scale: { duration: 0.5 } }}
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
          onDragEnd={(_, { offset, velocity }) => {
            if (offset.x < -60 || velocity.x < -400) go(1);
            else if (offset.x > 60 || velocity.x > 400) go(-1);
          }}>
          {s.t === "img" && <img className="shot" src={s.src} alt={`${p.title} screenshot`} draggable="false" />}
          {s.t === "ui" && <Art kind={p.kind} g={p.g} />}
          {s.t === "stack" && <StackArt p={p} />}
        </motion.div>
      </AnimatePresence>
      <div className="media-shade" />
      <button className="media-arrow left glass" aria-label="Previous image" onClick={() => go(-1)}><Icon name="arrowLeft" size={16} /></button>
      <button className="media-arrow right glass" aria-label="Next image" onClick={() => go(1)}><Icon name="arrowRight" size={16} /></button>
      <div className="media-dots">
        {slides.map((_, k) => (
          <button key={k} aria-label={`Image ${k + 1}`} className={k === i ? "on" : ""} onClick={() => setPage([page + (k - i), k > i ? 1 : -1])} />
        ))}
      </div>
      <span className="media-count glass">{i + 1} / {n}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════ */
function Nav({ loading, theme, setTheme }) {
  const active = useActiveSection(NAV);
  const [open, setOpen] = useState(false);
  const delay = loading ? 2.6 : 0;
  return (
    <motion.nav className="nav glass" initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <a href="#top" className="logo"><span className="logo-mark">QA</span><span className="logo-dot" /></a>
      <div className="nav-links">
        {NAV.map((s) => (
          <a key={s} href={`#${s}`} className={`nav-link ${active === s ? "on" : ""}`}>
            {active === s && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span>{s}</span>
          </a>
        ))}
      </div>
      <div className="nav-actions">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button className="theme-toggle glass menu-btn" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}><Icon name={open ? "x" : "menu"} size={18} /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu glass" initial={{ opacity: 0, y: -12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.96 }}>
            {NAV.map((s, i) => (
              <motion.a key={s} href={`#${s}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>{s}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════════ */
function Hero() {
  const name = "Qadeer Ahmed";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const tx = useMotionValue(0), ty = useMotionValue(0);
  const rX = useSpring(useTransform(ty, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 16 });
  const rY = useSpring(useTransform(tx, [-0.5, 0.5], [-11, 11]), { stiffness: 140, damping: 16 });
  const tiltMove = (e) => {
    if (reduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    tx.set((e.clientX - r.left) / r.width - 0.5); ty.set((e.clientY - r.top) / r.height - 0.5);
  };
  const tiltLeave = () => { tx.set(0); ty.set(0); };

  const chips = [
    { t: "React + TS", g: GRADS[0], cls: "c1" },
    { t: "Node + Express", g: GRADS[3], cls: "c2" },
    { t: "AI / ML", g: GRADS[1], cls: "c3" },
  ];

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-l" style={{ y: parallaxY, opacity }}>
        <motion.p className="hello glass" initial={{ opacity: 0, x: -30, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ delay: 2.4, duration: 0.7 }}>
          <span className="hello-dot" /> Open to Software Engineering roles
        </motion.p>
        <h1 aria-label={name}>
          {name.split("").map((c, i) => (
            <motion.span key={i} className="ch" initial={{ y: "120%", rotate: 12, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{ delay: 2.5 + i * 0.04, type: "spring", stiffness: 100, damping: 12 }} whileHover={{ y: -14, scale: 1.1 }}>
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
        </h1>
        <motion.p className="role" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1, duration: 0.6 }}><Typer /></motion.p>
        <motion.p className="sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.25, duration: 0.6 }}>
          I build enterprise portals, AI/ML models, and full-stack apps. Based in Karachi, looking for Software Engineering and Full-Stack roles.
        </motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.4, duration: 0.6 }}>
          <Mag><a className="btn primary" href="#contact">Hire me <Icon name="arrowRight" size={16} /></a></Mag>
          <Mag><a className="btn glass" href={L.resume} download><Icon name="download" size={16} /> Download resume</a></Mag>
        </motion.div>
        <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }}>
          <span><Icon name="location" size={14} /> {L.location}</span>
          <span><Icon name="mail" size={14} /> <a href={`mailto:${L.email}`}>{L.email}</a></span>
        </motion.div>
      </motion.div>

      <motion.div className="hero-photo-col" style={{ y: photoY }} onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
        <div className="photo-halo" aria-hidden="true" />
        <motion.div className="photo-glass glass" style={{ rotateX: rX, rotateY: rY, transformPerspective: 1000 }}
          initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 2.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <img src={L.photo} alt="Qadeer Ahmed" className="photo" />
          {chips.map((ch, i) => (
            <motion.span key={ch.t} className={`float-chip glass ${ch.cls}`} style={{ "--c": ch.g[0], "--c2": ch.g[1] }}
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{ opacity: { delay: 3.2 + i * 0.15 }, scale: { delay: 3.2 + i * 0.15, type: "spring" }, y: { delay: i * 0.6, duration: 4 + i, repeat: Infinity, ease: "easeInOut" } }}>
              <i /> {ch.t}
            </motion.span>
          ))}
        </motion.div>
        <motion.div className="photo-caption glass" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.3, duration: 0.7 }}>
          <div><strong>Qadeer Ahmed</strong><span>Software Engineer · Karachi</span></div>
          <span className="status"><span className="info-dot" /> Available</span>
        </motion.div>
      </motion.div>

      <Terminal />
    </section>
  );
}

function Marquee() {
  const row = (rev) => (
    <div className={`mq ${rev ? "rev" : ""}`}>
      {[...MARQUEE, ...MARQUEE].map((s, i) => <span key={i} className="glass" style={{ "--c": GRADS[i % GRADS.length][0], "--c2": GRADS[i % GRADS.length][1] }}>{s}</span>)}
    </div>
  );
  return <div className="marquee">{row(false)}{row(true)}</div>;
}

function About() {
  return (
    <section id="about" className="sec">
      <Title kicker="About me">Building software that solves real problems.</Title>
      <div className="about">
        <Reveal x={-50} y={0}>
          <GlassCard className="about-card" tilt={3} g={GRADS[1]}>
            <p>I'm a <strong>Computer Science graduate</strong> from IQRA University, Karachi. I spent <strong>6 months as a Junior Developer at Learn Academy</strong> (Apr – Oct 2026), building and maintaining enterprise systems (Student Portals, LMS, ERPNext, ESS and Teacher Portals) with <strong>React.js</strong>, <strong>TypeScript</strong> and <strong>JavaScript</strong>, plus <strong>Node.js/Express</strong> REST APIs.</p>
            <p>Outside work, I train <strong>AI/ML models</strong> for real-world problems: multimodal suicide risk detection with Transformers and CNNs, and brain tumor segmentation with YOLOv11 + SAM2.</p>
            <p>I like understanding how a complete system works, from the UI and application logic to APIs, backend workflows, data and day-to-day operations.</p>
          </GlassCard>
        </Reveal>
        <div className="stats">
          {STATS.map((s, i) => (
            <motion.div key={s.t} initial={{ opacity: 0, y: 40, scale: 0.85 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, type: "spring", damping: 14 }} whileHover={{ y: -6 }}>
              <GlassCard className="stat-card" g={s.g} tilt={10}>
                <div className="icon-tile" style={iconTile(s.g)}><Icon name={s.icon} size={20} color="#fff" /></div>
                <strong className="stat-num" style={{ backgroundImage: `linear-gradient(135deg, ${s.g[0]}, ${s.g[1]})` }}><Count n={s.n} s={s.s} d={s.d} /></strong>
                <span className="stat-label">{s.t}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chips({ list, base = 0.3 }) {
  return (
    <div className="chips">
      {list.map((t, i) => (
        <motion.span key={t} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ delay: base + i * 0.04, type: "spring", stiffness: 250 }} whileHover={{ y: -3 }}>{t}</motion.span>
      ))}
    </div>
  );
}

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <section id="experience" className="sec">
      <Title kicker="Experience">Where I've been building.</Title>
      <div className="timeline" ref={ref}>
        <motion.div className="tl-line" style={{ scaleY: h }} />
        <motion.div className="tl-item" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, type: "spring", damping: 15 }}>
          <motion.span className="tl-dot" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring", stiffness: 300 }} />
          <GlassCard className="tl-card" tilt={3} g={GRADS[0]}>
            <div className="tl-head"><h3>Junior Developer</h3><span className="tl-company">Learn Academy</span></div>
            <span className="muted">Apr 2026 – Oct 2026 · 6 months · On-site · Karachi, Pakistan</span>
            <p className="tl-desc">Developed and maintained enterprise systems (Student Portals, LMS, ERPNext, ESS, Teacher Portals) using React.js, TypeScript and JavaScript, supporting ERPNext (Frappe Framework) backend workflows.</p>
            <ul>
              {WORK.map((w, i) => (
                <motion.li key={w} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.06 }}>{w}</motion.li>
              ))}
            </ul>
            <Chips list={["React.js", "TypeScript", "JavaScript", "Node.js", "Express", "Python", "ERPNext", "Frappe", "REST APIs", "Postman", "Git", "Tailwind", "Framer Motion"]} base={0.4} />
          </GlassCard>
        </motion.div>
        <motion.div className="tl-item" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, type: "spring", damping: 15 }}>
          <span className="tl-dot dim" />
          <GlassCard className="tl-card" tilt={3} g={GRADS[1]}>
            <div className="tl-head"><h3>BS Computer Science</h3><span className="tl-company">IQRA University</span></div>
            <span className="muted">2021 – 2025 · CGPA 3.12 / 4.00 · Karachi</span>
            <p className="tl-desc">Focus areas: Software Engineering, Full-Stack Development, AI/ML. Final Year Project: <strong>Multimodal Suicide Risk Detection</strong> (Transformers + CNNs).</p>
            <Chips list={["Data Structures", "Algorithms", "DBMS", "Web Development", "Machine Learning", "Deep Learning"]} />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="sec">
      <Title kicker="Skills">Technologies I work with.</Title>
      <Orbit />
      <div className="skills-grid">
        {Object.entries(SKILLS).map(([name, group], gi) => (
          <motion.div key={name} initial={{ opacity: 0, y: 60, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: (gi % 3) * 0.1, duration: 0.7, type: "spring", damping: 14 }}>
            <GlassCard className="skill-card" g={group.g}>
              <div className="skill-banner" style={{ background: `linear-gradient(135deg, ${group.g[0]}, ${group.g[1]})` }}>
                <span className="sb-orb o1" /><span className="sb-orb o2" /><span className="sb-orb o3" />
                <motion.div className="sb-icon" initial={{ rotate: -90, scale: 0 }} whileInView={{ rotate: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}>
                  <Icon name={group.icon} size={24} color="#fff" />
                </motion.div>
                <div className="sb-text"><h3>{name}</h3><span>{group.items.length} skills</span></div>
              </div>
              <div className="skill-chips">
                {group.items.map((s, i) => (
                  <motion.span key={s} className="skill-chip" initial={{ opacity: 0, y: 16, scale: 0.7 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 250, damping: 16 }} whileHover={{ y: -4, scale: 1.07, rotate: -2 }}>{s}</motion.span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* Projects: featured showcase (picture carousel + details) with project tabs and autoplay progress */
function Projects() {
  const [cur, setCur] = useState(0);
  const [open, setOpen] = useState(null);
  const p = PROJECTS[cur];
  const m = PROJECTS.find((x) => x.id === open);
  const next = () => setCur((c) => (c + 1) % PROJECTS.length);

  useEffect(() => {
    if (!open) return;
    const key = (e) => e.key === "Escape" && setOpen(null);
    document.body.style.overflow = "hidden";
    addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", key); };
  }, [open]);

  return (
    <section id="projects" className="sec">
      <Title kicker="Projects">Things I've shipped.</Title>
      <Reveal y={50}>
        <div className="showcase-wrap">
          <GlassCard className="showcase" g={p.g} tilt={2}>
            <div className="show-media"><MediaCarousel p={p} /></div>
            <div className="show-info">
              <AnimatePresence mode="wait">
                <motion.div key={p.id} initial={{ opacity: 0, x: 36, filter: "blur(6px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -36, filter: "blur(6px)" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="card-top">
                    <div className="icon-tile lg" style={iconTile(p.g)}><Icon name={p.icon} size={22} color="#fff" /></div>
                    <span className="muted">{p.tag}</span>
                  </div>
                  <h3 className="show-title">{p.title}</h3>
                  <p className="show-short">{p.short}</p>
                  <div className="card-highlights">{p.highlights.map((h) => <span key={h} className="hl">{h}</span>)}</div>
                  <div className="chips">{p.tech.slice(0, 6).map((t) => <span key={t}>{t}</span>)}</div>
                  <div className="show-actions">
                    <button className="btn primary" onClick={() => setOpen(p.id)}>View details <Icon name="arrowRight" size={16} /></button>
                    <a className="btn glass" href={p.repo} target="_blank" rel="noreferrer"><Icon name="github" size={16} /> Code</a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </GlassCard>

          <div className="show-tabs">
            {PROJECTS.map((x, i) => (
              <button key={x.id} className={`tab ${i === cur ? "on" : ""}`} onClick={() => setCur(i)} style={{ "--c": x.g[0], "--c2": x.g[1] }}>
                {i === cur && <motion.span layoutId="tab-bg" className="tab-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="tab-ico" style={iconTile(x.g)}><Icon name={x.icon} size={16} color="#fff" /></span>
                <span className="tab-t">{x.title}</span>
                {i === cur && !open && !reduced() && <i key={cur} className="tab-progress" onAnimationEnd={next} />}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="projects-cta">
        <Mag><a className="btn glass" href={L.github} target="_blank" rel="noreferrer"><Icon name="github" size={16} /> See all code on GitHub</a></Mag>
      </div>

      <AnimatePresence>
        {m && (
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div className="modal glass" role="dialog" aria-modal="true" aria-label={m.title} style={{ "--c": m.g[0], "--c2": m.g[1] }}
              initial={{ opacity: 0, scale: 0.85, y: 40, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 240 }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-accent" />
              <div className="modal-top">
                <div className="icon-tile lg" style={iconTile(m.g)}><Icon name={m.icon} size={22} color="#fff" /></div>
                <span className="muted">{m.tag}</span>
                <button className="round glass modal-x" aria-label="Close" onClick={() => setOpen(null)}><Icon name="x" size={16} /></button>
              </div>
              <div className="modal-media"><MediaCarousel p={m} auto={false} /></div>
              <h3>{m.title}</h3>
              <p className="modal-desc">{m.long}</p>
              <div className="chips">{m.tech.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="modal-actions">
                <a className="btn primary" href={m.repo} target="_blank" rel="noreferrer">View on GitHub <Icon name="arrowUpRight" size={16} /></a>
                <button className="btn glass" onClick={() => setOpen(null)}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Repos() {
  return (
    <section id="repos" className="sec">
      <Title kicker="GitHub">Open source and repos.</Title>
      <div className="repos">
        {REPOS.map((r, i) => {
          const g = GRADS[(i + 2) % GRADS.length];
          return (
            <motion.a key={r.name} href={r.url} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.92 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6, type: "spring", damping: 14 }}>
              <GlassCard className="repo" g={g} tilt={7}>
                <div className="repo-art" style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }}>
                  <span className="repo-glyph">{"{ }"}</span>
                  <span className="repo-lang-big">{r.lang}</span>
                  <div className="repo-art-icon"><Icon name="github" size={20} color="#fff" /></div>
                </div>
                <div className="repo-body">
                  <div className="repo-head"><strong>{r.name}</strong><span className="repo-arrow"><Icon name="arrowUpRight" size={16} /></span></div>
                  <p>{r.desc}</p>
                  <div className="repo-lang"><span className="lang-dot" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }} />{r.lang}</div>
                </div>
              </GlassCard>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

function Approach() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 70%"] });
  const w = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return (
    <section id="approach" className="sec">
      <Title kicker="Process">How I approach engineering.</Title>
      <div className="steps" ref={ref}>
        <div className="steps-rail"><motion.i style={{ scaleY: w }} /></div>
        {APPROACH.map((step, i) => {
          const g = GRADS[i % GRADS.length];
          return (
            <motion.div key={step.label} className={`step ${i % 2 ? "right" : ""}`} initial={{ opacity: 0, x: i % 2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, type: "spring", damping: 15 }}>
              <GlassCard className="approach-step" g={g} tilt={5}>
                <motion.span className="step-num" style={iconTile(g)} initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}>{i + 1}</motion.span>
                <div className="step-body"><strong>{step.label}</strong><span>{step.desc}</span></div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Interests() {
  return (
    <section id="interests" className="sec">
      <Title kicker="Interests">What excites me.</Title>
      <div className="interests">
        {INTERESTS.map((it, i) => {
          const g = GRADS[i % GRADS.length];
          return (
            <motion.div key={it.label} initial={{ opacity: 0, scale: 0.5, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 200, damping: 12 }} whileHover={{ y: -6, scale: 1.04 }}>
              <GlassCard className="interest" g={g} tilt={9}>
                <motion.div className="icon-tile" style={iconTile(g)} whileHover={{ rotate: -12, scale: 1.15 }}><Icon name={it.icon} size={18} color="#fff" /></motion.div>
                <span>{it.label}</span>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Confetti() {
  const bits = Array.from({ length: 18 }, (_, i) => ({ a: (i / 18) * Math.PI * 2, d: 70 + Math.random() * 80, c: GRADS[i % GRADS.length][i % 2], r: Math.random() * 360 }));
  return (
    <span className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.i key={i} style={{ background: b.c }} initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{ x: Math.cos(b.a) * b.d, y: Math.sin(b.a) * b.d, opacity: 0, scale: 0.4, rotate: b.r }} transition={{ duration: 1.1, ease: "easeOut" }} />
      ))}
    </span>
  );
}

function Contact() {
  const empty = { name: "", email: "", subject: "", message: "", website: "" };
  const [f, setF] = useState(empty), [st, setSt] = useState("idle"), [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setSt("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Server did not respond");
      setSt("sent"); setF(empty);
    } catch (x) { setErr(x.message); setSt("error"); }
  };
  const field = (label, k, props = {}, i = 0, Tag = "input") => (
    <motion.label initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
      {label}<Tag required value={f[k]} onChange={set(k)} {...props} />
    </motion.label>
  );
  const info = [["mail", <a href={`mailto:${L.email}`}>{L.email}</a>], ["location", L.location]];
  return (
    <section id="contact" className="sec contact">
      <div>
        <Title kicker="Contact">Let's work together.</Title>
        <Reveal><p className="muted lead">Send a message and it lands straight in my inbox. I usually reply within a day.</p></Reveal>
        <div className="contact-info">
          {info.map(([ic, val], i) => (
            <motion.p key={ic} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
              <span className="glass"><Icon name={ic} size={16} /></span> {val}
            </motion.p>
          ))}
        </div>
        <Reveal delay={0.5} y={20} className="contact-socials">
          <a className="glass" href={L.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={16} /> LinkedIn</a>
          <a className="glass" href={L.github} target="_blank" rel="noreferrer"><Icon name="github" size={16} /> GitHub</a>
        </Reveal>
      </div>
      <Reveal x={50} y={0}>
        <GlassCard className="form-card" tilt={2} g={GRADS[0]}>
          <form onSubmit={submit}>
            <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={f.website} onChange={set("website")} />
            {field("Name", "name", { minLength: 2, placeholder: "Your name" }, 0)}
            {field("Email", "email", { type: "email", placeholder: "your@email.com" }, 1)}
            {field("Subject", "subject", { minLength: 3, placeholder: "What's this about?" }, 2)}
            {field("Message", "message", { minLength: 10, rows: 5, placeholder: "Your message..." }, 3, "textarea")}
            <div className="send-row">
              <motion.button className="btn primary" disabled={st === "sending"} whileTap={{ scale: 0.97 }}>
                {st === "sending" ? "Sending..." : <>Send message <Icon name="arrowRight" size={16} /></>}
              </motion.button>
              {st === "sent" && <Confetti />}
            </div>
            <div aria-live="polite">
              <AnimatePresence>
                {st === "sent" && <motion.p className="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}><Icon name="check" size={16} /> Message sent. I'll reply soon.</motion.p>}
                {st === "error" && <motion.p className="bad" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Icon name="x" size={16} /> {err}. Email me at {L.email}.</motion.p>}
              </AnimatePresence>
            </div>
          </form>
        </GlassCard>
      </Reveal>
    </section>
  );
}

function Footer() {
  const col = (title, links, d) => (
    <Reveal delay={d} y={30} className="footer-col">
      <h4>{title}</h4>
      <ul>{links.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul>
    </Reveal>
  );
  return (
    <footer>
      <div className="footer-glass glass">
        <div className="footer-grid">
          <Reveal y={30} className="footer-col footer-brand">
            <a href="#top" className="logo"><span className="logo-mark">QA</span><span className="logo-dot" /></a>
            <p className="footer-tagline">Full-Stack Software Engineer building enterprise portals, AI/ML models, and scalable web apps.</p>
            <div className="footer-social">
              <a className="glass" href={L.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a>
              <a className="glass" href={L.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
              <a className="glass" href={`mailto:${L.email}`} aria-label="Email"><Icon name="mail" size={18} /></a>
            </div>
          </Reveal>
          {col("Navigate", [["About", "#about"], ["Experience", "#experience"], ["Skills", "#skills"], ["Projects", "#projects"]], 0.1)}
          {col("Explore", [["GitHub repos", "#repos"], ["Process", "#approach"], ["Interests", "#interests"], ["Contact", "#contact"]], 0.2)}
          {col("Get in touch", [[L.email, `mailto:${L.email}`], [L.location, "#contact"]], 0.3)}
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Qadeer Ahmed. All rights reserved.</p>
          <p className="footer-built">Built with <span className="heart"><Icon name="heart" size={12} /></span> using React, Vite & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}

function ToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setShow(v > 700)), [scrollY]);
  return (
    <AnimatePresence>
      {show && (
        <motion.a href="#top" className="to-top round glass" aria-label="Back to top" initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} whileHover={{ y: -4 }}>
          <Icon name="arrowUp" size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const { theme, setTheme } = useTheme();

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <Aurora />
      <Particles />
      <Cursor />
      <motion.div className="progress" style={{ scaleX: bar }} />
      <Nav loading={loading} theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Repos />
        <Approach />
        <Interests />
        <Contact />
      </main>
      <Footer />
      <ToTop />
    </>
  );
}
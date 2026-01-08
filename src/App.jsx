import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { translations } from "./i18n";

/** ---------- Content (from CV) ---------- */
const CONTENT = {
  name: "Hanaa Alhoushan",
  location: "Damascus, Syria",
  email: "hanaasalem860@gmail.com",
  phone: "+963943646509",
  linkedin: "linkedin.com/in/hanaa-alhoshan-14a43024b/",
  summary: {
    en: "Artificial Intelligence Engineer with hands-on experience in Machine Learning, Deep Learning, NLP, and Large Language Models (LLMs). Skilled in Python and AI integration, with additional backend experience for deploying intelligent solutions.",
    ar: "مهندسة ذكاء اصطناعي ذات خبرة عملية في التعلم الآلي، التعلم العميق، معالجة اللغة الطبيعية، ونماذج اللغة الكبيرة. ماهرة بـ Python وتكامل الذكاء الاصطناعي، ولدي خبرة في تطوير الحلول الخلفية.",
  },
  roles: ["AI Engineer", "Machine Learning Engineer", "Data Analyst", "Laravel Developer"],

  // experience: [
  //   {
  //     title: "Teaching Assistant – Neural Networks",
  //     org: "Damascus University",
  //     time: "2025 – Present",
  //     bullets: [
  //       "Assist in teaching Neural Networks for undergraduates in the AI program.",
  //       "Support students across ANNs, activation functions, backpropagation, loss, and training.",
  //       "Contribute to practical sessions and academic support.",
  //     ],
  //   },
  //   {
  //     title: "AI Developer Trainee",
  //     org: "Alrifai Consulting Group (Istanbul, Turkey)",
  //     time: "Jul 2024 – 2025",
  //     bullets: [
  //       "Worked on LLMs, NLP, and ML/DL models.",
  //       "Built prototypes for LLM-based chatbots to enhance customer interaction.",
  //       "Implemented deep learning for text classification & sentiment analysis.",
  //     ],
  //   },
  //   {
  //     title: "Web Designer (Freelance, WordPress)",
  //     org: "Syria Scope Travel",
  //     time: "Oct 2024 – Present",
  //     bullets: [
  //       "Customized themes/plugins for responsive website.",
  //       "Optimized performance & mobile responsiveness.",
  //     ],
  //   },
  //   {
  //     title: "Laravel Developer (Freelance)",
  //     org: "Various",
  //     time: "Feb 2025",
  //     bullets: [
  //       "Built barbershop management system (auth, roles, stock/service mgmt).",
  //       "Designed MySQL schema & RESTful APIs.",
  //       "Created Sawalfji: educational quiz app with points & challenges.",
  //     ],
  //   },
  // ],

  projects: [
    {
      name: "Motion to Animation System (Graduation Project)",
      year: "2024",
      desc:
        "AI system converting motion data into 3D human animations for short animated films; combined ML with graphics/animation pipelines.",
      tags: ["ML", "3D", "Pipelines"],
      type: "AI", 
      images: [ 
         "/projects/Motion to Animation System/1.jpg",
      "/projects/Motion to Animation System/2.jpg",
      "/projects/Motion to Animation System/3.jpg",
    ], 

    },
    {
      name: "Intelligent Spelling Correction System",
      year: "2023",
      desc:
        "Contextual NLP/DL spelling correction using sentence meaning rather than isolated words.",
      tags: ["NLP", "Deep Learning"],
      type: "AI", 
      images: [], 

    },
    {
      name: "Image-Based Puzzle Solver",
      year: "2023",
      desc:
        "Computer vision system to analyze images and solve visual puzzles using image processing and pattern recognition.",
      tags: ["Computer Vision"],
      type: "AI", 
      images: [], // ما عنده واجهات → ما رح يظهر preview

    },
    {
      name: "Healthcare Chatbot System",
      year: "2022–2023",
      desc:
        "NLP-based chatbot integrated with a backend system to manage user interactions and responses.",
      tags: ["LLMs", "NLP", "Backend"],
      type: "AI", 
      images: [
        "/projects/Healthcare Chatbot System/n.jpg",
        "/projects/Healthcare Chatbot System/n1.jpg",
        "/projects/Healthcare Chatbot System/n2.jpg",
        "/projects/Healthcare Chatbot System/n3.jpg",
        "/projects/Healthcare Chatbot System/n4.jpg",
        "/projects/Healthcare Chatbot System/n5.jpg",


      ], 

    },
    {
      name: "Taxi Driver Management System",
      year: "2021–2022",
      desc:
        "Mobile system with Flutter frontend and Laravel backend, connected via APIs.",
      tags: ["Flutter", "Laravel", "APIs"],
      type: "WEB",
      images: [
        "/projects/Taxi Driver Management System/1.jpg",
        "/projects/Taxi Driver Management System/2.jpg",
        "/projects/Taxi Driver Management System/3.jpg",
        "/projects/Taxi Driver Management System/4.jpg",
        "/projects/Taxi Driver Management System/5.jpg",
        "/projects/Taxi Driver Management System/6.jpg",
        "/projects/Taxi Driver Management System/7.jpg",
        "/projects/Taxi Driver Management System/8.jpg",
        "/projects/Taxi Driver Management System/9.jpg",
        "/projects/Taxi Driver Management System/10.jpg",
        "/projects/Taxi Driver Management System/11.jpg",
        "/projects/Taxi Driver Management System/12.jpg",
        "/projects/Taxi Driver Management System/13.jpg",
        "/projects/Taxi Driver Management System/14.jpg",


      ], 

    },
    {
      name: "E-commerce Web Application",
      year: "2020–2021",
      desc:
        "Laravel e-commerce app with backend logic and database design.",
      tags: ["Laravel", "MySQL"],
      type: "WEB",
      images: [], // ما عنده واجهات → ما رح يظهر preview

    },
  ],

  // education: [
  //   {
  //     degree: "Master’s in Artificial Intelligence (Ongoing)",
  //     place: "Damascus University",
  //     time: "2025 – Present",
  //   },
  //   {
  //     degree: "BSc Information Technology Engineering – AI Specialization",
  //     place: "Damascus University",
  //     time: "2019 – 2024",
  //   },
  // ],

  skills: [
    "Python",
    "PHP",
    "C++",
    "Java",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "LLMs",
    "Laravel",
    "React (basic)",
    "Unity",
    "MySQL",
    "Git",
    "GitHub",
    "GitLab",
    "Google Colab",
  ],
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** ---------- Typewriter (cycles roles) ---------- */
function useTypewriterCycle(items, opts = {}) {
  const {
    typeSpeed = 40,
    deleteSpeed = 28,
    pauseMs = 900,
    betweenMs = 260,
  } = opts;

  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduceMotion ? items[0] : "");
  const [phase, setPhase] = useState(reduceMotion ? "done" : "typing"); // typing | pausing | deleting | between | done

  useEffect(() => {
    if (reduceMotion) return;

    const current = items[index];
    let t;

    if (phase === "typing") {
      if (text.length < current.length) {
        t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed
        );
      } else {
        t = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed
        );
      } else {
        t = setTimeout(() => setPhase("between"), betweenMs);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), pauseMs);
    } else if (phase === "between") {
      setIndex((i) => (i + 1) % items.length);
      setPhase("typing");
    }

    return () => clearTimeout(t);
  }, [
    reduceMotion,
    items,
    index,
    phase,
    text,
    typeSpeed,
    deleteSpeed,
    pauseMs,
    betweenMs,
  ]);

  return { text, index, phase, reduceMotion };
}

/** ---------- Background (blobs + grid + parallax) ---------- */
function TechGlassBackground() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setPos({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  const shift = reduceMotion ? { x: 0, y: 0 } : { x: pos.x * 12, y: pos.y * 12 };

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 25%, black 0%, transparent 70%)",
        }}
      />

      {/* blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(45,212,191,.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(167,139,250,.25), transparent 55%)",
        }}
        animate={reduceMotion ? {} : { x: [0, 28, -10, 0], y: [0, 10, 26, 0] }}
        transition={reduceMotion ? {} : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 -right-40 h-[620px] w-[620px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(245,158,11,.20), transparent 60%), radial-gradient(circle at 70% 60%, rgba(45,212,191,.18), transparent 55%)",
        }}
        animate={reduceMotion ? {} : { x: [0, -20, 16, 0], y: [0, -10, -22, 0] }}
        transition={reduceMotion ? {} : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* parallax glow layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translate3d(${shift.x}px, ${shift.y}px, 0)`,
          background:
            "radial-gradient(circle at 50% 25%, rgba(45,212,191,.10), transparent 60%), radial-gradient(circle at 60% 70%, rgba(167,139,250,.09), transparent 55%)",
        }}
      />
    </div>
  );
}

/** ---------- Glass Card ---------- */
function GlassCard({ children, className }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "group relative rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,.04)]",
        "hover:border-white/15 hover:shadow-glow",
        "overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(45,212,191,.10), rgba(167,139,250,.06), rgba(245,158,11,.05))",
        }}
      />
      <div className="relative p-6 sm:p-7">{children}</div>
    </motion.div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
const t = translations[lang];
const [theme, setTheme] = useState("dark"); // dark | light

  const reduceMotion = useReducedMotion();
  const { text: roleText } = useTypewriterCycle(t.roles, {
    typeSpeed: 42,
    deleteSpeed: 26,
    pauseMs: 850,
    betweenMs: 220,
  });
  const [activeProject, setActiveProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    if (!activeProject) return;
  
    const interval = setInterval(() => {
      setActiveImage((prev) =>
        (prev + 1) % activeProject.images.length
      );
    }, 3000);
  
    return () => clearInterval(interval);
  }, [activeProject]);
  
  const sections = useMemo(
    () => [
      { id: "about", label: t.about },
      { id: "skills", label: t.skills },
      { id: "projects", label: t.projects },
      { id: "education", label: t.education },
      { id: "contact", label: t.contact },
    ],
    [lang]
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-white"
    dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="relative">
        <TechGlassBackground />

        {/* top nav */}
        <div className="sticky top-0 z-50 border-b border-white/5 bg-[#070A0F]/60 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,.04)]" />
              <span className="text-sm font-semibold tracking-wide">{t.name}</span>
            </div>

            <nav className="hidden gap-6 text-sm text-white/70 sm:flex">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="hover:text-white transition-colors">
                  {s.label}

                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/85 backdrop-blur-xl transition hover:border-white/15 hover:text-white hover:shadow-glow"
            >
              {t.letsTalk}
            </a>
            <button
  onClick={() => setLang(lang === "en" ? "ar" : "en")}
  className="ml-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/80 hover:text-white"
>
  {lang === "en" ? "AR" : "EN"}
</button>

          </div>
        </div>

        <main className="mx-auto max-w-6xl px-4 pb-20">
          {/* hero */}
          <section className="relative pt-14 sm:pt-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="grid gap-10"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/75 backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-300/80 shadow-[0_0_18px_rgba(45,212,191,.35)]" />
{t.openTo}                </div>

                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                  {t.name}
                </h1>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-[2px] rounded-full bg-gradient-to-b from-teal-300/70 via-violet-300/40 to-amber-300/30" />
                  <div className="min-h-[28px] text-lg text-white/85 sm:text-xl">
                    <span className="relative">
                      <span className="bg-gradient-to-r from-teal-200 via-violet-200 to-amber-200 bg-clip-text text-transparent">
                        {roleText}
                      </span>
                      {!reduceMotion && (
                        <span className="ml-1 inline-block h-[1.1em] w-[10px] translate-y-[2px] animate-pulse rounded-sm bg-white/65" />
                      )}
                    </span>
                  </div>
                </div>

                <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                {CONTENT.summary[lang]}                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/85 backdrop-blur-xl transition hover:border-white/15 hover:shadow-glow"
                    href="#projects"
                  >
                    {t.viewProjects}
                    
                  </a>
                  <a
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 backdrop-blur-xl transition hover:border-white/15 hover:text-white"
                    href={`mailto:${CONTENT.email}`}
                  >
{t.email}                  </a>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="mt-12 grid gap-5 sm:mt-16 sm:gap-6">
            {/* About */}
            <motion.div
              id="about"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassCard>
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{t.about}</h2>
                    <p className="text-white/70 leading-relaxed">
                      {t.aboutText}
                    </p>
                  </div>
                  <div className="hidden sm:block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75 backdrop-blur-xl">
                    <div className="font-medium text-white/85">{t.location}</div>
                    <div className="text-white/60">{t.openToImpact}</div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                <div className="text-sm font-medium text-white/80">
  {t.highlights}
</div>

<div className="grid gap-3 sm:grid-cols-2">
  {t.highlights.map((h, i) => (
    <div
      key={i}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70"
    >
      {h}
    </div>
  ))}
</div>

</div>

              </GlassCard>
            </motion.div>
          <motion.div
  id="experience"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.18 }}
  variants={fadeUp}
  transition={{ duration: 0.5 }}
>
  <GlassCard>
    <h2 className="text-xl font-semibold mb-6">{t.experienceTitle}</h2>

    <div className="space-y-4">
      {t.experienceList.map((e) => (
        <div
          key={e.title}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <div className="flex justify-between items-center">
            <div className="text-sm font-semibold">{e.title}</div>
            <div className="text-xs text-white/55">{e.time}</div>
          </div>

          <div className="text-sm text-white/70 mt-1">{e.org}</div>

          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {e.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-teal-300/70" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </GlassCard>
</motion.div>


            {/* Skills */}
            <motion.div
              id="skills"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassCard>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{t.skills}</h2>
                    <p className="mt-1 text-white/65">{t.skillsSubtitle}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70" />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {CONTENT.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/75 backdrop-blur-xl transition hover:border-white/15 hover:text-white hover:shadow-glow"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Projects */}
            <motion.div
              id="projects"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassCard>
                <div className="flex items-end justify-between gap-4">
                  <div>
                  <h2 className="text-xl font-semibold">{t.projects}</h2>
                    {/* <p className="mt-1 text-white/65">Minimal cards — no images, just substance.</p> */}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {CONTENT.projects.map((p) => (
  <div
    key={p.name}
    onClick={() => p.images?.length && setActiveProject(p)}
    className={cn(
      "group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition",
      p.images?.length && "cursor-pointer hover:border-white/15 hover:shadow-glow",
      p.type === "AI"
      ? "hover:shadow-[0_0_40px_rgba(167,139,250,.25)]"
      : "hover:shadow-[0_0_40px_rgba(45,212,191,.25)]"
    )}
  >
   
    {p.images?.length > 0 && (
      <img
        src={p.images[0]}
        alt={p.name}
        className="mb-4 h-40 w-full rounded-xl object-cover border border-white/10"
      />
      
    )}
    

    <div className="flex justify-between">
      <div className="text-sm font-semibold">{p.name}</div>
      <div className="text-xs text-white/55">{p.year}</div>
    </div>

    <p className="mt-3 text-sm text-white/70">{p.desc}</p>

    <div className="mt-4 flex flex-wrap gap-2">
      {p.tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70"
        >
          {t}
        </span>
      ))}
    </div>

    {p.images?.length > 0 && (
      <div className="mt-3 text-xs text-teal-300/80">
{t.clickPreview}
      </div>
    )}
  </div>
))}

                </div>
              </GlassCard>
            </motion.div>
            {activeProject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="relative w-full max-w-4xl rounded-3xl bg-[#0B0F17] p-6">
      <button
        onClick={() => {
          setActiveProject(null);
          setActiveImage(0);
        }}
        className="absolute right-4 top-4 text-white/60 hover:text-white"
      >
        ✕
      </button>

      <h3 className="mb-4 text-lg font-semibold">
        {activeProject.name}
      </h3>

      <img
  src={activeProject.images[activeImage]}
  onClick={() => setZoom(!zoom)}
  className={cn(
    "h-[420px] w-full rounded-xl border border-white/10 transition-transform duration-300 cursor-zoom-in",
    zoom ? "scale-150 cursor-zoom-out" : "object-contain"
  )}
/>

      <div className="mt-4 flex gap-3 overflow-x-auto">
        {activeProject.images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => { setActiveImage(i);   // 👈 هون
            setZoom(false);   }}
            className={cn(
              "h-20 w-32 cursor-pointer rounded-lg object-cover border",
              i === activeImage
                ? "border-teal-300"
                : "border-white/10 opacity-70 hover:opacity-100"
            )}
          />
        ))}
      </div>
    </div>
  </div>
)}

            {/* Education */}
            <motion.div
              id="education"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassCard>
                <h2 className="text-xl font-semibold">{t.education}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {t.educationList.map((e) => (
                    <div key={e.degree} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="text-sm font-semibold">{e.degree}</div>
                      <div className="mt-1 text-sm text-white/70">{e.place}</div>
                      <div className="mt-2 text-xs text-white/55">{e.time}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Contact */}
            <motion.div
              id="contact"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassCard className="mb-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{t.contact}</h2>
                    <p className="mt-1 text-white/65">
                      {t.contactSubtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/85 backdrop-blur-xl transition hover:border-white/15 hover:shadow-glow"
                      href={`mailto:${CONTENT.email}`}
                    >
                      {CONTENT.email}
                    </a>
                    <a
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 backdrop-blur-xl transition hover:border-white/15 hover:text-white"
                      href={`https://${CONTENT.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/70">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <div>
                      <span className="text-white/55">{t.phone}</span>
                      <span className="text-white/85">{CONTENT.phone}</span>
                    </div>
                    <div>
                      <span className="text-white/55">{t.location}</span>
                      <span className="text-white/85">{CONTENT.location}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
            <a
  className="
    relative flex items-center gap-2 rounded-2xl border border-white/20 
    bg-white/5 px-5 py-2 text-sm font-medium text-amber-300 backdrop-blur-md 
    overflow-hidden group
    transition-all duration-300
    hover:text-white
  "
  href="/Hanaa_Alhoushan_CV.pdf"
  download
>
  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
    📄
  </span>
  {t.downloadCV}

  {/* Glow خلف الزر */}
  <span className="
    absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/40 via-amber-300/20 to-amber-400/40
    opacity-0 transition-opacity duration-300 group-hover:opacity-100
    blur-xl
  " />
</a>


{/* 
            <div className="pb-6 text-center text-xs text-white/45">
              Built with React • Glassmorphism • Motion (reduced-motion respected)
            </div> */}
          </section>
        </main>
      </div>
    </div>
  );
}

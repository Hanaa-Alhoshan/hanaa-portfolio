import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** ---------- Content (from CV) ---------- */
const CONTENT = {
  name: "Hanaa Alhoushan",
  location: "Damascus, Syria",
  email: "hanaasalem860@gmail.com",
  phone: "+963943646509",
  linkedin: "linkedin.com/in/hanaa-alhoshan-14a43024b/",
  summary:
    "Artificial Intelligence Engineer with hands-on experience in Machine Learning, Deep Learning, NLP, and Large Language Models (LLMs). Skilled in Python and AI integration, with additional backend experience for deploying intelligent solutions.",
  roles: ["AI Engineer", "Machine Learning Engineer", "Data Analyst"],

  experience: [
    {
      title: "Teaching Assistant – Neural Networks",
      org: "Damascus University",
      time: "2025 – Present",
      bullets: [
        "Assist in teaching Neural Networks for undergraduates in the AI program.",
        "Support students across ANNs, activation functions, backpropagation, loss, and training.",
        "Contribute to practical sessions and academic support.",
      ],
    },
    {
      title: "AI Developer Trainee",
      org: "Alrifai Consulting Group (Istanbul, Turkey)",
      time: "Jul 2024 – 2025",
      bullets: [
        "Worked on LLMs, NLP, and ML/DL models.",
        "Built prototypes for LLM-based chatbots to enhance customer interaction.",
        "Implemented deep learning for text classification & sentiment analysis.",
      ],
    },
    {
      title: "Web Designer (Freelance, WordPress)",
      org: "Syria Scope Travel",
      time: "Oct 2024 – Present",
      bullets: [
        "Customized themes/plugins for responsive website.",
        "Optimized performance & mobile responsiveness.",
      ],
    },
    {
      title: "Laravel Developer (Freelance)",
      org: "Various",
      time: "Feb 2025",
      bullets: [
        "Built barbershop management system (auth, roles, stock/service mgmt).",
        "Designed MySQL schema & RESTful APIs.",
        "Created Sawalfji: educational quiz app with points & challenges.",
      ],
    },
  ],

  projects: [
    {
      name: "Motion to Animation System (Graduation Project)",
      year: "2024",
      desc:
        "AI system converting motion data into 3D human animations for short animated films; combined ML with graphics/animation pipelines.",
      tags: ["ML", "3D", "Pipelines"],
    },
    {
      name: "Intelligent Spelling Correction System",
      year: "2023",
      desc:
        "Contextual NLP/DL spelling correction using sentence meaning rather than isolated words.",
      tags: ["NLP", "Deep Learning"],
    },
    {
      name: "Image-Based Puzzle Solver",
      year: "2023",
      desc:
        "Computer vision system to analyze images and solve visual puzzles using image processing and pattern recognition.",
      tags: ["Computer Vision"],
    },
    {
      name: "Healthcare Chatbot System",
      year: "2022–2023",
      desc:
        "NLP-based chatbot integrated with a backend system to manage user interactions and responses.",
      tags: ["LLMs", "NLP", "Backend"],
    },
    {
      name: "Taxi Driver Management System",
      year: "2021–2022",
      desc:
        "Mobile system with Flutter frontend and Laravel backend, connected via APIs.",
      tags: ["Flutter", "Laravel", "APIs"],
    },
    {
      name: "E-commerce Web Application",
      year: "2020–2021",
      desc:
        "Laravel e-commerce app with backend logic and database design.",
      tags: ["Laravel", "MySQL"],
    },
  ],

  education: [
    {
      degree: "Master’s in Artificial Intelligence (Ongoing)",
      place: "Damascus University",
      time: "2025 – Present",
    },
    {
      degree: "BSc Information Technology Engineering – AI Specialization",
      place: "Damascus University",
      time: "2019 – 2024",
    },
  ],

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
  const reduceMotion = useReducedMotion();
  const { text: roleText } = useTypewriterCycle(CONTENT.roles, {
    typeSpeed: 42,
    deleteSpeed: 26,
    pauseMs: 850,
    betweenMs: 220,
  });

  const sections = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-white">
      <div className="relative">
        <TechGlassBackground />

        {/* top nav */}
        <div className="sticky top-0 z-50 border-b border-white/5 bg-[#070A0F]/60 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,.04)]" />
              <span className="text-sm font-semibold tracking-wide">{CONTENT.name}</span>
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
              Let’s talk
            </a>
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
Open to opportunities
                </div>

                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                  {CONTENT.name}
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
                  {CONTENT.summary}
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/85 backdrop-blur-xl transition hover:border-white/15 hover:shadow-glow"
                    href="#projects"
                  >
                    View Projects
                  </a>
                  <a
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 backdrop-blur-xl transition hover:border-white/15 hover:text-white"
                    href={`mailto:${CONTENT.email}`}
                  >
                    Email
                  </a>
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
                    <h2 className="text-xl font-semibold">About</h2>
                    <p className="text-white/70 leading-relaxed">
                      AI Engineer focused on building intelligent systems and practical ML/NLP solutions, with
                      experience across LLM-based chatbots, deep learning classification, and backend integration.
                    </p>
                  </div>
                  <div className="hidden sm:block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75 backdrop-blur-xl">
                    <div className="font-medium text-white/85">{CONTENT.location}</div>
                    <div className="text-white/60">Open to impactful AI work</div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="text-sm font-medium text-white/80">Highlights</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {CONTENT.experience.slice(0, 2).map((e) => (
                      <div key={e.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-sm font-semibold">{e.title}</div>
                        <div className="mt-1 text-xs text-white/60">
                          {e.org} • {e.time}
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                          {e.bullets.slice(0, 2).map((b, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-teal-300/70" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
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
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <p className="mt-1 text-white/65">Core stack & tooling — recruiter friendly, concise.</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70" />
                    Glass chips
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
                    <h2 className="text-xl font-semibold">Projects</h2>
                    <p className="mt-1 text-white/65">Minimal cards — no images, just substance.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {CONTENT.projects.map((p) => (
                    <div
                      key={p.name}
                      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/15 hover:shadow-glow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold">{p.name}</div>
                        <div className="text-xs text-white/55">{p.year}</div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">{p.desc}</p>
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
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

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
                <h2 className="text-xl font-semibold">Education</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {CONTENT.education.map((e) => (
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
                    <h2 className="text-xl font-semibold">Contact</h2>
                    <p className="mt-1 text-white/65">
                      Fastest way: email. Also available on LinkedIn.
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
                      <span className="text-white/55">Phone: </span>
                      <span className="text-white/85">{CONTENT.phone}</span>
                    </div>
                    <div>
                      <span className="text-white/55">Location: </span>
                      <span className="text-white/85">{CONTENT.location}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <div className="pb-6 text-center text-xs text-white/45">
              Built with React • Glassmorphism • Motion (reduced-motion respected)
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

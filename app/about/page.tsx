import {
  Zap,
  Users,
  Target,
  Heart,
  Globe,
  Award,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const teamMembers = [
  {
    name: "Anas Lodhi",
    role: "Full-Stack Developer",
    bio: "Responsible for the Next.js frontend architecture, UI/UX design system, and overall project structure.",
  },
  {
    name: "Team Member 2",
    role: "Backend & AI Engineer",
    bio: "Built the FastAPI backend, RAG chatbot integration with Qdrant Cloud, and OpenAI-powered product discovery.",
  },
];

const milestones = [
  {
    icon: Cpu,
    title: "20+ Products",
    description: "Curated catalog spanning laptops, smartphones, audio, wearables, and more.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description: "256-bit SSL encryption, secure authentication, and privacy-first approach.",
  },
  {
    icon: Globe,
    title: "AI-Powered",
    description: "RAG chatbot for natural language product discovery and recommendations.",
  },
  {
    icon: Award,
    title: "Premium Experience",
    description: "Dark-mode-first design with micro-animations and responsive layouts.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--background-secondary)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
            <Heart className="h-3.5 w-3.5" />
            Our Story
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            About{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              TechNest
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            TechNest is a modern e-commerce platform built to showcase the
            intersection of cutting-edge web development and AI-powered user
            experiences. This project demonstrates a full-stack application with
            a Next.js frontend and a FastAPI RAG chatbot backend.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
              <Target className="h-3.5 w-3.5" />
              Our Mission
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Redefining{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Online Shopping
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Our mission is to deliver a premium online shopping experience
              where users can discover products not just through traditional
              search and filters, but through intelligent, AI-driven
              conversations. We believe the future of e-commerce lies at the
              intersection of beautiful design and smart technology.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones / Features */}
      <section className="border-y border-[var(--border-color)] bg-[var(--background-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all duration-300 hover:border-violet-500/20 hover:shadow-xl hover:shadow-violet-500/5"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
              <Users className="h-3.5 w-3.5" />
              The Team
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Meet the{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Developers
              </span>
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)]">
              This project was built as a university assignment by a 2-member
              team.
            </p>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 text-center transition-all duration-300 hover:border-violet-500/20 hover:shadow-xl hover:shadow-violet-500/5 sm:p-8"
              >
                {/* Avatar placeholder */}
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 ring-2 ring-violet-500/20">
                  <span className="text-2xl font-bold text-violet-400">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-violet-400">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-[var(--border-color)] bg-[var(--background-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Built With{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Modern Tech
            </span>
          </h2>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "Lucide Icons",
              "FastAPI",
              "OpenAI",
              "Qdrant Cloud",
              "Neon Postgres",
              "Vercel",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-violet-500/30 hover:text-violet-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

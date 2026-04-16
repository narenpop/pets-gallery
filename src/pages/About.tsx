import { motion } from "framer-motion";
import paw from "../assets/paw.png";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="mx-auto mt-24 flex min-h-screen max-w-6xl flex-col gap-8 p-4 pb-12"
    >
      <section className="overflow-hidden rounded-3xl bg-slate-950/90 text-white shadow-2xl backdrop-blur-sm">
        <div className="grid gap-8 p-8 md:grid-cols-[1.15fr_0.85fr] md:p-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={paw} width="72" height="72" alt="Paw print" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                  Frontend Developer
                </p>
                <h1 className="mt-2 text-5xl font-semibold leading-tight">
                  Building polished interfaces that feel modern, fast, and
                  useful.
                </h1>
              </div>
            </div>

            <p className="max-w-3xl text-lg leading-8 text-slate-200">
              I am a frontend developer with 3+ years of experience crafting
              responsive, product-focused web applications using React,
              TypeScript, Tailwind CSS, and modern UI tooling. I enjoy turning
              product requirements into clean, intuitive experiences that look
              strong in demos and perform well in production.
            </p>

            <p className="max-w-3xl text-base leading-7 text-slate-300">
              My work typically spans component architecture, design
              implementation, state management, accessibility, performance
              tuning, and interface polish. I care about maintainable code, a
              thoughtful user journey, and building products that recruiters,
              founders, and teams can immediately see value in.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-100">
                React & TypeScript
              </span>
              <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-100">
                Tailwind & UI Systems
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                Product Thinking
              </span>
              <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-100">
                Performance & UX
              </span>
            </div>
          </div>

          <div className="grid gap-4 self-start">
            <HighlightCard
              value="3+"
              label="Years of frontend experience"
              description="Delivering responsive web products with real business impact."
            />
            <HighlightCard
              value="End-to-end"
              label="UI ownership"
              description="From reusable components and routing to dashboard experiences and polish."
            />
            <HighlightCard
              value="Fast"
              label="Execution style"
              description="I move quickly, communicate clearly, and focus on outcomes that matter."
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl bg-white/90 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            What I bring
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            A recruiter-friendly mix of design sensibility and engineering
            discipline
          </h2>
          <div className="mt-6 space-y-5 text-slate-700">
            <FeatureRow
              title="Modern frontend execution"
              description="I build interfaces that are responsive, visually polished, and aligned with product goals rather than just technically functional."
            />
            <FeatureRow
              title="Strong dashboard and SaaS UI focus"
              description="I enjoy working on admin panels, management systems, and data-driven experiences where usability and clarity matter."
            />
            <FeatureRow
              title="Performance-aware implementation"
              description="I pay attention to maintainable structure, efficient rendering, and clean component design so products stay scalable."
            />
            <FeatureRow
              title="User-centered thinking"
              description="I approach features from the perspective of what helps users complete tasks quickly and confidently."
            />
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-700 p-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-100">
            Professional summary
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            The kind of developer teams can trust with visible product work
          </h2>
          <p className="mt-6 text-base leading-8 text-sky-50">
            I am especially motivated by roles where frontend is treated as a
            product discipline, not just a delivery layer. I do my best work in
            environments where thoughtful UI, strong collaboration, and
            consistent execution are valued. Whether the task is a landing page,
            a dashboard, or a feature-rich app flow, I focus on making the
            final experience feel clear, credible, and production-ready.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-sky-100">Preferred work</p>
              <p className="mt-2 text-lg font-semibold">
                React apps, SaaS products, dashboards, and polished UI systems
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-sky-100">Core mindset</p>
              <p className="mt-2 text-lg font-semibold">
                Build cleanly, communicate clearly, and improve the experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function HighlightCard({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <h3 className="mt-2 text-lg font-medium text-slate-100">{label}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

function FeatureRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
    </div>
  );
}
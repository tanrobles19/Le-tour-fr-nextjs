import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Code,
  Globe,
  Map,
  Users,
  Bike,
  Sparkles,
  Heart,
  BarChart3,
  FileText,
  Palette,
  Smartphone,
  Moon,
  Timer,
  ImageIcon,
  Cpu,
  Layers,
  ExternalLink,
} from "lucide-react";

const techStack = [
  { name: "Next.js 16", desc: { en: "App Router, Server Components", es: "App Router, Server Components" }, icon: Layers },
  { name: "React 19", desc: { en: "with Server Components", es: "con Server Components" }, icon: Code },
  { name: "TypeScript 5", desc: { en: "strict mode", es: "modo estricto" }, icon: FileText },
  { name: "Tailwind CSS v4", desc: { en: "utility-first CSS", es: "CSS utilitario" }, icon: Palette },
  { name: "shadcn/ui", desc: { en: "component library", es: "librería de componentes" }, icon: Cpu },
  { name: "Leaflet", desc: { en: "interactive maps", es: "mapas interactivos" }, icon: Map },
  { name: "Recharts", desc: { en: "data visualization", es: "visualización de datos" }, icon: BarChart3 },
  { name: "PapaParse", desc: { en: "CSV parsing", es: "análisis de CSV" }, icon: FileText },
  { name: "Lucide React", desc: { en: "icons", es: "iconos" }, icon: Sparkles },
];

const features = (lang: "en" | "es") => [
  { icon: Users, text: lang === "en" ? "Team browser with grid and carousel views" : "Explorador de equipos con vistas de cuadrícula y carrusel" },
  { icon: ImageIcon, text: lang === "en" ? "Interactive jersey & bike flipper with zoom" : "Maillots y bicicletas interactivos con zoom" },
  { icon: ImageIcon, text: lang === "en" ? "Bike gallery with lightbox zoom" : "Galería de bicicletas con zoom lightbox" },
  { icon: Map, text: lang === "en" ? "Tour route map with stage markers and popups" : "Mapa de ruta del Tour con marcadores de etapa y popups" },
  { icon: Bike, text: lang === "en" ? "Team rosters with 650+ riders" : "Plantillas de equipos con más de 650 ciclistas" },
  { icon: Timer, text: lang === "en" ? "Live countdown to race start" : "Cuenta regresiva en vivo hasta el inicio de la carrera" },
  { icon: Globe, text: lang === "en" ? "Internationalization (EN/ES)" : "Internacionalización (EN/ES)" },
  { icon: Smartphone, text: lang === "en" ? "Mobile-first responsive design" : "Diseño responsive mobile-first" },
  { icon: Moon, text: lang === "en" ? "Dark mode UI with premium animations" : "Interfaz en modo oscuro con animaciones premium" },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const l = lang as "en" | "es";

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-6">
            <Sparkles className="size-3.5" />
            Tour de France 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            {l === "en" ? "About This Project" : "Acerca de Este Proyecto"}
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {l === "en"
              ? "Built with AI-powered collaboration"
              : "Creado con colaboración impulsada por IA"}
          </p>
        </div>

        {/* The Idea */}
        <section className="mb-12">
          <div className="rounded-2xl border border-white/5 bg-zinc-800/30 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Bike className="size-5 text-zinc-950" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {l === "en" ? "The Idea" : "La Idea"}
              </h2>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              {l === "en"
                ? "This is an interactive web application for the Tour de France 2026 — the 113th edition of the world's most prestigious cycling race. It lets fans explore teams, jerseys, race stages on an interactive map, a bike gallery, standings, and more."
                : "Esta es una aplicación web interactiva para el Tour de Francia 2026 — la 113.ª edición de la carrera ciclista más prestigiosa del mundo. Permite a los aficionados explorar equipos, maillots, etapas de la carrera en un mapa interactivo, galería de bicicletas, clasificaciones y más."}
            </p>
          </div>
        </section>

        {/* Meet Jonathan */}
        <section className="mb-12">
          <div className="rounded-2xl border border-white/5 bg-zinc-800/30 overflow-hidden">
            {/* Header band */}
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar placeholder */}
                <div className="size-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl font-bold text-zinc-950 flex-shrink-0 shadow-lg shadow-amber-500/20">
                  JR
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h2 className="text-2xl font-bold text-white">
                      Jonathan Robles
                    </h2>
                    <Link
                      href="https://www.linkedin.com/in/jonathan-robles-87645586/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      <ExternalLink className="size-3" />
                      LinkedIn
                    </Link>
                  </div>
                  <p className="text-sm text-amber-400 font-medium mb-4">
                    Manager Software Engineer at Pfizer
                  </p>

                  <p className="text-zinc-300 leading-relaxed mb-4">
                    {l === "en"
                      ? "Jonathan is a Manager Software Engineer at Pfizer, passionate about pushing the boundaries of what's possible with modern web technologies, mobile apps, cloud architecture, and AI-powered development."
                      : "Jonathan es Manager Software Engineer en Pfizer, apasionado por empujar los límites de lo posible con tecnologías web modernas, aplicaciones móviles, arquitectura cloud y desarrollo impulsado por IA."}
                  </p>

                  <p className="text-zinc-300 leading-relaxed mb-4">
                    {l === "en"
                      ? "A cycling enthusiast with a keen eye for design and user experience, Jonathan envisioned this Tour de France 2026 application as a showcase of human-AI collaboration — proving that when creative vision meets AI capabilities, the results can be extraordinary."
                      : "Entusiasta del ciclismo con un ojo agudo para el diseño y la experiencia de usuario, Jonathan concibió esta aplicación del Tour de Francia 2026 como una demostración de colaboración humano-IA — demostrando que cuando la visión creativa se encuentra con las capacidades de IA, los resultados pueden ser extraordinarios."}
                  </p>

                  {/* Skills/traits */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      l === "en" ? "Full-Stack Development" : "Desarrollo Full-Stack",
                      "Next.js / React",
                      "Mobile Apps",
                      "Cloud",
                      l === "en" ? "AI-Powered Development" : "Desarrollo con IA",
                      l === "en" ? "UX Design" : "Diseño UX",
                      l === "en" ? "Cycling Enthusiast" : "Entusiasta del Ciclismo",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built Together */}
        <section className="mb-12">
          <div className="rounded-2xl border border-white/5 bg-zinc-800/30 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                <Heart className="size-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {l === "en" ? "Built Together" : "Construido Juntos"}
              </h2>
            </div>
            <p className="text-zinc-300 leading-relaxed mb-4">
              {l === "en"
                ? "This project was built by "
                : "Este proyecto fue creado por "}
              <Link
                href="https://www.linkedin.com/in/jonathan-robles-87645586/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white font-semibold hover:text-amber-400 transition-colors"
              >
                Jonathan Robles
                <ExternalLink className="size-3.5" />
              </Link>
              {l === "en" ? " in collaboration with " : " en colaboración con "}
              <span className="text-white font-semibold">Claude</span>
              {l === "en" ? " (by Anthropic)." : " (de Anthropic)."}
            </p>
            <p className="text-zinc-300 leading-relaxed mb-4">
              {l === "en"
                ? "Jonathan provided the vision, requirements, and creative direction. Claude (Opus 4.6) provided the code, architecture, and implementation — working together in real-time through Claude Code, Anthropic's AI-powered coding CLI."
                : "Jonathan proporcionó la visión, los requisitos y la dirección creativa. Claude (Opus 4.6) proporcionó el código, la arquitectura y la implementación — trabajando juntos en tiempo real a través de Claude Code, la CLI de programación con IA de Anthropic."}
            </p>
            <p className="text-zinc-400 leading-relaxed italic">
              {l === "en"
                ? "This is a showcase of what human-AI collaboration can achieve."
                : "Esto es una muestra de lo que la colaboración humano-IA puede lograr."}
            </p>
          </div>
        </section>

        {/* How It Was Built — Claude Code Skills */}
        <section className="mb-12">
          <div className="rounded-2xl border border-white/5 bg-zinc-800/30 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Sparkles className="size-5 text-zinc-950" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {l === "en" ? "How It Was Built" : "Cómo se Construyó"}
              </h2>
            </div>
            <p className="text-zinc-300 leading-relaxed mb-6">
              {l === "en"
                ? "This project was bootstrapped and styled using custom Claude Code Skills — reusable prompt-driven commands that automate complex workflows inside the CLI:"
                : "Este proyecto fue iniciado y estilizado usando Skills personalizados de Claude Code — comandos reutilizables basados en prompts que automatizan flujos de trabajo complejos dentro del CLI:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* /nextjs-scaffold skill */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <code className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 text-sm font-mono font-semibold">/nextjs-scaffold</code>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                  {l === "en"
                    ? "A scaffold skill that generates a complete Next.js project from scratch with the team's standard stack: React 19, TypeScript, Tailwind CSS v4, shadcn/ui, PapaParse, Recharts, and all configuration files — ready to build on in seconds."
                    : "Un skill de scaffolding que genera un proyecto Next.js completo desde cero con el stack estándar del equipo: React 19, TypeScript, Tailwind CSS v4, shadcn/ui, PapaParse, Recharts y todos los archivos de configuración — listo para construir en segundos."}
                </p>
                <p className="text-xs text-zinc-400">
                  {l === "en"
                    ? "Sets up App Router, fonts, dark mode, import aliases, ESLint, .nvmrc, and installs all dependencies automatically."
                    : "Configura App Router, fuentes, modo oscuro, alias de importación, ESLint, .nvmrc e instala todas las dependencias automáticamente."}
                </p>
              </div>

              {/* /premium-ui skill */}
              <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <code className="px-2 py-0.5 rounded-md bg-violet-500/15 text-violet-400 text-sm font-mono font-semibold">/premium-ui</code>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                  {l === "en"
                    ? "A design system skill that applies a premium dark UI theme across the entire project. It defines the visual language: cards, galleries, tables, forms, detail pages — all with consistent Tailwind CSS patterns."
                    : "Un skill de sistema de diseño que aplica un tema de interfaz oscuro premium en todo el proyecto. Define el lenguaje visual: tarjetas, galerías, tablas, formularios, páginas de detalle — todo con patrones consistentes de Tailwind CSS."}
                </p>
                <p className="text-xs text-zinc-400">
                  {l === "en"
                    ? "Provides the dark gradients, amber accents, glassmorphism borders, hover animations, and spacing conventions used throughout this app."
                    : "Proporciona los degradados oscuros, acentos ámbar, bordes de glassmorfismo, animaciones hover y convenciones de espaciado utilizadas en toda la aplicación."}
                </p>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed mt-6 text-sm">
              {l === "en"
                ? "Claude Code Skills are like slash commands — type /nextjs-scaffold or /premium-ui in the CLI and Claude executes the entire workflow. They encode team conventions and best practices into repeatable automation, ensuring consistency across projects."
                : "Los Skills de Claude Code son como comandos slash — escribe /nextjs-scaffold o /premium-ui en el CLI y Claude ejecuta todo el flujo de trabajo. Codifican las convenciones y mejores prácticas del equipo en automatización repetible, asegurando consistencia entre proyectos."}
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Code className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {l === "en" ? "Tech Stack" : "Stack Tecnológico"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map(({ name, desc, icon: Icon }) => (
              <div
                key={name}
                className="rounded-2xl border border-white/5 bg-zinc-800/30 p-5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="size-5 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white">{name}</h3>
                </div>
                <p className="text-xs text-zinc-400">{desc[l]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {l === "en" ? "Features" : "Características"}
            </h2>
          </div>
          <div className="rounded-2xl border border-white/5 bg-zinc-800/30 divide-y divide-white/5">
            {features(l).map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/10 transition-colors"
              >
                <Icon className="size-5 text-amber-400 shrink-0" />
                <span className="text-sm text-zinc-300">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pb-8">
          <div className="inline-flex items-center gap-2 text-sm text-zinc-400">
            <Heart className="size-4 text-amber-400/60" />
            {l === "en"
              ? "Made with care in 2026"
              : "Hecho con cuidado en 2026"}
          </div>
        </div>
      </main>
    </div>
  );
}

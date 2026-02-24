import { motion } from "motion/react";
import { useState } from "react";
import { CONTENT } from "../constants/content";
import SectionSpotlight from "./SectionSpotlight";

export interface SocraticCoachProps {
  onHintRequested?: () => void;
}

export default function SocraticCoach({ onHintRequested }: SocraticCoachProps) {
  const [hintLevel, setHintLevel] = useState(0);
  const data = CONTENT.socraticCoach;

  const handleReveal = () => {
    if (hintLevel < 1) {
      setHintLevel(1);
      onHintRequested?.();
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-void border-t border-zinc-900/50">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none" />
      <SectionSpotlight color="rgba(13, 148, 136, 0.12)" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10 max-w-[1800px]">
        {/* GEO Semantic Content & Header */}
        <div className="text-center lg:text-left mb-16 lg:mb-24 flex flex-col lg:flex-row justify-between items-end gap-8">
          <div className="max-w-3xl">
            <p data-speakable className="sr-only">
              AdaptHub penalizes passive learning. When you get a question
              wrong, the AI Coach doesn't show you the solution. Instead, it
              forces you to bridge the logical gap using the Socratic method.
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight mb-6">
              {data.header.titleLine1}{" "}
              <span className="text-brand-teal italic pr-2">
                {data.header.titleHighlight}
              </span>{" "}
              {data.header.titleLine2}
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-sans leading-relaxed mb-6">
              {data.header.description}
            </p>
            <a
              href="/cat-syllabus"
              className="group inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-brand-teal hover:text-white transition-colors"
            >
              <span>{data.header.linkText}</span>
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
          <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 border border-zinc-800 rounded-full px-4 py-1.5 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse"></span>
              {data.header.pillText}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* LEFT: Question Card (Cognitive Friction) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-5 mb-6">
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-zinc-800/80 rounded bg-clip-padding text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
                  {data.question.category}
                </span>
                <span className="px-2.5 py-1 bg-red-950/40 text-red-400 border border-red-900/30 rounded bg-clip-padding text-[10px] font-mono uppercase tracking-widest">
                  {data.question.level}
                </span>
              </div>
              <div className="text-zinc-500 font-mono text-xs tracking-wider">
                {data.question.id}
              </div>
            </div>

            <div className="prose prose-invert max-w-none font-serif text-lg md:text-xl text-zinc-200 mb-10 leading-relaxed font-medium">
              <p>{data.question.text}</p>
            </div>

            <div className="space-y-3 font-mono text-sm mt-auto">
              {data.question.options.map((opt, i) => (
                <div
                  key={opt}
                  className={`w-full flex items-center p-4 rounded-xl border transition-all duration-300 cursor-not-allowed ${i === data.question.selectedIncorrectIndex ? "bg-red-950/20 border-red-900/50 text-red-200" : "bg-black/50 border-zinc-800/80 text-zinc-400"}`}
                >
                  <span className="opacity-40 mr-4 font-bold">
                    [{String.fromCharCode(65 + i)}]
                  </span>{" "}
                  {opt}
                  {i === data.question.selectedIncorrectIndex && (
                    <span className="ml-auto text-red-500/80 text-xs tracking-widest uppercase">
                      Incorrect
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: AI Coach Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-black border border-zinc-800/80 rounded-3xl flex flex-col min-h-[500px] shadow-2xl relative overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="px-6 py-4 border-b border-zinc-800/80 bg-zinc-950 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">
                  Coach Terminal
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                Telemetry: Analyzing
              </span>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-end space-y-6 bg-[linear-gradient(to_bottom,transparent_0%,rgba(9,9,11,0.5)_100%)]">
              {/* Diagnostic Output */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-900/80 border border-zinc-800 rounded-3xl rounded-tr-sm p-6 max-w-[90%] md:max-w-[85%] self-end relative"
              >
                <p className="text-zinc-300 text-sm md:text-base font-sans leading-relaxed">
                  You selected{" "}
                  <span className="font-mono text-red-400 bg-red-950/30 border border-red-900/30 px-1.5 py-0.5 rounded shadow-sm">
                    {data.diagnostic.userSelection}
                  </span>
                  .
                  <br />
                  <br />
                  <span className="text-zinc-400 font-mono text-[10px] md:text-[11px] block mb-2 uppercase tracking-widest font-semibold">
                    System Diagnostic:
                  </span>
                  {data.diagnostic.analysisP1}
                  <span className="font-mono text-zinc-100">
                    {data.diagnostic.analysisHighlight1}
                  </span>
                  {data.diagnostic.analysisP2}
                  <span className="font-mono text-zinc-100">
                    {data.diagnostic.analysisHighlight2}
                  </span>
                  {data.diagnostic.analysisP3}
                  <span className="font-mono text-zinc-100">
                    {data.diagnostic.analysisHighlight3}
                  </span>
                  {data.diagnostic.analysisP4}
                  <br />
                  <br />
                  <span className="text-orange-400 font-mono text-[10px] md:text-xs uppercase tracking-widest border border-orange-400/20 bg-orange-400/10 px-2.5 py-1.5 rounded-sm inline-block shadow-sm">
                    {data.diagnostic.errorFlag}
                  </span>
                </p>
              </motion.div>

              {/* Socratic Prompt */}
              {hintLevel > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-[#051514] border border-brand-teal/30 shadow-[0_0_40px_rgba(45,212,191,0.08)] rounded-3xl rounded-tl-sm p-6 max-w-[90%] md:max-w-[85%] self-start relative mt-2"
                >
                  <div className="text-brand-teal font-mono text-[10px] md:text-[11px] font-semibold mb-4 uppercase tracking-widest flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {data.hint.tier}
                  </div>
                  <p className="text-zinc-200 text-sm md:text-base font-sans leading-relaxed">
                    {data.hint.textP1}
                    <span className="font-mono text-brand-teal font-semibold">
                      {data.hint.textHighlight1}
                    </span>
                    {data.hint.textP2}
                    <br />
                    <br />
                    {data.hint.textP3}
                    <span className="font-mono text-brand-teal font-semibold">
                      {data.hint.textHighlight2}
                    </span>
                    {data.hint.textP4}
                    <span className="font-mono text-brand-teal font-semibold">
                      {data.hint.textHighlight3}
                    </span>
                    {data.hint.textP5}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Action Bar */}
            <div className="p-4 md:p-6 bg-zinc-950 border-t border-zinc-800/80">
              {hintLevel === 0 ? (
                <button
                  type="button"
                  onClick={handleReveal}
                  className="group w-full py-4 bg-zinc-900/50 hover:bg-zinc-800 text-white font-mono text-xs md:text-sm uppercase tracking-widest rounded-xl border border-zinc-800 hover:border-zinc-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative touch-manipulation"
                >
                  {/* Hover glare effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                  <span>Request Next Logical Step</span>
                </button>
              ) : (
                <div className="w-full py-4 bg-black/50 text-brand-teal/70 font-mono text-xs md:text-sm uppercase tracking-widest text-center border border-dashed border-brand-teal/20 rounded-xl flex items-center justify-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping"></span>
                  Awaiting Recalculation...
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

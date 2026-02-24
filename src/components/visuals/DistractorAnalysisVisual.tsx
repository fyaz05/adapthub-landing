import { motion } from "motion/react";

const DistractorAnalysisVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 gap-3 overflow-visible">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* QUESTION CARD */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-black/90 border border-zinc-800 rounded-xl p-3.5 w-[280px] flex-shrink-0 shadow-2xl relative z-10"
      >
        <div className="flex justify-between items-start mb-2.5 border-b border-zinc-800/50 pb-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded">
            VARC_Q42
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-red-500 bg-red-950/30 px-1.5 py-0.5 rounded border border-red-900/30 font-bold">
            28% Acc
          </span>
        </div>

        <p className="text-[10px] text-zinc-300 font-serif leading-snug mb-3">
          The argument would be{" "}
          <span className="text-zinc-100 bg-white/10 px-0.5">weakened</span> if
          which were true?
        </p>

        <div className="space-y-1.5 font-mono text-[9px]">
          <div className="px-2.5 py-2 rounded-lg border border-zinc-900 bg-zinc-950 text-zinc-500 flex items-center gap-2">
            <span className="opacity-50">[A]</span>
            <span className="truncate">Ignores historical context.</span>
          </div>
          <div className="px-2.5 py-2 rounded-lg border border-brand-teal/40 bg-brand-teal/10 text-brand-teal flex items-center gap-2 relative">
            <span className="font-bold">[B]</span>
            <span className="truncate">Conflates correlation...</span>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-teal rounded-full flex items-center justify-center flex-shrink-0"
            >
              <svg
                className="w-2 h-2 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="square"
                  strokeWidth="4"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          </div>
          <div className="px-2.5 py-2 rounded-lg border border-red-900/80 bg-red-950/30 text-red-300 flex items-center gap-2">
            <span className="font-bold">[C]</span>
            <span className="truncate">Does not deny the premise.</span>
          </div>
        </div>
      </motion.div>

      {/* CONNECTOR ARROW */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="flex items-center gap-0 flex-shrink-0 origin-left"
      >
        <div className="w-6 h-px bg-red-900/50" />
        <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-red-900/50" />
      </motion.div>

      {/* TRAP CALLOUT CARD */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
        className="bg-[#0a0505] border border-red-900/50 p-3 rounded-xl shadow-[0_10px_30px_rgba(239,68,68,0.2)] flex-shrink-0 w-[185px] relative z-10"
      >
        <div className="font-mono text-[9px] text-red-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-bold">
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="square"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Trap: Negation
        </div>
        <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
          <span className="text-zinc-200 font-medium">72% of candidates</span>{" "}
          chose [C] — misread the negation. High confidence, wrong execution.
        </p>
      </motion.div>

      {/* Decorative tag */}
      <div className="absolute bottom-2 right-4 font-mono text-[8px] text-zinc-700 uppercase tracking-widest pointer-events-none">
        Diagnostic_v4
      </div>
    </div>
  );
};

export default DistractorAnalysisVisual;

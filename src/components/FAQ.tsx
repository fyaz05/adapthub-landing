import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CONTENT } from "../constants/content";
import SectionSpotlight from "./SectionSpotlight";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = CONTENT.faq.items;

  return (
    <section className="py-20 sm:py-32 bg-void relative" id="faq">
      <SectionSpotlight color="rgba(13, 148, 136, 0.15)" />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-20 text-center">
          <span className="font-mono text-[9px] sm:text-[10px] text-brand-teal uppercase tracking-widest mb-3 sm:mb-4 block">
            {CONTENT.faq.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white font-serif italic">
            {CONTENT.faq.title}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border-t border-charcoal/10 last:border-b"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full py-8 sm:py-12 flex items-start text-left group transition-all duration-200 active:scale-[0.99] touch-manipulation min-h-[60px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal/50"
              >
                <span className="font-mono text-xs sm:text-sm text-zinc-500 mr-4 sm:mr-12 mt-1 sm:mt-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl text-zinc-300 group-hover:text-white transition-colors leading-snug">
                    {faq.question}
                  </h3>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p
                          data-speakable
                          className="pt-6 sm:pt-8 text-base sm:text-xl text-zinc-400 leading-relaxed max-w-3xl"
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="ml-4 mt-1 sm:mt-2">
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    className="text-zinc-500 group-hover:text-brand-teal transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      className="sm:w-6 sm:h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

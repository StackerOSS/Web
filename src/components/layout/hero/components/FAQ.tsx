"use client";

import { motion } from "framer-motion";
import { Badge } from "#/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion";
import { Card, CardContent } from "#/components/ui/card";

const FAQS = [
  {
    question: "What does Stacker do?",
    answer: "Stacker is a visual full-stack builder. Pick your framework, UI library, auth, ORM, API, and theme. See live code preview. Get a template ID. Scaffold locally with bunx stacker-cli [ID].",
  },
  {
    question: "Is Stacker free?",
    answer: "Yes. Stacker is 100% open source and free to use. No paywalls, no trials. Self-host it, fork it, or use the hosted version at no cost.",
  },
  {
    question: "Can I customize the generated code?",
    answer: "Absolutely. The scaffold is a starting point. Edit, refactor, and deploy however you want. Stacker gets you started, not locked in.",
  },
  {
    question: "What frameworks does Stacker support?",
    answer: "React, Next.js, TanStack Start, Vite, and more. We're constantly adding options. If your stack isn't supported, open an issue on GitHub.",
  },
  {
    question: "Can I share my stack configuration?",
    answer: "Yes! Your stack is encoded into a template ID. Share the ID with your team, and they can scaffold the same setup locally with one command.",
  },
  {
    question: "Is Stacker for beginners or experienced devs?",
    answer: "Both. Beginners get a guided, opinionated setup. Experienced devs get full control to mix-and-match any combination of libraries and tools.",
  },
];

export default function FAQ() {
  return (
    <section id="docs" className="py-32 relative overflow-hidden bg-background" aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 text-primary font-bold tracking-widest uppercase text-[10px]">
              Questions?
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-foreground mb-8">
              Stacker <span className="italic">FAQ.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              Everything you need to know about configuring, previewing, and scaffolding your stack.
            </p>
          </motion.div>
        </div>

        <Card className="rounded-3xl border-border bg-card/90 backdrop-blur-sm overflow-hidden p-4 md:p-8 shadow-sm">
          <CardContent className="p-0 font-sans">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-border/40 last:border-0 px-2 sm:px-4"
                >
                  <AccordionTrigger className="text-lg md:text-xl font-medium py-6 hover:no-underline hover:text-primary transition-colors group">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-[16px] leading-relaxed pb-6 max-w-3xl">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </Card>
      </div>
    </section>
  );
}
